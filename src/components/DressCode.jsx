import styles from './DressCode.module.css';

export default function DressCode() {
  return (
    <section id="dress-code" className={styles.section}>
      <div className="container">
        <p className="section-subtitle">Style</p>
        <h2 className="section-title">Dress Code</h2>
        <div className="section-divider"><span>✦</span></div>

        <div className={styles.content}>
          <div className={styles.copy}>
            <p className={styles.lead}>Black tie event</p>
            <p>Men: suits are welcome, but please avoid black.</p>
            <p>Ladies: elegant eveningwear encouraged.</p>
          </div>

          <div className={styles.images}>
            <img src="/docs/images/dresscode-guide.png" alt="Dress code inspiration board" loading="lazy" />
            <img src="/docs/images/dresscode-ladies.webp" alt="Ladies dress inspiration" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
