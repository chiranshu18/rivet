import { choreo, EASE_IN, EASE_OUT } from 'animation/choreo';

// in  = step-intro → testimonials: the night background crossfades to the pink
//       gradient while the cards rise into place one after another and the
//       heading rises behind them. (The prototype lands the cards ~75px low and
//       then drifts them up in a second frame; folded into a single rise here.)
// out = testimonials → faq: quick dissolve to the white FAQ screen.

const enter = (delay, duration = 0.9) => ({
  duration,
  delay,
  ease: EASE_OUT,
  opacity: { duration: 0.5, delay, ease: 'easeOut' },
});
const leave = { duration: 0.5, ease: EASE_IN };
const dissolveIn = { duration: 0.5, delay: 0.15, ease: 'easeOut' };
const dissolveOut = { duration: 0.35, ease: EASE_IN };

const rise = (dy) => (t) => ({ y: dy * t.u, opacity: 0 });
const fade = { opacity: 0 };

const element = (dy, delay) =>
  choreo({
    in: rise(dy),
    out: fade,
    inTransition: (t, other) => (other === 'faq' ? dissolveIn : enter(delay)),
    outTransition: (t, other) => (other === 'faq' ? dissolveOut : leave),
  });

export const testimonialsMotion = {
  title: element(200, 0.18),
  cards: {
    topLeft: element(240, 0.08),
    topRight: element(240, 0.14),
    midLeft: element(240, 0.22),
    bottomRight: element(240, 0.28),
    bottomLeft: element(240, 0.34),
  },
  // Part of the background look (pink fade under the header), so it follows
  // the background crossfade instead of rising with the content.
  topFade: choreo({
    in: fade,
    out: fade,
    inTransition: { duration: 0.6, ease: 'easeInOut' },
    outTransition: { duration: 0.3, ease: 'easeIn' },
  }),
  cta: element(120, 0.36),
};
