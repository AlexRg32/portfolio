import React from 'react';

const techStackTop = [
  'React', 'Three.js', 'Next.js', 'WebGL', 'Framer Motion', 'GSAP', 'React Native', 'TypeScript',
];

const techStackBottom = [
  'Node.js', 'Spring Boot', 'Python', 'Agentic AI', 'PostgreSQL', 'Docker', 'AWS', 'LLMs',
];

export default function MarqueeSection() {
  // We duplicate array to ensure smooth infinite loop
  const repeatTop = [...techStackTop, ...techStackTop, ...techStackTop, ...techStackTop];
  const repeatBottom = [...techStackBottom, ...techStackBottom, ...techStackBottom, ...techStackBottom];

  return (
    <section className="py-16 md:py-24 overflow-hidden relative z-10 bg-bg border-y border-border-light/50">
      
      {/* Top Track */}
      <div className="flex w-[200vw] sm:w-[150vw] mb-4">
        <div className="flex animate-marquee whitespace-nowrap">
          {repeatTop.map((tech, i) => (
            <div key={i} className="flex items-center px-4 md:px-8">
              <span className="text-display-sm text-text-dim/40 font-display uppercase font-semibold">
                {tech}
              </span>
              <span className="mx-4 md:mx-8 text-text-dim/20 text-xl font-display">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Track (Reverse) */}
      <div className="flex w-[200vw] sm:w-[150vw]">
        <div className="flex animate-marquee-reverse whitespace-nowrap opacity-60">
          {repeatBottom.map((tech, i) => (
            <div key={i} className="flex items-center px-4 md:px-8">
              <span className="text-display-sm text-text-dim/40 font-display uppercase font-medium">
                {tech}
              </span>
              <span className="mx-4 md:mx-8 text-text-dim/20 text-xl font-display">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Edge Gradients for smooth fade in/out */}
      <div className="absolute top-0 left-0 w-24 md:w-64 h-full bg-gradient-to-r from-bg to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 md:w-64 h-full bg-gradient-to-l from-bg to-transparent pointer-events-none" />

    </section>
  );
}
