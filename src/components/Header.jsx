import { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './Header.module.css';

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: t('header.nav.booking'), href: '#booking-instructions' },
    { label: t('header.nav.gettingThere'), href: '#getting-there' },
    { label: t('header.nav.dressCode'), href: '#dress-code' },
    { label: t('header.nav.schedule'), href: '#details' },
    { label: t('header.nav.ourStory'), href: '#our-story' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <a href="#hero" className={styles.brand} onClick={handleNavClick}>
            {t('header.brand')}
          </a>

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

      {/* Full-screen overlay nav */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}
        onClick={handleNavClick}
      >
        <nav className={styles.nav} onClick={(e) => e.stopPropagation()}>
          {navLinks.map(({ label, href }) => (
            <a key={href} href={href} className={styles.navLink} onClick={handleNavClick}>
              {label}
            </a>
          ))}
          <a href="#rsvp" className={styles.navCta} onClick={handleNavClick}>
            {t('header.nav.rsvp')}
          </a>
          <button
            className={styles.langToggle}
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
          >
            {t('header.langToggle')}
          </button>
        </nav>
      </div>
    </>
  );
}
