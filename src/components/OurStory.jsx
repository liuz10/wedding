import { useLanguage } from '../i18n/LanguageContext';
import styles from './OurStory.module.css';
import aliceKid from '../assets/Alice_kid.jpg';
import johnnyPhoto from '../assets/IMG_1249.jpg';
import williamPhoto from '../assets/IMG_0463.jpg';

export default function OurStory() {
  const { t } = useLanguage();

  return (
    <section id="our-story" className={styles.section}>
      <div className="container">
        <p className="section-subtitle">{t('story.subtitle')}</p>
        <h2 className="section-title">{t('story.title')}</h2>
        <div className="section-divider"><span>✦</span></div>

        <div className={styles.photoRow}>
          <figure className={styles.profileCircle}>
            <img src={aliceKid} alt="Alice as a child" loading="lazy" />
            <figcaption>{t('story.aliceName')}</figcaption>
          </figure>
          <figure className={styles.profileCircle}>
            <img src={johnnyPhoto} alt="Johnny portrait" loading="lazy" />
            <figcaption>{t('story.johnnyName')}</figcaption>
          </figure>
        </div>

        <p className={styles.storyCopy}>
          {t('story.copy')}
        </p>

        <div className={styles.timelineWrapper}>
          <svg
            className={styles.timelineSvg}
            viewBox="0 0 680 1600"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Our relationship timeline from 2019 to 2026"
          >
            <defs>
              <clipPath id="williamClip">
                <circle cx="460" cy="400" r="55" />
              </clipPath>
            </defs>

            {/* S-curve dotted path */}
            <path
              className={styles.dotLine}
              d="M 100 100 C 400 100, 580 160, 580 460 C 580 760, 100 560, 100 820 C 100 1080, 580 880, 580 1100 C 580 1340, 100 1200, 100 1400"
            />

            {/* ── 2019 — We met! ── */}
            <circle className={styles.pinCircle} cx="100" cy="100" r="9" />
            <circle className={styles.pinDot} cx="100" cy="100" r="4" />
            <line className={styles.pinStem} x1="100" y1="109" x2="100" y2="138" />
            <rect className={styles.yearPill} x="42" y="138" width="116" height="44" rx="22" />
            <text className={styles.yearText} x="100" y="167" textAnchor="middle">2019</text>
            <text className={styles.milestoneText} x="100" y="212" textAnchor="middle">{t('story.y2019')}</text>

            {/* William photo — circular with outline */}
            <image
              href={williamPhoto}
              x="405"
              y="345"
              width="110"
              height="110"
              clipPath="url(#williamClip)"
              preserveAspectRatio="xMidYMid slice"
            />
            <circle cx="460" cy="400" r="57" fill="none" className={styles.photoOutline} />

            {/* ── 2020 — Our dog William is born! ── */}
            <circle className={styles.pinCircle} cx="580" cy="460" r="9" />
            <circle className={styles.pinDot} cx="580" cy="460" r="4" />
            <line className={styles.pinStem} x1="580" y1="469" x2="580" y2="498" />
            <rect className={styles.yearPill} x="522" y="498" width="116" height="44" rx="22" />
            <text className={styles.yearText} x="580" y="527" textAnchor="middle">2020</text>
            <text className={styles.milestoneText} x="580" y="575" textAnchor="middle">{t('story.y2020a')}</text>
            <text className={styles.milestoneText} x="580" y="605" textAnchor="middle">{t('story.y2020a2')}</text>

            {/* ── 2020 — Alice moved to Chicago! ── */}
            <circle className={styles.pinCircle} cx="100" cy="820" r="9" />
            <circle className={styles.pinDot} cx="100" cy="820" r="4" />
            <line className={styles.pinStem} x1="100" y1="829" x2="100" y2="858" />
            <rect className={styles.yearPill} x="42" y="858" width="116" height="44" rx="22" />
            <text className={styles.yearText} x="100" y="887" textAnchor="middle">2020</text>
            <text className={styles.milestoneText} x="100" y="935" textAnchor="middle">{t('story.y2020b')}</text>
            <text className={styles.milestoneText} x="100" y="965" textAnchor="middle">{t('story.y2020b2')}</text>

            {/* ── 2025 — Johnny proposed! ── */}
            <circle className={styles.pinCircle} cx="580" cy="1100" r="9" />
            <circle className={styles.pinDot} cx="580" cy="1100" r="4" />
            <line className={styles.pinStem} x1="580" y1="1109" x2="580" y2="1138" />
            <rect className={styles.yearPill} x="522" y="1138" width="116" height="44" rx="22" />
            <text className={styles.yearText} x="580" y="1167" textAnchor="middle">2025</text>
            <text className={styles.milestoneText} x="580" y="1212" textAnchor="middle">{t('story.y2025')}</text>

            {/* ── 2026 — We're getting married! ── */}
            <circle className={styles.pinCircle} cx="100" cy="1400" r="9" />
            <circle className={styles.pinDot} cx="100" cy="1400" r="4" />
            <line className={styles.pinStem} x1="100" y1="1409" x2="100" y2="1438" />
            <rect className={styles.finalPill} x="42" y="1438" width="116" height="44" rx="22" />
            <text className={styles.finalText} x="100" y="1467" textAnchor="middle">2026</text>
            <text className={styles.milestoneText} x="100" y="1512" textAnchor="middle">
              {t('story.y2026')}
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
