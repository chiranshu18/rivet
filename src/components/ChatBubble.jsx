import styles from './ChatBubble.module.scss';

/**
 * Small speech / thought bubble used across collages.
 * variant: 'blue' | 'pink' | 'white'
 * tail:    'bottomLeft' | 'bottomRight' | 'thought' | 'none'
 * Position + rotation come from `className`.
 */
export default function ChatBubble({ children, variant = 'blue', tail = 'bottomLeft', className = '' }) {
  return (
    <div className={`${styles.bubble} ${styles[variant]} ${styles[tail]} ${className}`}>
      {children}
      {tail === 'thought' && (
        <>
          <span className={styles.dotLg} />
          <span className={styles.dotSm} />
        </>
      )}
    </div>
  );
}
