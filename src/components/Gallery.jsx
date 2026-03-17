import styles from './Gallery.module.css';

const placeholders = Array.from({ length: 6 }, (_, i) => i + 1);

export default function Gallery() {
  return (
    <section id="gallery" className={styles.section}>
      <div className="container">
        <p className="section-subtitle">Memories</p>
        <h2 className="section-title">Our Gallery</h2>
        <div className="section-divider"><span>✦</span></div>

        <p className={styles.intro}>
          Photos coming soon — we'll share our favourite moments here.
        </p>

        <div className={styles.grid}>
          {placeholders.map((n) => (
            <div key={n} className={styles.placeholder} aria-hidden="true">
              <span className={styles.placeholderIcon}>✦</span>
              <span className={styles.placeholderText}>Photo {n}</span>
            </div>
          ))}
        </div>

        <p className={styles.note}>
          Photos are hosted on Google Drive and can be added by replacing the placeholder
          elements with <code>&lt;img&gt;</code> tags pointing to your Drive-shared image URLs.
        </p>
      </div>
    </section>
  );
}
