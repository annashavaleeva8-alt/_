import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { page, referrer } = await req.json();

    // Get visitor IP from headers
    const forwarded = req.headers.get("x-forwarded-for");
    const visitorIp = forwarded ? forwarded.split(",")[0].trim() : "unknown";
    const userAgent = req.headers.get("user-agent") || "";

    // Try to get geolocation from IP
    let city = null;
    let country = null;
    try {
      if (visitorIp && visitorIp !== "unknown") {
        const geoRes = await fetch(`http://ip-api.com/json/${visitorIp}?fields=city,country`);
        if (geoRes.ok) {
          const geo = await geoRes.json();
          city = geo.city || null;
          country = geo.country || null;
        }
      }
    } catch {
      // Geo lookup failed, continue without it
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabase.from("site_visits").insert({
      visitor_ip: visitorIp,
      city,
      country,
      referrer: referrer || null,
      page: page || "/",
      user_agent: userAgent,
    });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
