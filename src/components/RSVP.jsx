import { useState } from 'react';
import styles from './RSVP.module.css';

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

const INITIAL = {
  name: '',
  email: '',
  attendance: '',
  guests: '1',
  arrivalDate: '',
  dietary: '',
};

export default function RSVP() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) {
      e.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email address.';
    }
    if (!form.attendance) e.attendance = 'Please select your attendance.';
    if (!form.guests || Number(form.guests) < 1 || Number(form.guests) > 6) {
      e.guests = 'Please enter a number between 1 and 6.';
    }
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
    if (SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
      console.error('VITE_GOOGLE_SCRIPT_URL is still using placeholder value.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      const endpoint = new URL(SCRIPT_URL);
      Object.entries(form).forEach(([k, v]) => endpoint.searchParams.set(k, v));
      endpoint.searchParams.set('source', 'website');

      // GET beacon fallback is more reliable across Apps Script deployments
      // where browser POSTs may redirect to non-JSON error pages.
      await fetch(endpoint.toString(), { method: 'GET', mode: 'no-cors' });
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
              Your RSVP has been received. We can't wait to celebrate with you!
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
        <p className="section-subtitle">Kindly Reply By August 1, 2025</p>
        <h2 className="section-title">RSVP</h2>
        <div className="section-divider"><span>✦</span></div>

        {!SCRIPT_URL && (
          <div className={styles.devNotice} role="alert">
            ⚠️ <strong>Development mode:</strong> Set <code>VITE_GOOGLE_SCRIPT_URL</code> in your{' '}
            <code>.env</code> file to enable form submission.
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
              <label htmlFor="rsvp-attendance" className={styles.label}>
                Attendance <span aria-hidden="true">*</span>
              </label>
              <select
                id="rsvp-attendance"
                name="attendance"
                value={form.attendance}
                onChange={handleChange}
                className={`${styles.select} ${errors.attendance ? styles.inputError : ''}`}
              >
                <option value="">— Please select —</option>
                <option value="Attending">Joyfully Accepts</option>
                <option value="Not Attending">Regretfully Declines</option>
              </select>
              {errors.attendance && <span className={styles.error} role="alert">{errors.attendance}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="rsvp-guests" className={styles.label}>
                Number of Guests
              </label>
              <input
                id="rsvp-guests"
                type="number"
                name="guests"
                value={form.guests}
                onChange={handleChange}
                min="1"
                max="6"
                className={`${styles.input} ${errors.guests ? styles.inputError : ''}`}
              />
              {errors.guests && <span className={styles.error} role="alert">{errors.guests}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="rsvp-arrival-date" className={styles.label}>
              What date do you plan to arrive?
            </label>
            <input
              id="rsvp-arrival-date"
              type="text"
              name="arrivalDate"
              value={form.arrivalDate}
              onChange={handleChange}
              placeholder="Example: Thursday, October 16"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="rsvp-dietary" className={styles.label}>
              Dietary Restrictions / Special Requests
            </label>
            <textarea
              id="rsvp-dietary"
              name="dietary"
              value={form.dietary}
              onChange={handleChange}
              placeholder="Vegetarian, gluten-free, allergies, etc."
              rows={4}
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
            {status === 'submitting' ? 'Sending…' : 'Send RSVP'}
          </button>
        </form>
      </div>
    </section>
  );
}
