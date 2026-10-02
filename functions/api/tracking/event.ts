/**
 * Cloudflare Pages Function: POST /api/tracking/event
 * Secure, edge-native server-side tracking dispatcher.
 * Coordinates Meta Conversions API (CAPI) and GTM Server-Side Container.
 * Enforces strict psychotherapy clinical ethics and patient privacy.
 */

interface Env {
  META_PIXEL_ID?: string;
  META_CAPI_ACCESS_TOKEN?: string;
  META_TEST_EVENT_CODE?: string;
  GTM_SERVER_CONTAINER_URL?: string;
  GTM_SERVER_SECRET?: string;
}

// Strict psychotherapy privacy rules: forbid clinical notes and sensitive keywords
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

async function sha256(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(value.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function normalizePhone(phone: string): string {
  let cleaned = phone.replace(/[^0-9]/g, "");
  if (cleaned.startsWith("01") && cleaned.length === 11) {
    cleaned = `88${cleaned}`;
  }
  return cleaned;
}

function sanitizeCustomData(data?: Record<string, unknown>): Record<string, unknown> {
  if (!data || typeof data !== "object") {
    return {
      service_category: "Psychotherapy & Counseling",
      currency: "BDT",
    };
  }

  const clean: Record<string, unknown> = {
    service_category: "Psychotherapy & Counseling",
    currency: "BDT",
  };

  for (const [key, val] of Object.entries(data)) {
    const lowerKey = key.toLowerCase();
    if (FORBIDDEN_SENSITIVE_KEYS.has(lowerKey)) {
      continue;
    }
    if (typeof val === "string") {
      if (val.length > 120) continue;
      clean[key] = val;
    } else if (typeof val === "number" || typeof val === "boolean") {
      clean[key] = val;
    }
  }

  return clean;
}

function mapToMetaEventName(eventName: string): string {
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
      return "Contact";
    case "AppointmentStart":
      return "InitiateCheckout";
    default:
      return eventName;
  }
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const body = (await context.request.json().catch(() => ({}))) as Record<string, unknown>;
    const { event_name, event_id, event_source_url, user_data, custom_data } = body || {};

    if (!event_name || !event_id) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields: event_name and event_id are mandatory.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const clientIp = context.request.headers.get("cf-connecting-ip") ||
      context.request.headers.get("x-forwarded-for") || undefined;
    const clientUserAgent = context.request.headers.get("user-agent") || undefined;

    // Hash user identity data safely using Web Crypto
    const rawUser = (user_data && typeof user_data === "object" ? user_data : {}) as Record<string, string>;
    const hashedUser: Record<string, unknown> = {};

    if (rawUser.email && typeof rawUser.email === "string" && rawUser.email.trim()) {
      hashedUser.em = [await sha256(rawUser.email)];
    }

    if (rawUser.phone && typeof rawUser.phone === "string" && rawUser.phone.trim()) {
      const norm = normalizePhone(rawUser.phone);
      if (norm) {
        hashedUser.ph = [await sha256(norm)];
      }
    }

    if (rawUser.firstName && typeof rawUser.firstName === "string" && rawUser.firstName.trim()) {
      hashedUser.fn = [await sha256(rawUser.firstName)];
    }

    if (clientIp) {
      hashedUser.client_ip_address = clientIp;
    }
    if (clientUserAgent) {
      hashedUser.client_user_agent = clientUserAgent;
    }

    const safeCustom = sanitizeCustomData(custom_data as Record<string, unknown>);

    // Concurrently forward to Meta CAPI and GTM Server if environment variables are configured
    const metaPixelId = context.env.META_PIXEL_ID?.trim();
    const metaCapiToken = context.env.META_CAPI_ACCESS_TOKEN?.trim();
    const gtmServerUrl = context.env.GTM_SERVER_CONTAINER_URL?.trim();

    const dispatchPromises: Promise<unknown>[] = [];

    // 1. Meta CAPI
    if (metaPixelId && metaCapiToken) {
      const metaPayload: Record<string, unknown> = {
        data: [
          {
            event_name: mapToMetaEventName(String(event_name)),
            event_time: Math.floor(Date.now() / 1000),
            event_id: String(event_id),
            event_source_url: String(event_source_url || context.request.url || "https://mindsetbd.com"),
            action_source: "website",
            user_data: hashedUser,
            custom_data: {
              ...safeCustom,
              mindset_original_event: String(event_name),
            },
          },
        ],
        access_token: metaCapiToken,
      };

      if (context.env.META_TEST_EVENT_CODE) {
        metaPayload.test_event_code = context.env.META_TEST_EVENT_CODE.trim();
      }

      dispatchPromises.push(
        fetch(`https://graph.facebook.com/v19.0/${metaPixelId}/events`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(metaPayload),
        }).catch((err) => {
          console.warn("[Cloudflare Pages Meta CAPI Dispatch Notice]:", err);
        })
      );
    }

    // 2. GTM Server-Side Container
    if (gtmServerUrl) {
      try {
        const gtmEndpoint = new URL("/mp/collect", gtmServerUrl).toString();
        const gtmHeaders: Record<string, string> = {
          "Content-Type": "application/json",
          "User-Agent": clientUserAgent || "MINDSET-Edge-Tracker",
        };
        if (context.env.GTM_SERVER_SECRET) {
          gtmHeaders["x-gtm-server-preview"] = context.env.GTM_SERVER_SECRET.trim();
        }

        dispatchPromises.push(
          fetch(gtmEndpoint, {
            method: "POST",
            headers: gtmHeaders,
            body: JSON.stringify({
              event_name: String(event_name),
              event_id: String(event_id),
              event_time: Math.floor(Date.now() / 1000),
              user_data: hashedUser,
              custom_data: safeCustom,
            }),
          }).catch((err) => {
            console.warn("[Cloudflare Pages GTM Dispatch Notice]:", err);
          })
        );
      } catch {
        // Ignore URL parse error
      }
    }

    if (dispatchPromises.length > 0) {
      await Promise.all(dispatchPromises);
    }

    return new Response(
      JSON.stringify({
        success: true,
        event_id: String(event_id),
        deduplicated: false,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal tracking error";
    return new Response(
      JSON.stringify({
        success: false,
        error: msg,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
