import React from 'react';

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 card-hover flex flex-col h-full">
      {/* Image/Overlay Section */}
      <div className="h-52 bg-slate-200 dark:bg-slate-800 relative group overflow-hidden">
        {project.image ? (
          <>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {project.status && (
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 bg-amber-500/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg border border-amber-400/50">
                  {project.status}
                </span>
              </div>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]"
                aria-label={`Ver sitio web de ${project.title}`}
              >
                <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-2xl border border-slate-200 dark:border-slate-700 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                  <span>Visitar Web</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
            <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          {project.liveLink ? (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="group/title">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover/title:text-primary-600 dark:group-hover/title:text-primary-400 transition-colors flex items-center gap-2">
                {project.title}
                <svg className="w-4 h-4 opacity-70 group-hover/title:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </h3>
            </a>
          ) : (
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
          )}


        </div>

        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map(tech => (
            <span key={tech} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] uppercase tracking-wider rounded font-semibold border border-slate-200 dark:border-slate-700">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {project.liveLink ? (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-lg font-bold transition-all duration-300 shadow-md hover:shadow-primary-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>Ver Proyecto</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

          ) : null}
        </div>
      </div>
    </div>
  );
}
