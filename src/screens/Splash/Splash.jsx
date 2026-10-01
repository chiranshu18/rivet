import { motion } from 'framer-motion';
import { ASSETS } from 'assets';
import styles from './Splash.module.scss';

/**
 * Intro loader (HERO1). Not a scroll step: App shows it for SPLASH_MS on load,
 * then unmounts it. On exit the gradient fades away while the logo flies into
 * the header: the header Logo shares LOGO_LAYOUT_ID, so Framer Motion animates
 * it from this box to its own (Header handles the pink → dark color change).
 */
export const SPLASH_MS = 2200;
export const LOGO_LAYOUT_ID = 'rivet-logo';
export const LOGO_FLIGHT_S = 1;

export default function Splash() {
  return (
    <motion.div className={styles.splash}>
      <motion.div
        className={styles.bg}
        exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
      />
      <motion.div
        className={styles.logoWrap}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {ASSETS.splashLogo ? (
          <motion.img layoutId={LOGO_LAYOUT_ID} src={ASSETS.splashLogo} alt="Rivet" className={styles.logoImg} />
        ) : (
          <motion.span layoutId={LOGO_LAYOUT_ID} className={styles.logoText}>
            Rivet
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
