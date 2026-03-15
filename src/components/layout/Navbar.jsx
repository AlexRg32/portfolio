import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { NAV_LINKS } from '../../utils/constants';
import MagneticButton from '../ui/MagneticButton';

export default function Navbar() {
  const { scrollDirection, scrollY } = useScrollDirection();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isScrolled = scrollY > 50;
  const isVisible = scrollDirection === 'up' || scrollY < 50 || menuOpen;

  return (
    <motion.nav
      aria-label="Navegación principal"
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-600 ease-out-expo"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`transition-all duration-500 ${
          isScrolled
            ? 'bg-bg/80 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="container-wide flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-text font-display font-semibold text-xl tracking-tight hover:opacity-70 transition-opacity duration-300"
          >
            AR<span className="text-text-dim">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <MagneticButton
                key={link.path}
                as={Link}
                to={link.path}
                strength={0.2}
                className={`text-sm font-body font-medium tracking-wide uppercase transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-text'
                    : 'text-text-dim hover:text-text'
                }`}
              >
                {link.name}
              </MagneticButton>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span
              className={`block w-6 h-px bg-text transition-all duration-400 ease-out-expo ${
                menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-text transition-all duration-400 ease-out-expo ${
                menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-bg/95 backdrop-blur-xl border-b border-border overflow-hidden"
            id="mobile-navigation"
          >
            <div className="container-wide py-8 flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`text-display-sm font-display block ${
                      location.pathname === link.path
                        ? 'text-text'
                        : 'text-text-dim hover:text-text'
                    } transition-colors duration-300`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
