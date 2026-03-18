import styles from './CeremonyImage.module.css';

export default function CeremonyImage() {
  return (
    <section id="ceremony-photo" className={styles.section}>
      <img
        src="/docs/images/hero-main.jpg"
        alt="Main ceremony portrait for Alice and Johnny"
        className={styles.image}
        loading="eager"
      />
      <div className={styles.overlay} aria-hidden="true" />
    </section>
  );
}
