import Screen from 'components/Screen';
import Asset from 'components/Asset';
import Button from 'components/Button';
import styles from './Testimonials.module.scss';

// Design repeats the same testimonial on every card. Replace with real ones when available.
const TESTIMONIAL = {
  quote: '“He is so not my\ntype usually!”',
  body: 'The community introduced someone I wouldn’t have found on my own and honestly was not my usual type at all. I said yes anyway. That was eight months ago. We just booked a trip together.',
  author: '31, Maya T. Charlotte, ND',
};

// Card positions are defined in the SCSS module (one class per slot).
const CARD_SLOTS = ['topLeft', 'topRight', 'midLeft', 'bottomRight', 'bottomLeft'];

function TestimonialCard({ slot, data }) {
  return (
    <article className={`${styles.card} ${styles[slot]}`}>
      <Asset name="testimonialAvatar" label="Avatar" shape="circle" className={styles.avatar} />
      <h3 className={styles.quote}>{data.quote}</h3>
      <p className={styles.body}>{data.body}</p>
      <span className={styles.author}>{data.author}</span>
    </article>
  );
}

/** Step 7 (Menu_Mobile-5) – "Real people, Real lives, Real stories". */
export default function Testimonials() {
  return (
    <Screen className={styles.screen}>
      <h2 className={styles.title}>
        Real people,
        <br />
        Real lives, Real
        <br />
        Stories
      </h2>

      {CARD_SLOTS.map((slot) => (
        <TestimonialCard key={slot} slot={slot} data={TESTIMONIAL} />
      ))}

      <div className={styles.topFade} aria-hidden="true" />

      <Button variant="pinkSolid" className={styles.cta}>
        Get Riveting
      </Button>
    </Screen>
  );
}
