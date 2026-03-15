import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import MagneticButton from '../components/ui/MagneticButton';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function FeaturedWork() {
  // Using 3 specific projects for a rich horizontal scroll
  const featuredIds = [3, 1, 5]; 
  const displayProjects = featuredIds.map(id => projects.find(p => p.id === id)).filter(Boolean);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const containerRef = useRef(null);
  
  // Creates a container of 300vh so user scrolls normally, 
  // but content is pinned and translates X.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Simple and fluid translation using vw to bypass flex sizing limits.
  // With 3 cards + CTA + padding, sliding -160vw leaves the end gracefully in view.
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-160vw"]);

  if (prefersReducedMotion || isMobile) {
    return (
      <section className="relative z-10 bg-bg py-24 md:py-32">
        <div className="container-wide">
          <div className="mb-12 md:mb-16">
            <div className="line-separator mb-6 md:mb-8 w-full max-w-40 bg-white" />
            <p className="text-white text-sm font-body uppercase tracking-[0.3em] mb-4">
              Selección Destacada
            </p>
            <h2 className="text-display-md font-display text-white max-w-2xl">
              Sistemas que escalan y marcas que impactan.
            </h2>
          </div>

          <div className="space-y-10">
            {displayProjects.map((project) => (
              <article
                key={project.id}
                className="rounded-[28px] border border-border bg-surface/70 p-5 md:p-8"
              >
                <Link to={`/work/${project.id}`} className="block overflow-hidden rounded-[22px]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="aspect-[16/10] w-full object-cover"
                    loading="lazy"
                  />
                </Link>
                <div className="mt-6 flex flex-col gap-5">
                  <div>
                    <h3 className="text-text font-display text-2xl md:text-4xl mb-3 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-base font-body leading-relaxed text-text-muted">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] md:text-xs font-body uppercase tracking-wider text-text-dim border border-border px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <MagneticButton
                      as={Link}
                      to={`/work/${project.id}`}
                      className="inline-flex rounded-full border border-border px-6 py-3 text-xs md:text-sm uppercase tracking-[0.2em] text-text transition-all duration-300 hover:bg-text hover:text-bg"
                    >
                      Ver detalle
                    </MagneticButton>
                    <MagneticButton
                      as="a"
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full border border-border-light px-6 py-3 text-xs md:text-sm uppercase tracking-[0.2em] text-text-dim transition-all duration-300 hover:border-text hover:text-text"
                    >
                      Abrir web
                    </MagneticButton>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative z-10 bg-bg h-[300vh]">
      {/* Pinned section keeps its viewport fixed while the wrapper scrolls */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        
        {/* Intro text that stays fixed on screen during the scroll */}
        <div className="absolute top-16 md:top-24 left-0 w-full px-6 md:px-12 pointer-events-none z-20 mix-blend-difference pb-8">
          <div className="line-separator mb-6 md:mb-8 w-1/4 bg-white" />
          <p className="text-white text-sm font-body uppercase tracking-[0.3em] mb-4">
            Selección Destacada
          </p>
          <h2 className="text-display-md font-display text-white max-w-2xl">
            Sistemas que escalan y marcas que impactan.
          </h2>
        </div>

        {/* The horizontal scrolling track */}
        <motion.div style={{ x }} className="flex items-center gap-16 md:gap-32 pl-[10vw] pr-[20vw] mt-[10vh]">
          
          {/* Spacer block to let the intro breathe at the start */}
          <div className="w-[80vw] md:w-[40vw] flex-shrink-0" />

          {displayProjects.map((project) => (
            <div 
              key={project.id} 
              className="w-[85vw] md:w-[50vw] flex-shrink-0 flex flex-col gap-6 group"
            >
              {/* Image Box */}
              <div className="w-full relative aspect-[4/3] md:aspect-[16/10] overflow-hidden cursor-none">
                <Link to={`/work/${project.id}`} data-cursor="hover" className="block w-full h-full relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </Link>
              </div>

              {/* Card Meta */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-text font-display text-2xl md:text-4xl mb-3 leading-tight">
                    {project.title}
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-[10px] md:text-xs font-body uppercase tracking-wider text-text-dim border border-border px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <MagneticButton 
                  as={Link} 
                  to={`/work/${project.id}`}
                  className="flex-shrink-0 text-xs md:text-sm uppercase tracking-[0.2em] text-text border border-border px-6 py-3 hover:bg-text hover:text-bg transition-all duration-300 rounded-full"
                >
                  Ver detalle
                </MagneticButton>
              </div>
            </div>
          ))}

          {/* End CTA directly inside the horizontal scroll */}
          <div className="w-[80vw] md:w-[30vw] flex-shrink-0 flex flex-col items-center justify-center text-center px-8 border-l border-border-light h-64">
             <h3 className="text-display-sm font-display text-text mb-8">Descubre más sistemas</h3>
             <MagneticButton 
              as={Link} 
              to="/work"
              className="inline-block px-10 py-5 bg-text text-bg font-body text-sm uppercase tracking-[0.2em] hover:bg-transparent hover:text-text border border-text transition-all duration-500 ease-out-expo"
            >
              Ver Todo El Trabajo
            </MagneticButton>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
