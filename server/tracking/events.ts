/**
 * MINDSET Psychotherapy & Counseling Center
 * Server-Side Tracking Event Definitions & Medical Data Sanitizer
 * 
 * CRITICAL CLINICAL ETHICS & PRIVACY RULE:
 * This is a psychotherapy practice. NEVER send diagnostic impressions,
 * symptoms, mental health states, appointment messages, or therapy notes
 * to any marketing or advertising endpoint.
 */

import crypto from "node:crypto";

export type SupportedEventType =
  | "PageView"
  | "ViewContent"
  | "Contact"
  | "Lead"
  | "Schedule"
  | "WhatsAppClick"
  | "AppointmentStart"
  | "AppointmentSubmit";

// Keys that are STRICTLY FORBIDDEN from being forwarded to any external platform
const FORBIDDEN_SENSITIVE_KEYS = new Set([
  "message",
  "notes",
  "symptoms",
  "diagnosis",
  "concern",
  "concerns",
  "details",
  "problem",
  "medical_info",
  "condition",
  "history",
  "therapy_notes",
  "private_notes",
  "mental_health_condition",
  "counseling_details",
  "complaint",
  "freeform_text",
]);

export interface RawUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  clientIp?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
}

export interface HashedUserData {
  em?: string[]; // SHA256 hashed emails
  ph?: string[]; // SHA256 hashed phone numbers
  fn?: string[]; // SHA256 hashed first names
  ln?: string[]; // SHA256 hashed last names
  client_ip_address?: string;
  client_user_agent?: string;
  fbp?: string;
  fbc?: string;
}

export interface SanitizedCustomData {
  currency?: string;
  value?: number;
  content_name?: string;
  content_category?: string;
  content_type?: string;
  service_category?: string;
  consultation_type?: string;
  lead_source?: string;
  status?: string;
  [key: string]: unknown;
}

export interface ServerTrackingPayload {
  event_name: SupportedEventType | string;
  event_time: number; // Unix timestamp in seconds
  event_id: string; // Consistent deduplication ID shared with browser
  event_source_url?: string;
  action_source: "website" | "app" | "physical_store" | "system_generated" | "other";
  user_data: HashedUserData;
  custom_data?: SanitizedCustomData;
}

/**
 * Standard SHA-256 hashing for Meta CAPI
 */
export function sha256(value: string): string {
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

/**
 * Normalizes phone numbers before hashing (e.g. strips spaces, dashes, parentheses).
 */
export function normalizePhone(phone: string): string {
  let cleaned = phone.replace(/[^0-9]/g, "");
  // If Bangladesh local number missing country code, e.g. 01711..., prepend 88
  if (cleaned.startsWith("01") && cleaned.length === 11) {
    cleaned = `88${cleaned}`;
  }
  return cleaned;
}

/**
 * Hashes user identity markers safely according to Meta Conversions API specifications.
 */
export function hashUserData(raw: RawUserData): HashedUserData {
  const hashed: HashedUserData = {};

  if (raw.email && raw.email.trim()) {
    hashed.em = [sha256(raw.email)];
  }

  if (raw.phone && raw.phone.trim()) {
    const normalized = normalizePhone(raw.phone);
    if (normalized) {
      hashed.ph = [sha256(normalized)];
    }
  }

  if (raw.firstName && raw.firstName.trim()) {
    hashed.fn = [sha256(raw.firstName)];
  }

  if (raw.lastName && raw.lastName.trim()) {
    hashed.ln = [sha256(raw.lastName)];
  }

  if (raw.clientIp) {
    hashed.client_ip_address = raw.clientIp;
  }

  if (raw.userAgent) {
    hashed.client_user_agent = raw.userAgent;
  }

  if (raw.fbp) {
    hashed.fbp = raw.fbp;
  }

  if (raw.fbc) {
    hashed.fbc = raw.fbc;
  }

  return hashed;
}

/**
 * Deep sanitization of custom data to purge any sensitive psychotherapy information.
 */
export function sanitizeCustomData(data?: Record<string, unknown>): SanitizedCustomData {
  if (!data || typeof data !== "object") {
    return {
      service_category: "Psychotherapy & Counseling",
      currency: "BDT",
    };
  }

  const clean: SanitizedCustomData = {
    service_category: "Psychotherapy & Counseling",
    currency: "BDT",
  };

  for (const [key, val] of Object.entries(data)) {
    const lowerKey = key.toLowerCase();
    // Exclude any forbidden sensitive keys
    if (FORBIDDEN_SENSITIVE_KEYS.has(lowerKey)) {
      continue;
    }

    // Only allow primitive safe types or safe numbers
    if (typeof val === "string") {
      // If the string length is long (>120 chars), it could be a private message/note; drop it
      if (val.length > 120) {
        continue;
      }
      clean[key] = val;
    } else if (typeof val === "number" || typeof val === "boolean") {
      clean[key] = val;
    }
  }

  return clean;
}

/**
 * Maps high-level events to Meta CAPI standard event names where applicable.
 */
export function mapToMetaEventName(eventName: string): string {
  switch (eventName) {
    case "PageView":
      return "PageView";
    case "ViewContent":
      return "ViewContent";
    case "Contact":
      return "Contact";
    case "Lead":
      return "Lead";
    case "Schedule":
    case "AppointmentSubmit":
      return "Schedule";
    case "WhatsAppClick":
      return "Contact"; // Meta standard event is Contact, with custom parameter
    case "AppointmentStart":
      return "InitiateCheckout"; // Or custom event
    default:
      return eventName;
  }
}
