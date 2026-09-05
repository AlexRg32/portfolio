import TransitionLink from '../TransitionLink';
import FitLines from '../FitLines';
import { casePath } from '../../utils/routes';

function srcSet(base, widths) {
  return widths.map((width) => `${base}-${width}.webp ${width}w`).join(', ');
}

/**
 * Three projects, alternating side to side. The screenshot and the name are
 * the section: everything else is one line of metadata and two links.
 */
export default function Work({ lang, copy, projects, id }) {
  return (
    <section className="work" id={id} aria-labelledby="work-title">
      <div className="shell work__head">
        <p className="mono index-mark work__eyebrow">{copy.index} / {copy.label}</p>
        <FitLines
          as="h2"
          className="work__title display"
          id="work-title"
          lines={[copy.title]}
          reveal
        />
      </div>

      <ol className="work__list">
        {projects.map((project) => {
          const text = project[lang];
          const to = casePath(lang, project.slug);

          return (
            <li className="project" key={project.slug} data-parallax-scope>
              <TransitionLink
                className="project__media"
                to={to}
                tabIndex={-1}
                aria-hidden="true"
                data-reveal="clip"
                data-cursor="case"
                data-cursor-label={project.title}
                style={{ '--plate-surface': project.surface }}
              >
                <span className="project__parallax" data-parallax="22" data-reveal-target>
                  <img
                    className="project__img"
                    src={`${project.heroBase}-1200.webp`}
                    srcSet={srcSet(project.heroBase, project.heroWidths)}
                    sizes="(max-width: 700px) calc(100vw - 36px), (max-width: 1024px) calc(100vw - 96px), 56vw"
                    width={project.imageWidth}
                    height={project.imageHeight}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{ viewTransitionName: `case-media-${project.slug}` }}
                  />
                </span>
              </TransitionLink>

              <div className="project__body">
                <p className="mono project__meta" data-reveal="up">
                  <span className="project__number">{project.index}</span>
                  <span>{text.category}</span>
                  <span>{project.year}</span>
                </p>

                <h3 className="project__name title-lg" data-reveal="up">
                  <TransitionLink to={to} data-cursor="case" data-cursor-label={project.title}>
                    {project.title}
                  </TransitionLink>
                </h3>

                <p className="lede project__summary" data-reveal="up">{text.summary}</p>

                <p className="project__actions" data-reveal="up">
                  <TransitionLink className="link project__case" to={to}>
                    {copy.readCase}
                    <span className="link__arrow" aria-hidden="true">→</span>
                  </TransitionLink>
                  <a className="link project__visit" href={project.url} target="_blank" rel="noreferrer">
                    {copy.visit}
                    <span className="link__arrow" aria-hidden="true">↗</span>
                  </a>
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
