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
      </div>
    </section>
  );
}
