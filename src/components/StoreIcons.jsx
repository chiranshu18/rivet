import { FaApple } from 'react-icons/fa';
import { IoPlay } from 'react-icons/io5';
import styles from './StoreIcons.module.scss';

/** Play Store + App Store glyphs. `divider` renders the thin bar between them (header). */
export default function StoreIcons({ divider = false, className = '' }) {
  return (
    <span className={`${styles.wrap} ${className}`}>
      <IoPlay className={styles.icon} />
      {divider && <span className={styles.divider} />}
      <FaApple className={styles.icon} />
    </span>
  );
}
