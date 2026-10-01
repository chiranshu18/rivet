import { choreo, EASE_IN_OUT, EASE_OUT } from 'animation/choreo';

// in  = splash → hero: photos fly in from outside the device (left / right),
//       heading + CTA rise from below the screen.
// out = hero → update: photos drift outward (toward their own side) and up,
//       heading rises out and fades, CTA lifts a little while fading.

const enter = (delay, duration = 0.95) => ({ duration, delay, ease: EASE_OUT });
const leave = (delay = 0, duration = 0.75) => ({ duration, delay, ease: EASE_IN_OUT });

export const heroMotion = {
  topLeft: choreo({
    in: { x: '-130%', rotate: -8 },
    out: { x: '-125%', y: '-18%', rotate: -6 },
    inTransition: enter(0.1),
    outTransition: leave(),
  }),
  topRight: choreo({
    in: { x: '130%', rotate: 8 },
    out: { x: '120%', y: '-22%', rotate: 14 },
    inTransition: enter(0.18),
    outTransition: leave(0.03),
  }),
  bottomLeft: choreo({
    in: { x: '-130%', rotate: 6 },
    out: { x: '-125%', y: '-10%', rotate: 6 },
    inTransition: enter(0.26),
    outTransition: leave(0.06),
  }),
  bottomRight: choreo({
    in: { x: '110%', y: '45%', rotate: 8 },
    out: { x: '120%', y: '-12%', rotate: 8 },
    inTransition: enter(0.34),
    outTransition: leave(0.06),
  }),
  title: choreo({
    in: (t) => ({ y: 640 * t.u }),
    out: (t) => ({ y: -260 * t.u, opacity: 0 }),
    inTransition: enter(0.2, 1),
    outTransition: { ...leave(0, 0.7), opacity: { duration: 0.45, delay: 0.15 } },
  }),
  cta: choreo({
    in: (t) => ({ y: 420 * t.u }),
    out: (t) => ({ y: -50 * t.u, opacity: 0 }),
    inTransition: enter(0.32, 1),
    outTransition: { duration: 0.5, ease: EASE_IN_OUT },
  }),
};
