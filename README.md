# Wedding Site (Private)

Private wedding invitation website built with React + Vite.

## Run locally

Prerequisites:
- Node.js 18+
- npm

Setup:

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173`.

## Build locally

```bash
npm run build
npm run preview
```

## Access gate passphrase setup

The invitation now validates the access answer through the same Google Apps Script URL (`VITE_GOOGLE_SCRIPT_URL`), so no passphrase list is stored in frontend code or env files.

In your Google Sheet, create a new tab named `Passphrases` with:
- `A1`: `Passphrase`
- `A2+`: one accepted answer per row (for example: `nana`, `mimi`)

The gate accepts `Hi, <answer>!` formatting from guests and normalizes it before validation.
