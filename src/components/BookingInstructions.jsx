import styles from './BookingInstructions.module.css';

export default function BookingInstructions() {
  return (
    <section id="booking-instructions" className={styles.section}>
      <div className="container">
        <p className="section-subtitle">Stay</p>
        <h2 className="section-title">Booking Instructions</h2>
        <div className="section-divider"><span>✦</span></div>
        <p className={styles.placeholder}>
          Hotel room block and booking details are coming soon. Please check back here for your
          dedicated booking link and rate code.
        </p>
      </div>
    </section>
  );
}
