/**
 * Cloudflare Pages Function: GET /api/tracking/status
 * Safe tracking status endpoint without leaking credentials
 */

interface Env {
  META_PIXEL_ID?: string;
  META_CAPI_ACCESS_TOKEN?: string;
  GTM_SERVER_CONTAINER_URL?: string;
}

export async function onRequestGet(context: { env: Env }) {
  const metaPixelId = context.env.META_PIXEL_ID?.trim() || "";
  const metaCapiAccessToken = context.env.META_CAPI_ACCESS_TOKEN?.trim() || "";
  const gtmServerContainerUrl = context.env.GTM_SERVER_CONTAINER_URL?.trim() || "";

  return new Response(
    JSON.stringify({
      status: "active",
      runtime: "Cloudflare Pages Function",
      capi_configured: Boolean(metaPixelId && metaCapiAccessToken),
      gtm_server_configured: Boolean(gtmServerContainerUrl),
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    }
  );
}
