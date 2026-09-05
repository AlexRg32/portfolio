import { useRef } from 'react';
import { content, projects } from '../data/content';
import { SECTION_IDS } from '../utils/routes';
import RouteMeta from '../components/RouteMeta';
import useEditorialReveal from '../motion/useEditorialReveal';
import useFitText from '../motion/useFitText';
import Hero from '../components/sections/Hero';
import Work from '../components/sections/Work';
import Experience from '../components/sections/Experience';
import Contact from '../components/sections/Contact';

export default function Home({ lang }) {
  const copy = content[lang];
  const ids = SECTION_IDS[lang];
  const scope = useRef(null);

  // The section titles fill their own width; the hero fits its own frame.
  useFitText(scope, lang);
  useEditorialReveal(scope, [lang]);

  return (
    <>
      <RouteMeta
        lang={lang}
        title={copy.metaTitle}
        description={copy.metaDescription}
        path={lang === 'es' ? '/' : '/en'}
      />

      <main id="main" className="home" ref={scope}>
        <Hero copy={copy.hero} ids={ids} />
        <Work lang={lang} copy={copy.work} projects={projects} id={ids.work} />
        <Experience copy={copy.experience} id={ids.experience} />
        <Contact copy={copy.contact} id={ids.contact} seal={copy.hero.seal} />
      </main>
    </>
  );
}
