// SSE Proxy - connects to receiver with Cloudflare service token (server-side)
// Browser connects here (same origin, no CORS/auth issues)

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  // Server-side only - no NEXT_PUBLIC_ prefix needed
  const eventsUrl = process.env.VIBE_EVENTS_URL;
  const eventsToken = process.env.VIBE_EVENTS_TOKEN;
  
  // Server-side only: Cloudflare service token
  const cfClientId = process.env.CF_ACCESS_CLIENT_ID;
  const cfClientSecret = process.env.CF_ACCESS_CLIENT_SECRET;

  // Debug: log what env vars are present (not values, just presence)
  console.log("[SSE Proxy] Config check:", {
    hasEventsUrl: !!eventsUrl,
    hasEventsToken: !!eventsToken,
    hasCfClientId: !!cfClientId,
    hasCfClientSecret: !!cfClientSecret,
  });

  if (!eventsUrl || !eventsToken) {
    return new Response(JSON.stringify({ 
      error: "Missing events config",
      debug: { hasEventsUrl: !!eventsUrl, hasEventsToken: !!eventsToken }
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const url = `${eventsUrl}/events?token=${encodeURIComponent(eventsToken)}`;

  // Build headers with Cloudflare service token
  const headers: Record<string, string> = {};
  if (cfClientId && cfClientSecret) {
    headers["CF-Access-Client-Id"] = cfClientId;
    headers["CF-Access-Client-Secret"] = cfClientSecret;
    console.log("[SSE Proxy] Using CF Access headers");
  } else {
    console.log("[SSE Proxy] WARNING: CF Access headers NOT set");
  }

  try {
    // Connect to receiver
    console.log("[SSE Proxy] Connecting to:", eventsUrl);
    const response = await fetch(url, {
      headers,
      cache: "no-store",
    });

    console.log("[SSE Proxy] Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error("[SSE Proxy] Upstream error:", response.status, errorText.substring(0, 200));
      return new Response(JSON.stringify({ 
        error: `Upstream error: ${response.status}`,
        hint: response.status === 403 ? "Cloudflare Access denied - check service token" : undefined,
        cfHeadersSent: !!(cfClientId && cfClientSecret),
      }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Stream the response to the client
    const stream = response.body;
    
    if (!stream) {
      return new Response(JSON.stringify({ error: "No stream from upstream" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return SSE stream to browser
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("[SSE Proxy] Connection error:", error);
    return new Response(JSON.stringify({ error: "Failed to connect to receiver" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}
