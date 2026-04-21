import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import RouteMeta from '../components/seo/RouteMeta';
import { getHomeMeta } from '../utils/routeMeta';

import Hero from '../sections/Hero';
import FastFacts from '../sections/FastFacts';
import SelectedWork from '../sections/SelectedWork';
import Experience from '../sections/Experience';
import FooterContact from '../sections/FooterContact';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <PageTransition>
      <RouteMeta meta={getHomeMeta()} />
      <main className="flex min-h-screen flex-col overflow-hidden bg-black text-white">
        <Hero />
        <FastFacts />
        <SelectedWork />
        <Experience />
        <FooterContact />
      </main>
    </PageTransition>
  );
}
