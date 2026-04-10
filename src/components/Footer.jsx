import { useLanguage } from '../i18n/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.names}>
          {t('footer.names')}
        </div>

        <div className={styles.divider} aria-hidden="true">✦</div>

        <p className={styles.date}>{t('footer.date')}</p>

        <p className={styles.tagline}>
          {t('footer.tagline')}
        </p>

        <p className={styles.copy}>
          &copy; {year} · {t('footer.copy')}
        </p>
      </div>
    </footer>
  );
}
