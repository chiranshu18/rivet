import { choreo, EASE_IN, EASE_IN_OUT, EASE_OUT } from 'animation/choreo';

// Shared choreography for the three "how it works" steps (StepLayout).
//
// story → step-profile: story content lifts out; the big "Dating goes social"
//   text travels up from the bottom of the story screen and grows into place
//   (see Story.motion.js for the outgoing half); collage + text rise from below.
// step → step (profile → chemistry → intro): carousel — the collage slides out
//   left while the next one slides in from the right; title/body crossfade with
//   a small rise; the badge number swaps; background text + CTA stay put; the
//   background and bottom glow crossfade (Screen `bg`).
// step-intro → testimonials: not captured yet; lifts + fades.

const isStep = (id) => typeof id === 'string' && id.startsWith('step-');
// Steps that render the big background text (StepIntro passes showBgText={false}).
const hasBgText = (id) => id === 'step-profile' || id === 'step-chemistry';

// Story bgText (top 780, 98px) ↔ step bgText (top 250, 150px); origin is top center.
export const BG_TEXT_MORPH = { dy: 780 - 250, scale: 98 / 150 };

const enter = (delay, duration = 0.9) => ({
  duration,
  delay,
  ease: EASE_OUT,
  opacity: { duration: 0.5, delay, ease: 'easeOut' },
});
const leave = (delay = 0) => ({ duration: 0.5, delay, ease: EASE_IN });
const lift = (t) => ({ y: -60 * t.u, opacity: 0 });
const rise = (dy) => (t) => ({ y: dy * t.u, opacity: 0 });

const slide = { duration: 0.8, ease: EASE_IN_OUT, opacity: { duration: 0.45, ease: 'easeInOut' } };
// When the incoming copy of the background text appears: after the outgoing
// collage has faded (slide opacity), before the outgoing screen unmounts
// (~0.8s, see backgroundVariants exit).
const BG_TEXT_SWAP_S = 0.7;
const crossfadeIn = { duration: 0.6, delay: 0.2, ease: EASE_OUT };
const crossfadeOut = { duration: 0.35, ease: EASE_IN };

/** Text block (title/body): rises from below after the story, crossfades between steps. */
const textBlock = (dy, delay) =>
  choreo({
    in: (t, other) => (isStep(other) ? rise(30)(t) : rise(dy)(t)),
    out: (t, other) => (isStep(other) ? { y: -30 * t.u, opacity: 0 } : lift(t)),
    inTransition: (t, other) => (isStep(other) ? crossfadeIn : enter(delay)),
    outTransition: (t, other) => (isStep(other) ? crossfadeOut : leave()),
  });

export const stepMotion = {
  collage: choreo({
    in: (t, other) => (isStep(other) ? { x: 170 * t.u, opacity: 0 } : rise(230)(t)),
    out: (t, other) => (isStep(other) ? { x: -170 * t.u, opacity: 0 } : lift(t)),
    inTransition: (t, other) => (isStep(other) ? slide : enter(0.15, 1)),
    outTransition: (t, other) => (isStep(other) ? slide : leave()),
  }),

  // Steps with background text show the same text in the same spot, so the
  // incoming copy stays hidden until the outgoing collage has slid away, then
  // swaps in under the identical outgoing copy.
  bgText: choreo({
    in: (t, other) => {
      if (other === 'story') return { y: BG_TEXT_MORPH.dy * t.u, scale: BG_TEXT_MORPH.scale, opacity: 0 };
      return { opacity: 0 };
    },
    out: (t, other) => (hasBgText(other) ? {} : { opacity: 0 }),
    inTransition: (t, other) => {
      if (other === 'story') return { duration: 1, delay: 0.05, ease: EASE_IN_OUT };
      if (hasBgText(other)) return { duration: 0.05, delay: BG_TEXT_SWAP_S };
      return { duration: 0.6, delay: 0.2, ease: 'easeOut' };
    },
    outTransition: { duration: 0.5, ease: 'easeIn' },
  }),

  badge: choreo({
    in: (t, other) => (isStep(other) ? { opacity: 0 } : rise(150)(t)),
    out: (t, other) => (isStep(other) ? {} : lift(t)),
    inTransition: (t, other) => (isStep(other) ? { duration: 0.4, delay: 0.25 } : enter(0.25)),
    outTransition: (t, other) => (isStep(other) ? { duration: 0.6 } : leave()),
  }),

  title: textBlock(150, 0.3),
  body: textBlock(160, 0.36),

  cta: choreo({
    in: (t, other) => (isStep(other) ? {} : rise(150)(t)),
    out: (t, other) => (isStep(other) ? {} : lift(t)),
    inTransition: (t, other) => (isStep(other) ? { duration: 0 } : enter(0.42)),
    outTransition: (t, other) => (isStep(other) ? { duration: 0.6 } : leave()),
  }),
};
