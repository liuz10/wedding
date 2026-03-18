import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      {/* Decorative petals */}
      <div className={styles.petalTopLeft} aria-hidden="true" />
      <div className={styles.petalTopRight} aria-hidden="true" />
      <div className={styles.petalBottomLeft} aria-hidden="true" />
      <div className={styles.petalBottomRight} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.preTitle}>Save the Date</p>

        <h1 className={styles.mainTitle}>We are getting married!</h1>
        <p className={styles.coupleName}>Alice Wang &amp; Johnny Liu</p>

        <div className={styles.divider} aria-hidden="true">
          <span className={styles.dividerLine} />
          <span className={styles.dividerFlower}>✦</span>
          <span className={styles.dividerLine} />
        </div>

        <p className={styles.invite}>Join us for a three-day celebration in San Francisco.</p>

        <div className={styles.details}>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Date</span>
            <span className={styles.detailValue}>October 18, 2025</span>
          </div>
          <div className={styles.detailSep} aria-hidden="true">✦</div>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Location</span>
            <span className={styles.detailValue}>San Francisco, CA</span>
          </div>
        </div>

        <a href="#rsvp" className={styles.cta}>
          RSVP Now
        </a>
      </div>
    </section>
  );
}
