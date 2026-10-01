import { motion } from 'framer-motion';
import { backgroundVariants } from 'animation/choreo';
import styles from './Screen.module.scss';

/**
 * Base wrapper for a full-screen step.
 *  - `className` styles the full-bleed layer (backgrounds, glows, descendant theming).
 *  - `bg` (optional) class for a separate background layer that crossfades
 *    between choreographed screens (see animation/choreo → backgroundVariants).
 *  - `backdrop` renders full-bleed decorative nodes outside the canvas.
 *  - children are placed inside the 430x932 design canvas.
 */
export default function Screen({ className = '', bg = null, backdrop = null, children }) {
  return (
    <section className={`${styles.screen} ${className}`}>
      {bg && <motion.div className={`${styles.bg} ${bg}`} variants={backgroundVariants} />}
      {backdrop}
      <div className={styles.canvas}>{children}</div>
    </section>
  );
}
