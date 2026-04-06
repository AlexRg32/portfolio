import PageTransition from '../components/layout/PageTransition';
import RouteMeta from '../components/seo/RouteMeta';
import HeroSection from '../sections/HeroSection';
import ServicesSection from '../sections/ServicesSection';
import FeaturedWork from '../sections/FeaturedWork';
import AboutPreview from '../sections/AboutPreview';
import MarqueeSection from '../sections/MarqueeSection';
import CTASection from '../sections/CTASection';
import { getHomeMeta } from '../utils/routeMeta';

export default function Home() {
  return (
    <PageTransition>
      <RouteMeta meta={getHomeMeta()} />
      <HeroSection />
      <ServicesSection />
      <FeaturedWork />
      <AboutPreview />
      <MarqueeSection />
      <CTASection />
    </PageTransition>
  );
}
