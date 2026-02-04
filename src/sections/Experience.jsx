import React from 'react';
import Section from '../components/Section';
import { experience } from '../data/experience';

export default function Experience() {
  return (
    <Section id="experience" className="bg-slate-50 dark:bg-slate-950">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Experiencia Profesional</h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Mi trayectoria construyendo soluciones de software.
        </p>
      </div>

      <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-6 space-y-12">
        {experience.map((job) => (
          <div key={job.id} className="relative pl-8 md:pl-12 group">
            {/* Timeline Dot */}
            <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-primary-600 dark:group-hover:bg-primary-500 ring-4 ring-white dark:ring-slate-950 transition-colors"></span>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {job.role} <span className="text-primary-600 dark:text-primary-400">@ {job.company}</span>
              </h3>
              <time className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 sm:mt-0">
                {job.period}
              </time>
            </div>

            <p className="text-slate-600 dark:text-slate-300 mb-4 text-lg">
              {job.description} {job.link && (
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:underline font-medium inline-flex items-center gap-1"
                >
                  Visitar sitio
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </p>

            <ul className="list-disc list-outside ml-5 space-y-1 text-slate-600 dark:text-slate-400 mb-4">
              {job.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {job.techStack.map(tech => (
                <span key={tech} className="text-xs px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-slate-500 dark:text-slate-400">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
