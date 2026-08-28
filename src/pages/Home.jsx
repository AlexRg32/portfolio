import { useRef } from 'react';
import { content, projects } from '../data/content';
import { SECTION_IDS } from '../utils/routes';
import RouteMeta from '../components/RouteMeta';
import useEditorialReveal from '../motion/useEditorialReveal';
import Hero from '../components/sections/Hero';
import Credibility from '../components/sections/Credibility';
import WorkSequence from '../components/sections/WorkSequence';
import Thesis from '../components/sections/Thesis';
import Services from '../components/sections/Services';
import Process from '../components/sections/Process';
import Studio from '../components/sections/Studio';
import Contact from '../components/sections/Contact';

export default function Home({ lang }) {
  const copy = content[lang];
  const ids = SECTION_IDS[lang];
  const scope = useRef(null);

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
        <Hero lang={lang} copy={copy.hero} ids={ids} />
        <Credibility copy={copy.credibility} />
        <WorkSequence lang={lang} copy={copy.work} projects={projects} id={ids.work} />
        <Thesis copy={copy.thesis} id={ids.thesis} />
        <Services lang={lang} copy={copy.services} id={ids.services} contactId={ids.contact} />
        <Process copy={copy.process} id={ids.process} />
        <Studio copy={copy.studio} id={ids.studio} />
        <Contact lang={lang} copy={copy.contact} id={ids.contact} />
      </main>
    </>
  );
}
