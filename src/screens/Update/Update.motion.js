import { choreo, EASE_IN, EASE_OUT } from 'animation/choreo';

// in  = hero → update: the photo collage rises from below the screen and settles;
//       top avatar/bubble start a bit further left, bottom ones a bit further
//       right, and converge. Heading + body follow, rising with a fade.
// out = update → story: everything lifts slightly and fades (the story
//       background crossfades in underneath).

const enter = (delay, duration = 0.95) => ({
  duration,
  delay,
  ease: EASE_OUT,
  opacity: { duration: 0.45, delay, ease: 'easeOut' },
});
const leave = (delay = 0) => ({ duration: 0.5, delay, ease: EASE_IN });

const rise = (dy, dx = 0) => (t) => ({ x: dx * t.u, y: dy * t.u, opacity: 0 });
const lift = (dy = -60) => (t) => ({ y: dy * t.u, opacity: 0 });

export const updateMotion = {
  man: choreo({ in: rise(380, -30), out: lift(), inTransition: enter(0.15), outTransition: leave() }),
  woman: choreo({ in: rise(420, 10), out: lift(), inTransition: enter(0.2), outTransition: leave() }),
  avatarTop: choreo({ in: rise(380, -60), out: lift(), inTransition: enter(0.24), outTransition: leave() }),
  bubbleTop: choreo({ in: rise(380, -80), out: lift(), inTransition: enter(0.24), outTransition: leave() }),
  bubbleBottom: choreo({ in: rise(420, 80), out: lift(), inTransition: enter(0.28), outTransition: leave() }),
  avatarBottom: choreo({ in: rise(420, 50), out: lift(), inTransition: enter(0.28), outTransition: leave() }),
  title: choreo({ in: rise(170), out: lift(-50), inTransition: enter(0.3, 0.85), outTransition: leave(0.04) }),
  body: choreo({ in: rise(190), out: lift(-50), inTransition: enter(0.36, 0.85), outTransition: leave(0.06) }),
};
