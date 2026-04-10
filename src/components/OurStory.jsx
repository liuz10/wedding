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
            <circle className={styles.pinCircle} cx="100" cy="100" r="7" />
            <circle className={styles.pinDot} cx="100" cy="100" r="3" />
            <line className={styles.pinStem} x1="100" y1="107" x2="100" y2="134" />
            <rect className={styles.yearPill} x="56" y="134" width="88" height="36" rx="18" />
            <text className={styles.yearText} x="100" y="157" textAnchor="middle">2019</text>
            <text className={styles.milestoneText} x="100" y="198" textAnchor="middle">{t('story.y2019')}</text>

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
            <circle className={styles.pinCircle} cx="580" cy="460" r="7" />
            <circle className={styles.pinDot} cx="580" cy="460" r="3" />
            <line className={styles.pinStem} x1="580" y1="467" x2="580" y2="498" />
            <rect className={styles.yearPill} x="536" y="498" width="88" height="36" rx="18" />
            <text className={styles.yearText} x="580" y="521" textAnchor="middle">2020</text>
            <text className={styles.milestoneText} x="580" y="562" textAnchor="middle">{t('story.y2020a')}</text>
            <text className={styles.milestoneText} x="580" y="581" textAnchor="middle">{t('story.y2020a2')}</text>

            {/* ── 2020 — Alice moved to Chicago! ── */}
            <circle className={styles.pinCircle} cx="100" cy="820" r="7" />
            <circle className={styles.pinDot} cx="100" cy="820" r="3" />
            <line className={styles.pinStem} x1="100" y1="827" x2="100" y2="858" />
            <rect className={styles.yearPill} x="56" y="858" width="88" height="36" rx="18" />
            <text className={styles.yearText} x="100" y="881" textAnchor="middle">2020</text>
            <text className={styles.milestoneText} x="100" y="922" textAnchor="middle">{t('story.y2020b')}</text>
            <text className={styles.milestoneText} x="100" y="941" textAnchor="middle">{t('story.y2020b2')}</text>

            {/* ── 2025 — Johnny proposed! ── */}
            <circle className={styles.pinCircle} cx="580" cy="1100" r="7" />
            <circle className={styles.pinDot} cx="580" cy="1100" r="3" />
            <line className={styles.pinStem} x1="580" y1="1107" x2="580" y2="1138" />
            <rect className={styles.yearPill} x="536" y="1138" width="88" height="36" rx="18" />
            <text className={styles.yearText} x="580" y="1161" textAnchor="middle">2025</text>
            <text className={styles.milestoneText} x="580" y="1202" textAnchor="middle">{t('story.y2025')}</text>

            {/* ── 2026 — We're getting married! ── */}
            <circle className={styles.pinCircle} cx="100" cy="1400" r="7" />
            <circle className={styles.pinDot} cx="100" cy="1400" r="3" />
            <line className={styles.pinStem} x1="100" y1="1407" x2="100" y2="1438" />
            <rect className={styles.finalPill} x="52" y="1438" width="96" height="36" rx="18" />
            <text className={styles.finalText} x="100" y="1461" textAnchor="middle">2026</text>
            <text className={styles.milestoneText} x="100" y="1502" textAnchor="middle">
              {t('story.y2026')}
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
