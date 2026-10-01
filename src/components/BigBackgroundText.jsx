import styles from './BigBackgroundText.module.scss';

/**
 * Oversized, cropped "Dating goes social" text that sits behind content.
 * Position comes from `className`; tone controls color.
 * tone: 'cream' | 'darkFade'
 */
export default function BigBackgroundText({ lines = ['Dating', 'goes social'], tone = 'cream', className = '' }) {
  return (
    <div className={`${styles.text} ${styles[tone]} ${className}`} aria-hidden="true">
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </div>
  );
}
