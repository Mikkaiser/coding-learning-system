<!--
# UI/UX Visual Audit — Mikkaiser Coder (Phase 1)

## Design system source of truth
- Primary: #FFFFFF
- Secondary: #FFF694
- Accent: #7B00FF

## Pages

### `/login` (`next-app/app/login/page.tsx`)
- **HIGH**: Primary CTA uses non-brand color (`bg-indigo-*`) and inconsistent focus ring; brand accent should drive primary actions.
- **HIGH**: Inputs/buttons use ad-hoc paddings/heights (`py-2`, `px-3`, etc.) with no shared control sizing scale → inconsistent tap targets.
- **MEDIUM**: Card surface/background use hardcoded hex (`bg-[#111]`, `bg-[#0d0d0d]`) and zinc borders → no token baseline; harder to theme.
- **MEDIUM**: Typographic hierarchy is shallow (`text-lg` heading, `text-sm` body) and inconsistent with other pages (`text-2xl` elsewhere).
- **LOW**: Show/Hide password button has small hit area and weak affordance on mobile.
  - **RESOLVED**: Tokenized with `.card`, `.input`, `.btn` and brand accent primary CTA; improved focus rings and hit target.

### `/challenges` (`next-app/app/challenges/page.tsx`)
- **HIGH**: Mixed semantic colors (emerald/yellow/red/indigo) not derived from brand tokens; status colors exist but primary actions should be brand accent.
- **MEDIUM**: Header badge + section badges duplicate styling patterns inline (borders, backgrounds, radii) → should be standardized chips.
- **MEDIUM**: Tables/`pre` blocks use direct zinc palette; contrast OK but inconsistent with token approach.
- **LOW**: Container widths vary across pages (`max-w-4xl` here) creating subtle layout jumps.
  - **RESOLVED**: Primary actions/token panels updated to brand/tokens; chip/table/pre surfaces now use token colors.

### `/admin/dashboard` (`next-app/app/admin/dashboard/page.tsx`)
- **HIGH**: Primary/secondary button styling inconsistent with login/challenges (`bg-zinc-*` + borders) and not aligned to brand.
- **MEDIUM**: Cards repeat same `rounded-xl border ... bg-[#111]` pattern inline; should use a shared card class/token.
- **LOW**: Progress bar uses emerald; acceptable as status but should use a defined token rather than raw Tailwind palette.
  - **RESOLVED**: Buttons/cards moved to token classes; progress bar uses brand secondary.

### `/admin/students` (`next-app/app/admin/students/page.tsx`)
- **HIGH**: Create/Save buttons use `bg-indigo-*` / `bg-emerald-*` with inconsistent hover/focus; primary action needs brand accent.
- **MEDIUM**: Form controls duplicate the same long input class strings; should use shared `.input` style for consistency + accessibility.
- **LOW**: Dense lists/cards could use tighter, consistent spacing scale and clearer section separation.
  - **RESOLVED**: Primary actions now brand accent; controls and cards use token classes.

## Shared components

### `Navbar` (`next-app/components/Navbar.tsx`)
- **MEDIUM**: Uses zinc palette + hardcoded `bg-[#111]`; should use `bg-surface` and `border-border` tokens.
- **LOW**: Brand lockup shows both logo + text; spacing is OK, but typographic alignment could be standardized.
  - **RESOLVED**: Tokenized to `bg-surface`/`border-border`/`text-fg` with consistent control heights.

### `Avatar` (`next-app/components/Avatar.tsx`)
- **MEDIUM**: Role colors use amber/emerald rings not derived from brand; should map to brand accent/secondary or tokenized status colors.
- **LOW**: Size fixed at 32px; align to the interactive sizing scale.
  - **RESOLVED**: Role rings mapped to brand accent/secondary; size aligned to `h-control-sm`.

## Global styling foundation

### Tailwind config / globals
- **HIGH**: No design token baseline; widespread ad-hoc colors and spacing utilities across pages.
- **MEDIUM**: Tailwind content scan omits `components/` and other dirs (risk of missing generated classes).
  - **RESOLVED**: Added token baseline in `globals.css` + Tailwind mappings; expanded Tailwind content scan.

---

# Phase 2 — Baseline tokens (implemented)
- Font scale: sm=12px, base=14px, lg=16px, xl=20px
- Spacing scale: project uses Tailwind’s 4px unit; standardize to 4/8/12/16/24/32/48/64
- Radius scale: sm=8px, md=12px, lg=16px, full=999px
- Control heights: sm=32px, md=40px, lg=48px
- Brand colors + semantic tokens are defined via CSS variables + Tailwind mapping

---

# Phase 3 — Implementation plan (prioritized)

## Batch A (highest impact, safest): Tokenize global layout + shared primitives
- **Files**: `next-app/app/globals.css`, `next-app/app/layout.tsx`, `next-app/tailwind.config.js`
- **Changes**:
  - Add token baseline (colors/typography/radius/control sizes)
  - Add shared component classes: `.card`, `.input`, `.btn`, `.btn-primary`, `.btn-secondary`
  - Ensure Tailwind content scan includes `components/`, `lib/`, `src/`
- **Why**: Enables consistent styling everywhere without risky refactors.

## Batch B: Navbar + Avatar alignment to brand tokens
- **Files**: `next-app/components/Navbar.tsx`, `next-app/components/Avatar.tsx`
- **Changes**: Replace zinc/hardcoded backgrounds with `bg-surface`, `border-border`, brand-aligned rings and consistent sizing.
- **Why**: Header is always visible and sets visual tone.

## Batch C: Login page baseline + focus/controls + primary CTA branding
- **Files**: `next-app/app/login/page.tsx`
- **Changes**: Use `.card`/`.input`/`.btn` tokens, unify spacing/typography, improve focus states, move CTA to brand accent.
- **Why**: Core entry point; improves perceived quality and accessibility.

## Batch D: Challenges page (buttons, cards, chips, feedback panels)
- **Files**: `next-app/app/challenges/page.tsx`
- **Changes**: Use tokenized cards/chips, align primary action to brand accent, keep status panels tokenized.
- **Why**: Most-used flow; reduces visual noise and inconsistency.

## Batch E: Admin pages (dashboard/students)
- **Files**: `next-app/app/admin/dashboard/page.tsx`, `next-app/app/admin/students/page.tsx`
- **Changes**: Unify card/button/input styles with tokens; make primary actions brand accent; keep danger as danger.
- **Why**: Professionalizes admin UX with minimal risk.

## Batch F (special): Login CTA animated glow border (login-only)
- **Files**: `next-app/app/globals.css`, `next-app/app/login/page.tsx`
- **Changes**: Apply the conic gradient glow wrapper + layers to login primary submit button only.
- **Why**: Meets explicit brand effect requirement while contained to one element.

-->

