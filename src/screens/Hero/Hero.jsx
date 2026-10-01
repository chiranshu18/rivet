import { motion } from 'framer-motion';
import Screen from 'components/Screen';
import Asset from 'components/Asset';
import Button from 'components/Button';
import StoreIcons from 'components/StoreIcons';
import { useChoreo } from 'animation/ScreenTransition';
import { heroMotion as v } from './Hero.motion';
import styles from './Hero.module.scss';

/** Step 1 (HERO2) – "Better introductions, brought to you by people". */
export default function Hero() {
  const m = useChoreo();

  return (
    <Screen bg={styles.bg}>
      <Asset
        name="heroPhotoTopLeft"
        label="Photo: couple on sofa"
        className={`${styles.photo} ${styles.topLeft}`}
        {...m(v.topLeft)}
      />
      <Asset
        name="heroPhotoTopRight"
        label="Photo: woman laughing"
        className={`${styles.photo} ${styles.topRight}`}
        {...m(v.topRight)}
      />
      <Asset
        name="heroPhotoBottomLeft"
        label="Photo: vinyl party"
        className={`${styles.photo} ${styles.bottomLeft}`}
        {...m(v.bottomLeft)}
      />
      <Asset
        name="heroPhotoBottomRight"
        label="Photo: friends smiling"
        className={`${styles.photo} ${styles.bottomRight}`}
        {...m(v.bottomRight)}
      />

      <motion.h1 className={styles.title} {...m(v.title)}>
        Better
        <br />
        <span className={styles.accent}>introductions,</span>
        <br />
        brought to you
        <br />
        by <span className={styles.accent}>people</span>
      </motion.h1>

      <Button variant="dark" className={styles.cta} {...m(v.cta)}>
        Download Rivet <StoreIcons />
      </Button>
    </Screen>
  );
}
