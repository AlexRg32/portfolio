import { Link, Navigate, useParams } from 'react-router-dom';
import Reveal from '../components/Reveal';
import RouteMeta from '../components/RouteMeta';
import { projects } from '../data/content';

const labels = {
  es: { back: 'Trabajo seleccionado', challenge: 'El reto', response: 'La respuesta', decisions: 'Decisiones clave', live: 'Visitar proyecto', next: 'Siguiente caso', role: 'Responsabilidad', year: 'Año' },
  en: { back: 'Selected work', challenge: 'The challenge', response: 'The response', decisions: 'Key decisions', live: 'Visit project', next: 'Next case', role: 'Responsibility', year: 'Year' },
};

export default function CaseStudy({ lang }) {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  const copy = labels[lang];
  const home = lang === 'es' ? '/' : '/en';
  const casePrefix = lang === 'es' ? '/trabajo/' : '/en/work/';

  if (!project) return <Navigate to={home} replace />;
  const nextProject = projects.find((item) => item.slug === project.next);

  return (
    <>
      <RouteMeta
        lang={lang}
        title={`${project.title} — Alejandro Ruiz`}
        description={project.summary[lang]}
        path={`${casePrefix}${project.slug}`}
        image={project.image}
      />
      <main id="main" className="case-page">
        <header className="case-hero shell">
          <Link className="case-hero__back text-link" to={`${home}#work`}><span aria-hidden="true">←</span>{copy.back}</Link>
          <div className="case-hero__heading">
            <p className="kicker">{project.category[lang]}</p>
            <h1>{project.title}</h1>
          </div>
          <div className="case-hero__meta">
            <p><span>{copy.role}</span>{project.services[lang]}</p>
            <p><span>{copy.year}</span>{project.year}</p>
            <a className="button button--ink" href={project.url} target="_blank" rel="noreferrer">{copy.live}<span aria-hidden="true">↗</span></a>
          </div>
        </header>

        <div className="case-image shell">
          <img src={project.image} alt={project.imageAlt[lang]} fetchPriority="high" />
        </div>

        <section className="case-narrative shell">
          <Reveal className="case-narrative__block">
            <p className="kicker">{copy.challenge}</p>
            <p className="case-narrative__lead">{project.challenge[lang]}</p>
          </Reveal>
          <Reveal className="case-narrative__block">
            <p className="kicker">{copy.response}</p>
            <p className="case-narrative__lead">{project.response[lang]}</p>
          </Reveal>
          <Reveal className="case-narrative__block case-narrative__block--decisions">
            <p className="kicker">{copy.decisions}</p>
            <ol>{project.decisions[lang].map((decision) => <li key={decision}><span aria-hidden="true" />{decision}</li>)}</ol>
          </Reveal>
        </section>

        <Link className="next-case" to={`${casePrefix}${nextProject.slug}`}>
          <span>{copy.next}</span><strong>{nextProject.title}</strong><span aria-hidden="true">↗</span>
        </Link>
      </main>
    </>
  );
}
