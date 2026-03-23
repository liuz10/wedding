import { useMemo, useState } from 'react';
import dogImage from '../assets/Subject.png';
import styles from './AccessGate.module.css';

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

function normalizeAnswer(value) {
  return value
    .toLowerCase()
    .replace(/^hi,\s*/i, '')
    .replace(/[!?.]+$/g, '')
    .trim();
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

export default function AccessGate({ isUnlocked, onUnlock }) {
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFailPopup, setShowFailPopup] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const validateUrl = useMemo(() => buildValidateUrl(), []);
  const isHidden = isUnlocked && !isUnlocking;

  const validatePassphrase = (normalizedAnswer) =>
    new Promise((resolve, reject) => {
      if (!validateUrl) {
        reject(new Error('Validation URL is missing.'));
        return;
      }

      const callbackName = `__weddingGateCb_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
      const script = document.createElement('script');
      const endpoint = new URL(validateUrl);
      endpoint.searchParams.set('answer', normalizedAnswer);
      endpoint.searchParams.set('callback', callbackName);

      let settled = false;
      const cleanup = () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
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

  const handleValidate = async (event) => {
    event.preventDefault();
    if (!validateUrl || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const payload = await validatePassphrase(normalizeAnswer(answer));
      if (payload.result !== 'success' || payload.valid !== true) {
        setShowFailPopup(true);
        return;
      }

      setIsUnlocking(true);
      window.setTimeout(() => {
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

        {!validateUrl && (
          <p className={styles.devWarning}>
            Set <code>VITE_GOOGLE_SCRIPT_URL</code> to enable passphrase validation.
          </p>
        )}

        <form onSubmit={handleValidate} className={styles.form}>
          <label htmlFor="gate-answer" className={styles.inlinePrompt}>
            <span className={styles.hint}>What's my name?</span>
            <span className={styles.inputRow}>
              <input
                id="gate-answer"
                type="text"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                className={styles.input}
                autoComplete="off"
                required
                enterKeyHint="go"
                disabled={isSubmitting || !validateUrl}
              />
              <span
                className={styles.suffix}
                aria-hidden="true"
              >
                {isSubmitting ? <span className={styles.spinner} /> : '↑'}
              </span>
            </span>
          </label>
          <button type="submit" className={styles.submitBtn} disabled={isSubmitting || !validateUrl}>
            {isSubmitting ? 'Checking…' : 'Enter'}
          </button>
        </form>
      </div>

      {showFailPopup && (
        <div className={styles.popupBackdrop} role="dialog" aria-modal="true" aria-labelledby="gate-fail-title">
          <div className={styles.popup}>
            <h2 id="gate-fail-title" className={styles.popupTitle}>Bye, stranger.</h2>
            <button
              type="button"
              className={styles.retryBtn}
              onClick={() => window.location.reload()}
            >
              try again?
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
