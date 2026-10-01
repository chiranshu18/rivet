// Building blocks for per-element screen choreography.
// See IMPLEMENTATION.md → "Animations" for how screens use these.

export const EASE_OUT = [0.22, 1, 0.36, 1];
export const EASE_IN = [0.55, 0, 1, 0.45];
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];

const REST = { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 };

const resolve = (value, t, other) => (typeof value === 'function' ? value(t, other) : value);

/**
 * Enter/center/exit variants for one element, built from two poses.
 *
 *   in:  where the element comes from when its screen is entered scrolling DOWN
 *   out: where the element goes when its screen is left scrolling DOWN
 *
 * Scrolling UP swaps them (enter from `out`, exit to `in`), so going back
 * replays the forward motion in reverse.
 *
 * Poses and transitions can be objects or functions `(t, other)`:
 *   t     = { from, to, direction, u } (u = CSS px per design px: `y: 600 * t.u`)
 *   other = id of the screen on the other side of this transition (the one
 *           being left on enter, the one being entered on exit), so a pose can
 *           depend on the neighbour regardless of direction.
 * Pose `x`/`y` may also be % of the element's own size.
 */
export function choreo({ in: inPose, out: outPose, inTransition, outTransition }) {
  return {
    enter: (t) => resolve(t.direction > 0 ? inPose : outPose, t, t.from),
    center: (t) => ({ ...REST, transition: resolve(inTransition, t, t.from) }),
    exit: (t) => ({
      ...resolve(t.direction > 0 ? outPose : inPose, t, t.to),
      transition: resolve(outTransition, t, t.to),
    }),
  };
}

/**
 * Layer variants for choreographed screens: the layer itself doesn't move
 * (no opacity/transform, so it creates no stacking context and the screen's
 * background can crossfade *under* the outgoing screen's elements); its
 * children run their own `choreo` variants via label inheritance.
 */
export const stageVariants = { enter: {}, center: {}, exit: {} };

/**
 * Screen background crossfade. The incoming background fades in on top of the
 * outgoing one; the outgoing one only fades after that, so the column's own
 * background never shows through mid-transition.
 */
export const backgroundVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.6 } },
};
