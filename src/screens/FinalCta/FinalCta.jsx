import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import Asset from 'components/Asset';
import Button from 'components/Button';
import styles from './FinalCta.module.scss';

const FOOTER_LINKS = [
  ['Terms & Conditions', 'Image Guidelines', 'Community guidelines'],
  ['Privacy Policy & Cookies Policy', 'News features'],
];

const FOOTER_AVATARS = [1, 2, 3, 4, 5, 6, 7];

/**
 * Step 9 (Menu_Mobile-7 + Menu_Mobile-8) – final CTA, two sub-steps:
 *   subStep 0 → full white card with floating photos
 *   subStep 1 → card shrinks upward (content compacts, photos fade) revealing the footer
 * The sub-step switch is driven purely by the `.compact` class + CSS transitions.
 */
export default function FinalCta({ subStep = 0 }) {
  const compact = subStep === 1;

  return (
    <section className={`${styles.screen} ${compact ? styles.compact : ''}`}>
      {/* Footer (sits underneath the card) */}
      <div className={styles.canvas}>
        <div className={styles.footerWordmark} aria-hidden="true">
          Rivet
        </div>
        <p className={styles.credits}>
          Meant2be, Inc. ©2026
          <br />
          Made with love in New York &amp; India
        </p>
        <div className={styles.socials}>
          <FaInstagram />
          <FaYoutube />
          <FaTiktok />
        </div>
        {FOOTER_AVATARS.map((n) => (
          <Asset
            key={n}
            name={`footerAvatar${n}`}
            label="Avatar"
            shape="circle"
            className={`${styles.footerAvatar} ${styles[`fa${n}`]}`}
          />
        ))}
      </div>

      {/* White card background (height animates between sub-steps) */}
      <div className={styles.card} />

      {/* Card content */}
      <div className={styles.canvas}>
        <Asset name="ctaPhotoTopLeft" label="Photo: friends" className={`${styles.photo} ${styles.pTopLeft}`} />
        <Asset name="ctaPhotoTopRight" label="Photo: party (blurred)" className={`${styles.photo} ${styles.pTopRight}`} />
        <Asset name="ctaPhotoMidLeft" label="Photo: couple" className={`${styles.photo} ${styles.pMidLeft}`} />
        <Asset name="ctaPhotoMidRight" label="Photo: dancing" className={`${styles.photo} ${styles.pMidRight}`} />

        <h2 className={styles.title}>
          Let people find
          <br />
          your person.
        </h2>
        <h2 className={styles.getIt}>Get it now</h2>
        <Button variant="pinkGlow" className={styles.cta}>
          Download Rivet Dating
        </Button>

        <p className={styles.body}>
          Only people can spot chemistry. That&apos;s why Matchers on Rivet vet your matches before you do
        </p>

        <a className={styles.follow} href="#follow" onClick={(e) => e.preventDefault()}>
          <FaInstagram className={styles.followIcon} /> Follow us on @rivet.dating
        </a>

        <nav className={styles.links}>
          {FOOTER_LINKS.map((row) => (
            <div key={row[0]} className={styles.linkRow}>
              {row.map((label) => (
                <a key={label} href="#legal" onClick={(e) => e.preventDefault()}>
                  {label}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}
