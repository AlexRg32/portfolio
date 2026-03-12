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
        title="Alejandro Ruiz | Creative Developer & AI Engineer"
        description="Portfolio de Alejandro Ruiz: desarrollo web, interfaces premium, sistemas SaaS y automatizacion con IA para marcas y productos digitales."
        path="/"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Alejandro Ruiz Gasch',
          jobTitle: 'Creative Developer & AI Engineer',
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
