import styles from './OurStory.module.css';
import aliceKid from '../assets/Alice_kid.jpg';
import johnnyPhoto from '../assets/IMG_1249.jpg';
import williamPhoto from '../assets/IMG_0463.jpg';

const keyMoments = [
  { year: '2019', note: 'We met!', className: 'point2019' },
  {
    year: '2020',
    note: 'Our kid (William) is born!',
    photo: williamPhoto,
    alt: 'William as a puppy',
    className: 'point2020a',
  },
  { year: '2020', note: 'Alice moved to Chicago!', className: 'point2020b' },
  { year: '2025', note: 'Johnny proposed!', className: 'point2025' },
  { year: '2026', note: 'We are getting married!', className: 'point2026', highlight: true },
];

export default function OurStory() {
  return (
    <section id="our-story" className={styles.section}>
      <div className="container">
        <p className="section-subtitle">Our Journey</p>
        <h2 className="section-title">Our Story</h2>
        <div className="section-divider"><span>✦</span></div>

        <div className={styles.photoRow}>
          <figure className={styles.profileCircle}>
            <img src={aliceKid} alt="Alice as a child" loading="lazy" />
            <figcaption>Alice</figcaption>
          </figure>
          <figure className={styles.profileCircle}>
            <img src={johnnyPhoto} alt="Johnny portrait" loading="lazy" />
            <figcaption>Johnny</figcaption>
          </figure>
        </div>

        <p className={styles.storyCopy}>
          Long story short, Johnny slid into Alice&apos;s DMs on Instagram in the hot summer of
          2020, and fate started doing its thing. Alice moved to Chicago and the two began writing
          their story together — starting with a dog named William in year one, I know, that&apos;s
          pretty bold! Now in 2026, we&apos;re finally tying the knot and making it official. If
          you&apos;re reading this, you&apos;re part of the story now, and we can&apos;t wait to
          celebrate with you!
        </p>

        <div className={styles.roadmap} aria-label="Our relationship timeline map">
          <svg
            className={styles.route}
            viewBox="0 0 1000 900"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M90 120 H370 Q440 120 440 190 V280 Q440 350 510 350 H790 Q860 350 860 420 V560 Q860 630 790 630 H270 Q200 630 200 700 V820" />
          </svg>

          {keyMoments.map(({ year, note, photo, alt, className, highlight }) => (
            <article
              key={`${year}-${note}`}
              className={`${styles.timelineItem} ${styles[className]} ${highlight ? styles.highlight : ''}`}
            >
              {photo && (
                <figure className={styles.eventCircle}>
                  <img src={photo} alt={alt} loading="lazy" />
                </figure>
              )}
              <div className={styles.yearPill}>{year}</div>
              <div className={styles.connector} aria-hidden="true">
                <span className={styles.dotLine} />
                <span className={styles.arrow}>➜</span>
                <span className={styles.dotLine} />
              </div>
              <p className={styles.note}>{note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
