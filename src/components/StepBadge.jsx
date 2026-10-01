import { motion } from 'framer-motion';
import styles from './StepBadge.module.scss';

/** Pink rounded square with the step number (1/2/3). Extra props go to the motion.span. */
export default function StepBadge({ number, className = '', ...motionProps }) {
  return (
    <motion.span className={`${styles.badge} ${className}`} {...motionProps}>
      {number}
    </motion.span>
  );
}
