import styles from './StepBadge.module.scss';

/** Pink rounded square with the step number (1/2/3). */
export default function StepBadge({ number, className = '' }) {
  return <span className={`${styles.badge} ${className}`}>{number}</span>;
}
