import { useState, useEffect } from 'react';
import styles from './Header.module.css';

const navLinks = [
  { label: 'Ceremony', href: '#ceremony-photo' },
  { label: 'Getting There', href: '#getting-there' },
  { label: 'Weekend Schedule', href: '#details' },
  { label: 'Dress Code', href: '#dress-code' },
  { label: 'RSVP', href: '#rsvp' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.brand}>
          Alice &amp; Johnny
        </a>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} className={styles.navLink} onClick={handleNavClick}>
              {label}
            </a>
          ))}
          <a href="#rsvp" className={styles.navCta} onClick={handleNavClick}>
            RSVP
          </a>
        </nav>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
