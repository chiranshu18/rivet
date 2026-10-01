import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import Header from 'components/Header';
import ScrollHint from 'components/ScrollHint';
import Splash, { SPLASH_MS } from 'screens/Splash/Splash';
import useStepNavigation from 'hooks/useStepNavigation';
import { SCREENS, STEPS } from 'config/screens';
import { defaultScreenVariants, SCREEN_TRANSITION_MS } from 'config/transitions';
import { ScreenTransitionContext, designUnit } from 'animation/ScreenTransition';
import styles from './App.module.scss';

// Dev shortcut: `?step=N` (0-based index into STEPS) skips the splash and opens that step.
const STEP_PARAM = new URLSearchParams(window.location.search).get('step');
const DEEP_LINK_STEP =
  STEP_PARAM !== null && Number.isInteger(Number(STEP_PARAM))
    ? Math.max(0, Math.min(STEPS.length - 1, Number(STEP_PARAM)))
    : null;
const INITIAL_STEP = DEEP_LINK_STEP ?? 0;

export default function App() {
  const [splashDone, setSplashDone] = useState(DEEP_LINK_STEP !== null);
  const { index, direction, next } = useStepNavigation({
    count: STEPS.length,
    lockMs: SCREEN_TRANSITION_MS,
    enabled: splashDone,
    initialIndex: INITIAL_STEP,
  });

  useEffect(() => {
    if (splashDone) return undefined;
    const t = window.setTimeout(() => setSplashDone(true), SPLASH_MS);
    return () => window.clearTimeout(t);
  }, [splashDone]);

  const step = STEPS[index];
  const screen = SCREENS[step.screenIndex];
  const { Component } = screen;

  // Which screen we came from, for per-element choreography (see animation/).
  const [transition, setTransition] = useState(() => ({
    from: DEEP_LINK_STEP === null ? 'splash' : null,
    to: SCREENS[STEPS[INITIAL_STEP].screenIndex].id,
    direction: 1,
    u: designUnit(),
  }));
  if (transition.to !== screen.id) {
    setTransition({ from: transition.to, to: screen.id, direction, u: designUnit() });
  }

  return (
    <MotionConfig reducedMotion="user">
      <ScreenTransitionContext.Provider value={transition}>
        <main className={styles.app}>
          {/* Keyed by screen (not step) so sub-steps animate inside the same screen.
              The first screen mounts when the splash ends, so it plays its intro. */}
          <AnimatePresence initial={false} custom={transition}>
            {splashDone && (
              <motion.div
                key={screen.id}
                className={styles.layer}
                variants={screen.variants || defaultScreenVariants}
                custom={transition}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <Component subStep={step.subStep} direction={direction} />
              </motion.div>
            )}
          </AnimatePresence>

          {splashDone && <Header logoTone={step.logo} intro={DEEP_LINK_STEP === null} />}
          <ScrollHint variant={splashDone ? step.hint : null} onClick={next} />

          <AnimatePresence>{!splashDone && <Splash key="splash" />}</AnimatePresence>
        </main>
      </ScreenTransitionContext.Provider>
    </MotionConfig>
  );
}
