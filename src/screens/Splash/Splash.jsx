import { motion } from 'framer-motion';
import { ASSETS } from 'assets';
import styles from './Splash.module.scss';

/**
 * Intro loader (HERO1). Not a scroll step: App shows it for SPLASH_MS on load,
 * then unmounts it (exit animation below) and the first step takes over.
 */
export const SPLASH_MS = 2200;

export default function Splash() {
  return (
    <motion.div
      className={styles.splash}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
    >
      <motion.div
        className={styles.logoWrap}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {ASSETS.splashLogo ? (
          <img src={ASSETS.splashLogo} alt="Rivet" className={styles.logoImg} />
        ) : (
          <span className={styles.logoText}>Rivet</span>
        )}
      </motion.div>
    </motion.div>
  );
}
