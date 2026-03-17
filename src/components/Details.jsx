import styles from './Details.module.css';

const events = [
  {
    icon: '💍',
    title: 'Ceremony',
    time: '3:00 PM',
    venue: '[Venue Name]',
    address: '[Street Address]',
    city: 'San Francisco, CA',
    note: 'Please arrive 15 minutes early.',
  },
  {
    icon: '🥂',
    title: 'Reception',
    time: '5:30 PM',
    venue: '[Reception Venue]',
    address: '[Street Address]',
    city: 'San Francisco, CA',
    note: 'Dinner and dancing to follow.',
  },
  {
    icon: '🏨',
    title: 'Accommodation',
    time: null,
    venue: '[Hotel Name]',
    address: '[Hotel Address]',
    city: 'San Francisco, CA',
    note: 'Room block available — use code [WEDDING CODE] for a discounted rate.',
  },
];

export default function Details() {
  return (
    <section id="details" className={styles.section}>
      <div className="container">
        <p className="section-subtitle">Join Us</p>
        <h2 className="section-title">Wedding Details</h2>
        <div className="section-divider"><span>✦</span></div>

        <div className={styles.grid}>
          {events.map(({ icon, title, time, venue, address, city, note }) => (
            <article key={title} className={styles.card}>
              <span className={styles.icon} aria-hidden="true">{icon}</span>
              <h3 className={styles.cardTitle}>{title}</h3>
              {time && <p className={styles.time}>{time}</p>}
              <div className={styles.location}>
                <strong>{venue}</strong>
                <span>{address}</span>
                <span>{city}</span>
              </div>
              <p className={styles.note}>{note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
