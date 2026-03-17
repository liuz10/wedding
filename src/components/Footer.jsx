import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.names}>
          [Partner 1] &amp; [Partner 2]
        </div>

        <div className={styles.divider} aria-hidden="true">✦</div>

        <p className={styles.date}>October 18, 2025 · San Francisco, CA</p>

        <p className={styles.tagline}>
          Two souls, one love, one beautiful beginning.
        </p>

        <p className={styles.copy}>
          &copy; {year} · Made with love
        </p>
      </div>
    </footer>
  );
}
