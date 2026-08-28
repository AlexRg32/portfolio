import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap, MQ } from '../motion/config';
import { SITE_EMAIL } from '../data/content';
import { privacyPath } from '../utils/routes';

const FORM_NAME = 'briefing';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const encode = (data) =>
  Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value ?? '')}`)
    .join('&');

/**
 * Netlify Forms. The markup is a real POST form with a matching static
 * declaration in index.html, so submissions are stored even if JavaScript
 * never runs. The fetch path only replaces the page reload.
 */
export default function BriefForm({ lang, copy }) {
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const summaryRef = useRef(null);
  const submitRef = useRef(null);

  // Magnetic final CTA — fine pointers only.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const button = submitRef.current;
        if (!button) return;
        const toX = gsap.quickTo(button, 'x', { duration: 0.5, ease: 'power3.out' });
        const toY = gsap.quickTo(button, 'y', { duration: 0.5, ease: 'power3.out' });

        const onMove = (event) => {
          const rect = button.getBoundingClientRect();
          const dx = event.clientX - (rect.left + rect.width / 2);
          const dy = event.clientY - (rect.top + rect.height / 2);
          const distance = Math.hypot(dx, dy);
          const radius = 150;
          if (distance > radius) {
            toX(0);
            toY(0);
            button.dataset.magnetic = 'off';
            return;
          }
          const pull = 1 - distance / radius;
          toX(dx * 0.28 * pull);
          toY(dy * 0.28 * pull);
          button.dataset.magnetic = 'on';
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        return () => {
          window.removeEventListener('pointermove', onMove);
          gsap.set(button, { x: 0, y: 0 });
        };
      });
      return () => mm.revert();
    },
    { scope: formRef },
  );

  const validate = (data) => {
    const next = {};
    if (!data.name?.trim()) next.name = copy.required;
    if (!data.email?.trim()) next.email = copy.required;
    else if (!EMAIL_RE.test(data.email.trim())) next.email = copy.invalidEmail;
    if (!data.message?.trim()) next.message = copy.required;
    return next;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus('invalid');
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': FORM_NAME, ...data }),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus('success');
      formRef.current?.reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="brief brief--done" role="status">
        <p className="mono brief__badge">✳</p>
        <p className="brief__done-title title-lg">{copy.successTitle}</p>
        <p className="brief__done-body">{copy.successBody}</p>
        <a className="link" href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}<span className="link__arrow" aria-hidden="true">↗</span></a>
      </div>
    );
  }

  const fieldProps = (key) =>
    errors[key]
      ? { 'aria-invalid': 'true', 'aria-describedby': `brief-${key}-error` }
      : {};

  return (
    <form
      ref={formRef}
      className="brief"
      name={FORM_NAME}
      method="POST"
      action="/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      noValidate
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="brief__honey" aria-hidden="true">
        <label>
          Do not fill this in
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <p className="mono brief__title">{copy.title}</p>

      {status === 'invalid' ? (
        <p className="brief__summary" ref={summaryRef} tabIndex={-1} role="alert">
          {copy.errorSummary}
        </p>
      ) : null}

      {status === 'error' ? (
        <p className="brief__summary" role="alert">
          <strong>{copy.errorTitle}</strong>{' '}
          {copy.errorBody} <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
        </p>
      ) : null}

      <div className="brief__grid">
        <p className="field">
          <label htmlFor="brief-name">{copy.name.label}</label>
          <input id="brief-name" name="name" type="text" autoComplete="name" required placeholder={copy.name.placeholder} {...fieldProps('name')} />
          {errors.name ? <span className="field__error mono" id="brief-name-error">{errors.name}</span> : null}
        </p>

        <p className="field">
          <label htmlFor="brief-company">{copy.company.label}</label>
          <input id="brief-company" name="company" type="text" autoComplete="organization" placeholder={copy.company.placeholder} />
        </p>

        <p className="field">
          <label htmlFor="brief-email">{copy.email.label}</label>
          <input id="brief-email" name="email" type="email" autoComplete="email" required placeholder={copy.email.placeholder} {...fieldProps('email')} />
          {errors.email ? <span className="field__error mono" id="brief-email-error">{errors.email}</span> : null}
        </p>

        <p className="field">
          <label htmlFor="brief-need">{copy.need.label}</label>
          <select id="brief-need" name="need" defaultValue="">
            <option value="" disabled>{copy.select}</option>
            {copy.need.options.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </p>

        <p className="field field--wide">
          <label htmlFor="brief-goal">{copy.goal.label}</label>
          <input id="brief-goal" name="goal" type="text" placeholder={copy.goal.placeholder} />
        </p>

        <p className="field">
          <label htmlFor="brief-deadline">{copy.deadline.label}</label>
          <select id="brief-deadline" name="deadline" defaultValue="">
            <option value="" disabled>{copy.select}</option>
            {copy.deadline.options.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </p>

        <p className="field">
          <label htmlFor="brief-budget">{copy.budget.label}</label>
          <select id="brief-budget" name="budget" defaultValue="">
            <option value="" disabled>{copy.select}</option>
            {copy.budget.options.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </p>

        <p className="field field--wide">
          <label htmlFor="brief-message">{copy.message.label}</label>
          <textarea id="brief-message" name="message" rows={5} required placeholder={copy.message.placeholder} {...fieldProps('message')} />
          {errors.message ? <span className="field__error mono" id="brief-message-error">{errors.message}</span> : null}
        </p>
      </div>

      <div className="brief__foot">
        <button
          ref={submitRef}
          className="cta cta--magnetic"
          type="submit"
          disabled={status === 'sending'}
          data-cursor="cta"
        >
          <span>{status === 'sending' ? copy.sending : copy.submit}</span>
          <span className="cta__arrow" aria-hidden="true">→</span>
        </button>
        <p className="brief__privacy mono">
          {copy.privacy}{' '}
          <Link to={privacyPath(lang)}>{copy.privacyLink}</Link>
        </p>
      </div>
    </form>
  );
}
