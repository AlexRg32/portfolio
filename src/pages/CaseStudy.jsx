import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import TransitionLink from '../components/TransitionLink';
import { content, getProject } from '../data/content';
import { casePath, sectionHref, SECTION_IDS } from '../utils/routes';
import RouteMeta from '../components/RouteMeta';
import NotFound from './NotFound';
import useEditorialReveal from '../motion/useEditorialReveal';

function srcSet(base, widths) {
  return widths.map((width) => `${base}-${width}.webp ${width}w`).join(', ');
}

export default function CaseStudy({ lang }) {
  const { slug } = useParams();
  const project = getProject(slug);
  const copy = content[lang].caseStudy;
  const ids = SECTION_IDS[lang];
  const scope = useRef(null);

  useEditorialReveal(scope, [slug, lang]);

  if (!project) return <NotFound lang={lang} />;

  const text = project[lang];
  const nextProject = getProject(project.next);
  const nextText = nextProject[lang];

  return (
    <>
      <RouteMeta
        lang={lang}
        title={`${project.title} — ${text.category} · Alejandro Ruiz`}
        description={text.summary}
        path={casePath(lang, project.slug)}
        image={project.image}
        type="article"
      />

      <main
        id="main"
        className="case"
        ref={scope}
        style={{ '--project-accent': project.accent, '--project-surface': project.surface }}
      >
        {/* 1 — Visual hero */}
        <header className="case__hero">
          <div className="shell case__hero-head">
            <Link className="link case__back" to={sectionHref(lang, ids.work)}>
              <span aria-hidden="true">←</span> {copy.back}
            </Link>
            <p className="mono index-mark case__category">{project.index} / {text.category}</p>
            <h1 className="case__title display">{project.title}</h1>
            <dl className="case__meta">
              <div><dt className="mono">{copy.sectorLabel}</dt><dd>{text.sector}</dd></div>
              <div><dt className="mono">{copy.yearLabel}</dt><dd>{project.year}</dd></div>
              <div><dt className="mono">{copy.stackLabel}</dt><dd>{project.stack.join(' · ')}</dd></div>
            </dl>
          </div>

          <figure className="case__plate">
            <img
              src={`${project.heroBase}-1200.webp`}
              srcSet={srcSet(project.heroBase, project.heroWidths)}
              sizes="(max-width: 700px) 100vw, min(92vw, 1500px)"
              width={project.imageWidth}
              height={project.imageHeight}
              alt={text.imageAlt}
              fetchPriority="high"
              decoding="async"
              style={{ viewTransitionName: `case-media-${project.slug}` }}
            />
          </figure>
        </header>

        {/* 2–6 — Context, problem, objective, responsibility, scope */}
        <section className="shell case__brief" aria-label={copy.contextLabel}>
          <div className="case__brief-row" data-reveal="up">
            <p className="mono case__label">{copy.contextLabel}</p>
            <p className="lede">{text.summary}</p>
          </div>
          <div className="case__brief-row" data-reveal="up">
            <p className="mono case__label">{copy.problemLabel}</p>
            <p className="case__paragraph">{text.problem}</p>
          </div>
          <div className="case__brief-row" data-reveal="up">
            <p className="mono case__label">{copy.objectiveLabel}</p>
            <p className="case__paragraph">{text.objective}</p>
          </div>
          <div className="case__brief-row" data-reveal="up">
            <p className="mono case__label">{copy.roleLabel}</p>
            <p className="case__paragraph">{text.role}</p>
          </div>
          <div className="case__brief-row" data-reveal="up">
            <p className="mono case__label">{copy.scopeLabel}</p>
            <ol className="case__scope">
              {text.scope.map((item, index) => (
                <li key={item}><span className="mono" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{item}</li>
              ))}
            </ol>
          </div>
        </section>

        {/* 7 — Decisions */}
        <section className="case__decisions" aria-labelledby="case-decisions-title">
          <div className="shell">
            <h2 className="mono index-mark case__section-title" id="case-decisions-title">{copy.decisionsLabel}</h2>
            <ol className="case__decision-list" data-reveal="group">
              {text.decisions.map((decision) => (
                <li className="decision" key={decision.label}>
                  <p className="mono decision__label">{decision.label}</p>
                  <p className="decision__body">{decision.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 8 — Visual result: real captures, desktop and mobile */}
        <section className="case__result" aria-labelledby="case-result-title">
          <div className="shell case__result-head">
            <h2 className="mono index-mark case__section-title" id="case-result-title">{copy.resultLabel}</h2>
            <p className="body">{copy.resultBody}</p>
          </div>

          <div className="shell case__result-grid">
            <figure className="case__shot case__shot--desktop" data-reveal="up">
              <img
                src={`${project.detailBase}-1200.webp`}
                srcSet={srcSet(project.detailBase, project.detailWidths)}
                sizes="(max-width: 1024px) calc(100vw - 40px), 62vw"
                width={project.detailWidth}
                height={project.detailHeight}
                alt={text.detailAlt}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="mono">{copy.desktopLabel}</figcaption>
            </figure>

            <figure className="case__shot case__shot--mobile" data-reveal="up">
              <img
                src={`${project.mobileBase}-420.webp`}
                srcSet={srcSet(project.mobileBase, project.mobileWidths)}
                sizes="(max-width: 1024px) 60vw, 26vw"
                width={project.mobileWidth}
                height={project.mobileHeight}
                alt={text.mobileAlt}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="mono">{copy.mobileLabel}</figcaption>
            </figure>
          </div>
        </section>

        {/* 9 — Business result, only when verified */}
        <section className="shell case__business" aria-labelledby="case-business-title">
          <p className="mono case__label" id="case-business-title">{copy.businessLabel}</p>
          {project.revenueResult === 'PENDIENTE_CLIENTE' ? (
            <p className="case__pending">{copy.businessPending}</p>
          ) : (
            <p className="lede">{project.revenueResult}</p>
          )}
          {/* 10 — Visit the live site */}
          <a className="cta" href={project.url} target="_blank" rel="noreferrer" data-cursor="cta">
            <span>{copy.visit}</span>
            <span className="cta__arrow" aria-hidden="true">↗</span>
          </a>
        </section>

        {/* 11 — Next case */}
        <TransitionLink
          className="case__next on-ink"
          to={casePath(lang, nextProject.slug)}
          data-cursor="case"
          data-cursor-label={content[lang].work.cursor}
          style={{ '--project-accent': nextProject.accent }}
        >
          <span className="shell case__next-inner">
            <span className="mono case__next-label">{copy.next} / {nextProject.index}</span>
            <span className="case__next-title title-xl">{nextProject.title}</span>
            <span className="mono case__next-sector">{nextText.sector}</span>
            <span className="case__next-arrow" aria-hidden="true">→</span>
          </span>
        </TransitionLink>

        {/* 12 — Start a similar project */}
        <section className="shell case__cta" aria-labelledby="case-cta-title">
          <h2 className="title-xl" id="case-cta-title">{copy.ctaTitle}</h2>
          <p className="body">{copy.ctaBody}</p>
          <Link className="cta" to={sectionHref(lang, ids.contact)} data-cursor="cta">
            <span>{copy.cta}</span>
            <span className="cta__arrow" aria-hidden="true">→</span>
          </Link>
        </section>
      </main>
    </>
  );
}
