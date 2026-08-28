import BriefForm from '../BriefForm';
import Monogram from '../Monogram';
import { SITE_EMAIL } from '../../data/content';

export default function Contact({ lang, copy, id }) {
  return (
    <section className="contact on-ink" id={id} aria-labelledby="contact-title">
      <div className="shell contact__grid">
        <div className="contact__lead">
          <p className="mono index-mark">{copy.index} / {copy.label}</p>
          <h2 className="contact__title display" id="contact-title">{copy.title}</h2>
          <p className="lede contact__body">{copy.body}</p>

          <p className="contact__direct">
            <span className="mono contact__direct-label">{copy.directLabel}</span>
            <a className="contact__email" href={`mailto:${SITE_EMAIL}`} data-cursor="cta">
              {SITE_EMAIL}
              <span aria-hidden="true"> ↗</span>
            </a>
          </p>
          <p className="mono contact__note">{copy.responseNote}</p>

          <Monogram className="contact__monogram" strokeWidth={1.2} />
        </div>

        <div className="contact__form">
          <BriefForm lang={lang} copy={copy.form} />
        </div>
      </div>
    </section>
  );
}
