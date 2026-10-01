import { motion } from 'framer-motion';
import styles from './Button.module.scss';

/**
 * Non-functional CTA button. Extra props go to the underlying motion.button.
 * variant: 'pink' | 'pinkSolid' | 'pinkGlow' | 'dark' | 'maroon'
 */
export default function Button({ children, variant = 'pink', className = '', ...rest }) {
  return (
    <motion.button type="button" className={`${styles.btn} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </motion.button>
  );
}
