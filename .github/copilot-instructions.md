# Copilot Instructions — Wedding Website

## Project Overview

This is Alice & Johnny's wedding website built with **React + Vite**, deployed via **GitHub Pages** to **www.aliceandjohnnywedding.com**. The site serves as the single source of truth for wedding guests — it must be polished, clear, and professional at all times.

### 🎯 Primary Goal

The website must **look and work beautifully on both desktop and mobile**. Most guests will view it on their **iPhone**, so mobile experience is the top priority. Every feature, layout change, and design decision must be verified at mobile widths (375px–428px) before it's considered done.

---

## Non-Negotiable Rules

1. **Never break the deployed website.** Production is live at www.aliceandjohnnywedding.com. Any change that could break it must be tested thoroughly before merging.
2. **Do not change primary color choices** unless explicitly approved.
3. **Do not swap or remove image assets** unless explicitly approved.
4. **Do not break RSVP backend connectivity.** The RSVP form submits to a Google Apps Script endpoint — this must always work.
5. **Mobile-first mindset.** All UI changes must be tested at iPhone widths (375px, 390px, 428px). Include breakpoints for small phones (380px) and standard mobile (640px–680px).
6. **After any change, run `npm run build`** to verify the build passes before committing.

---

## Branching & Workflow

### Adding a New Feature or Making Changes
1. **Create a branch off `main`** with a descriptive name (e.g., `feature/timeline-redesign`)
2. Make changes and **commit incrementally** as you go — each commit should be meaningful
3. **Do NOT merge to `main`** until the user has reviewed and approved
4. After approval, merge the branch to `main`
5. Delete the merged branch (local + remote)

### Deploying to Production
1. Ensure all changes are merged to `main` and the build is clean
2. Rebuild docs if needed:
   ```bash
   npm run build
   git add docs
   git commit -m "Rebuild docs for production"
   git push origin main
   ```
3. Use the **deploy workflow** (`.github/workflows/deploy-main-to-production.yml`):
   - Trigger: push to `main` or manual workflow_dispatch
   - Requires **production environment approval**
   - Workflow builds with `npm run build`, then force-syncs `main` → `production` branch
4. GitHub Pages serves the `production` branch from `/docs` directory

### ⚠️ Critical Deployment Notes
- The `docs/` directory is **committed to the repo** — GitHub Pages serves it directly from the `production` branch
- Changing a GitHub secret alone is NOT enough if `docs/` still contains old build artifacts
- **Always rebuild and commit `docs/` before deploying** when env-injected values change (e.g., `VITE_GOOGLE_SCRIPT_URL`)
- The production branch should ONLY be updated via the deploy workflow — never push directly to it

---

## Architecture

### Tech Stack
- **Framework:** React 19 + Vite 8
- **Styling:** CSS Modules (`.module.css` per component)
- **Deployment:** GitHub Pages (production branch, /docs path)
- **Domain:** www.aliceandjohnnywedding.com (CNAME)
- **Backend:** Google Apps Script (RSVP form → Google Sheets)

### Project Structure
```
src/
  App.jsx                    # Main app with section ordering & access gate
  index.css                  # Global styles, CSS custom properties
  components/
    AccessGate.jsx           # Passphrase-protected entry gate
    Header.jsx               # Fixed nav with hamburger menu + RSVP CTA
    Hero.jsx                 # Full-height hero with background image
    BookingInstructions.jsx  # Hotel booking info
    GettingThere.jsx         # Travel steps (static cards)
    DressCode.jsx            # Style guide with inspiration images
    Details.jsx              # Wedding Weekend Schedule (foldable cards with timeline)
    OurStory.jsx             # Relationship timeline (winding roadmap)
    RSVP.jsx                 # RSVP form with Google Sheets integration
    Footer.jsx               # Dark footer with couple info
```

### Section Order (in App.jsx)
Hero → BookingInstructions → GettingThere → DressCode → Details → OurStory → RSVP → Footer

### Design System
- **Fonts:** Playfair Display (serif headings), Lato (sans body)
- **Colors:** Cream (#f2efe8), Blush (#f3d7dc), Gold (#b8c46a), Text (#4b4439)
- **Card style:** 20px border-radius, gold-tinted borders, subtle gradients
- **Content max-width:** 740px for most sections
- **Spacing scale:** 8px, 12px, 16px, 20px, 24px, 28px, 32px

### RSVP Backend Contract
- Frontend reads `VITE_GOOGLE_SCRIPT_URL` from environment
- Local dev uses `.env` (gitignored); production uses build-time injection
- Submit uses GET request to Apps Script `/exec` with query params
- Required fields: `name`, `email`, `attendance`, `guests`, `arrivalDate`, `dietary`, `source`

---

## Style Guidelines

- **Border-radius:** 20px for cards, 16px for images, 12px on mobile
- **Gaps:** 20px for card stacks, 16px for inner content
- **Padding:** 28px for cards (desktop), 20px (mobile), 16px (small phones)
- **Sections use `min-height: 100vh` with `display: flex; align-items: center`**
- All interactive elements need `cursor: pointer`, `:focus-visible` styles, and proper `aria-*` attributes
- Use CSS `clamp()` for responsive typography where possible

---

## Required Checks Before Closing Any Task

- [ ] `npm run build` passes with no errors
- [ ] Changes look correct at desktop width (1200px+)
- [ ] Changes look correct at iPhone width (375px–428px)
- [ ] RSVP form still submits correctly (if touching RSVP or env config)
- [ ] No accidental edits to colors/images unless explicitly requested
- [ ] No deployment triggered unless user explicitly asks
