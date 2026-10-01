// Screen-layer enter/exit animations used by App's <AnimatePresence>.
//
// `custom` = transition info `{ from, to, direction, u }` (see animation/ScreenTransition).
// direction: 1 = going down / next, -1 = going up / prev.
//
// Screens without their own choreography use `defaultScreenVariants` (the whole
// layer slides + fades). Choreographed screens set `variants: stageVariants` in
// src/config/screens.js and animate their elements individually (see IMPLEMENTATION.md → "Animations").

// Input lock after a step change. Keep >= the longest screen choreography.
export const SCREEN_TRANSITION_MS = 1100;

export const defaultScreenVariants = {
  enter: (t) => ({ opacity: 0, y: t.direction > 0 ? 60 : -60, scale: 0.98 }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (t) => ({
    opacity: 0,
    y: t.direction > 0 ? -60 : 60,
    scale: 0.98,
    transition: { duration: 0.45, ease: [0.4, 0, 1, 1] },
  }),
};
