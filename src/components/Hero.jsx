import { useLanguage } from '../i18n/LanguageContext';
import styles from './Hero.module.css';
import ceremonyVenue from '../assets/Ceremony_venue.jpg';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className={styles.hero}
      style={{ '--hero-image': `url(${ceremonyVenue})` }}
    >
      <div className={styles.backdrop} aria-hidden="true" />

      <div className={styles.content}>
        <h1 className={styles.mainTitle}>{t('hero.mainTitle')}</h1>
        <p className={styles.coupleName}>{t('hero.coupleName')}</p>

        <div className={styles.divider} aria-hidden="true">
          <span className={styles.dividerLine} />
          <span className={styles.dividerFlower}>✦</span>
          <span className={styles.dividerLine} />
        </div>

        <p className={styles.invite}>{t('hero.invite')}</p>

        <div className={styles.details}>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>{t('hero.dateLabel')}</span>
            <span className={styles.detailValue}>{t('hero.dateValue')}</span>
          </div>
          <div className={styles.detailSep} aria-hidden="true">✦</div>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>{t('hero.locationLabel')}</span>
            <span className={styles.detailValue}>{t('hero.locationValue')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
