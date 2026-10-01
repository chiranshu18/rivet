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
| Default screen enter/exit transition | ✅ basic fade+slide (screens without choreography) |
| **Per-screen animations** (captured from the Figma prototype, see §8) | ✅ all screens choreographed (batches 1–3); awaiting owner review + timing tuning |
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
| Animation source | **"Prototype 1" flow** of the Figma prototype (ignore "Flow 2"). Captured by the agent; owner reviews and fine-tunes timings later. |
| Animation delivery | **2–3 screens per batch, one commit per batch.** |
| Splash → hero trigger | Splash still **auto-advances** after `SPLASH_MS`. |
| Smart Animate "ghosting" | **Not replicated** – clean motion only. |
| Scrolling up | **Plays the forward transition in reverse** (prototype only defines forward). |

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
  animation/
    choreo.js            # choreo() variant builder, eases, stageVariants, backgroundVariants
    ScreenTransition.js  # transition context, useChoreo(), designUnit()
  components/            # shared, presentational (Asset/Button/ChatBubble/... render motion.* and forward motion props)
    Screen.jsx           # full-bleed layer + optional crossfading `bg` layer + centered 430x932 design canvas
    StepLayout.jsx       # shell for the 3 numbered "how it works" steps (+ StepLayout.motion.js)
    Header.jsx, Logo.jsx, ScrollHint.jsx, Button.jsx, StoreIcons.jsx,
    ChatBubble.jsx, StepBadge.jsx, BigBackgroundText.jsx, Asset.jsx
  screens/<Name>/        # one folder per screen: <Name>.jsx + <Name>.module.scss (+ <Name>.motion.js if choreographed)
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
<MotionConfig reducedMotion="user">          honours prefers-reduced-motion
 <ScreenTransitionContext value={transition}> { from, to, direction, u } – see §8
  <main .app>                                 430px column, overflow hidden, owns --u
    <AnimatePresence custom={transition}>     keyed by SCREEN id (not step) → sub-steps re-render in place
      <motion.div .layer>                     mounted once the splash ends; layer variants (default or stageVariants)
        <ScreenComponent subStep direction />
    <Header logoTone intro />                 persistent, above screens (z 50); mounted once the splash ends
    <ScrollHint variant />                    persistent pill, click = next()
    <Splash />                                z 100, removed after SPLASH_MS
```

### 5.2 Scaling: design px → real px (`u()`)

* Every Figma frame is **430 × 932**. All sizes/positions in SCSS are written in **design px**
  wrapped with `u()`: `top: u(184)` → `calc(184 * var(--u))`.
* `--u` (set on `.app`) = `min(100vw, 430px, 100dvh × 430/932) / 430`
  → the 430×932 canvas is **fit ("contain")** in the column; nothing gets cropped on short or
  narrow phones. Backgrounds stay full-bleed.
* `Screen` renders a full-bleed `<section>` (backgrounds go on its `bg` layer for
  choreographed screens, see §8.1, otherwise on `className`) and a centered
  `.canvas` (430×932 design units) where content is absolutely positioned using
  coordinates measured from the screenshots.
* Helpers in `_tokens.scss`:
  * `@include place($top, $left, $w, $h, $rot)` – absolute placement in design px. Uses the
    standalone CSS `rotate` property (not `transform`) so Framer Motion's `x/y/scale/rotate`
    (which write `transform`) compose with the tilt instead of clobbering it.
  * Same rule for centering: `left: 50%; translate: -50% 0;` – **never** `transform: translateX(-50%)`.
  * `@include text-block($top, $pad)` – full-width centered text at a given top.
  * `@include display($size, $lh)` / `@include body($size, $lh, $weight)` – typography.

### 5.3 Step navigation (`useStepNavigation`)

* Listens on `window` for `wheel` (non-passive, `preventDefault`), `touchstart/move/end`,
  `keydown` (↓ PageDown Space = next, ↑ PageUp = prev, Home/End).
* **One gesture = one step.** After a step change, input is locked for `SCREEN_TRANSITION_MS`
  (1100 ms) – also right after the splash ends, so the hero intro can play. Trackpad inertia is
  handled: wheel events < 220 ms apart are treated as the same gesture, so a single long swipe
  never skips two screens.
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

## 8. Animations

Source: Figma prototype, **"Prototype 1"** flow. Timings/distances are **approximations** read
from slowed-down captures of the prototype – tune them in the `*.motion.js` files.

### 8.1 How it works

* **Transition info.** On every screen change App builds
  `t = { from, to, direction, u }` (`from` = previous screen id, `'splash'` on first load,
  `null` for `?step=` deep links; `u` = CSS px per design px, so distances can be written in
  design px: `y: 600 * t.u`). It is passed as `AnimatePresence custom` (used by **exit**
  variants of every element in the outgoing screen) and via `ScreenTransitionContext`
  (used by **enter/center** variants in the incoming screen).
* **Two kinds of screens** (`variants` in `src/config/screens.js`):
  * *Default* – the whole layer slides + fades (`defaultScreenVariants`, `config/transitions.js`).
    No screen uses it any more; it's the fallback for new screens without choreography.
  * *Choreographed* – layer uses `stageVariants` (no motion of its own); each element animates
    itself. The layer's `enter`/`center`/`exit` labels are inherited by every `motion.*`
    child that has `variants`, so elements only need `variants` + `custom`.
* **`choreo({ in, out, inTransition, outTransition })`** (`animation/choreo.js`) builds an
  element's variants from two poses, written for scrolling **down**:
  `in` = where it comes from when its screen is entered, `out` = where it goes when its screen
  is left. Scrolling **up** swaps them, so going back replays the motion in reverse.
  Poses/transitions may be functions `(t, other)` where `other` is the screen on the other
  side of the transition (works the same in both directions) – used e.g. by `StepLayout`
  to behave differently next to the story screen vs. another step.
  `center` only resets the properties the enter pose displaced, so a property no pose
  touches gets no inline style (FinalCta photos rely on this: their opacity belongs to the
  CSS sub-step transition).
* **In a screen:** `const m = useChoreo();` then `<Asset ... {...m(v.topLeft)} />` /
  `<motion.h2 {...m(v.title)}>` with `v` imported from the screen's `*.motion.js`.
* **Backgrounds crossfade.** Choreographed screens pass their background class as
  `<Screen bg={styles.bg}>` (not `className`). `backgroundVariants`: the incoming bg fades in
  over 0.6 s, the outgoing one fades only after that. Layering: choreographed layers create no
  stacking context, `.bg` is `z-index: 0` and `.canvas` `z-index: 1`, so the **outgoing
  screen's elements stay visible above the incoming background** while they animate out.
  (The incoming *canvas* is still above the outgoing canvas.)
  `FinalCta` doesn't use `Screen` (it needs the footer *under* the white card); it follows the
  same contract by hand: gradient + footer + card in one `.bg` layer (`backgroundVariants`,
  z 0, so the footer never shows through the fading card), content canvas at z 1.
* **Logo flight (splash → header):** the splash logo and header `Logo` share
  `layoutId="rivet-logo"` (`layoutCrossfade={false}`), so Framer animates the header logo from
  the splash box to its own; the color goes pink → tone with a CSS transition (`Header.jsx`).
* Rotations from SCSS use the CSS `rotate` property; Framer `rotate` adds **on top** of it.
* Keep `SCREEN_TRANSITION_MS` (input lock) roughly ≥ the longest choreography.
* `prefers-reduced-motion` is honoured (`MotionConfig reducedMotion="user"`: transforms off,
  fades kept).

**Adding a screen's choreography:** create `screens/<Name>/<Name>.motion.js` with one
`choreo()` per element, spread `m(v.x)` on the elements (shared components forward motion
props), move the screen background to a `.bg` class passed as `bg`, and set
`variants: stageVariants` on its `SCREENS` entry.

### 8.2 Transition specs (forward direction; reverse = mirrored)

| Transition | What happens | Where |
| --- | --- | --- |
| splash → hero | Splash gradient fades (0.9 s). Logo flies from the splash centre into the header, shrinking, pink → black (1 s). Menu button slides in from the left, store button fades in place. Hero photos fly in from outside the device: top-left & bottom-left from the left, top-right from the right, bottom-right from right/bottom (staggered). Heading rises from below the screen, then the CTA from further below. | `Splash.jsx`, `Header.jsx`, `Hero.motion.js` |
| hero → update | Hero photos drift outward to their own side and up, off-screen; heading rises out + fades; CTA lifts a little + fades. Update photo collage rises from below and settles (top avatar/bubble start further left, bottom ones further right, converging); heading + body rise with a fade. Bg white → light grey with pink bottom glow. | `Hero.motion.js`, `Update.motion.js` |
| update → story | Update content lifts slightly + fades; pink→dark story bg crossfades in; statement, stickers and CTA rise into place with a fade (stickers with a slight scale-up). | `Update.motion.js`, `Story.motion.js` |
| story → step-profile | Story content lifts + fades. The big "Dating goes social" text travels up from the bottom of the story screen and grows into the step's background text (story copy fades out, step copy fades in – a manual shared-element morph, `BG_TEXT_MORPH`). Bg crossfades to cream. Collage rises from below (most travel), then badge/title/body/CTA. | `Story.motion.js`, `StepLayout.motion.js` |
| step-profile → step-chemistry | Carousel: collage slides out left, next collage slides in from the right. Title/body crossfade with a small rise; badge number swaps (fade); background text and CTA stay put (the incoming copy of the bg text is revealed only after the outgoing collage has faded, `BG_TEXT_SWAP_S`). Bg + bottom glow crossfade (glow yellow → blue). | `StepLayout.motion.js` |
| step-chemistry → step-intro | Same carousel. Bg crossfades cream → night, background text fades out, header logo turns white (CSS), glow → pink. | `StepLayout.motion.js` |
| step-intro → testimonials | Intro content lifts + fades. Bg crossfades night → pink gradient (the blurred pink header fade follows the bg). Cards rise from below one after another (top-left first, bottom-left last), heading rises behind them, then the CTA. The prototype splits this into two frames (cards land ~75 px low, then everything drifts up into the final layout); folded into one rise here. | `StepLayout.motion.js`, `Testimonials.motion.js` |
| testimonials → faq | Quick dissolve: testimonials content fades out (0.35 s), white bg fades in, FAQ balloons/title/list fade in with a small rise (staggered). | `Testimonials.motion.js`, `Faq.motion.js` |
| faq → final CTA | **Not in the prototype** (the click lands straight on the final CTA; nothing captured) – chosen to match the rest: FAQ content lifts + fades; final CTA photos fly in from outside the device (left/right, like the hero), copy rises from below in reading order. White card + footer crossfade in as the bg layer. | `Faq.motion.js`, `FinalCta.motion.js` |
| final CTA sub-step 0 → 1 (footer) | **Not in the prototype** (it ends on the final CTA; its last frame matches our compact layout without photos). Kept the existing CSS transition: card shrinks to 505 px with rounded bottom, content moves up, photos fade + scale down (0.8 s). | `FinalCta.module.scss` |

Prototype frame ids (for re-capturing): splash `1-10669`, hero `1-11246`, update `1-10698`,
story `1-10751`, step-profile `1-10820`, step-chemistry `1-10847`, step-intro `1-10872`,
testimonials `1-10898` (cards low) → `1-10975` (final layout), faq + final CTA `1-11104`
(the final CTA doesn't get its own node id in the URL).

### 8.3 Other animation hooks

* **Sub-step animations** – react to the `subStep` prop (CSS classes, or `animate={...}`);
  `FinalCta` uses CSS transitions. Its photos are animated by both systems (Framer: x/rotate
  on screen enter/exit; CSS: opacity/`scale` on sub-step), so keep opacity out of their
  `choreo` poses.

---

## 9. Open points / to confirm

- [ ] Exact fonts (heading grotesque + wordmark) and the SVG logo.
- [ ] All image / 3D assets (registry keys in `src/assets/index.js`).
- [ ] Copy typos in Update screen ("an major update", "that making").
- [ ] FAQ: real answers + questions for "How Rivet Works" and "Safety & Account".
- [ ] Testimonials: real testimonial data (design repeats one).
- [ ] FinalCta sub-step 1: is the overlap (button over heading) the intended end state?
- [ ] Animations: owner review of the captured choreography + timing fine-tuning (§8.2).
- [x] Animations: scrolling up = reverse of the forward transition (confirmed by owner).
- [ ] Animations: faq → final CTA and the footer sub-step aren't in the prototype – review the chosen motion.
- [ ] Hamburger menu: is a menu overlay needed later? (currently a no-op button)

---

## 10. Changelog

| Date | Change |
| --- | --- |
| 2026-10-01 | Initial static implementation of all screens, step navigation, splash, FAQ accordion, footer sub-step, asset registry, docs + design references. |
| 2026-10-01 | Animations batch 1: choreography system (`src/animation/`), splash → hero (logo flight, header intro), hero → update, update → story. |
| 2026-10-01 | Animations batch 2: `StepLayout` choreography – story → step-profile (bg-text morph), step-profile → step-chemistry → step-intro (carousel). `Screen` backdrop now lives in the crossfading `bg` layer. Logo color handoff timing fix. Docs §8. |
| 2026-10-01 | Animations batch 3: step-intro → testimonials (cards rise), testimonials → faq (dissolve), faq → final CTA (photos fly in, copy rises; not in prototype). FinalCta background/footer/card moved into a crossfading bg layer. `choreo` `center` only resets displaced properties. |
