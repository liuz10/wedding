import { useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './DressCode.module.css';

export default function DressCode() {
  const { t } = useLanguage();
  const railRef = useRef(null);
  const scrollZoneRef = useRef(null);

  /* ── Mobile: vertical scroll → horizontal image scroll ── */
  useEffect(() => {
    const zone = scrollZoneRef.current;
    const rail = railRef.current;
    if (!zone || !rail) return;
    const mq = window.matchMedia('(max-width: 700px)');
    if (!mq.matches) return;

    const handleScroll = () => {
      const rect = zone.getBoundingClientRect();
      const zoneHeight = zone.offsetHeight;
      const viewportH = window.innerHeight;
      // progress 0→1 as we scroll through the zone
      const scrolled = -rect.top;
      const scrollable = zoneHeight - viewportH;
      if (scrollable <= 0) return;
      const progress = Math.min(Math.max(scrolled / scrollable, 0), 1);
      const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
      rail.scrollLeft = progress * maxScrollLeft;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="dress-code" className={styles.section}>
      <div className="container">
        <p className="section-subtitle">{t('dress.subtitle')}</p>
        <h2 className="section-title">{t('dress.title')}</h2>
        <div className="section-divider"><span>✦</span></div>

        <div className={styles.content}>
          <div className={styles.copy}>
            <p className={styles.lead}>{t('dress.lead')}</p>
            <p>{t('dress.copy')}</p>
          </div>
        </div>
      </div>

      {/* Scroll zone: tall on mobile to drive the horizontal scroll */}
      <div className={styles.scrollZone} ref={scrollZoneRef}>
        <div className={styles.stickyRail}>
          <div className={styles.imageRail} ref={railRef}>
            <img src="/docs/images/dresscode-new1.jpg" alt="Dress code guide 1" loading="lazy" />
            <img src="/docs/images/dresscode-new2.jpg" alt="Dress code guide 2" loading="lazy" />
            <img src="/docs/images/dresscode-guide.png" alt="Dress code inspiration board" loading="lazy" />
            <img src="/docs/images/dresscode-ladies.webp" alt="Ladies dress inspiration" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
