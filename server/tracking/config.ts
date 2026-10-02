/**
 * MINDSET Psychotherapy & Counseling Center
 * Server-Side Tracking Configuration
 * 
 * STRICT PRIVACY & SECURITY RULES:
 * - Credentials reside exclusively on the server.
 * - Never expose credentials with VITE_ or public prefixes.
 * - Never send client session credentials or private notes.
 */

export interface TrackingConfig {
  metaPixelId: string;
  metaCapiAccessToken: string;
  gtmServerContainerUrl: string;
  gtmServerSecret: string;
  metaTestEventCode?: string;
  graphApiVersion: string;
  isCapiEnabled: boolean;
  isGtmServerEnabled: boolean;
}

export function getTrackingConfig(): TrackingConfig {
  const metaPixelId = process.env.META_PIXEL_ID?.trim() || "";
  const metaCapiAccessToken = process.env.META_CAPI_ACCESS_TOKEN?.trim() || "";
  const gtmServerContainerUrl = process.env.GTM_SERVER_CONTAINER_URL?.trim() || "";
  const gtmServerSecret = process.env.GTM_SERVER_SECRET?.trim() || "";
  const metaTestEventCode = process.env.META_TEST_EVENT_CODE?.trim() || undefined;

  return {
    metaPixelId,
    metaCapiAccessToken,
    gtmServerContainerUrl,
    gtmServerSecret,
    metaTestEventCode,
    graphApiVersion: "v19.0",
    isCapiEnabled: Boolean(metaPixelId && metaCapiAccessToken),
    isGtmServerEnabled: Boolean(gtmServerContainerUrl),
  };
}
