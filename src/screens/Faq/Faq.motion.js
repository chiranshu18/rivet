import { choreo, EASE_IN, EASE_OUT } from 'animation/choreo';

// in  = testimonials → faq: dissolve; the white background fades in and the
//       content fades in with a small rise.
// out = faq → final-cta: content lifts and fades while the final CTA builds in
//       (this hand-off isn't in the prototype; it mirrors the other white-to-
//       white transitions).

const enter = (delay, duration = 0.9) => ({
  duration,
  delay,
  ease: EASE_OUT,
  opacity: { duration: 0.5, delay, ease: 'easeOut' },
});
const leave = { duration: 0.45, ease: EASE_IN };
const dissolveIn = (delay) => ({ duration: 0.6, delay, ease: EASE_OUT });
const dissolveOut = { duration: 0.35, ease: EASE_IN };

const element = (delay) =>
  choreo({
    in: (t) => ({ y: 24 * t.u, opacity: 0 }),
    out: (t) => ({ y: -60 * t.u, opacity: 0 }),
    inTransition: (t, other) => (other === 'testimonials' ? dissolveIn(delay) : enter(delay)),
    outTransition: (t, other) => (other === 'testimonials' ? dissolveOut : leave),
  });

export const faqMotion = {
  balloons: element(0.15),
  title: element(0.22),
  list: element(0.3),
};
