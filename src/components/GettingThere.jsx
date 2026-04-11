import { useLanguage } from '../i18n/LanguageContext';
import styles from './GettingThere.module.css';
import lanaiAirMobile from '../assets/lanai-air-mobile.webp';

export default function GettingThere() {
  const { t } = useLanguage();

  const steps = [
    {
      step: t('getting.step1Label'),
      title: t('getting.step1Title'),
      detail: (
        <>
          {t('getting.step1Detail')}{' '}
          <a href="https://www.fourseasons.com/lanai/lanai-air/" target="_blank" rel="noreferrer">
            {t('getting.step1Link')}
          </a>{' '}
          {t('getting.step1After')}
        </>
      ),
    },
    {
      step: t('getting.step2Label'),
      title: t('getting.step2Title'),
      detail: t('getting.step2Detail'),
    },
    {
      step: t('getting.step3Label'),
      title: t('getting.step3Title'),
      detail: t('getting.step3Detail'),
    },
  ];

  return (
    <section id="getting-there" className={styles.section}>
      <div className="container">
        <p className="section-subtitle">{t('getting.subtitle')}</p>
        <h2 className="section-title">{t('getting.title')}</h2>
        <div className="section-divider"><span>✦</span></div>

        <img
          src={lanaiAirMobile}
          alt="Lānaʻi Air travel view"
          className={styles.heroImage}
          loading="lazy"
        />

        <div className={styles.stack}>
          {steps.map(({ step, title, detail }) => (
            <article key={step} className={styles.card}>
              <span className={styles.stepLabel}>{step}</span>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDetail}>{detail}</p>
            </article>
          ))}
        </div>

        <div className={styles.footnote}>
          <strong>{t('getting.footnoteTitle')}</strong>{' '}
          {t('getting.footnoteText')}{' '}
          <a href="https://go-lanai.com/" target="_blank" rel="noreferrer">{t('getting.footnoteLink')}</a>{' '}
          {t('getting.footnoteAfter')}
        </div>
      </div>
    </section>
  );
}
