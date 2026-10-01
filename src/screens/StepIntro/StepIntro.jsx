import StepLayout from 'components/StepLayout';
import Asset from 'components/Asset';
import styles from './StepIntro.module.scss';

/** Step 6 (Menu_Mobile-4) – How it works #3: "Promising pairs become introductions". */
export default function StepIntro() {
  return (
    <StepLayout
      number={3}
      tone="night"
      showBgText={false}
      title={
        <>
          Promising pairs
          <br />
          become introductions
        </>
      }
      body="When enough people see something there, Rivet introduces them to you. Less endless swiping. More people worth meeting."
      glow="rgba(255, 120, 190, 0.95)"
    >
      <div className={styles.phone}>
        <h3 className={styles.matchTitle}>
          Its Riveting
          <br />
          Match
        </h3>
        <p className={styles.matchText}>
          You both share the love for mountains, adventurous treks, you both also love baking and cooking
        </p>
        <span className={styles.proceed}>Tap to proceed</span>
        <div className={styles.score}>
          <span className={styles.scoreValue}>
            95<small>%</small>
          </span>
          <span className={styles.scoreText}>of Rivet community thinks you&apos;d vibe with them</span>
        </div>
      </div>

      <Asset name="step3PhotoLeft" label="Photo: him" className={`${styles.matchPhoto} ${styles.photoLeft}`} />
      <Asset name="step3PhotoRight" label="Photo: her" className={`${styles.matchPhoto} ${styles.photoRight}`} />

      <Asset name="step3HeartLeft" label="Pink heart" fit="contain" className={`${styles.heart} ${styles.heartLeft}`} />
      <Asset name="step3HeartSmall" label="Pink heart" fit="contain" className={`${styles.heart} ${styles.heartSmall}`} />
      <Asset
        name="step3HeartRight"
        label="Silver heart"
        fit="contain"
        className={`${styles.heart} ${styles.silver} ${styles.heartRight}`}
      />
      <Asset name="step3HeartBottom" label="Pink heart" fit="contain" className={`${styles.heart} ${styles.heartBottom}`} />
    </StepLayout>
  );
}
