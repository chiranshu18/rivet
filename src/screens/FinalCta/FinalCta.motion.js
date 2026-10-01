import { choreo, EASE_IN, EASE_OUT } from 'animation/choreo';

// in  = faq → final-cta (not in the prototype, which ends here): the photos fly
//       in from outside the device like on the hero, the copy rises from below
//       in reading order. The white card + footer crossfade in as one background
//       layer, so the footer never shows through the card.
// out = never used going down (last screen). Going up the `in` poses play in
//       reverse.
//
// Photos animate transforms only: their opacity/scale belong to the CSS
// sub-step transition (`.compact` fades them out to reveal the footer).

const enter = (delay, duration = 0.85) => ({
  duration,
  delay,
  ease: EASE_OUT,
  opacity: { duration: 0.5, delay, ease: 'easeOut' },
});
const fly = (delay) => ({ duration: 0.95, delay, ease: EASE_OUT });
const leave = { duration: 0.45, ease: EASE_IN };

const photo = (pose, delay) => choreo({ in: pose, out: pose, inTransition: fly(delay), outTransition: leave });
const copy = (dy, delay) => {
  const pose = (t) => ({ y: dy * t.u, opacity: 0 });
  return choreo({ in: pose, out: pose, inTransition: enter(delay), outTransition: leave });
};

export const finalCtaMotion = {
  pTopLeft: photo({ x: '-170%', rotate: -8 }, 0.08),
  pTopRight: photo({ x: '150%', rotate: 8 }, 0.14),
  pMidLeft: photo({ x: '-150%', rotate: -6 }, 0.2),
  pMidRight: photo({ x: '150%', rotate: 6 }, 0.26),
  title: copy(150, 0.16),
  cta: copy(150, 0.24),
  getIt: copy(150, 0.28),
  body: copy(140, 0.32),
  follow: copy(130, 0.36),
  links: copy(120, 0.4),
};
