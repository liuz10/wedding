import styles from './GettingThere.module.css';
import lanaiAirMobile from '../assets/lanai-air-mobile.webp';

const steps = [
  {
    step: 'Step 1',
    title: 'Book Your Flight to Honolulu',
    detail: (
      <>
        Once your flight is booked, please complete the{' '}
        <a href="https://www.fourseasons.com/lanai/lanai-air/" target="_blank" rel="noreferrer">
          Lānaʻi Air Flight Request Form
        </a>{' '}
        using your room confirmation number.
      </>
    ),
  },
  {
    step: 'Step 2',
    title: 'Complimentary Lānaʻi Air Transfer',
    detail:
      'Your flight time follows the entry on your flight request form, and you should receive a confirmation email before travel.',
  },
  {
    step: 'Step 3',
    title: 'Easy Transfer to the Resort',
    detail:
      'If you have a connecting flight, a shuttle can pick you up at baggage claim and take you to the Lānaʻi Air hangar. The flight is about 30 minutes, and once you land, Four Seasons will shuttle you from the airport to the hotel in about 20 minutes.',
  },
];

export default function GettingThere() {
  return (
    <section id="getting-there" className={styles.section}>
      <div className="container">
        <p className="section-subtitle">Travel</p>
        <h2 className="section-title">Getting Here</h2>
        <div className="section-divider"><span>✦</span></div>

        <img
          src={lanaiAirMobile}
          alt="Lānaʻi Air travel view"
          className={styles.heroImage}
          loading="lazy"
        />

        <div className={styles.stack}>
          {steps.map(({ step, title, detail }) => (
            <article key={title} className={styles.card}>
              <span className={styles.stepLabel}>{step}</span>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDetail}>{detail}</p>
            </article>
          ))}
        </div>

        <div className={styles.footnote}>
          <strong>From Maui?</strong>{' '}
          You can book ferry tickets at{' '}
          <a href="http://go-lanai.com/" target="_blank" rel="noreferrer">go-lanai.com</a>{' '}
          or call 808-611-4756. If you book the ferry, please let us know so the hotel can arrange harbor shuttle pickup.
        </div>
      </div>
    </section>
  );
}
