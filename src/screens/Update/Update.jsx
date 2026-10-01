import Screen from 'components/Screen';
import Asset from 'components/Asset';
import ChatBubble from 'components/ChatBubble';
import styles from './Update.module.scss';

/** Step 2 (Menu_Mobile) – "Dating just got an major update!" */
export default function Update() {
  return (
    <Screen className={styles.screen}>
      <Asset name="updatePhotoMan" label="Photo: man smiling" className={`${styles.photo} ${styles.man}`} />
      <Asset name="updatePhotoWoman" label="Photo: woman smiling" className={`${styles.photo} ${styles.woman}`} />

      <Asset name="updateAvatarTop" label="Avatar" shape="circle" className={`${styles.avatar} ${styles.avatarTop}`} />
      <ChatBubble variant="blue" className={styles.bubbleTop}>
        {'Some people just\nmake sense'}
      </ChatBubble>

      <ChatBubble variant="blue" className={styles.bubbleBottom}>
        {'Some people just\nmake sense'}
      </ChatBubble>
      <Asset name="updateAvatarBottom" label="Avatar" shape="circle" className={`${styles.avatar} ${styles.avatarBottom}`} />

      <h2 className={styles.title}>
        Dating just got an
        <br />
        major update!
      </h2>
      <p className={styles.body}>
        Rivet is modern dating app that making the dating a social activity. Rivet is modern dating app
        that making the dating a social activity.
      </p>
    </Screen>
  );
}
