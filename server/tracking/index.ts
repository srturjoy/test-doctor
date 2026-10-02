/**
 * MINDSET Psychotherapy & Counseling Center
 * Server-Side Tracking Module Root
 * 
 * Secure, server-only tracking layer.
 * Coordinates Meta CAPI & GTM Server-Side Container.
 */

import type { Request, Response } from "express";
import { getTrackingConfig } from "./config";
import { processServerEvent, IncomingEventRequest } from "./serverEvents";
import { sanitizeCustomData, hashUserData } from "./events";

export * from "./config";
export * from "./events";
export * from "./metaCapi";
export * from "./serverEvents";

/**
 * Express Route Handler for incoming client-side tracking dispatches:
 * POST /api/tracking/event
 */
export async function handleTrackingApiRequest(req: Request, res: Response) {
  try {
    const { event_name, event_id, event_source_url, user_data, custom_data } = req.body || {};

    if (!event_name || !event_id) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: event_name and event_id are mandatory.",
      });
    }

    // Extract client IP and user agent from Express request
    const forwarded = req.headers["x-forwarded-for"];
    const client_ip = Array.isArray(forwarded)
      ? forwarded[0]
      : typeof forwarded === "string"
      ? forwarded.split(",")[0].trim()
      : req.socket.remoteAddress;

    const client_user_agent = req.headers["user-agent"] || "";

    const eventPayload: IncomingEventRequest = {
      event_name,
      event_id,
      event_source_url: event_source_url || (req.headers.referer as string) || undefined,
      user_data: user_data || {},
      custom_data: custom_data || {},
      client_ip: client_ip || undefined,
      client_user_agent,
    };

    const result = await processServerEvent(eventPayload);

    return res.status(200).json({
      success: true,
      event_id: result.eventId,
      deduplicated: result.deduplicated,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal tracking error";
    return res.status(500).json({
      success: false,
      error: msg,
    });
  }
}

/**
 * Status check endpoint (does NOT leak tokens or credentials)
 * GET /api/tracking/status
 */
export function getTrackingStatus(req: Request, res: Response) {
  const config = getTrackingConfig();
  return res.json({
    status: "active",
    capi_configured: config.isCapiEnabled,
    gtm_server_configured: config.isGtmServerEnabled,
    timestamp: new Date().toISOString(),
  });
}
