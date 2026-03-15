import PageTransition from '../components/layout/PageTransition';
import RouteMeta from '../components/seo/RouteMeta';
import HeroSection from '../sections/HeroSection';
import ServicesSection from '../sections/ServicesSection';
import FeaturedWork from '../sections/FeaturedWork';
import AboutPreview from '../sections/AboutPreview';
import MarqueeSection from '../sections/MarqueeSection';
import CTASection from '../sections/CTASection';

export default function Home() {
  return (
    <PageTransition>
      <RouteMeta
        title="Alejandro Ruiz | Desarrollo web con PHP, React y Laravel"
        description="Portafolio de Alejandro Ruiz: desarrollo web y SaaS con PHP, React, Laravel y JavaScript para negocios que buscan una web clara y efectiva."
        path="/"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Alejandro Ruiz Gasch',
          jobTitle: 'Desarrollador web',
          url: 'https://alejandroruiz.netlify.app/',
          sameAs: [
            'https://github.com/AlexRg32',
            'https://www.linkedin.com/in/alejandro-ruiz-gasch-0230542b3/',
          ],
        }}
      />
      <HeroSection />
      <ServicesSection />
      <FeaturedWork />
      <AboutPreview />
      <MarqueeSection />
      <CTASection />
    </PageTransition>
  );
}
