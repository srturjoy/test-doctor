/**
 * Cloudflare Pages Function: GET /api/health
 * Production health check endpoint
 */

export async function onRequestGet() {
  return new Response(
    JSON.stringify({
      status: "ok",
      service: "MINDSET Psychotherapy Center",
      runtime: "Cloudflare Pages",
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
