import { useCallback, useEffect, useRef, useState } from 'react';

const WHEEL_MIN_DELTA = 8; // ignore tiny trackpad jitters
const WHEEL_GESTURE_GAP_MS = 220; // wheel events closer than this = same gesture (trackpad inertia)
const SWIPE_MIN_PX = 50;

/**
 * True if `target` sits inside an element marked `data-scrollable` that can
 * still scroll in `dir` (1 = down, -1 = up). Such scrolls are left to the
 * element instead of changing step.
 */
function canInnerScroll(target, dir) {
  const el = target instanceof Element ? target.closest('[data-scrollable]') : null;
  if (!el || el.scrollHeight <= el.clientHeight + 1) return false;
  if (dir > 0) return el.scrollTop + el.clientHeight < el.scrollHeight - 1;
  return el.scrollTop > 1;
}

/**
 * One wheel gesture / swipe / key press = one step.
 *
 * @param {number}  count     total number of steps
 * @param {number}  lockMs    input is ignored for this long after a step change (transition time)
 * @param {boolean} enabled   disable all input (e.g. during splash)
 * @param {number}  initialIndex
 * @returns {{ index, direction, goTo, next, prev }}
 */
export default function useStepNavigation({ count, lockMs = 900, enabled = true, initialIndex = 0 }) {
  const [state, setState] = useState({ index: initialIndex, direction: 1 });
  const busy = useRef(false);
  const lastWheelAt = useRef(0);
  const gestureConsumed = useRef(false);
  const touch = useRef(null);
  const indexRef = useRef(0);
  indexRef.current = state.index;

  const goTo = useCallback(
    (target) => {
      const clamped = Math.max(0, Math.min(count - 1, target));
      const current = indexRef.current;
      if (clamped === current || busy.current) return;
      busy.current = true;
      setState({ index: clamped, direction: clamped > current ? 1 : -1 });
      window.setTimeout(() => {
        busy.current = false;
      }, lockMs);
    },
    [count, lockMs]
  );

  const next = useCallback(() => goTo(indexRef.current + 1), [goTo]);
  const prev = useCallback(() => goTo(indexRef.current - 1), [goTo]);

  // Also lock right after input gets enabled, so the first screen's intro can play.
  useEffect(() => {
    if (!enabled) return undefined;
    busy.current = true;
    const t = window.setTimeout(() => {
      busy.current = false;
    }, lockMs);
    return () => window.clearTimeout(t);
  }, [enabled, lockMs]);

  useEffect(() => {
    if (!enabled) return undefined;

    const onWheel = (e) => {
      const dir = e.deltaY > 0 ? 1 : -1;
      if (canInnerScroll(e.target, dir)) return;
      e.preventDefault();

      const now = performance.now();
      const gap = now - lastWheelAt.current;
      lastWheelAt.current = now;
      if (gap > WHEEL_GESTURE_GAP_MS) gestureConsumed.current = false;

      if (Math.abs(e.deltaY) < WHEEL_MIN_DELTA) return;
      if (busy.current || gestureConsumed.current) {
        gestureConsumed.current = true;
        return;
      }
      gestureConsumed.current = true;
      dir > 0 ? next() : prev();
    };

    const onTouchStart = (e) => {
      const t = e.touches[0];
      touch.current = {
        y: t.clientY,
        target: e.target,
        canDown: canInnerScroll(e.target, 1),
        canUp: canInnerScroll(e.target, -1),
      };
    };

    const onTouchMove = (e) => {
      if (!touch.current) return;
      const inScrollable = touch.current.canDown || touch.current.canUp;
      if (!inScrollable) e.preventDefault(); // stop iOS rubber-banding
    };

    const onTouchEnd = (e) => {
      if (!touch.current) return;
      const dy = touch.current.y - e.changedTouches[0].clientY;
      const { canDown, canUp } = touch.current;
      touch.current = null;
      if (Math.abs(dy) < SWIPE_MIN_PX) return;
      if (dy > 0 && !canDown) next();
      if (dy < 0 && !canUp) prev();
    };

    const onKey = (e) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        next();
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        prev();
      } else if (e.key === 'Home') {
        goTo(0);
      } else if (e.key === 'End') {
        goTo(count - 1);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKey);
    };
  }, [enabled, next, prev, goTo, count]);

  return { index: state.index, direction: state.direction, goTo, next, prev };
}
