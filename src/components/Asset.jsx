import { ASSETS } from 'assets';
import styles from './Asset.module.scss';

/**
 * Renders a registered asset (see src/assets/index.js) or, if it's not
 * available yet, a labelled dashed placeholder box.
 *
 * Sizing/positioning always comes from `className` (set by the screen),
 * so swapping placeholder -> real image never changes layout.
 *
 * shape: 'rect' | 'circle'
 */
export default function Asset({ name, label, className = '', shape = 'rect', alt = '', style }) {
  const src = ASSETS[name];
  const shapeClass = shape === 'circle' ? styles.circle : '';

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${styles.img} ${shapeClass} ${className}`}
        style={style}
        draggable={false}
      />
    );
  }

  return (
    <div
      className={`${styles.placeholder} ${shapeClass} ${className}`}
      style={style}
      data-asset={name}
      aria-hidden="true"
    >
      <span className={styles.label}>{label || name}</span>
    </div>
  );
}
