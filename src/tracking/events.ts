/**
 * MINDSET Psychotherapy & Counseling Center
 * Client-Side Tracking Event Types & Privacy Sanitizer
 * 
 * STRICT PSYCHOTHERAPY PRIVACY RULE:
 * Never capture or transmit patient symptoms, notes, diagnoses, or personal messages.
 */

export type TrackingEventType =
  | "PageView"
  | "ViewContent"
  | "Contact"
  | "Lead"
  | "Schedule"
  | "WhatsAppClick"
  | "AppointmentStart"
  | "AppointmentSubmit";

/**
 * Generates a unique, high-entropy event ID for deduplication.
 * Shared synchronously between browser (Pixel/GTM) and server (CAPI/GTM-Server).
 */
export function generateEventId(prefix: string = "evt"): string {
  const ts = Date.now();
  const rand = Math.random().toString(36).substring(2, 10);
  return `${prefix}_${ts}_${rand}`;
}

// Prohibited keys that MUST be excluded to protect patient privacy
const FORBIDDEN_CLIENT_KEYS = new Set([
  "message",
  "notes",
  "symptoms",
  "diagnosis",
  "concern",
  "details",
  "problem",
  "medical_info",
  "condition",
  "history",
  "complaint",
]);

/**
 * Strips any sensitive clinical info from payload.
 */
export function sanitizeClientPayload<T extends Record<string, unknown>>(data?: T): Record<string, unknown> {
  if (!data || typeof data !== "object") {
    return {};
  }

  const clean: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (FORBIDDEN_CLIENT_KEYS.has(key.toLowerCase())) {
      continue;
    }
    // Drop long strings that might contain freeform user writing
    if (typeof value === "string" && value.length > 100) {
      continue;
    }
    if (value !== undefined && value !== null) {
      clean[key] = value;
    }
  }

  return clean;
}
