import { ASSETS } from 'assets';
import styles from './Logo.module.scss';

/** Rivet wordmark. Uses the registered SVG/PNG if present, else a font fallback. */
export default function Logo({ tone = 'dark', className = '' }) {
  if (ASSETS.logoWordmark) {
    return <img src={ASSETS.logoWordmark} alt="Rivet" className={`${styles.img} ${className}`} />;
  }
  return <span className={`${styles.logo} ${styles[tone]} ${className}`}>Rivet</span>;
}
