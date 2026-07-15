import { Link } from 'react-router-dom';

export default function ProjectShowcase({ projects, copy, lang, casePrefix }) {
  return (
    <section className="work shell" id="work" aria-labelledby="work-title">
      <header className="work-intro shell">
        <p className="kicker">{copy.eyebrow}</p>
        <h2 id="work-title">{copy.title}</h2>
        <p>{copy.intro}</p>
      </header>

      <div className="project-list">
        {projects.map((project, index) => (
          <article className="project-row" key={project.slug}>
            <div className="project-row__meta">
              <p className="project-row__index"><span>0{index + 1}</span><span>{project.year}</span></p>
              <h3><Link to={`${casePrefix}${project.slug}`}>{project.title}</Link></h3>
              <p className="project-row__summary">{project.summary[lang]}</p>
              <p className="project-row__category">{project.category[lang]}</p>
              <Link className="text-link" to={`${casePrefix}${project.slug}`}>{copy.readCase}<span aria-hidden="true">↗</span></Link>
            </div>
            <Link className="project-row__visual" to={`${casePrefix}${project.slug}`} aria-label={`${copy.readCase}: ${project.title}`}>
              <img src={project.image} alt={project.imageAlt[lang]} loading="lazy" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
