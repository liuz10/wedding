import { useState } from 'react';
import styles from './Details.module.css';
import brunchImage from '../assets/brunch.jpg';

const planCards = [
  {
    day: 'Day 1',
    title: 'Welcome Boat Party',
    teaser: 'Kick off the wedding weekend together on the water.',
    image: '/docs/images/glance-2.jpg',
    events: [
      {
        name: 'Private Sunset Sail',
        when: '5:15 PM at Manele Harbor',
        note: 'Expect ocean views, light bites, and a relaxed welcome vibe to start the celebration weekend.',
      },
    ],
  },
  {
    day: 'Day 2',
    title: 'Wedding Day',
    teaser: 'The big celebration from ceremony to dinner.',
    image: '/docs/images/hero-main.jpg',
    events: [
      {
        name: 'Getting Ready',
        when: '2:00 PM at Four Seasons Resort Lānaʻi',
        note: 'This is the prep window before the formal events begin.',
      },
      {
        name: 'Ceremony',
        when: '5:15 PM at the 12th Tee Box',
        note: 'Please be in the lobby by 4:40 PM for shuttle pickup to the ceremony location.',
      },
      {
        name: 'Group Photo',
        when: '5:45 PM at the ceremony grounds',
        note: 'We’ll gather everyone right after the ceremony for a full group photo.',
      },
      {
        name: 'Cocktail Hour',
        when: '6:00 PM at the reception lawn',
        note: 'Shuttles will be provided from ceremony to reception locations.',
      },
      {
        name: 'Wedding Dinner',
        when: '7:15 PM at Lānaʻi Gardens',
        note: 'Dinner and toasts begin as we move into the evening celebration.',
      },
    ],
  },
  {
    day: 'Day 3',
    title: 'Farewell Brunch',
    teaser: 'One more meal together before departures.',
    image: brunchImage,
    events: [
      {
        name: 'Farewell Brunch',
        when: '9:30 AM – 11:30 AM at Cascades',
        note: 'A relaxed send-off to wrap up the weekend.',
      },
    ],
  },
];

function ScheduleCard({ day, title, teaser, image, events }) {
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
          <span className={styles.tapHint}>Tap to view details</span>
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
  return (
    <section id="details" className={styles.section}>
      <div className="container">
        <p className="section-subtitle">Weekend Events</p>
        <h2 className="section-title">Wedding Weekend Schedule</h2>
        <div className="section-divider"><span>&#x2726;</span></div>

        <div className={styles.stack}>
          {planCards.map((card) => (
            <ScheduleCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
