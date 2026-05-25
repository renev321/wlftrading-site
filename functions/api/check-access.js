// Cloudflare Pages Function
// Path: /api/check-access
//
// Set an environment variable in Cloudflare Pages:
// ALLOWED_EMAILS=student1@gmail.com,student2@gmail.com,rene@gmail.com
//
// This is a simple first version. Google Drive should also be restricted to the same emails.

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();

    const allowedEmails = String(env.ALLOWED_EMAILS || "")
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);

    const active = allowedEmails.includes(email);

    return Response.json({ active });
  } catch (error) {
    return Response.json({ active: false, error: "Invalid request" }, { status: 400 });
  }
}
