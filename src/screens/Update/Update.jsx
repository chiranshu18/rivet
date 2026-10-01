import { motion } from 'framer-motion';
import Screen from 'components/Screen';
import Asset from 'components/Asset';
import ChatBubble from 'components/ChatBubble';
import { useChoreo } from 'animation/ScreenTransition';
import { updateMotion as v } from './Update.motion';
import styles from './Update.module.scss';

/** Step 2 (Menu_Mobile) – "Dating just got an major update!" */
export default function Update() {
  const m = useChoreo();

  return (
    <Screen bg={styles.bg}>
      <Asset
        name="updatePhotoMan"
        label="Photo: man smiling"
        className={`${styles.photo} ${styles.man}`}
        {...m(v.man)}
      />
      <Asset
        name="updatePhotoWoman"
        label="Photo: woman smiling"
        className={`${styles.photo} ${styles.woman}`}
        {...m(v.woman)}
      />

      <Asset
        name="updateAvatarTop"
        label="Avatar"
        shape="circle"
        className={`${styles.avatar} ${styles.avatarTop}`}
        {...m(v.avatarTop)}
      />
      <ChatBubble variant="blue" className={styles.bubbleTop} {...m(v.bubbleTop)}>
        {'Some people just\nmake sense'}
      </ChatBubble>

      <ChatBubble variant="blue" className={styles.bubbleBottom} {...m(v.bubbleBottom)}>
        {'Some people just\nmake sense'}
      </ChatBubble>
      <Asset
        name="updateAvatarBottom"
        label="Avatar"
        shape="circle"
        className={`${styles.avatar} ${styles.avatarBottom}`}
        {...m(v.avatarBottom)}
      />

      <motion.h2 className={styles.title} {...m(v.title)}>
        Dating just got an
        <br />
        major update!
      </motion.h2>
      <motion.p className={styles.body} {...m(v.body)}>
        Rivet is modern dating app that making the dating a social activity. Rivet is modern dating app
        that making the dating a social activity.
      </motion.p>
    </Screen>
  );
}
