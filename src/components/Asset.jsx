import { motion } from 'framer-motion';
import { ASSETS } from 'assets';
import styles from './Asset.module.scss';

/**
 * Renders a registered asset (see src/assets/index.js) or, if it's not
 * available yet, a labelled dashed placeholder box.
 *
 * Sizing/positioning always comes from `className` (set by the screen),
 * so swapping placeholder -> real image never changes layout.
 * Extra props (variants, custom, ...) go to the underlying motion element.
 *
 * shape: 'rect' | 'circle'
 * fit:   'cover' (photos) | 'contain' (transparent cut-outs like 3D hearts/balloons)
 */
export default function Asset({ name, label, className = '', shape = 'rect', fit = 'cover', alt = '', ...motionProps }) {
  const src = ASSETS[name];
  const shapeClass = shape === 'circle' ? styles.circle : '';

  if (src) {
    return (
      <motion.img
        src={src}
        alt={alt}
        className={`${styles.img} ${fit === 'contain' ? styles.contain : ''} ${shapeClass} ${className}`}
        draggable={false}
        {...motionProps}
      />
    );
  }

  return (
    <motion.div
      className={`${styles.placeholder} ${shapeClass} ${className}`}
      data-asset={name}
      aria-hidden="true"
      {...motionProps}
    >
      <span className={styles.label}>{label || name}</span>
    </motion.div>
  );
}
