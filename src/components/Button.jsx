import styles from './Button.module.scss';

/**
 * Non-functional CTA button.
 * variant: 'pink' | 'pinkGlow' | 'dark' | 'maroon'
 */
export default function Button({ children, variant = 'pink', className = '', ...rest }) {
  return (
    <button type="button" className={`${styles.btn} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
