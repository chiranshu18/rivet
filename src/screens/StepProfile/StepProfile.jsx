import { MdVerified } from 'react-icons/md';
import { FaMicrophone } from 'react-icons/fa';
import StepLayout from 'components/StepLayout';
import Asset from 'components/Asset';
import ChatBubble from 'components/ChatBubble';
import styles from './StepProfile.module.scss';

const WAVE_BARS = [6, 12, 9, 16, 10, 20, 14, 8, 18, 11, 22, 9, 15, 7, 17, 12, 8, 14, 6, 10];

/** Step 4 (Menu_Mobile-2) – How it works #1: "Make a profile that feels like you". */
export default function StepProfile() {
  return (
    <StepLayout
      number={1}
      title={
        <>
          Make a profile that
          <br />
          feels like you
        </>
      }
      body="Share the photos, prompts, and little details that give Matchers something real to go on."
      glow="rgba(232, 236, 160, 0.95)"
    >
      <Asset name="step1Photo" label="Photo: profile (man, glasses)" className={styles.photo} />

      <span className={styles.verified}>
        <MdVerified className={styles.verifiedIcon} /> verified
      </span>

      <ChatBubble variant="pink" tail="thought" className={styles.bubbleFav}>
        Favourite thing...
      </ChatBubble>
      <ChatBubble variant="white" tail="thought" className={styles.bubbleWalk}>
        {'Walk with my dog\nin the morning'}
      </ChatBubble>

      <div className={styles.voice}>
        <div className={styles.wave}>
          {WAVE_BARS.map((h, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={i} style={{ height: `calc(${h} * var(--u))` }} />
          ))}
        </div>
        <span className={styles.mic}>
          <FaMicrophone />
        </span>
      </div>

      <article className={styles.infoCard}>
        <h3 className={styles.infoTitle}>
          Senior Retoucher
          <br />
          at DigitalHorizon
        </h3>
        <p className={styles.infoBody}>
          He&apos;s defined by her precision and community spirit, finding peace with her cat Chad and friends in
          the mix. She lives purpose-first, leaving the noise far behind.
        </p>
      </article>
    </StepLayout>
  );
}
