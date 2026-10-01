import StepLayout from 'components/StepLayout';
import Asset from 'components/Asset';
import ChatBubble from 'components/ChatBubble';
import styles from './StepChemistry.module.scss';

/** Step 5 (Menu_Mobile-3) – How it works #2: "Let people spot the chemistry". */
export default function StepChemistry() {
  return (
    <StepLayout
      number={2}
      title={
        <>
          Let people spot the
          <br />
          chemistry
        </>
      }
      body="Matchers see you in potential pairs, not alone, and back the connections they can genuinely imagine working."
      glow="rgba(196, 214, 240, 0.95)"
    >
      <Asset name="step2Photo" label="Photo: couple piggyback" className={styles.photo} />

      <Asset name="step2AvatarTop" label="Avatar" shape="circle" className={`${styles.avatar} ${styles.avatarTop}`} />
      <ChatBubble variant="blue" className={styles.bubbleTop}>
        {'Some people just\nmake sense'}
      </ChatBubble>

      <ChatBubble variant="pink" tail="bottomRight" className={styles.bubbleRight}>
        {'Some people just\nmake sense'}
      </ChatBubble>
      <Asset name="step2AvatarRight" label="Avatar" shape="circle" className={`${styles.avatar} ${styles.avatarRight}`} />

      <Asset name="step2HeartBalloon" label="Heart balloon" className={styles.heart} />
      <Asset name="step2CrossBalloon" label="X balloon" className={styles.cross} />
    </StepLayout>
  );
}
