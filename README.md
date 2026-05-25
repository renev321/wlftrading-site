# WLF Trading Academy - Worker v2

This is the correct Cloudflare Worker structure for:

- Static website
- Login page
- Course dashboard
- API email validation at `/api/check-access`

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

wrangler.jsonc
```

## Cloudflare settings

Because this is now a Worker with static assets, keep:

- Build command: empty or `exit 0`
- Deploy command: `npx wrangler deploy`
- Root/path: `/`

## Required Cloudflare environment variable

Go to:

Workers & Pages > wlftrading-site > Settings > Variables and secrets

Add:

```text
ALLOWED_EMAILS
```

Example value:

```text
rene@gmail.com,student1@gmail.com,student2@gmail.com
```

Redeploy after changing variables.

## Firebase setup

Edit:

```text
public/js/config.js
```

Replace the placeholder Firebase config with your real Firebase Web App config.

Enable in Firebase:

- Authentication > Sign-in method > Google
- Optional: Facebook

Add authorized domains:

- wlftrading.com
- www.wlftrading.com
- your workers.dev domain

## Google Drive links

Edit:

```text
public/js/config.js
```

Replace each `PASTE_GOOGLE_DRIVE_LINK_HERE` with your Google Drive lesson video links.

Keep Google Drive videos restricted to the same Gmail accounts you activate in `ALLOWED_EMAILS`.
