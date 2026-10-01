import { choreo, EASE_IN, EASE_OUT } from 'animation/choreo';

// in  = update → story: the pink→dark background crossfades in while the
//       statement, decorations and CTA rise into place with a fade.
// out = story → step-profile: not captured yet; lifts + fades like the
//       default screen exit.

const enter = (delay, duration = 0.9) => ({
  duration,
  delay,
  ease: EASE_OUT,
  opacity: { duration: 0.5, delay, ease: 'easeOut' },
});
const leave = { duration: 0.45, ease: EASE_IN };

const rise = (dy, scale = 1) => (t) => ({ y: dy * t.u, opacity: 0, scale });
const lift = (t) => ({ y: -60 * t.u, opacity: 0 });

export const storyMotion = {
  bgText: choreo({ in: rise(100), out: lift, inTransition: enter(0.15, 1), outTransition: leave }),
  statement: choreo({ in: rise(140), out: lift, inTransition: enter(0.12), outTransition: leave }),
  heart: choreo({ in: rise(170, 0.8), out: lift, inTransition: enter(0.28), outTransition: leave }),
  avatarA: choreo({ in: rise(170, 0.8), out: lift, inTransition: enter(0.32), outTransition: leave }),
  avatarB: choreo({ in: rise(170, 0.8), out: lift, inTransition: enter(0.36), outTransition: leave }),
  bubblePink: choreo({ in: rise(160, 0.9), out: lift, inTransition: enter(0.38), outTransition: leave }),
  bubbleWhite: choreo({ in: rise(160, 0.9), out: lift, inTransition: enter(0.42), outTransition: leave }),
  cta: choreo({ in: rise(120), out: lift, inTransition: enter(0.3), outTransition: leave }),
};
