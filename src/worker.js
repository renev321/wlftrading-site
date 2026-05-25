export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/check-access" && request.method === "POST") {
      return checkAccess(request, env);
    }

    if (url.pathname === "/api/health") {
      return Response.json({ ok: true, service: "WLF Trading Worker + D1" });
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

    if (!env.DB) {
      return Response.json({
        active: false,
        reason: "D1 database binding DB is missing"
      }, { status: 500 });
    }

    const student = await env.DB
      .prepare(`
        SELECT
          email,
          name,
          status,
          course_access,
          expires_at
        FROM students
        WHERE lower(email) = lower(?)
        LIMIT 1
      `)
      .bind(email)
      .first();

    if (!student) {
      return Response.json({
        active: false,
        email,
        reason: "Email not found"
      });
    }

    const isActiveStatus = String(student.status || "").toLowerCase() === "active";
    const hasCourseAccess = Number(student.course_access || 0) === 1;
    const isNotExpired = !student.expires_at || new Date(student.expires_at + "T23:59:59Z") >= new Date();

    const active = isActiveStatus && hasCourseAccess && isNotExpired;

    return Response.json({
      active,
      email: student.email,
      name: student.name || "",
      status: student.status,
      course_access: hasCourseAccess,
      expires_at: student.expires_at || null
    });
  } catch (error) {
    return Response.json({
      active: false,
      reason: "Invalid request or database error",
      detail: String(error?.message || error)
    }, { status: 500 });
  }
}
