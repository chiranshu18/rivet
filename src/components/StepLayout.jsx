import Screen from './Screen';
import StepBadge from './StepBadge';
import Button from './Button';
import BigBackgroundText from './BigBackgroundText';
import styles from './StepLayout.module.scss';

/**
 * Shared shell for the three "how it works" steps.
 * Bottom half (badge, title, body, CTA) is identical; the collage (`children`)
 * is screen-specific and placed in design-px inside the canvas.
 *
 * tone: 'cream' (steps 1–2) | 'night' (step 3)
 * glow: CSS color for the soft glow at the bottom edge
 */
export default function StepLayout({ number, title, body, tone = 'cream', glow, showBgText = true, children }) {
  return (
    <Screen
      className={`${styles.screen} ${styles[tone]}`}
      backdrop={<div className={styles.glow} style={{ '--glow': glow }} />}
    >
      {showBgText && <BigBackgroundText tone="cream" className={styles.bgText} />}

      {children}

      <StepBadge number={number} className={styles.badge} />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.body}>{body}</p>
      <Button variant="pink" className={styles.cta}>
        Get Riveting
      </Button>
    </Screen>
  );
}
