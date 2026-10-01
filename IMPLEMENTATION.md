# Rivet – Mobile Landing (Static UI) · Implementation Doc

> Living document. **Update it whenever you change behaviour, structure, or decisions.**
> Goal: anyone (human or AI agent) can pick this up without extra context.

---

## 1. What this is

A **mobile-only**, mostly static marketing site for "Rivet" (a social dating app), built from Figma
screenshots (see `docs/design/`).

It is **not** a normal vertically scrolling page. It is a **step-based "slideshow"**:
one scroll gesture (wheel / swipe / key) = the whole screen's content changes to the next step.

| Item | Status |
| --- | --- |
| Static layout of all screens | ✅ done |
| Step navigation (wheel, touch swipe, keyboard, "Scroll for more" click) | ✅ done |
| Splash/loader | ✅ done (timed, auto-advances) |
| FAQ accordion (single open) | ✅ done |
| Final CTA → footer reveal (sub-step) | ✅ done (CSS transition) |
| Default screen enter/exit transition | ✅ basic fade+slide placeholder |
| **Per-screen custom animations** | ⏳ TODO (planned, see §8) |
| Real images / 3D assets | ⏳ TODO – placeholders everywhere (see §6) |
| Real fonts | ⏳ Google Font substitutes for now (see §5) |
| CTA / menu / store buttons | ❌ intentionally non-functional |

---

## 2. Decisions (agreed with the owner)

| Topic | Decision |
| --- | --- |
| Screen order | As in §4 (confirmed). |
| Splash (`HERO1`) | Intro **loader**, shown for `SPLASH_MS` (2.2 s) then fades out. **Not** a scroll step. |
| `Menu_Mobile-7` vs `-8` | **Same screen, 2 sub-steps**: 2nd scroll shrinks the white card up and reveals the footer. |
| Scroll engine | **Custom step controller + Framer Motion** (no fullpage/swiper libs). |
| Styling | **SCSS Modules** (`*.module.scss`) + shared tokens. |
| Tooling | Keep **Create React App** (react-scripts 5), plain JS. |
| Desktop / wide screens | Centered **430 px** column, neutral grey on the sides. |
| Fonts | Close Google Font substitutes are fine. |
| FAQ | Simple accordion, stays inside the screen, **only one open at a time**. |
| Assets | **Labelled dashed placeholders**, swappable from one registry file. |
| CTAs | Non-functional. |

---

## 3. Run / build

```bash
npm install
npm start            # http://localhost:3000
npm run build
npm test -- --watchAll=false
```

**Dev shortcut:** `http://localhost:3000/?step=N` skips the splash and opens step `N`
(0-based index into `STEPS`, see §4). Example: `?step=9` = footer sub-step.

Best previewed in Chrome DevTools device mode at **430 × 932** (the Figma frame size).

> If the dev server logs `EMFILE: too many open files` (macOS watcher limit) run
> `WATCHPACK_POLLING=true npm start`.

Libraries added on top of CRA: `framer-motion`, `react-icons`, `sass` (pinned `~1.77` to avoid
sass-loader legacy-API deprecation spam with CRA 5).

---

## 4. Screen flow

Defined in **`src/config/screens.js`** (`SCREENS` → flattened into `STEPS`).

| Step (`?step=`) | Screen id | Component | Figma ref (`docs/design/`) | Header logo | Scroll hint |
| --- | --- | --- | --- | --- | --- |
| – | splash | `screens/Splash` | `00-splash.png` (HERO1) | hidden | hidden |
| 0 | `hero` | `screens/Hero` | `01-hero.png` (HERO2) | dark | hidden |
| 1 | `update` | `screens/Update` | `02-update.png` (Menu_Mobile) | dark | rose |
| 2 | `story` | `screens/Story` | `03-story.png` (Menu_Mobile-1) | dark | dark |
| 3 | `step-profile` | `screens/StepProfile` | `04-step-profile.png` (Menu_Mobile-2) | dark | light |
| 4 | `step-chemistry` | `screens/StepChemistry` | `05-step-chemistry.png` (Menu_Mobile-3) | dark | light |
| 5 | `step-intro` | `screens/StepIntro` | `06-step-intro.png` (Menu_Mobile-4) | light | outline |
| 6 | `testimonials` | `screens/Testimonials` | `07-testimonials.png` (Menu_Mobile-5) | light | light |
| 7 | `faq` | `screens/Faq` | `08-faq.png` (Menu_Mobile-6) | dark | light |
| 8 | `final-cta` (sub 0) | `screens/FinalCta` | `09a-final-cta.png` (Menu_Mobile-7) | dark | light |
| 9 | `final-cta` (sub 1) | `screens/FinalCta` | `09b-final-cta-footer.png` (Menu_Mobile-8) | dark | hidden |

---

## 5. Architecture

```
src/
  App.js                 # orchestrator: splash → step navigation → AnimatePresence of screens
  App.module.scss        # 430px column + the --u scale variable
  index.js
  config/
    screens.js           # ordered SCREENS + per-step theme (logo tone, hint style) → STEPS
    transitions.js       # default enter/exit variants + SCREEN_TRANSITION_MS (input lock)
  hooks/
    useStepNavigation.js # wheel / touch / keyboard → one step per gesture
  components/            # shared, presentational
    Screen.jsx           # full-bleed layer + centered 430x932 design canvas
    StepLayout.jsx       # shell for the 3 numbered "how it works" steps
    Header.jsx, Logo.jsx, ScrollHint.jsx, Button.jsx, StoreIcons.jsx,
    ChatBubble.jsx, StepBadge.jsx, BigBackgroundText.jsx, Asset.jsx
  screens/<Name>/        # one folder per screen: <Name>.jsx + <Name>.module.scss
  assets/
    index.js             # ASSET REGISTRY (null = placeholder)
    images/              # drop real files here
  styles/
    _tokens.scss         # colors, fonts, u(), mixins (place, text-block, display, body…)
    global.scss          # reset + body
docs/design/             # reference screenshots, numbered in flow order
```

### 5.1 Rendering model

```
<main .app>                       430px column, overflow hidden, owns --u
  <AnimatePresence custom=dir>    keyed by SCREEN id (not step) → sub-steps re-render in place
    <motion.div .layer>           enter/exit variants (default or per-screen)
      <ScreenComponent subStep direction />
  <Header logoTone />             persistent, above screens (z 50)
  <ScrollHint variant />          persistent pill, click = next()
  <Splash />                      z 100, removed after SPLASH_MS
```

### 5.2 Scaling: design px → real px (`u()`)

* Every Figma frame is **430 × 932**. All sizes/positions in SCSS are written in **design px**
  wrapped with `u()`: `top: u(184)` → `calc(184 * var(--u))`.
* `--u` (set on `.app`) = `min(100vw, 430px, 100dvh × 430/932) / 430`
  → the 430×932 canvas is **fit ("contain")** in the column; nothing gets cropped on short or
  narrow phones. Backgrounds stay full-bleed.
* `Screen` renders a full-bleed `<section>` (put backgrounds/glows on it) and a centered
  `.canvas` (430×932 design units) where content is absolutely positioned using
  coordinates measured from the screenshots.
* Helpers in `_tokens.scss`:
  * `@include place($top, $left, $w, $h, $rot)` – absolute placement in design px. Uses the
    standalone CSS `rotate` property (not `transform`) so Framer Motion can animate
    `x/y/scale` later without clobbering the tilt.
  * `@include text-block($top, $pad)` – full-width centered text at a given top.
  * `@include display($size, $lh)` / `@include body($size, $lh, $weight)` – typography.

### 5.3 Step navigation (`useStepNavigation`)

* Listens on `window` for `wheel` (non-passive, `preventDefault`), `touchstart/move/end`,
  `keydown` (↓ PageDown Space = next, ↑ PageUp = prev, Home/End).
* **One gesture = one step.** After a step change, input is locked for `SCREEN_TRANSITION_MS`
  (900 ms). Trackpad inertia is handled: wheel events < 220 ms apart are treated as the same
  gesture, so a single long swipe never skips two screens.
* Swipe threshold 50 px.
* **Inner scroll areas:** any element with `data-scrollable` (e.g. FAQ list) gets the scroll
  first; the step only changes once that element is at its top/bottom edge.
* Disabled while the splash is visible.
* API: `{ index, direction, goTo(i), next(), prev() }`.

### 5.4 Sub-steps

A screen may own several scroll steps (`steps: [...]` in `screens.js`). App passes
`subStep` to the component; the component decides what changes. Only `FinalCta` uses it:
`subStep 1` adds `.compact` → white card height shrinks, content `top`s move, photos fade
(all CSS transitions in `FinalCta.module.scss`, see the `move($from, $to)` mixin).

### 5.5 Fonts (substitutes, loaded in `public/index.html`)

| Role | Design (guess) | Using now | Token |
| --- | --- | --- | --- |
| Headings | heavy condensed grotesque | **Archivo** 800, `font-stretch: 78%` | `$f-display` |
| Body | Inter-like | **Inter** | `$f-body` |
| Wordmark "Rivet" | custom script | **Leckerli One** (text fallback) | `$f-logo` |

Swap by editing the `<link>` in `public/index.html` + tokens in `_tokens.scss`.

---

## 6. Assets (placeholders → real files)

* Every image/3D object is rendered via `<Asset name="..." label="..." className=... />`.
* `src/assets/index.js` is the **single registry**. A `null` entry renders a pink dashed
  labelled box at the exact size/position; an imported file renders an `<img>` with
  `object-fit: cover` using the **same className** (so layout doesn't change).
* To add one:
  1. put the file in `src/assets/images/`
  2. `import step1Photo from './images/step1-photo.jpg';` in `src/assets/index.js`
  3. set `step1Photo: step1Photo`
* Logo: set `logoWordmark` (header) and `splashLogo` (glossy 3D splash logo); components
  fall back to the text wordmark while they're `null`.
* Non-rectangular art (balloons, hearts, cut-out photos) should be exported as transparent
  PNG/WebP; you may want to remove the placeholder `border-radius` on those classes.

Registry keys are grouped per screen with comments; the placeholder label tells you what goes
where (e.g. "Photo: couple on sofa").

---

## 7. Screen notes

* **Hero** – 4 tilted photos at the corners, black "Download Rivet ▶ " button. No scroll hint (as in design).
* **Update** – two tilted portraits + avatars with blue chat bubbles. Copy kept verbatim from the
  design including grammar ("an major update", "is modern dating app that making…") → **confirm copy**.
* **Story** – big white statement on pink→dark gradient with inline stickers (heart balloon,
  2 avatars, 2 "Swipe left-right" bubbles) positioned absolutely over the text, faded
  "Dating goes social" at the bottom.
* **StepProfile / StepChemistry / StepIntro** – share `StepLayout` (badge, title, body, "Get Riveting",
  bottom glow, big cream "Dating goes social" background text on steps 1–2). Collage is per screen.
  StepIntro's "phone" match card is built in HTML/CSS (only the 2 photos + hearts are assets).
* **Testimonials** – 5 tilted cards (same testimonial repeated, as in design – data in
  `Testimonials.jsx`), heading behind cards, blurred pink fade under the header.
* **FAQ** – data in `screens/Faq/faqData.js`. Two-level accordion: one category open, one question open.
  List is `data-scrollable` (scrolls internally if it overflows). Only the first answer exists in the
  design; other answers and the questions in "How Rivet Works" / "Safety & Account" are
  **`PLACEHOLDER` copy**.
* **FinalCta** – sub-step 0 = full white card + 4 floating photos; sub-step 1 = card shrinks to
  505 design px with rounded bottom, footer (wordmark, credits, socials, avatar bubbles) revealed.
  Positions in sub-step 1 mirror `Menu_Mobile-8`, where the button overlaps the heading and
  "Get it now" – looks like a mid-animation frame → **confirm intended final layout**.

---

## 8. Adding per-screen animations (next phase)

Hooks are already in place:

1. **Screen enter/exit** – add `variants` to a screen entry in `src/config/screens.js`
   (Framer Motion variants with `enter` / `center` / `exit`, receiving `direction` as `custom`).
   Default lives in `src/config/transitions.js`.
2. **Inner choreography** – inside a screen, wrap elements in `motion.*` and use
   `initial` / `animate` / `exit` (exit works because each screen is a direct child of
   `AnimatePresence`). Use `direction` prop to reverse for upward scrolls.
3. **Sub-step animations** – react to the `subStep` prop (CSS classes, or `animate={...}`).
4. Keep `SCREEN_TRANSITION_MS` ≥ the longest enter animation, otherwise users can scroll
   mid-transition.
5. Tilt uses CSS `rotate`, so animating `x`, `y`, `scale` in Framer won't reset it; animate
   `rotate` in Framer only if you also remove it from SCSS for that element.

---

## 9. Open points / to confirm

- [ ] Exact fonts (heading grotesque + wordmark) and the SVG logo.
- [ ] All image / 3D assets (registry keys in `src/assets/index.js`).
- [ ] Copy typos in Update screen ("an major update", "that making").
- [ ] FAQ: real answers + questions for "How Rivet Works" and "Safety & Account".
- [ ] Testimonials: real testimonial data (design repeats one).
- [ ] FinalCta sub-step 1: is the overlap (button over heading) the intended end state?
- [ ] Per-screen animations spec.
- [ ] Hamburger menu: is a menu overlay needed later? (currently a no-op button)

---

## 10. Changelog

| Date | Change |
| --- | --- |
| 2026-10-01 | Initial static implementation of all screens, step navigation, splash, FAQ accordion, footer sub-step, asset registry, docs + design references. |
