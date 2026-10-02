/**
 * MINDSET Psychotherapy & Counseling Center
 * Server-Side Events Dispatcher & Deduplication Engine
 * 
 * Routes events concurrently to:
 * 1. Meta Conversions API (CAPI)
 * 2. GTM Server-Side Container (if configured)
 * 
 * Enforces strict event_id deduplication and psychotherapy data hygiene.
 */

import { getTrackingConfig } from "./config";
import {
  ServerTrackingPayload,
  SupportedEventType,
  RawUserData,
  hashUserData,
  sanitizeCustomData,
} from "./events";
import { sendToMetaCapi, MetaCapiResponse } from "./metaCapi";

// In-memory deduplication cache: keeps track of event_id seen in the last 15 minutes
interface CacheEntry {
  timestamp: number;
}
const recentEventIds = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

function pruneEventCache() {
  const now = Date.now();
  for (const [id, entry] of recentEventIds.entries()) {
    if (now - entry.timestamp > CACHE_TTL_MS) {
      recentEventIds.delete(id);
    }
  }
}

// Clean up stale IDs every 5 minutes safely across Node and edge runtimes
const pruneTimer = setInterval(pruneEventCache, 5 * 60 * 1000);
if (typeof pruneTimer === "object" && pruneTimer !== null && "unref" in pruneTimer && typeof (pruneTimer as { unref?: () => void }).unref === "function") {
  (pruneTimer as { unref: () => void }).unref();
}

export interface IncomingEventRequest {
  event_name: SupportedEventType | string;
  event_id: string;
  event_source_url?: string;
  user_data?: RawUserData;
  custom_data?: Record<string, unknown>;
  client_ip?: string;
  client_user_agent?: string;
}

export interface DispatchResult {
  eventId: string;
  eventName: string;
  deduplicated: boolean;
  metaCapi: MetaCapiResponse;
  gtmServerStatus?: {
    success: boolean;
    error?: string;
  };
}

/**
 * Dispatches an event payload to a GTM Server-Side Container (if configured)
 */
async function sendToGtmServer(
  payload: ServerTrackingPayload,
  containerUrl: string,
  secret?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const url = new URL("/mp/collect", containerUrl).toString();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": payload.user_data.client_user_agent || "MINDSET-Server-Tracker",
    };

    if (secret) {
      headers["x-gtm-server-preview"] = secret;
    }

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        event_name: payload.event_name,
        event_id: payload.event_id,
        event_time: payload.event_time,
        client_id: payload.user_data.fbp || payload.event_id,
        user_data: payload.user_data,
        custom_data: payload.custom_data,
      }),
    });

    return {
      success: res.ok,
      error: res.ok ? undefined : `GTM Server returned status ${res.status}`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Processes incoming event from client or server action, validates, sanitizes,
 * hashes identities, and distributes to marketing infrastructure.
 */
export async function processServerEvent(
  req: IncomingEventRequest
): Promise<DispatchResult> {
  const { event_name, event_id, event_source_url, user_data = {}, custom_data } = req;

  // 1. Deduplication check
  if (recentEventIds.has(event_id)) {
    return {
      eventId: event_id,
      eventName: event_name,
      deduplicated: true,
      metaCapi: {
        success: true,
        events_received: 0,
        error: "Event was already processed (deduplicated).",
      },
    };
  }

  // Register in cache
  recentEventIds.set(event_id, { timestamp: Date.now() });

  // 2. Format user data and enforce hashing
  const mergedUserData: RawUserData = {
    ...user_data,
    clientIp: req.client_ip || user_data.clientIp,
    userAgent: req.client_user_agent || user_data.userAgent,
  };
  const hashedUser = hashUserData(mergedUserData);

  // 3. Enforce sensitive medical data sanitization
  const safeCustomData = sanitizeCustomData(custom_data);

  // 4. Construct server payload
  const serverPayload: ServerTrackingPayload = {
    event_name,
    event_id,
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: event_source_url || "https://mindsetbd.com",
    action_source: "website",
    user_data: hashedUser,
    custom_data: safeCustomData,
  };

  const config = getTrackingConfig();

  // 5. Send to Meta CAPI
  const metaCapiPromise = sendToMetaCapi(serverPayload);

  // 6. Send to GTM Server if URL configured
  let gtmServerPromise: Promise<{ success: boolean; error?: string }> = Promise.resolve({
    success: true,
  });

  if (config.isGtmServerEnabled) {
    gtmServerPromise = sendToGtmServer(
      serverPayload,
      config.gtmServerContainerUrl,
      config.gtmServerSecret
    );
  }

  const [metaCapiResult, gtmResult] = await Promise.all([
    metaCapiPromise,
    gtmServerPromise,
  ]);

  return {
    eventId: event_id,
    eventName: event_name,
    deduplicated: false,
    metaCapi: metaCapiResult,
    gtmServerStatus: config.isGtmServerEnabled ? gtmResult : undefined,
  };
}
