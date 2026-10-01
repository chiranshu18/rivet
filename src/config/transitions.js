// Screen enter/exit animations used by App's <AnimatePresence>.
//
// `custom` = direction (1 = going down / next, -1 = going up / prev).
// A screen can override this by setting `variants` on its entry in
// src/config/screens.js (see IMPLEMENTATION.md → "Adding per-screen animations").

export const SCREEN_TRANSITION_MS = 900;

export const defaultScreenVariants = {
  enter: (dir) => ({ opacity: 0, y: dir > 0 ? 60 : -60, scale: 0.98 }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir) => ({
    opacity: 0,
    y: dir > 0 ? -60 : 60,
    scale: 0.98,
    transition: { duration: 0.45, ease: [0.4, 0, 1, 1] },
  }),
};
