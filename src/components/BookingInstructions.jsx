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
          <h3 className={styles.activitiesTitle}>Things to Do at the Resort &amp; on L&#257;na&#699;i</h3>
          <p className={styles.activitiesCopy}>
            There are numerous activities at the hotel and around the island!
            It is recommended to book activities, spa appointments, and dining reservations
            in advance since there is limited availability. You will receive an email from the
            L&#257;na&#699;i Experience planners
            at <a href="mailto:exp.lanai@fourseasons.com">exp.lanai@fourseasons.com</a>.
          </p>

          <div className={styles.activityGrid}>
            <a href="https://www.fourseasons.com/lanai/spa/" target="_blank" rel="noopener noreferrer" className={styles.activityCard}>
              <span className={styles.activityEmoji} aria-hidden="true">&#128134;</span>
              <strong>Hawanawana Spa</strong>
              <p>Oceanfront treatments inspired by Hawaiian healing traditions.</p>
              <span className={styles.activityLink}>View spa services &rarr;</span>
            </a>

            <a href="https://www.fourseasons.com/lanai/experiences/" target="_blank" rel="noopener noreferrer" className={styles.activityCard}>
              <span className={styles.activityEmoji} aria-hidden="true">&#127796;</span>
              <strong>Island Experiences</strong>
              <p>Golf, snorkeling, off-road adventures, and more &mdash; see the full weekly itinerary.</p>
              <span className={styles.activityLink}>Browse activities &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
