import { createContext, useCallback, useContext } from 'react';

/**
 * Info about the screen change in progress, provided by App:
 *   from:      id of the previous screen ('splash' on first load, null for deep links)
 *   to:        id of the current screen
 *   direction: 1 = scrolling down, -1 = scrolling up
 *   u:         CSS px per design px at the time of the change
 */
export const ScreenTransitionContext = createContext({ from: null, to: null, direction: 1, u: 1 });

export const useScreenTransition = () => useContext(ScreenTransitionContext);

/**
 * Returns `m(variants)` → `{ variants, custom }` props for a motion element,
 * so function variants (see choreo) receive the current transition info.
 */
export function useChoreo() {
  const t = useScreenTransition();
  return useCallback((variants) => ({ variants, custom: t }), [t]);
}

/** CSS px per design px — must match `--u` in App.module.scss. */
export function designUnit() {
  return Math.min(window.innerWidth, 430, (window.innerHeight * 430) / 932) / 430;
}
