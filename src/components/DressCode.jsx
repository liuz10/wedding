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
            <p className={styles.lead}>Formal Attire Requested</p>
            <p>
              Suits and elegant dresses are warmly encouraged, and to keep photos cohesive we kindly ask
              guests to avoid black and white (reserved for the couple) as well as very bright or neon
              shades; beautiful options include jewel tones, muted earth tones, champagne, sage, navy,
              plum, and dusty rose.
            </p>
          </div>

          <div className={styles.imageRail}>
            <img src="/docs/images/dresscode-guide.png" alt="Dress code inspiration board" loading="lazy" />
            <img src="/docs/images/dresscode-ladies.webp" alt="Ladies dress inspiration" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
