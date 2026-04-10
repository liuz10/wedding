import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './Details.module.css';
import brunchImage from '../assets/brunch.jpg';

function ScheduleCard({ day, title, teaser, image, events, tapHint }) {
  const [open, setOpen] = useState(false);

  return (
    <article className={`${styles.card} ${open ? styles.cardOpen : ''}`}>
      <div
        className={styles.summary}
        onClick={() => setOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((prev) => !prev);
          }
        }}
      >
        <img src={image} alt={`${title} preview`} loading="lazy" />

        <div className={styles.summaryBody}>
          <span className={styles.dayLabel}>{day}</span>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardTeaser}>{teaser}</p>
        </div>

        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} aria-hidden="true">
          &#x25BE;
        </span>

        {!open && (
          <span className={styles.tapHint}>{tapHint}</span>
        )}
      </div>

      <div className={`${styles.content} ${open ? styles.contentOpen : ''}`}>
        <div className={styles.contentInner}>
          <div className={styles.timeline}>
            {events.map(({ name, when, note }) => (
              <div key={name} className={styles.eventItem}>
                <div className={styles.eventDot} />
                <div className={styles.eventBody}>
                  <h4 className={styles.eventName}>{name}</h4>
                  <p className={styles.eventWhen}>{when}</p>
                  <p className={styles.eventNote}>{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Details() {
  const { t } = useLanguage();

  const planCards = [
    {
      day: t('schedule.day1.day'),
      title: t('schedule.day1.title'),
      teaser: t('schedule.day1.teaser'),
      image: '/docs/images/glance-2.jpg',
      events: t('schedule.day1.events'),
    },
    {
      day: t('schedule.day2.day'),
      title: t('schedule.day2.title'),
      teaser: t('schedule.day2.teaser'),
      image: '/docs/images/hero-main.jpg',
      events: t('schedule.day2.events'),
    },
    {
      day: t('schedule.day3.day'),
      title: t('schedule.day3.title'),
      teaser: t('schedule.day3.teaser'),
      image: brunchImage,
      events: t('schedule.day3.events'),
    },
  ];

  return (
    <section id="details" className={styles.section}>
      <div className="container">
        <p className="section-subtitle">{t('schedule.subtitle')}</p>
        <h2 className="section-title">{t('schedule.title')}</h2>
        <div className="section-divider"><span>&#x2726;</span></div>

        <div className={styles.stack}>
          {planCards.map((card) => (
            <ScheduleCard key={card.day} {...card} tapHint={t('schedule.tapHint')} />
          ))}
        </div>
      </div>
    </section>
  );
}
