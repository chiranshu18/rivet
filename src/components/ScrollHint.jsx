import { AnimatePresence, motion } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi2';
import styles from './ScrollHint.module.scss';

/**
 * "Scroll for more" pill pinned to the bottom of the column.
 * variant: 'light' | 'dark' | 'outline' | 'rose' | null (hidden)
 */
export default function ScrollHint({ variant, onClick }) {
  return (
    <AnimatePresence>
      {variant && (
        <motion.button
          key="hint"
          type="button"
          className={`${styles.hint} ${styles[variant]}`}
          onClick={onClick}
          initial={{ opacity: 0, y: 10, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 10, x: '-50%' }}
          transition={{ duration: 0.3 }}
        >
          Scroll for more <HiArrowDown className={styles.arrow} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
