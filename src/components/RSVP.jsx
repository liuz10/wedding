import { useState } from 'react';
import styles from './RSVP.module.css';

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

const INITIAL = {
  name: '',
  email: '',
  attendance: '',    // repurposed: arrival date
  guests: '',        // repurposed: departure date
  arrivalDate: '',   // repurposed: dietary restrictions
  dietary: '',       // repurposed: notes / questions
};

export default function RSVP() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) {
      e.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email address.';
    }
    if (!form.attendance) e.attendance = 'Please select your arrival date.';
    if (!form.guests) e.guests = 'Please select your departure date.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!SCRIPT_URL) {
      console.warn('VITE_GOOGLE_SCRIPT_URL is not set. Simulating success.');
      setStatus('success');
      return;
    }
    if (
      SCRIPT_URL.includes('YOUR_SCRIPT_ID') ||
      SCRIPT_URL.includes('YOUR_SCRIPT_URL_HERE')
    ) {
      console.error('Google Script URL is still using placeholder value.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      const endpoint = new URL(SCRIPT_URL);
      Object.entries(form).forEach(([k, v]) => endpoint.searchParams.set(k, v));
      endpoint.searchParams.set('source', 'website');
      endpoint.searchParams.set('_ts', String(Date.now()));

      await fetch(endpoint.toString(), {
        method: 'GET',
        mode: 'no-cors',
        credentials: 'omit',
        cache: 'no-store',
      });
      setStatus('success');
      setForm(INITIAL);
    } catch (err) {
      console.error('RSVP submission error:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section id="rsvp" className={styles.section}>
        <div className="container">
          <div className={styles.successBox}>
            <span className={styles.successIcon} aria-hidden="true">✦</span>
            <h2 className={styles.successTitle}>Thank You!</h2>
            <p className={styles.successMsg}>
              Your response has been received. We can’t wait to celebrate with you!
            </p>
            <button className={styles.resetBtn} onClick={() => setStatus('idle')}>
              Submit Another Response
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className={styles.section}>
      <div className="container">
        <p className="section-subtitle">Let Us Know</p>
        <h2 className="section-title">Travel Details</h2>
        <div className="section-divider"><span>✦</span></div>

        <p className={styles.intro}>
          We’re so excited to have you! Please share your travel dates so we can
          help coordinate transportation and plan the weekend.
        </p>

        {!SCRIPT_URL && (
          <div className={styles.devNotice} role="alert">
            ⚠️ <strong>Development mode:</strong> Set <code>VITE_GOOGLE_SCRIPT_URL</code> in
            your <code>.env</code> file to enable form submission.
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="rsvp-name" className={styles.label}>
                Full Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="rsvp-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane & John Smith"
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                autoComplete="name"
              />
              {errors.name && <span className={styles.error} role="alert">{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="rsvp-email" className={styles.label}>
                Email Address <span aria-hidden="true">*</span>
              </label>
              <input
                id="rsvp-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                autoComplete="email"
              />
              {errors.email && <span className={styles.error} role="alert">{errors.email}</span>}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="rsvp-arrival" className={styles.label}>
                Arrival Date <span aria-hidden="true">*</span>
              </label>
              <input
                id="rsvp-arrival"
                type="date"
                name="attendance"
                value={form.attendance}
                onChange={handleChange}
                min="2026-08-05"
                max="2026-08-10"
                className={`${styles.input} ${errors.attendance ? styles.inputError : ''}`}
              />
              {errors.attendance && <span className={styles.error} role="alert">{errors.attendance}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="rsvp-departure" className={styles.label}>
                Departure Date <span aria-hidden="true">*</span>
              </label>
              <input
                id="rsvp-departure"
                type="date"
                name="guests"
                value={form.guests}
                onChange={handleChange}
                min="2026-08-07"
                max="2026-08-12"
                className={`${styles.input} ${errors.guests ? styles.inputError : ''}`}
              />
              {errors.guests && <span className={styles.error} role="alert">{errors.guests}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="rsvp-dietary" className={styles.label}>
              Dietary Restrictions
            </label>
            <input
              id="rsvp-dietary"
              type="text"
              name="arrivalDate"
              value={form.arrivalDate}
              onChange={handleChange}
              placeholder="Vegetarian, gluten-free, allergies, etc."
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="rsvp-notes" className={styles.label}>
              Questions or Notes
            </label>
            <textarea
              id="rsvp-notes"
              name="dietary"
              value={form.dietary}
              onChange={handleChange}
              placeholder="Anything else you'd like us to know?"
              rows={3}
              className={styles.textarea}
            />
          </div>

          {status === 'error' && (
            <div className={styles.errorBanner} role="alert">
              Something went wrong. Please try again or contact us directly.
            </div>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending…' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  );
}
