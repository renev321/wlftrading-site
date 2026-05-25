export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/check-access" && request.method === "POST") {
      return checkAccess(request, env);
    }

    if (url.pathname === "/api/health") {
      return Response.json({ ok: true, service: "WLF Trading Worker" });
    }

    return env.ASSETS.fetch(request);
  }
};

async function checkAccess(request, env) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return Response.json({ active: false, reason: "Invalid email" }, { status: 400 });
    }

    const allowedEmails = String(env.ALLOWED_EMAILS || "")
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);

    const active = allowedEmails.includes(email);

    return Response.json({
      active,
      email
    });
  } catch (error) {
    return Response.json({
      active: false,
      reason: "Invalid request"
    }, { status: 400 });
  }
}
