import styles from './BookingInstructions.module.css';

export default function BookingInstructions() {
  return (
    <section id="booking-instructions" className={styles.section}>
      <div className="container">
        <p className="section-subtitle">Stay</p>
        <h2 className="section-title">Room Accommodation</h2>
        <div className="section-divider"><span>✦</span></div>

        <div className={styles.panel}>
          <p className={styles.longCopy}>
            We&apos;ve arranged a wedding guest room block from <strong>August 7th–9th</strong>, and if
            you&apos;d love to extend your island stay, additional nights are available at the special
            group rate of <strong>$950/night (before tax)</strong>; just contact reservations and mention
            that you&apos;re part of the <strong>Wang-Liu wedding group</strong> so the team can apply the
            discounted rate for you.
          </p>

          <div className={styles.contactRow}>
            <a href="tel:+18085652587" className={styles.contactItem}>
              <span>Call</span>
              <strong>1-808-565-2587</strong>
            </a>
            <a href="mailto:reservations.Lanai@fourseasons.com" className={styles.contactItem}>
              <span>Email</span>
              <strong>reservations.Lanai@fourseasons.com</strong>
            </a>
          </div>
        </div>

        <div className={styles.activitiesPanel}>
          <h3 className={styles.activitiesTitle}>While You&apos;re Here</h3>
          <p className={styles.activitiesCopy}>
            L&#257;na&#699;i is a hidden gem with plenty to explore between celebrations.
            Here are a few of our favorites:
          </p>

          <div className={styles.activityGrid}>
            <div className={styles.activityCard}>
              <span className={styles.activityEmoji} aria-hidden="true">&#127948;&#65039;</span>
              <strong>Golf at Manele</strong>
              <p>Championship course with ocean views on every hole.</p>
              <a href="https://www.fourseasons.com/lanai/golf/" target="_blank" rel="noopener noreferrer">
                Learn more &rarr;
              </a>
            </div>

            <div className={styles.activityCard}>
              <span className={styles.activityEmoji} aria-hidden="true">&#128134;</span>
              <strong>Hawanawana Spa</strong>
              <p>Oceanfront treatments inspired by Hawaiian healing traditions.</p>
              <a href="https://www.fourseasons.com/lanai/spa/" target="_blank" rel="noopener noreferrer">
                Learn more &rarr;
              </a>
            </div>

            <div className={styles.activityCard}>
              <span className={styles.activityEmoji} aria-hidden="true">&#127754;</span>
              <strong>Snorkeling &amp; Diving</strong>
              <p>Hulopoe Bay is home to reef fish, sea turtles, and spinner dolphins.</p>
              <a href="https://www.fourseasons.com/lanai/experiences/" target="_blank" rel="noopener noreferrer">
                Learn more &rarr;
              </a>
            </div>

            <div className={styles.activityCard}>
              <span className={styles.activityEmoji} aria-hidden="true">&#127796;</span>
              <strong>Off-Road Adventure</strong>
              <p>Explore Keahiakawelo (Garden of the Gods) and Shipwreck Beach by 4x4.</p>
              <a href="https://www.fourseasons.com/lanai/experiences/" target="_blank" rel="noopener noreferrer">
                Learn more &rarr;
              </a>
            </div>
          </div>

          <p className={styles.activitiesNote}>
            The resort concierge can arrange any of these for you &mdash; just email{' '}
            <a href="mailto:concierge.lanai@fourseasons.com">concierge.lanai@fourseasons.com</a> or
            call the front desk after check-in.
          </p>
        </div>
      </div>
    </section>
  );
}
