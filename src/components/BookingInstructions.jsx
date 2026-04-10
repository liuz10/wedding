import { useLanguage } from '../i18n/LanguageContext';
import styles from './BookingInstructions.module.css';

export default function BookingInstructions() {
  const { t } = useLanguage();

  return (
    <section id="booking-instructions" className={styles.section}>
      <div className="container">
        <p className="section-subtitle">{t('booking.subtitle')}</p>
        <h2 className="section-title">{t('booking.title')}</h2>
        <div className="section-divider"><span>✦</span></div>

        <div className={styles.panel}>
          <p className={styles.longCopy} dangerouslySetInnerHTML={{ __html: t('booking.copy') }} />

          <div className={styles.contactRow}>
            <a href="tel:+18085652587" className={styles.contactItem}>
              <span>{t('booking.callLabel')}</span>
              <strong>{t('booking.callValue')}</strong>
            </a>
            <a href="mailto:reservations.Lanai@fourseasons.com" className={styles.contactItem}>
              <span>{t('booking.emailLabel')}</span>
              <strong>{t('booking.emailValue')}</strong>
            </a>
          </div>
        </div>

        <div className={styles.activitiesPanel}>
          <h3 className={styles.activitiesTitle}>{t('booking.activitiesTitle')}</h3>

          <div className={styles.activityGrid}>
            <a href="https://www.fourseasons.com/lanai/spa/" target="_blank" rel="noopener noreferrer" className={styles.activityCard}>
              <span className={styles.activityEmoji} aria-hidden="true">&#128134;</span>
              <strong>{t('booking.spaTitle')}</strong>
              <p>{t('booking.spaDesc')}</p>
              <span className={styles.activityLink}>{t('booking.spaLink')} &rarr;</span>
            </a>

            <a href="https://www.fourseasons.com/lanai/experiences/" target="_blank" rel="noopener noreferrer" className={styles.activityCard}>
              <span className={styles.activityEmoji} aria-hidden="true">&#127796;</span>
              <strong>{t('booking.experienceTitle')}</strong>
              <p>{t('booking.experienceDesc')}</p>
              <span className={styles.activityLink}>{t('booking.experienceLink')} &rarr;</span>
            </a>
          </div>

          <p className={styles.activitiesCopy}>
            {t('booking.activitiesCopy')}{' '}
            <a href="mailto:exp.lanai@fourseasons.com">{t('booking.activitiesEmail')}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
