import React from 'react';
import Section from '../components/Section';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <Section id="projects" className="bg-white dark:bg-slate-900">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Proyectos Destacados</h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Una selección de mis trabajos recientes.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
