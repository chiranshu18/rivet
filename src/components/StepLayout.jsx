import { motion } from 'framer-motion';
import { useChoreo } from 'animation/ScreenTransition';
import Screen from './Screen';
import StepBadge from './StepBadge';
import Button from './Button';
import BigBackgroundText from './BigBackgroundText';
import { stepMotion as v } from './StepLayout.motion';
import styles from './StepLayout.module.scss';

/**
 * Shared shell for the three "how it works" steps.
 * Bottom half (badge, title, body, CTA) is identical; the collage (`children`)
 * is screen-specific and placed in design-px inside the canvas. The collage
 * animates as one group (see StepLayout.motion.js).
 *
 * tone: 'cream' (steps 1–2) | 'night' (step 3)
 * glow: CSS color for the soft glow at the bottom edge
 */
export default function StepLayout({ number, title, body, tone = 'cream', glow, showBgText = true, children }) {
  const m = useChoreo();

  return (
    <Screen
      className={styles[tone] || ''}
      bg={styles[`${tone}Bg`]}
      backdrop={<div className={styles.glow} style={{ '--glow': glow }} />}
    >
      {showBgText && <BigBackgroundText tone="cream" className={styles.bgText} {...m(v.bgText)} />}

      <motion.div className={styles.collage} {...m(v.collage)}>
        {children}
      </motion.div>

      <StepBadge number={number} className={styles.badge} {...m(v.badge)} />
      <motion.h2 className={styles.title} {...m(v.title)}>
        {title}
      </motion.h2>
      <motion.p className={styles.body} {...m(v.body)}>
        {body}
      </motion.p>
      <Button variant="pink" className={styles.cta} {...m(v.cta)}>
        Get Riveting
      </Button>
    </Screen>
  );
}
