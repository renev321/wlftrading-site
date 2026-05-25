# WLF Trading Academy - Cloudflare Pages Starter

This is a first project structure for `wlftrading.com`.

## Pages included

- `/index.html` - Public welcome/sales page
- `/login.html` - Login with Google/Facebook
- `/dashboard.html` - Private course area
- `/denied.html` - Access not active page
- `/terms.html` - Disclaimer/terms page
- `/functions/api/check-access.js` - Cloudflare Pages Function to validate active emails

## Assets included

- `/assets/logo-wlf.png`
- `/assets/wlf-hero.jpeg`

## How access works

1. Student logs in with Google or Facebook.
2. The site gets their email from Firebase Auth.
3. The site calls `/api/check-access`.
4. Cloudflare checks if the email exists in the `ALLOWED_EMAILS` environment variable.
5. If active, the student sees the dashboard and private Google Drive links.

## Important security note

This first version hides the course dashboard, but Google Drive must also be restricted to the same Gmail accounts.
Do not use public Google Drive links for paid course videos.

## Setup steps

### 1. Upload to Cloudflare Pages

Recommended for this version: upload the full folder or push it to GitHub.

### 2. Create Firebase project

Go to Firebase Console and create a project.

Enable:

- Authentication > Google
- Authentication > Facebook, optional

Create a Web App and copy the Firebase config.

Paste it in:

`/js/config.js`

### 3. Add authorized domains in Firebase

Add:

- `wlftrading.com`
- `www.wlftrading.com`
- your Cloudflare Pages preview domain, for example `wlftrading.pages.dev`

### 4. Add Cloudflare environment variable

In Cloudflare Pages:

`Settings > Environment variables`

Add:

`ALLOWED_EMAILS`

Example:

`rene@gmail.com,student1@gmail.com,student2@gmail.com`

Redeploy the project after adding/updating environment variables.

### 5. Add Google Drive links

Edit:

`/js/config.js`

Replace:

`PASTE_GOOGLE_DRIVE_LINK_HERE`

with your private Drive video/folder links.

## Suggested next upgrade

Use Cloudflare D1 or Supabase instead of `ALLOWED_EMAILS` when you have many students.
