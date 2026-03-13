# Fixing Instant Match "Book Now" Production 404 Error

## Steps to Complete:

### 1. [ ] Update MatchModal.tsx

- Add `useNavigate` import from react-router-dom
- Replace 2x `window.location.href` with `navigate()` in handleBookNow and handleBookWithAdjustedTime

### 2. [ ] Update InstantMatchResultPage.tsx

- Add `useNavigate` import (already has it)
- Replace `window.location.href` with `navigate()` in handleBookNow

### 3. [ ] Check vite.config.ts

- Verify `base: '/'` setting

### 4. [ ] Test Locally

- `bun run dev`
- Trigger Instant Match -> Book Now
- Verify navigates to /booking with correct query params and isInstantMatch=true pre-fills form

### 5. [ ] Deploy & Test Production

- Build: `bun run build`
- Deploy to production server
- Test end-to-end flow

### 6. ✅ Add Server SPA Config

**Netlify**: Created `public/_redirects` with:

```
/*    /index.html   200
```

**Deploy**: After `bun run build`, upload `dist/` folder to Netlify. All routes (including deep links like `/customer/dashboard`) will now work on refresh!

**Vercel alternative** (if switching):

```json
// vercel.json
{ "rewrites": [{ "source": "/*", "destination": "/index.html" }] }
```

## Status: Client-side fixes complete ✅

Next: Test locally with `bun run dev`, then deploy to production.
