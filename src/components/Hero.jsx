import styles from './Hero.module.css';
import ceremonyVenue from '../assets/Ceremony_venue.jpg';

export default function Hero() {
  return (
    <section
      id="hero"
      className={styles.hero}
      style={{ '--hero-image': `url(${ceremonyVenue})` }}
    >
      <div className={styles.backdrop} aria-hidden="true" />

      <div className={styles.content}>
        <h1 className={styles.mainTitle}>We are getting married!</h1>
        <p className={styles.coupleName}>Alice &amp; Johnny</p>

        <div className={styles.divider} aria-hidden="true">
          <span className={styles.dividerLine} />
          <span className={styles.dividerFlower}>✦</span>
          <span className={styles.dividerLine} />
        </div>

        <p className={styles.invite}>Join us for a three-day celebration in Lanai, Hawaii.</p>

        <div className={styles.details}>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Date</span>
            <span className={styles.detailValue}>August 8th 2026</span>
          </div>
          <div className={styles.detailSep} aria-hidden="true">✦</div>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Location</span>
            <span className={styles.detailValue}>Lanai Four Season Resort</span>
          </div>
        </div>

        <a href="#rsvp" className={styles.cta}>
          RSVP Now
        </a>
      </div>
    </section>
  );
}
