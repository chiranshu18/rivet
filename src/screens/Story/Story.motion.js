import { choreo, EASE_IN, EASE_IN_OUT, EASE_OUT } from 'animation/choreo';
import { BG_TEXT_MORPH } from 'components/StepLayout.motion';

// in  = update → story: the pink→dark background crossfades in while the
//       statement, decorations and CTA rise into place with a fade.
// out = story → step-profile: content lifts and fades; the big background
//       text travels up and grows into the step's background text (which
//       fades in on top of it, see StepLayout.motion.js).

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
  bgText: choreo({
    in: rise(100),
    out: (t, other) =>
      other === 'step-profile'
        ? { y: -BG_TEXT_MORPH.dy * t.u, scale: 1 / BG_TEXT_MORPH.scale, opacity: 0 }
        : lift(t),
    inTransition: enter(0.15, 1),
    outTransition: (t, other) =>
      other === 'step-profile'
        ? { duration: 1, delay: 0.05, ease: EASE_IN_OUT, opacity: { duration: 0.6, delay: 0.4 } }
        : leave,
  }),
  statement: choreo({ in: rise(140), out: lift, inTransition: enter(0.12), outTransition: leave }),
  heart: choreo({ in: rise(170, 0.8), out: lift, inTransition: enter(0.28), outTransition: leave }),
  avatarA: choreo({ in: rise(170, 0.8), out: lift, inTransition: enter(0.32), outTransition: leave }),
  avatarB: choreo({ in: rise(170, 0.8), out: lift, inTransition: enter(0.36), outTransition: leave }),
  bubblePink: choreo({ in: rise(160, 0.9), out: lift, inTransition: enter(0.38), outTransition: leave }),
  bubbleWhite: choreo({ in: rise(160, 0.9), out: lift, inTransition: enter(0.42), outTransition: leave }),
  cta: choreo({ in: rise(120), out: lift, inTransition: enter(0.3), outTransition: leave }),
};
