/**
 * MINDSET Psychotherapy & Counseling Center
 * Meta Conversions API (CAPI) Integration
 * 
 * Direct server-to-server event reporting to Meta Graph API.
 * Ensures consistent event_id for client/server deduplication.
 */

import { getTrackingConfig } from "./config";
import { ServerTrackingPayload, mapToMetaEventName } from "./events";

export interface MetaCapiResponse {
  success: boolean;
  events_received?: number;
  fbtrace_id?: string;
  error?: string;
}

/**
 * Sends one or more events to Meta Conversions API
 */
export async function sendToMetaCapi(
  payload: ServerTrackingPayload
): Promise<MetaCapiResponse> {
  const config = getTrackingConfig();

  if (!config.isCapiEnabled) {
    // Graceful no-op when credentials are not yet configured in environment
    return {
      success: true,
      events_received: 0,
      error: "META_PIXEL_ID or META_CAPI_ACCESS_TOKEN not configured in environment.",
    };
  }

  const endpoint = `https://graph.facebook.com/${config.graphApiVersion}/${config.metaPixelId}/events`;

  // Standard Meta event format
  const metaEvent = {
    event_name: mapToMetaEventName(payload.event_name),
    event_time: payload.event_time,
    event_id: payload.event_id,
    event_source_url: payload.event_source_url || "https://mindsetbd.com",
    action_source: payload.action_source,
    user_data: payload.user_data,
    custom_data: {
      ...payload.custom_data,
      mindset_original_event: payload.event_name,
    },
  };

  const bodyData: Record<string, unknown> = {
    data: [metaEvent],
    access_token: config.metaCapiAccessToken,
  };

  if (config.metaTestEventCode) {
    bodyData.test_event_code = config.metaTestEventCode;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    const result = await response.json() as Record<string, unknown>;

    if (!response.ok) {
      const errorMsg =
        typeof result.error === "object" && result.error !== null
          ? (result.error as { message?: string }).message || "Meta API error"
          : "Meta CAPI request failed";
      console.warn("[Meta CAPI Error]", errorMsg);
      return {
        success: false,
        error: errorMsg,
      };
    }

    return {
      success: true,
      events_received: typeof result.events_received === "number" ? result.events_received : 1,
      fbtrace_id: typeof result.fbtrace_id === "string" ? result.fbtrace_id : undefined,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn("[Meta CAPI Network Exception]", message);
    return {
      success: false,
      error: message,
    };
  }
}
