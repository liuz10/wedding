import styles from './OurStory.module.css';
import aliceKid from '../assets/Alice_kid.jpg';
import johnnyPhoto from '../assets/IMG_1249.jpg';
import williamPhoto from '../assets/IMG_0463.jpg';

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
          2019, and fate started doing its thing. Alice moved to Chicago and the two began writing
          their story together &mdash; starting with a dog named William in year one, I know,
          that&apos;s pretty bold! Now in 2026, we&apos;re finally tying the knot and making it
          official. If you&apos;re reading this, you&apos;re part of the story now, and we
          can&apos;t wait to celebrate with you!
        </p>

        <div className={styles.timelineWrapper}>
          <svg
            className={styles.timelineSvg}
            viewBox="0 0 680 1080"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Our relationship timeline from 2019 to 2026"
          >
            <defs>
              <clipPath id="williamClip">
                <circle cx="580" cy="455" r="42" />
              </clipPath>
            </defs>

            {/* S-curve dotted path */}
            <path
              className={styles.dotLine}
              d="M 100 80 C 380 80, 580 120, 580 270 C 580 420, 100 310, 100 460 C 100 610, 580 500, 580 650 C 580 800, 100 730, 100 850"
            />

            {/* ── 2019 — We met! ── */}
            <circle className={styles.pinCircle} cx="100" cy="80" r="7" />
            <circle className={styles.pinDot} cx="100" cy="80" r="3" />
            <line className={styles.pinStem} x1="100" y1="87" x2="100" y2="110" />
            <rect className={styles.yearPill} x="56" y="110" width="88" height="36" rx="18" />
            <text className={styles.yearText} x="100" y="133" textAnchor="middle">2019</text>
            <text className={styles.milestoneText} x="100" y="170" textAnchor="middle">We met!</text>

            {/* ── 2020 — Our dog William is born! ── */}
            <circle className={styles.pinCircle} cx="580" cy="270" r="7" />
            <circle className={styles.pinDot} cx="580" cy="270" r="3" />
            <line className={styles.pinStem} x1="580" y1="277" x2="580" y2="300" />
            <rect className={styles.yearPill} x="536" y="300" width="88" height="36" rx="18" />
            <text className={styles.yearText} x="580" y="323" textAnchor="middle">2020</text>
            <text className={styles.milestoneText} x="580" y="360" textAnchor="middle">Our dog William</text>
            <text className={styles.milestoneText} x="580" y="379" textAnchor="middle">is born!</text>

            {/* William photo — circular with outline */}
            <circle cx="580" cy="455" r="45" fill="none" className={styles.photoOutline} />
            <image
              href={williamPhoto}
              x="538"
              y="413"
              width="84"
              height="84"
              clipPath="url(#williamClip)"
              preserveAspectRatio="xMidYMid slice"
            />

            {/* ── 2020 — Alice moved to Chicago! ── */}
            <circle className={styles.pinCircle} cx="100" cy="460" r="7" />
            <circle className={styles.pinDot} cx="100" cy="460" r="3" />
            <line className={styles.pinStem} x1="100" y1="467" x2="100" y2="490" />
            <rect className={styles.yearPill} x="56" y="490" width="88" height="36" rx="18" />
            <text className={styles.yearText} x="100" y="513" textAnchor="middle">2020</text>
            <text className={styles.milestoneText} x="100" y="550" textAnchor="middle">Alice moved to</text>
            <text className={styles.milestoneText} x="100" y="569" textAnchor="middle">Chicago!</text>

            {/* ── 2025 — Johnny proposed! ── */}
            <circle className={styles.pinCircle} cx="580" cy="650" r="7" />
            <circle className={styles.pinDot} cx="580" cy="650" r="3" />
            <line className={styles.pinStem} x1="580" y1="657" x2="580" y2="680" />
            <rect className={styles.yearPill} x="536" y="680" width="88" height="36" rx="18" />
            <text className={styles.yearText} x="580" y="703" textAnchor="middle">2025</text>
            <text className={styles.milestoneText} x="580" y="740" textAnchor="middle">Johnny proposed!</text>

            {/* ── 2026 — We're getting married! ── */}
            <circle className={styles.pinCircle} cx="100" cy="850" r="7" />
            <circle className={styles.pinDot} cx="100" cy="850" r="3" />
            <line className={styles.pinStem} x1="100" y1="857" x2="100" y2="880" />
            <rect className={styles.finalPill} x="52" y="880" width="96" height="36" rx="18" />
            <text className={styles.finalText} x="100" y="903" textAnchor="middle">2026</text>
            <text className={styles.milestoneText} x="100" y="940" textAnchor="middle">
              We&apos;re getting married!
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
