import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from 'components/Header';
import ScrollHint from 'components/ScrollHint';
import Splash, { SPLASH_MS } from 'screens/Splash/Splash';
import useStepNavigation from 'hooks/useStepNavigation';
import { SCREENS, STEPS } from 'config/screens';
import { defaultScreenVariants, SCREEN_TRANSITION_MS } from 'config/transitions';
import styles from './App.module.scss';

// Dev shortcut: `?step=N` (0-based index into STEPS) skips the splash and opens that step.
const STEP_PARAM = new URLSearchParams(window.location.search).get('step');
const DEEP_LINK_STEP =
  STEP_PARAM !== null && Number.isInteger(Number(STEP_PARAM))
    ? Math.max(0, Math.min(STEPS.length - 1, Number(STEP_PARAM)))
    : null;

export default function App() {
  const [splashDone, setSplashDone] = useState(DEEP_LINK_STEP !== null);
  const { index, direction, next } = useStepNavigation({
    count: STEPS.length,
    lockMs: SCREEN_TRANSITION_MS,
    enabled: splashDone,
    initialIndex: DEEP_LINK_STEP ?? 0,
  });

  useEffect(() => {
    if (splashDone) return undefined;
    const t = window.setTimeout(() => setSplashDone(true), SPLASH_MS);
    return () => window.clearTimeout(t);
  }, [splashDone]);

  const step = STEPS[index];
  const screen = SCREENS[step.screenIndex];
  const { Component } = screen;

  return (
    <main className={styles.app}>
      {/* Keyed by screen (not step) so sub-steps animate inside the same screen. */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={screen.id}
          className={styles.layer}
          custom={direction}
          variants={screen.variants || defaultScreenVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <Component subStep={step.subStep} direction={direction} />
        </motion.div>
      </AnimatePresence>

      <Header logoTone={step.logo} />
      <ScrollHint variant={splashDone ? step.hint : null} onClick={next} />

      <AnimatePresence>{!splashDone && <Splash key="splash" />}</AnimatePresence>
    </main>
  );
}
