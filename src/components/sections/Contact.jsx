import FitLines from '../FitLines';
import Seal from '../Seal';
import Magnetic from '../Magnetic';
import { SITE_EMAIL, LINKEDIN_URL, GITHUB_URL, CV_URL } from '../../data/content';

/**
 * The end of the page: one question, one email address, three links.
 * No form — the point of contact is the address itself.
 */
export default function Contact({ copy, id, seal }) {
  return (
    <section className="contact on-flame" id={id} aria-labelledby="contact-title">
      <div className="shell contact__inner">
        <p className="mono index-mark contact__eyebrow">{copy.index} / {copy.label}</p>

        <div className="contact__headline" data-fit-frame>
          <FitLines
            as="h2"
            className="contact__title display"
            id="contact-title"
            lines={copy.titleLines}
            reveal
          />
        </div>

        <p className="lede contact__body" data-reveal="up">{copy.body}</p>

        <p className="contact__email-row" data-reveal="up">
          <span className="mono contact__email-label">{copy.emailLabel}</span>
          <a className="contact__email" href={`mailto:${SITE_EMAIL}`} data-cursor="cta">
            {SITE_EMAIL}
            <span className="contact__email-arrow" aria-hidden="true">↗</span>
          </a>
        </p>

        <ul className="contact__links" data-reveal="group">
          <li>
            <a className="link" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              {copy.links.linkedin}<span className="link__arrow" aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a className="link" href={GITHUB_URL} target="_blank" rel="noreferrer">
              {copy.links.github}<span className="link__arrow" aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a className="link" href={CV_URL} target="_blank" rel="noreferrer">
              {copy.links.cv}<span className="link__arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>

        <p className="mono contact__place">{copy.place}</p>

        <Magnetic className="contact__seal-magnet">
          <a className="contact__seal" href={`mailto:${SITE_EMAIL}`} data-cursor="cta">
            <Seal text={seal}>
              <span aria-hidden="true">↗</span>
            </Seal>
            <span className="sr-only">{SITE_EMAIL}</span>
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
