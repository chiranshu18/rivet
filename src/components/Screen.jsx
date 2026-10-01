import styles from './Screen.module.scss';

/**
 * Base wrapper for a full-screen step.
 *  - `className` styles the full-bleed layer (backgrounds, glows).
 *  - `backdrop` renders full-bleed decorative nodes outside the canvas.
 *  - children are placed inside the 430x932 design canvas.
 */
export default function Screen({ className = '', backdrop = null, children }) {
  return (
    <section className={`${styles.screen} ${className}`}>
      {backdrop}
      <div className={styles.canvas}>{children}</div>
    </section>
  );
}
