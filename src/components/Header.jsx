import { RxHamburgerMenu } from 'react-icons/rx';
import Logo from './Logo';
import StoreIcons from './StoreIcons';
import styles from './Header.module.scss';

/** Persistent top bar (lives above all screens). Buttons are non-functional. */
export default function Header({ logoTone = 'dark' }) {
  return (
    <header className={styles.header}>
      <button type="button" className={styles.iconBtn} aria-label="Open menu">
        <RxHamburgerMenu className={styles.burger} />
      </button>
      <Logo tone={logoTone} />
      <button type="button" className={styles.iconBtn} aria-label="Download the app">
        <StoreIcons divider />
      </button>
    </header>
  );
}
