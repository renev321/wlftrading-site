# WLF Trading Academy - Worker v3 with Cloudflare D1

This version replaces `ALLOWED_EMAILS` with a Cloudflare D1 database.

## Structure

```text
public/
  index.html
  login.html
  dashboard.html
  denied.html
  terms.html
  assets/
  css/
  js/

src/
  worker.js

migrations/
  0001_create_students.sql
  admin_queries.sql

wrangler.jsonc
```

## Flow

```text
Google login via Firebase
↓
Website sends logged-in email to /api/check-access
↓
Worker checks Cloudflare D1 table: students
↓
If active + course_access = 1 + not expired → dashboard
↓
Otherwise → access pending
```

## Step 1 - Create D1 database in Cloudflare

Cloudflare Dashboard:

```text
Workers & Pages
→ D1 SQL Database
→ Create database
```

Name:

```text
wlftrading_students
```

Copy the Database ID.

## Step 2 - Update wrangler.jsonc

Open:

```text
wrangler.jsonc
```

Replace:

```text
PASTE_YOUR_D1_DATABASE_ID_HERE
```

with your real D1 Database ID.

## Step 3 - Create the students table

In Cloudflare D1 database console:

```text
Workers & Pages
→ D1 SQL Database
→ wlftrading_students
→ Console
```

Copy/paste and run the SQL from:

```text
migrations/0001_create_students.sql
```

## Step 4 - Push to GitHub

In GitHub Desktop:

```text
Summary: Add D1 student access database
Commit to main
Push origin
```

## Add a student

```sql
INSERT INTO students (email, name, status, course_access, expires_at, notes)
VALUES ('student@gmail.com', 'Student Name', 'active', 1, NULL, 'Manual payment confirmed');
```

## Deactivate a student

```sql
UPDATE students
SET status = 'inactive',
    updated_at = CURRENT_TIMESTAMP
WHERE lower(email) = lower('student@gmail.com');
```

## Expiration dates

If `expires_at` is NULL, the access does not expire.

If `expires_at` has a date like `2026-12-31`, the student is active until that date.
