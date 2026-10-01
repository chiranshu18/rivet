import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RxHamburgerMenu } from 'react-icons/rx';
import { EASE_OUT } from 'animation/choreo';
import { LOGO_LAYOUT_ID, LOGO_FLIGHT_S } from 'screens/Splash/Splash';
import Logo from './Logo';
import StoreIcons from './StoreIcons';
import styles from './Header.module.scss';

/**
 * Persistent top bar (lives above all screens). Buttons are non-functional.
 * `intro`: play the post-splash entrance — the logo flies in from the splash
 * (shared layoutId) turning pink → `logoTone`, the menu button slides in from
 * the left and the store button fades in.
 */
export default function Header({ logoTone = 'dark', intro = false }) {
  // 'start' (splash pink) → 'flying' (slow color transition) → 'done'
  const [logoPhase, setLogoPhase] = useState(intro ? 'start' : 'done');

  useEffect(() => {
    if (!intro) return undefined;
    const raf = requestAnimationFrame(() => setLogoPhase('flying'));
    const t = window.setTimeout(() => setLogoPhase('done'), LOGO_FLIGHT_S * 1000 + 100);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [intro]);

  return (
    <header className={styles.header}>
      <motion.button
        type="button"
        className={styles.iconBtn}
        aria-label="Open menu"
        initial={intro ? { x: '-140%' } : false}
        animate={{ x: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: EASE_OUT }}
      >
        <RxHamburgerMenu className={styles.burger} />
      </motion.button>
      <Logo
        tone={logoPhase === 'start' ? 'splash' : logoTone}
        className={logoPhase === 'flying' ? styles.logoFlying : ''}
        layoutId={LOGO_LAYOUT_ID}
        layoutCrossfade={false}
        transition={{ layout: { duration: LOGO_FLIGHT_S, ease: [0.45, 0, 0.2, 1] } }}
      />
      <motion.button
        type="button"
        className={styles.iconBtn}
        aria-label="Download the app"
        initial={intro ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
      >
        <StoreIcons divider />
      </motion.button>
    </header>
  );
}
