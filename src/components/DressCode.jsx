import { useLanguage } from '../i18n/LanguageContext';
import styles from './DressCode.module.css';

export default function DressCode() {
  const { t } = useLanguage();

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

          <div className={styles.imageRail}>
            <img src="/docs/images/dresscode-guide.png" alt="Dress code inspiration board" loading="lazy" />
            <img src="/docs/images/dresscode-ladies.webp" alt="Ladies dress inspiration" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
