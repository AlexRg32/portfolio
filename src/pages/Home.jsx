import { content, projects } from '../data/content';
import ProjectShowcase from '../components/ProjectShowcase';
import Reveal from '../components/Reveal';
import RouteMeta from '../components/RouteMeta';

export default function Home({ lang }) {
  const copy = content[lang];
  const casePrefix = lang === 'es' ? '/trabajo/' : '/en/work/';

  return (
    <>
      <RouteMeta
        lang={lang}
        title="Alejandro Ruiz — Frontend developer"
        description={copy.metaDescription}
        path={lang === 'es' ? '/' : '/en'}
      />

      <main id="main">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero__copy">
            <p className="kicker">{copy.hero.eyebrow}</p>
            <h1 id="hero-title">{copy.hero.title.map((line) => <span key={line}>{line}</span>)}</h1>
            <p className="hero__intro">{copy.hero.intro}</p>
            <div className="hero__actions">
              <a className="text-link" href="#work">{copy.hero.primary}<span aria-hidden="true">↓</span></a>
              <a className="text-link" href="mailto:alexrg32@icloud.com">{copy.hero.secondary}<span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <figure className="hero__portrait">
            <img src="/assets/alejandro-portrait.jpg" alt={copy.hero.imageAlt} fetchPriority="high" />
            <figcaption><span>{copy.hero.caption}</span><span>2026</span></figcaption>
          </figure>
          <div className="hero__note" aria-hidden="true">
            <span>01</span><span>Portfolio</span>
          </div>
        </section>

        <ProjectShowcase projects={projects} copy={copy.work} lang={lang} casePrefix={casePrefix} />

        <section className="experience" id="experience" aria-labelledby="experience-title">
          <div className="shell experience__grid">
            <Reveal className="section-heading section-heading--dark">
              <p className="kicker">{copy.experience.eyebrow}</p>
              <h2 id="experience-title">{copy.experience.title}</h2>
            </Reveal>
            <div className="timeline">
              {copy.experience.items.map((item) => (
                <Reveal as="article" className="timeline__item" key={item.company}>
                  <div>
                    <p className="mono-label">{item.period}</p>
                    <h3>{item.company}</h3>
                  </div>
                  <div className="timeline__detail">
                    <h4>{item.role}</h4>
                    <p>{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="about shell" id="about" aria-labelledby="about-title">
          <Reveal className="about__statement">
            <p className="kicker">{copy.about.eyebrow}</p>
            <h2 id="about-title">{copy.about.title}</h2>
          </Reveal>
          <Reveal className="about__copy">
            <p>{copy.about.body}</p>
            <p className="about__meta">{copy.about.meta}</p>
          </Reveal>
        </section>

        <section className="contact shell" id="contact" aria-labelledby="contact-title">
          <Reveal>
            <p className="kicker">{copy.contact.eyebrow}</p>
            <h2 id="contact-title">{copy.contact.title}</h2>
            <p>{copy.contact.body}</p>
            <a className="contact__email" href="mailto:alexrg32@icloud.com">alexrg32@icloud.com <span aria-hidden="true">↗</span></a>
          </Reveal>
        </section>
      </main>
    </>
  );
}
