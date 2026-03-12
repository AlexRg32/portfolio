import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLenis } from '../../hooks/useLenis';

export default function Layout() {
  const location = useLocation();
  useLenis();

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-text focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-bg"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
