import { CV_URL, GITHUB_URL, LINKEDIN_URL } from '../../data/content';

/**
 * The person behind the studio. Real photograph, first person singular, and a
 * work history used as proof of judgement rather than as a job application.
 */
export default function Studio({ copy, id }) {
  return (
    <section className="studio" id={id} aria-labelledby="studio-title">
      <div className="shell studio__grid">
        <div className="studio__intro">
          <p className="mono index-mark">{copy.index} / {copy.label}</p>
          <h2 className="title-xl studio__title" id="studio-title" data-reveal="up">{copy.title}</h2>
          <p className="lede studio__body" data-reveal="up">{copy.body}</p>
          <p className="body studio__note" data-reveal="up">{copy.note}</p>

          <ul className="studio__links" data-reveal="group">
            <li><a className="link" href={CV_URL} target="_blank" rel="noreferrer">{copy.links.cv}<span className="link__arrow" aria-hidden="true">↗</span></a></li>
            <li><a className="link" href={LINKEDIN_URL} target="_blank" rel="noreferrer">{copy.links.linkedin}<span className="link__arrow" aria-hidden="true">↗</span></a></li>
            <li><a className="link" href={GITHUB_URL} target="_blank" rel="noreferrer">{copy.links.github}<span className="link__arrow" aria-hidden="true">↗</span></a></li>
          </ul>
        </div>

        <figure className="studio__figure">
          <img
            src="/assets/alejandro-figure-760.webp"
            srcSet="/assets/alejandro-figure-480.webp 480w, /assets/alejandro-figure-760.webp 760w, /assets/alejandro-figure-1100.webp 1100w"
            sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1024px) 46vw, min(34vw, 520px)"
            width="1300"
            height="1466"
            alt={copy.portraitAlt}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="mono">Alejandro Ruiz · Alicante</figcaption>
        </figure>

        <div className="studio__record">
          <p className="mono studio__record-label">{copy.experienceLabel}</p>
          <ol className="studio__experience" data-reveal="group">
            {copy.experience.map((item) => (
              <li className="record" key={item.company}>
                <p className="mono record__period">{item.period}</p>
                <div className="record__company">
                  {item.logo ? (
                    <img className={`record__logo ${item.logoClass}`} src={item.logo} alt="" loading="lazy" width="94" height="54" />
                  ) : null}
                  <h3 className="record__name">{item.company}</h3>
                </div>
                <p className="record__role">{item.role}</p>
                <p className="record__body">{item.body}</p>
              </li>
            ))}
          </ol>

          <p className="studio__stack">
            <span className="mono studio__stack-label">{copy.stackLabel}</span>
            <span className="studio__stack-list">{copy.stack.join(' · ')}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
