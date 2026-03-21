# 💍 Wedding Invitation Website

A beautiful, responsive wedding invitation website built with **React + Vite**. Features a full RSVP form that submits to Google Sheets via Google Apps Script with zero third-party services or subscriptions.

---

## ✨ Features

- Elegant, fully responsive design (CSS Custom Properties, no CSS frameworks)
- Google Fonts: Playfair Display (serif) + Lato (sans-serif)
- Sticky header with mobile hamburger menu
- Hero section with couple names, wedding date, and location
- Details section: Ceremony, Reception, Accommodation cards
- RSVP form → Google Sheets via Apps Script
- Photo gallery placeholder (ready for Google Drive images)
- Graceful degradation when `VITE_GOOGLE_SCRIPT_URL` is not set

---

## �� Local Development

### Prerequisites
- Node.js 18+ and npm

### Setup

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd wedding

# 2. Install dependencies
npm install

# 3. Copy the environment example and fill in your values
cp .env.example .env

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> **Tip:** The site works without `VITE_GOOGLE_SCRIPT_URL` set — the RSVP form will show a dev-mode notice and simulate a successful submission.

---

## 📋 Customisation Checklist

Search the source files for these placeholders and replace them:

| Placeholder | Where to replace |
|---|---|
| `Alice` | `Header.jsx`, `Hero.jsx`, `Footer.jsx` |
| `Johnny` | `Header.jsx`, `Hero.jsx`, `Footer.jsx` |
| `[Venue Name]` | `Details.jsx` |
| `[Address]` | `Details.jsx` |
| `[Reception Venue]` | `Details.jsx` |
| `[Hotel Name]` | `Details.jsx` |
| `[WEDDING CODE]` | `Details.jsx` |

---

## 🔧 Google Apps Script Backend Setup

The RSVP form posts data to a Google Apps Script Web App, which writes each response to a Google Sheet.

### Step 1 – Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Name the first tab **RSVPs** (or keep it as-is; the script will create the tab automatically).
3. Copy the **Sheet ID** from the URL:  
   `https://docs.google.com/spreadsheets/d/**SHEET_ID**/edit`

### Step 2 – Create the Apps Script

1. Go to [script.google.com](https://script.google.com) and click **New project**.
2. Delete the default code and paste the entire contents of `google-apps-script/Code.gs`.
3. Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your Sheet ID from Step 1.
4. Click **Save** (💾) and give the project a name (e.g., "Wedding RSVP").

### Step 3 – Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Select type: **Web app**.
3. Set:
   - **Description:** `Wedding RSVP v1`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
4. Click **Deploy** and authorise the app when prompted.
5. Copy the **Web app URL** — it looks like:  
   `https://script.google.com/macros/s/AKfyc.../exec`

### Step 4 – Add the URL to your project

```bash
# In your .env file:
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

> **Note:** Every time you modify `Code.gs`, create a **new deployment version** (Deploy → Manage deployments → Edit → New version). The URL stays the same.

---

## 🏗 Production Build

```bash
npm run build
```

This outputs a fully static site to the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deploying on GoDaddy (Custom Domain)

GoDaddy hosting serves static files — perfect for this site.

### Option A – cPanel File Manager (simplest)

1. Run `npm run build` locally to generate the `dist/` folder.
2. Log in to your GoDaddy account → **My Products → Web Hosting → Manage**.
3. Open **cPanel → File Manager**.
4. Navigate to `public_html` (or the folder for your domain/subdomain).
5. Upload **all files from `dist/`** directly into `public_html`.
6. Ensure `index.html` is at the root of `public_html`.

### Option B – FTP/SFTP

1. In cPanel, note your FTP hostname, username, and password.
2. Use a client like [FileZilla](https://filezilla-project.org/).
3. Connect and upload the contents of `dist/` to `public_html`.

### Option C – GitHub Actions (CI/CD)

Set up a workflow to build from `main` and publish to a protected `production` branch:

```yaml
# .github/workflows/deploy-main-to-production.yml
name: Deploy main to production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
        with:
          ref: main
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
        env:
          VITE_GOOGLE_SCRIPT_URL: ${{ secrets.VITE_GOOGLE_SCRIPT_URL }}
      - name: Publish to production branch
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_branch: production
          publish_dir: ./docs
```

Add `VITE_GOOGLE_SCRIPT_URL` to repository secrets, then set:
- GitHub Pages source branch to `production` (root `/`)
- Branch protection on `production` so direct pushes are blocked
- Environment `production` reviewers for manual approval before deploy

### SPA Routing (important!)

If you add client-side routing later, create a `.htaccess` file in `public_html`:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

---

## 📁 Project Structure

```
wedding/
├── src/
│   ├── components/
│   │   ├── Header.jsx / Header.module.css
│   │   ├── Hero.jsx   / Hero.module.css
│   │   ├── Details.jsx / Details.module.css
│   │   ├── RSVP.jsx   / RSVP.module.css
│   │   ├── Gallery.jsx / Gallery.module.css
│   │   └── Footer.jsx / Footer.module.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css          ← global styles + CSS variables
├── google-apps-script/
│   └── Code.gs            ← backend (deploy separately)
├── .env.example
├── vite.config.js
└── README.md
```

---

## 📜 License

Personal use — all rights reserved.
