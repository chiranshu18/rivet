import { motion } from 'framer-motion';
import styles from './BigBackgroundText.module.scss';

/**
 * Oversized, cropped "Dating goes social" text that sits behind content.
 * Position comes from `className`; tone controls color. Extra props go to the motion.div.
 * tone: 'cream' | 'darkFade'
 */
export default function BigBackgroundText({ lines = ['Dating', 'goes social'], tone = 'cream', className = '', ...motionProps }) {
  return (
    <motion.div className={`${styles.text} ${styles[tone]} ${className}`} aria-hidden="true" {...motionProps}>
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </motion.div>
  );
}
