import Screen from 'components/Screen';
import Asset from 'components/Asset';
import Button from 'components/Button';
import StoreIcons from 'components/StoreIcons';
import styles from './Hero.module.scss';

/** Step 1 (HERO2) – "Better introductions, brought to you by people". */
export default function Hero() {
  return (
    <Screen className={styles.screen}>
      <Asset name="heroPhotoTopLeft" label="Photo: couple on sofa" className={`${styles.photo} ${styles.topLeft}`} />
      <Asset name="heroPhotoTopRight" label="Photo: woman laughing" className={`${styles.photo} ${styles.topRight}`} />
      <Asset name="heroPhotoBottomLeft" label="Photo: vinyl party" className={`${styles.photo} ${styles.bottomLeft}`} />
      <Asset name="heroPhotoBottomRight" label="Photo: friends smiling" className={`${styles.photo} ${styles.bottomRight}`} />

      <h1 className={styles.title}>
        Better
        <br />
        <span className={styles.accent}>introductions,</span>
        <br />
        brought to you
        <br />
        by <span className={styles.accent}>people</span>
      </h1>

      <Button variant="dark" className={styles.cta}>
        Download Rivet <StoreIcons />
      </Button>
    </Screen>
  );
}
