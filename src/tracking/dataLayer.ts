/**
 * MINDSET Psychotherapy & Counseling Center
 * Client DataLayer & Background Server Dispatcher
 * 
 * Synchronizes client dataLayer (GTM Web) and fires background
 * fetch to /api/tracking/event using the identical event_id for CAPI deduplication.
 */

import { generateEventId, sanitizeClientPayload, TrackingEventType } from "./events";

// Extend window interface safely for analytics globals
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
  }
}

export interface ClientTrackOptions {
  eventName: TrackingEventType;
  customData?: Record<string, unknown>;
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
  };
  eventId?: string;
}

/**
 * Pushes event to browser dataLayer / Pixel (if present) AND transmits to server endpoint.
 */
export function dispatchClientEvent({
  eventName,
  customData,
  userData,
  eventId,
}: ClientTrackOptions): string {
  const activeEventId = eventId || generateEventId(eventName.toLowerCase());
  const cleanCustomData = sanitizeClientPayload(customData);
  const cleanUserData = sanitizeClientPayload(userData as Record<string, unknown>);

  // 1. Push to window.dataLayer (for Google Tag Manager Web Container if installed)
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      event_id: activeEventId,
      ...cleanCustomData,
    });

    // 2. Trigger Meta Pixel if loaded via third-party script
    if (typeof window.fbq === "function") {
      try {
        window.fbq("track", eventName, cleanCustomData, { eventID: activeEventId });
      } catch {
        // Silently ignore script errors from blocked extensions
      }
    }

    // 3. Concurrently dispatch to server-side endpoint (/api/tracking/event)
    // Uses fetch with keepalive to ensure delivery across navigation / WhatsApp redirects
    try {
      const payload = {
        event_name: eventName,
        event_id: activeEventId,
        event_source_url: window.location.href,
        user_data: cleanUserData,
        custom_data: cleanCustomData,
      };

      fetch("/api/tracking/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        // Silent failure: tracking must NEVER block or break user actions
      });
    } catch {
      // Non-blocking catch
    }
  }

  return activeEventId;
}
