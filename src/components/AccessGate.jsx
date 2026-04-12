import { useMemo, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import dogImage from '../assets/Subject.png';
import styles from './AccessGate.module.css';

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
const GOOGLE_TIMEOUT_MS = 3500;

// SHA-256 hashes of valid passphrases (normalized).
// Generate with: node scripts/generate-hashes.mjs "phrase1" "phrase2"
const VALID_HASHES = [
  'cc8e78a09773693de78fcbd8dd5fd2afed3381dafd61e7d4d4f6f4ecd001db7d',
];

function normalizeAnswer(value) {
  return value
    .toLowerCase()
    .replace(/^hi,\s*/i, '')
    .replace(/[!?.]+$/g, '')
    .trim();
}

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function buildValidateUrl() {
  if (!SCRIPT_URL) return null;
  if (SCRIPT_URL.includes('YOUR_SCRIPT_ID') || SCRIPT_URL.includes('YOUR_SCRIPT_URL_HERE')) {
    return null;
  }

  const endpoint = new URL(SCRIPT_URL);
  endpoint.searchParams.set('route', 'validate-passphrase');
  endpoint.searchParams.set('_ts', `${Date.now()}`);
  return endpoint.toString();
}

// Validate via Google Apps Script (JSONP) with a timeout
function googleValidate(validateUrl, normalizedAnswer) {
  return new Promise((resolve, reject) => {
    const callbackName = `__weddingGateCb_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const script = document.createElement('script');
    const endpoint = new URL(validateUrl);
    endpoint.searchParams.set('answer', normalizedAnswer);
    endpoint.searchParams.set('callback', callbackName);

    let settled = false;
    const cleanup = () => {
      if (script.parentNode) script.parentNode.removeChild(script);
      delete window[callbackName];
    };

    window[callbackName] = (payload) => {
      settled = true;
      cleanup();
      resolve(payload);
    };

    script.onerror = () => {
      if (!settled) {
        cleanup();
        reject(new Error('Validation request failed.'));
      }
    };

    script.src = endpoint.toString();
    document.body.appendChild(script);
  });
}

// Validate locally against SHA-256 hashes
async function hashValidate(normalizedAnswer) {
  if (VALID_HASHES.length === 0) return null; // no hashes configured
  const hash = await sha256(normalizedAnswer);
  return { result: 'success', valid: VALID_HASHES.includes(hash) };
}

export default function AccessGate({ isUnlocked, onUnlock }) {
  const { t } = useLanguage();
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFailPopup, setShowFailPopup] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const validateUrl = useMemo(() => buildValidateUrl(), []);
  const hasAnyValidation = validateUrl || VALID_HASHES.length > 0;
  const isHidden = isUnlocked && !isUnlocking;

  const validatePassphrase = async (normalizedAnswer) => {
    // Strategy: hash first (instant), then Google as fallback
    const hashResult = await hashValidate(normalizedAnswer);
    if (hashResult?.valid) return hashResult;

    // If hash didn't match, try Google (may have newer passphrases)
    if (validateUrl) {
      try {
        return await Promise.race([
          googleValidate(validateUrl, normalizedAnswer),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), GOOGLE_TIMEOUT_MS)
          ),
        ]);
      } catch {
        // Google unreachable — use hash result as final answer
      }
    }

    // Return hash result (invalid) or error
    if (hashResult) return hashResult;
    throw new Error('No validation method available.');
  };

  const handleValidate = async (event) => {
    event.preventDefault();
    if (!hasAnyValidation || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const payload = await validatePassphrase(normalizeAnswer(answer));
      if (payload.result !== 'success' || payload.valid !== true) {
        setShowFailPopup(true);
        return;
      }

      setIsUnlocking(true);
      window.scrollTo(0, 0);
      window.setTimeout(() => {
        window.scrollTo(0, 0);
        onUnlock();
      }, 460);
    } catch (error) {
      console.error('Passphrase validation failed:', error);
      setShowFailPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isHidden) {
    return null;
  }

  return (
    <div className={`${styles.overlay} ${isUnlocking ? styles.unlocking : ''}`} aria-hidden={isUnlocked}>
      <div className={styles.centered}>
        <img src={dogImage} alt="Dog wearing sunglasses" className={styles.image} />

        {!hasAnyValidation && (
          <p className={styles.devWarning}>
            Set <code>VITE_GOOGLE_SCRIPT_URL</code> or add hashes to enable validation.
          </p>
        )}

        <form id="gate-form" onSubmit={handleValidate} className={styles.form}>
          <label htmlFor="gate-answer" className={styles.inlinePrompt}>
            <span className={styles.hint}>{t('gate.hint')}</span>
            <span className={styles.inputRow}>
              <input
                id="gate-answer"
                type="text"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                onFocus={(e) => {
                  setTimeout(() => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 350);
                }}
                className={styles.input}
                autoComplete="off"
                required
                enterKeyHint="go"
                disabled={isSubmitting || !hasAnyValidation}
              />
              <span
                role="button"
                tabIndex={0}
                className={styles.suffix}
                onClick={() => {
                  if (!isSubmitting && hasAnyValidation) {
                    document.getElementById('gate-form').requestSubmit();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (!isSubmitting && hasAnyValidation) {
                      document.getElementById('gate-form').requestSubmit();
                    }
                  }
                }}
              >
                {isSubmitting ? <span className={styles.spinner} /> : '↑'}
              </span>
            </span>
          </label>
          <button type="submit" className={styles.submitBtn} disabled={isSubmitting || !hasAnyValidation}>
            {isSubmitting ? t('gate.checking') : t('gate.submit')}
          </button>
        </form>
      </div>

      {showFailPopup && (
        <div className={styles.popupBackdrop} role="dialog" aria-modal="true" aria-labelledby="gate-fail-title">
          <div className={styles.popup}>
            <h2 id="gate-fail-title" className={styles.popupTitle}>{t('gate.failTitle')}</h2>
            <button
              type="button"
              className={styles.retryBtn}
              onClick={() => window.location.reload()}
            >
              {t('gate.retry')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
