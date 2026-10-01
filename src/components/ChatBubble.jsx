import { motion } from 'framer-motion';
import styles from './ChatBubble.module.scss';

/**
 * Small speech / thought bubble used across collages.
 * variant: 'blue' | 'pink' | 'white'
 * tail:    'bottomLeft' | 'bottomRight' | 'thought' | 'none'
 * Position + rotation come from `className`. Extra props go to the motion.div.
 */
export default function ChatBubble({ children, variant = 'blue', tail = 'bottomLeft', className = '', ...motionProps }) {
  return (
    <motion.div className={`${styles.bubble} ${styles[variant]} ${styles[tail]} ${className}`} {...motionProps}>
      {children}
      {tail === 'thought' && (
        <>
          <span className={styles.dotLg} />
          <span className={styles.dotSm} />
        </>
      )}
    </motion.div>
  );
}
