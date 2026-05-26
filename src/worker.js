const FIREBASE_PROJECT_ID = "wlftrading-site";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/check-access" && request.method === "POST") {
      return checkAccess(request, env);
    }

    if (url.pathname === "/api/admin/me" && request.method === "GET") {
      return handleAdminMe(request, env);
    }

    if (url.pathname === "/api/admin/users" && request.method === "GET") {
      return handleAdminUsers(request, env);
    }

    if (url.pathname === "/api/admin/grant-access" && request.method === "POST") {
      return handleGrantAccess(request, env);
    }

    if (url.pathname === "/api/admin/update-user" && request.method === "POST") {
      return handleUpdateUser(request, env);
    }

    if (url.pathname === "/api/admin/toggle-user" && request.method === "POST") {
      return handleToggleUser(request, env);
    }

    if (url.pathname === "/api/admin/delete-user" && request.method === "POST") {
      return handleDeleteUser(request, env);
    }

    if (url.pathname === "/api/health") {
      return Response.json({ ok: true, service: "WLF Trading Worker + D1" });
    }

    return env.ASSETS.fetch(request);
  }
};

const VIP_BUNDLE_FEATURES = [
  "vip_course",
  "practice",
  "library",
  "audiobooks",
  "coach",
  "community"
];

const ALL_FEATURES = [
  "vip_course",
  "practice",
  "library",
  "audiobooks",
  "coach",
  "community",
  "tools",
  "admin_panel"
];

const ALL_ROLES = [
  "student",
  "admin"
];

function jsonResponse(data, status = 200) {
  return Response.json(data, { status });
}

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

async function handleAdminMe(request, env) {
  try {
    const user = await getFirebaseUserFromRequest(request);
    const isAdmin = await isAdminEmail(env, user.email);

    return jsonResponse({
      email: user.email,
      isAdmin
    });
  } catch (error) {
    return jsonResponse({
      email: null,
      isAdmin: false,
      error: String(error?.message || error)
    }, 401);
  }
}

async function handleAdminUsers(request, env) {
  const admin = await requireAdmin(request, env);
  if (!admin.ok) return admin.response;

  try {
    const students = await env.DB.prepare(`
      SELECT
        email,
        name,
        status,
        course_access,
        expires_at,
        notes,
        created_at,
        updated_at
      FROM students
      ORDER BY created_at DESC
    `).all();

    const access = await env.DB.prepare(`
      SELECT
        email,
        feature_code,
        access_type,
        starts_at,
        expires_at,
        is_active
      FROM user_feature_access
      ORDER BY email, feature_code
    `).all();

    const roles = await env.DB.prepare(`
      SELECT
        email,
        role_code
      FROM user_roles
      WHERE is_active = 1
      ORDER BY email, role_code
    `).all();

    const now = new Date();

    const accessByEmail = new Map();
    for (const item of access.results || []) {
      const key = String(item.email || "").toLowerCase();
      if (!accessByEmail.has(key)) accessByEmail.set(key, []);

      accessByEmail.get(key).push({
        ...item,
        isExpired: item.expires_at ? new Date(item.expires_at + "T23:59:59Z") < now : false
      });
    }

    const rolesByEmail = new Map();
    for (const item of roles.results || []) {
      const key = String(item.email || "").toLowerCase();
      if (!rolesByEmail.has(key)) rolesByEmail.set(key, []);
      rolesByEmail.get(key).push(item.role_code);
    }

    const users = (students.results || []).map((student) => {
      const key = String(student.email || "").toLowerCase();

      return {
        ...student,
        features: accessByEmail.get(key) || [],
        roles: rolesByEmail.get(key) || []
      };
    });

    return jsonResponse({ users });
  } catch (error) {
    return jsonResponse({
      error: "Could not load admin users.",
      detail: String(error?.message || error)
    }, 500);
  }
}

async function handleGrantAccess(request, env) {
  const admin = await requireAdmin(request, env);
  if (!admin.ok) return admin.response;

  try {
    const body = await request.json();

    const email = String(body.email || "").trim().toLowerCase();
    const name = String(body.name || "").trim();
    const featureCode = String(body.feature_code || "").trim();
    const accessType = String(body.access_type || "manual").trim();
    const expiresAt = body.expires_at ? String(body.expires_at).trim() : null;
    const notes = body.notes ? String(body.notes).trim() : null;

    if (!email || !email.includes("@")) {
      return jsonResponse({ error: "Valid email is required." }, 400);
    }

    if (!featureCode) {
      return jsonResponse({ error: "Feature is required." }, 400);
    }

    await upsertStudent(env, {
      email,
      name,
      notes,
      courseAccess: 1,
      status: "active",
      expiresAt: null
    });

    await env.DB.prepare(`
      INSERT OR IGNORE INTO user_roles (email, role_code, assigned_by, notes)
      VALUES (?, 'student', ?, 'Granted from admin panel')
    `).bind(email, admin.email).run();

    const features = featureCode === "vip_bundle"
      ? VIP_BUNDLE_FEATURES
      : [featureCode];

    for (const code of features) {
      await grantFeature(env, {
        email,
        featureCode: code,
        accessType,
        expiresAt,
        adminEmail: admin.email,
        notes
      });
    }

    if (featureCode === "admin_panel") {
      await env.DB.prepare(`
        INSERT OR IGNORE INTO user_roles (email, role_code, assigned_by, notes)
        VALUES (?, 'admin', ?, 'Admin access granted from admin panel')
      `).bind(email, admin.email).run();
    }

    await audit(env, {
      adminEmail: admin.email,
      actionCode: "grant_access",
      targetEmail: email,
      targetFeatureCode: featureCode,
      newValue: JSON.stringify({ accessType, expiresAt, features }),
      notes
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({
      error: "Could not grant access.",
      detail: String(error?.message || error)
    }, 500);
  }
}

async function handleUpdateUser(request, env) {
  const admin = await requireAdmin(request, env);
  if (!admin.ok) return admin.response;

  try {
    const body = await request.json();

    const originalEmail = String(body.original_email || "").trim().toLowerCase();
    const email = String(body.email || "").trim().toLowerCase();
    const name = String(body.name || "").trim();
    const status = String(body.status || "active").trim().toLowerCase();
    const courseAccess = Number(body.course_access || 0) === 1 ? 1 : 0;
    const expiresAt = body.expires_at ? String(body.expires_at).trim() : null;
    const notes = body.notes ? String(body.notes).trim() : null;
    const features = Array.isArray(body.features) ? body.features : [];
    const roles = Array.isArray(body.roles) ? body.roles : [];

    if (!originalEmail || !email || !email.includes("@")) {
      return jsonResponse({ error: "Valid email is required." }, 400);
    }

    if (!["active", "inactive", "disabled"].includes(status)) {
      return jsonResponse({ error: "Invalid status." }, 400);
    }

    await env.DB.prepare(`
      UPDATE students
      SET
        email = ?,
        name = ?,
        status = ?,
        course_access = ?,
        expires_at = ?,
        notes = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE lower(email) = lower(?)
    `).bind(email, name || null, status, courseAccess, expiresAt, notes, originalEmail).run();

    if (originalEmail !== email) {
      await env.DB.prepare(`UPDATE user_roles SET email = ? WHERE lower(email) = lower(?)`)
        .bind(email, originalEmail).run();

      await env.DB.prepare(`UPDATE user_feature_access SET email = ? WHERE lower(email) = lower(?)`)
        .bind(email, originalEmail).run();
    }

    for (const role of ALL_ROLES) {
      const shouldHaveRole = roles.includes(role);

      if (shouldHaveRole) {
        await env.DB.prepare(`
          INSERT INTO user_roles (email, role_code, assigned_by, is_active, notes)
          VALUES (?, ?, ?, 1, 'Updated from admin panel')
          ON CONFLICT(email, role_code) DO UPDATE SET
            is_active = 1,
            assigned_by = excluded.assigned_by,
            assigned_at = datetime('now'),
            notes = excluded.notes
        `).bind(email, role, admin.email).run();
      } else {
        await env.DB.prepare(`
          UPDATE user_roles
          SET is_active = 0
          WHERE lower(email) = lower(?)
            AND role_code = ?
        `).bind(email, role).run();
      }
    }

    for (const featureCode of ALL_FEATURES) {
      const shouldHaveFeature = features.includes(featureCode);

      if (shouldHaveFeature) {
        await grantFeature(env, {
          email,
          featureCode,
          accessType: featureCode === "tools" ? "monthly" : "manual",
          expiresAt: featureCode === "tools" ? expiresAt : null,
          adminEmail: admin.email,
          notes
        });
      } else {
        await env.DB.prepare(`
          UPDATE user_feature_access
          SET
            is_active = 0,
            revoked_at = datetime('now'),
            revoked_by = ?
          WHERE lower(email) = lower(?)
            AND feature_code = ?
        `).bind(admin.email, email, featureCode).run();
      }
    }

    await audit(env, {
      adminEmail: admin.email,
      actionCode: "update_user",
      targetEmail: email,
      newValue: JSON.stringify({ status, courseAccess, expiresAt, features, roles }),
      notes
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({
      error: "Could not update user.",
      detail: String(error?.message || error)
    }, 500);
  }
}

async function handleToggleUser(request, env) {
  const admin = await requireAdmin(request, env);
  if (!admin.ok) return admin.response;

  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const enabled = Boolean(body.enabled);

    if (!email || !email.includes("@")) {
      return jsonResponse({ error: "Valid email is required." }, 400);
    }

    const status = enabled ? "active" : "disabled";
    const courseAccess = enabled ? 1 : 0;

    await env.DB.prepare(`
      UPDATE students
      SET status = ?, course_access = ?, updated_at = CURRENT_TIMESTAMP
      WHERE lower(email) = lower(?)
    `).bind(status, courseAccess, email).run();

    await env.DB.prepare(`
      UPDATE user_feature_access
      SET is_active = ?
      WHERE lower(email) = lower(?)
    `).bind(enabled ? 1 : 0, email).run();

    await audit(env, {
      adminEmail: admin.email,
      actionCode: enabled ? "enable_user" : "disable_user",
      targetEmail: email,
      newValue: JSON.stringify({ status, courseAccess })
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({
      error: "Could not toggle user.",
      detail: String(error?.message || error)
    }, 500);
  }
}

async function handleDeleteUser(request, env) {
  const admin = await requireAdmin(request, env);
  if (!admin.ok) return admin.response;

  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return jsonResponse({ error: "Valid email is required." }, 400);
    }

    if (email === admin.email) {
      return jsonResponse({ error: "You cannot delete your own admin user." }, 400);
    }

    await audit(env, {
      adminEmail: admin.email,
      actionCode: "delete_user",
      targetEmail: email,
      notes: "Deleted from admin panel"
    });

    await env.DB.prepare(`DELETE FROM user_feature_access WHERE lower(email) = lower(?)`).bind(email).run();
    await env.DB.prepare(`DELETE FROM user_roles WHERE lower(email) = lower(?)`).bind(email).run();
    await env.DB.prepare(`DELETE FROM students WHERE lower(email) = lower(?)`).bind(email).run();

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({
      error: "Could not delete user.",
      detail: String(error?.message || error)
    }, 500);
  }
}

async function grantFeature(env, params) {
  await env.DB.prepare(`
    INSERT INTO user_feature_access (
      email,
      feature_code,
      access_type,
      starts_at,
      expires_at,
      is_active,
      granted_by,
      notes
    )
    VALUES (?, ?, ?, datetime('now'), ?, 1, ?, ?)
    ON CONFLICT(email, feature_code) DO UPDATE SET
      access_type = excluded.access_type,
      starts_at = datetime('now'),
      expires_at = excluded.expires_at,
      is_active = 1,
      granted_by = excluded.granted_by,
      granted_at = datetime('now'),
      revoked_at = NULL,
      revoked_by = NULL,
      notes = excluded.notes
  `).bind(
    params.email,
    params.featureCode,
    params.accessType,
    params.expiresAt,
    params.adminEmail,
    params.notes
  ).run();
}

async function upsertStudent(env, student) {
  const existing = await env.DB.prepare(`
    SELECT student_id
    FROM students
    WHERE lower(email) = lower(?)
    LIMIT 1
  `).bind(student.email).first();

  if (existing) {
    await env.DB.prepare(`
      UPDATE students
      SET
        name = CASE
          WHEN ? IS NOT NULL AND ? <> '' THEN ?
          ELSE name
        END,
        status = ?,
        course_access = ?,
        expires_at = ?,
        notes = CASE
          WHEN ? IS NOT NULL AND ? <> '' THEN ?
          ELSE notes
        END,
        updated_at = CURRENT_TIMESTAMP
      WHERE student_id = ?
    `).bind(
      student.name,
      student.name,
      student.name,
      student.status || "active",
      student.courseAccess,
      student.expiresAt,
      student.notes,
      student.notes,
      student.notes,
      existing.student_id
    ).run();

    return;
  }

  await env.DB.prepare(`
    INSERT INTO students (
      email,
      name,
      status,
      course_access,
      expires_at,
      notes,
      created_at,
      updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `).bind(
    student.email,
    student.name || null,
    student.status || "active",
    student.courseAccess,
    student.expiresAt || null,
    student.notes || null
  ).run();
}

async function audit(env, params) {
  await env.DB.prepare(`
    INSERT INTO admin_audit_log (
      admin_email,
      action_code,
      target_email,
      target_feature_code,
      old_value,
      new_value,
      notes
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(
    params.adminEmail,
    params.actionCode,
    params.targetEmail || null,
    params.targetFeatureCode || null,
    params.oldValue || null,
    params.newValue || null,
    params.notes || null
  ).run();
}

async function requireAdmin(request, env) {
  try {
    const user = await getFirebaseUserFromRequest(request);
    const isAdmin = await isAdminEmail(env, user.email);

    if (!isAdmin) {
      return {
        ok: false,
        email: user.email,
        response: jsonResponse({ error: "Admin access required." }, 403)
      };
    }

    return {
      ok: true,
      email: user.email
    };
  } catch (error) {
    return {
      ok: false,
      email: null,
      response: jsonResponse({
        error: "Authentication required.",
        detail: String(error?.message || error)
      }, 401)
    };
  }
}

async function isAdminEmail(env, email) {
  if (!email || !env.DB) return false;

  const role = await env.DB.prepare(`
    SELECT 1
    FROM user_roles
    WHERE lower(email) = lower(?)
      AND role_code = 'admin'
      AND is_active = 1
    LIMIT 1
  `).bind(email).first();

  const panel = await env.DB.prepare(`
    SELECT 1
    FROM user_feature_access
    WHERE lower(email) = lower(?)
      AND feature_code = 'admin_panel'
      AND is_active = 1
      AND datetime(starts_at) <= datetime('now')
      AND (expires_at IS NULL OR datetime(expires_at) > datetime('now'))
    LIMIT 1
  `).bind(email).first();

  return Boolean(role && panel);
}

async function getFirebaseUserFromRequest(request) {
  const authHeader = request.headers.get("Authorization") || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length).trim()
    : "";

  if (!token) {
    throw new Error("Missing Authorization bearer token.");
  }

  const payload = await verifyFirebaseIdToken(token);

  const email = String(payload.email || "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    throw new Error("Firebase token does not include a valid email.");
  }

  return {
    email,
    uid: payload.user_id || payload.sub || "",
    payload
  };
}

async function verifyFirebaseIdToken(token) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT format.");
  }

  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const header = JSON.parse(base64UrlDecodeToString(encodedHeader));
  const payload = JSON.parse(base64UrlDecodeToString(encodedPayload));

  if (!header.kid) {
    throw new Error("Token is missing kid.");
  }

  if (header.alg !== "RS256") {
    throw new Error("Invalid token algorithm.");
  }

  const now = Math.floor(Date.now() / 1000);

  if (!payload.exp || payload.exp <= now) {
    throw new Error("Firebase token expired.");
  }

  if (!payload.iat || payload.iat > now + 60) {
    throw new Error("Invalid token issued-at time.");
  }

  const expectedAud = FIREBASE_PROJECT_ID;
  const expectedIss = `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`;

  if (payload.aud !== expectedAud) {
    throw new Error("Invalid token audience.");
  }

  if (payload.iss !== expectedIss) {
    throw new Error("Invalid token issuer.");
  }

  const jwks = await getFirebaseJwks();
  const jwk = (jwks.keys || []).find((key) => key.kid === header.kid);

  if (!jwk) {
    throw new Error("Firebase public key not found.");
  }

  const key = await crypto.subtle.importKey(
    "jwk",
    jwk,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256"
    },
    false,
    ["verify"]
  );

  const data = new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`);
  const signature = base64UrlDecodeToUint8Array(encodedSignature);

  const valid = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    key,
    signature,
    data
  );

  if (!valid) {
    throw new Error("Invalid Firebase token signature.");
  }

  return payload;
}

async function getFirebaseJwks() {
  const response = await fetch(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com",
    {
      cf: {
        cacheTtl: 3600,
        cacheEverything: true
      }
    }
  );

  if (!response.ok) {
    throw new Error("Could not fetch Firebase public keys.");
  }

  return response.json();
}

function base64UrlDecodeToString(value) {
  const bytes = base64UrlDecodeToUint8Array(value);
  return new TextDecoder().decode(bytes);
}

function base64UrlDecodeToUint8Array(value) {
  let base64 = value.replace(/-/g, "+").replace(/_/g, "/");

  const padding = base64.length % 4;
  if (padding) {
    base64 += "=".repeat(4 - padding);
  }

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}
