# Pathway v0.3 · Quiet by Design

## Changes
- Replaced crowded homepage dashboard with one calming welcome and a single primary writing interaction.
- Added **Thought Sanctuary**: optional personal notes, saved locally, without automatic AI analysis.
- Added a quiet **World Letter / 世界来信** section with three *explicitly illustrative* editorial cards and expandable interpretations.
- Personalized greeting, passport summary, exploration direction and region from existing local profile.
- Moved extra actions behind a deliberate disclosure; preserved Explore, Growth, Passport, Chat and JD demo.
- Reduced chat quick-action prompts to one optional conversation starter.
- Updated desktop sidebar and mobile navigation to include the brief.

## Important limitations
- News cards are **not live**, and are **not actual sourced news**. Never present them as verified market updates. Production requires a licensed feed, timestamps, original links, verification, deduplication, and source-grounded summarization.
- Notes and passport data use browser `localStorage`, not Supabase. They may be lost if browser storage is cleared and are not suitable for sensitive information on shared devices.
- AI conversation uses the existing Netlify function and falls back to a marked demo response if unconfigured.
- No Rork app changes or Supabase sync are included in this UI iteration.

## Deploy
1. Replace the previous project with this folder's contents, or merge `src/App.tsx` and `src/styles.css`.
2. Run `npm install` and `npm run build` locally.
3. Push to GitHub; Netlify should deploy using `npm run build` and `dist`.
