import styles from './Details.module.css';

const events = [
  {
    icon: '⛵',
    title: 'Day 1 · Welcome Sunset Sailing Party',
    time: 'Sunset',
    venue: 'Welcome Boat Sailing Party',
    address: 'Marina Departure Dock',
    city: 'San Francisco, CA',
    note: 'Kick off the wedding weekend with golden-hour views on the water.',
  },
  {
    icon: '💒',
    title: 'Day 2 · Wedding Day',
    time: 'Ceremony · Reception · After Party',
    venue: 'Wedding Celebration',
    address: 'Ceremony & Reception Venue',
    city: 'San Francisco, CA',
    note: 'Our main celebration day with vows, dinner, dancing, and a late-night after party.',
  },
  {
    icon: '🥐',
    title: 'Day 3 · Farewell Brunch',
    time: 'Late Morning',
    venue: 'Farewell Brunch',
    address: 'Brunch Venue',
    city: 'San Francisco, CA',
    note: 'One final meal together before we send everyone off with love.',
  },
];

export default function Details() {
  return (
    <section id="details" className={styles.section}>
      <div className="container">
        <p className="section-subtitle">Weekend Events</p>
        <h2 className="section-title">Wedding Weekend Schedule</h2>
        <div className="section-divider"><span>✦</span></div>

        <div className={styles.featureImages}>
          <figure className={styles.featureCard}>
            <img src="/docs/images/glance-2.jpg" alt="Boat celebration inspiration for welcome sailing party" loading="lazy" />
            <figcaption>Day 1 · Sunset Boat Welcome Party</figcaption>
          </figure>
          <figure className={styles.featureCard}>
            <img src="/docs/images/glance-1.jpg" alt="Scenic city and water view for wedding weekend atmosphere" loading="lazy" />
            <figcaption>Weekend Views · San Francisco</figcaption>
          </figure>
        </div>

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
