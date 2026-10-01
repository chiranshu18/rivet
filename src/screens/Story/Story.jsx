import Screen from 'components/Screen';
import Asset from 'components/Asset';
import Button from 'components/Button';
import ChatBubble from 'components/ChatBubble';
import BigBackgroundText from 'components/BigBackgroundText';
import styles from './Story.module.scss';

/** Step 3 (Menu_Mobile-1) – "Every love story used to have witnesses…" */
export default function Story() {
  return (
    <Screen className={styles.screen}>
      <BigBackgroundText tone="darkFade" className={styles.bgText} />

      <h2 className={styles.statement}>
        Every love story
        <br />
        used to have
        <br />
        witnesses. Now
        <br />
        the search
        <br />
        happens alone, on
        <br />a screen built
        <br />
        for one.
      </h2>

      <Asset name="storyHeartBalloon" label="Heart balloon" className={styles.heart} />
      <Asset name="storyAvatarA" label="Avatar" shape="circle" className={`${styles.avatar} ${styles.avatarA}`} />
      <Asset name="storyAvatarB" label="Avatar" shape="circle" className={`${styles.avatar} ${styles.avatarB}`} />

      <ChatBubble variant="pink" tail="thought" className={styles.bubblePink}>
        {'Swipe left-right,\ntirelessly'}
      </ChatBubble>
      <ChatBubble variant="white" tail="thought" className={styles.bubbleWhite}>
        {'Swipe left-right,\ntirelessly'}
      </ChatBubble>

      <Button variant="maroon" className={styles.cta}>
        Read our story
      </Button>
    </Screen>
  );
}
