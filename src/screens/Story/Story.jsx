import { motion } from 'framer-motion';
import Screen from 'components/Screen';
import Asset from 'components/Asset';
import Button from 'components/Button';
import ChatBubble from 'components/ChatBubble';
import BigBackgroundText from 'components/BigBackgroundText';
import { useChoreo } from 'animation/ScreenTransition';
import { storyMotion as v } from './Story.motion';
import styles from './Story.module.scss';

/** Step 3 (Menu_Mobile-1) – "Every love story used to have witnesses…" */
export default function Story() {
  const m = useChoreo();

  return (
    <Screen bg={styles.bg}>
      <BigBackgroundText tone="darkFade" className={styles.bgText} {...m(v.bgText)} />

      <motion.h2 className={styles.statement} {...m(v.statement)}>
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
      </motion.h2>

      <Asset name="storyHeartBalloon" label="Heart balloon" fit="contain" className={styles.heart} {...m(v.heart)} />
      <Asset
        name="storyAvatarA"
        label="Avatar"
        shape="circle"
        className={`${styles.avatar} ${styles.avatarA}`}
        {...m(v.avatarA)}
      />
      <Asset
        name="storyAvatarB"
        label="Avatar"
        shape="circle"
        className={`${styles.avatar} ${styles.avatarB}`}
        {...m(v.avatarB)}
      />

      <ChatBubble variant="pink" tail="thought" className={styles.bubblePink} {...m(v.bubblePink)}>
        {'Swipe left-right,\ntirelessly'}
      </ChatBubble>
      <ChatBubble variant="white" tail="thought" className={styles.bubbleWhite} {...m(v.bubbleWhite)}>
        {'Swipe left-right,\ntirelessly'}
      </ChatBubble>

      <Button variant="maroon" className={styles.cta} {...m(v.cta)}>
        Read our story
      </Button>
    </Screen>
  );
}
