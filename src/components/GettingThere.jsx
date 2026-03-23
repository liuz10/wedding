import styles from './GettingThere.module.css';

const travelOptions = [
  {
    title: 'Fly In',
    detail: 'Fly into Honolulu (HNL), then take a short interisland flight to Lanai Airport (LNY).',
  },
  {
    title: 'Getting Around',
    detail: 'Resort and local shuttles are the easiest way to move between the airport, hotel, and venues.',
  },
  {
    title: 'Where to Stay',
    detail: 'We recommend staying at Four Seasons Resort Lanai for the smoothest weekend experience.',
  },
];

export default function GettingThere() {
  return (
    <section id="getting-there" className={styles.section}>
      <div className="container">
        <p className="section-subtitle">Travel</p>
        <h2 className="section-title">Getting There</h2>
        <div className="section-divider"><span>✦</span></div>

        <p className={styles.intro}>
          Transportation info to help you plan a smooth wedding weekend.
        </p>

        <div className={styles.grid}>
          {travelOptions.map(({ title, detail }) => (
            <article key={title} className={styles.card}>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
