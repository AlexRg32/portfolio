import React from 'react';
import Section from '../components/Section';
import { profile } from '../data/profile';

export default function Hero() {
  return (
    <div id="home" className="relative min-h-[90vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:opacity-20"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:opacity-20"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 dark:opacity-20"></div>

      <Section className="relative z-10 text-center">
        <h2 className="text-sm font-semibold tracking-wide text-primary-600 dark:text-primary-400 uppercase mb-4">
          Hola, mi nombre es
        </h2>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
          {profile.name}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300">
          <span className="text-primary-600 dark:text-primary-400 font-bold">{profile.role}</span>. Especializado en <span className="font-semibold text-slate-800 dark:text-slate-200">Spring Boot</span>, <span className="font-semibold text-slate-800 dark:text-slate-200">Laravel</span> y <span className="font-semibold text-slate-800 dark:text-slate-200">AI Workflows</span>.
        </p>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400">
          {profile.shortBio}
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="#projects"
            className="px-8 py-3 w-full sm:w-auto rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30"
          >
            Ver Proyectos
          </a>
          <a
            href="#contact"
            className="px-8 py-3 w-full sm:w-auto rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Contactar
          </a>
        </div>
      </Section>
    </div>
  );
}
