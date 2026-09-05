import FitLines from '../FitLines';
import { CV_URL } from '../../data/content';

/**
 * The work history as an editorial timeline: years, company, role. One line
 * of context each, and the stack underneath. Nothing longer.
 */
export default function Experience({ copy, id }) {
  return (
    <section className="experience on-ink" id={id} aria-labelledby="experience-title">
      <div className="shell experience__head">
        <p className="mono index-mark experience__eyebrow">{copy.index} / {copy.label}</p>
        <FitLines
          as="h2"
          className="experience__title display"
          id="experience-title"
          lines={[copy.title]}
          reveal
        />
      </div>

      <ol className="shell experience__list">
        {copy.items.map((item) => (
          <li className="record" key={item.company} data-reveal="up">
            <p className="mono record__period">{item.period}</p>
            <h3 className="record__company title-lg">{item.company}</h3>
            <p className="record__role accent">{item.role}</p>
            <p className="record__note">{item.note}</p>
          </li>
        ))}
      </ol>

      <div className="shell experience__foot" data-reveal="up">
        <p className="experience__stack">
          <span className="mono experience__stack-label">{copy.stackLabel}</span>
          <span className="experience__stack-list accent">{copy.stack.join(' · ')}</span>
        </p>
        <a className="link" href={CV_URL} target="_blank" rel="noreferrer">
          {copy.cv}
          <span className="link__arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
