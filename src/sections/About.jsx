import React from 'react';
import Section from '../components/Section';
import { profile } from '../data/profile';
import { skills } from '../data/skills';

export default function About() {
  return (
    <Section id="about" className="bg-white dark:bg-slate-900">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Placeholder for Photo */}
        <div className="hidden md:block relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl bg-slate-200 dark:bg-slate-800">
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-600">
            {/* User can replace this with an img tag */}
            <span className="text-lg">Tu Foto Aquí</span>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Sobre Mí</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            {profile.fullBio}
          </p>
          <div className="space-y-6">
            {skills.map((category) => (
              <div key={category.category}>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
