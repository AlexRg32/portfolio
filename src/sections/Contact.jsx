import React from 'react';
import Section from '../components/Section';
import { profile } from '../data/profile';

export default function Contact() {
  return (
    <Section id="contact" className="bg-slate-50 dark:bg-slate-950">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl mb-8">Hablemos</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
          Estoy disponible para nuevas oportunidades. ¿Tienes un proyecto en mente o quieres saber más sobre mi experiencia? ¡Contáctame!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <a
            href={`mailto:${profile.contact.email}`}
            className="flex flex-col items-center p-8 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-primary-500 dark:hover:border-primary-500 transition-colors group"
          >
            <div className="p-4 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-lg font-medium text-slate-900 dark:text-white">Email</span>
            <span className="text-slate-600 dark:text-slate-400 mt-2">{profile.contact.email}</span>
          </a>

          <a
            href={`tel:${profile.contact.phone}`}
            className="flex flex-col items-center p-8 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-primary-500 dark:hover:border-primary-500 transition-colors group"
          >
            <div className="p-4 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span className="text-lg font-medium text-slate-900 dark:text-white">Teléfono</span>
            <span className="text-slate-600 dark:text-slate-400 mt-2">{profile.contact.phone}</span>
          </a>
        </div>

        <div className="mt-12 flex justify-center space-x-6">
          <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <span className="sr-only">LinkedIn</span>
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
            </svg>
          </a>
          <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <span className="sr-only">GitHub</span>
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </Section>
  );
}
