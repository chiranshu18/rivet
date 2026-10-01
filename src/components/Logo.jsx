import { motion } from 'framer-motion';
import { ASSETS } from 'assets';
import styles from './Logo.module.scss';

/**
 * Rivet wordmark. Uses the registered SVG/PNG if present, else a font fallback.
 * Extra props (e.g. layoutId for the splash → header flight) go to the motion element.
 */
export default function Logo({ tone = 'dark', className = '', ...motionProps }) {
  if (ASSETS.logoWordmark) {
    return <motion.img src={ASSETS.logoWordmark} alt="Rivet" className={`${styles.img} ${className}`} {...motionProps} />;
  }
  return (
    <motion.span className={`${styles.logo} ${styles[tone]} ${className}`} {...motionProps}>
      Rivet
    </motion.span>
  );
}
