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
      className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 transition-all duration-600 ease-out-expo sm:px-4"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`mx-auto max-w-6xl rounded-full border transition-all duration-500 ${
          isScrolled
            ? 'border-border-light/60 bg-bg/68 shadow-[0_10px_30px_rgba(5,10,24,0.18)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-5">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 text-text transition-opacity duration-300 hover:opacity-80"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border-light/70 bg-surface-light/40 font-display text-base font-semibold tracking-tight shadow-[0_8px_20px_rgba(7,13,28,0.18)]">
              AR
            </span>
            <span className="hidden text-sm font-medium text-text-muted sm:block">
              Alejandro Ruiz
            </span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {NAV_LINKS.map((link) => (
              <MagneticButton
                key={link.path}
                as={Link}
                to={link.path}
                strength={0.08}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'border border-border/45 bg-surface/28 text-text'
                    : 'text-text-dim hover:text-text'
                }`}
              >
                {link.name}
              </MagneticButton>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-border-light/70 bg-surface/60 p-2 text-text md:hidden"
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
            className="mx-auto mt-3 max-w-6xl overflow-hidden rounded-[28px] border border-border-light/70 bg-bg/88 shadow-[0_18px_48px_rgba(5,10,24,0.28)] backdrop-blur-xl md:hidden"
            id="mobile-navigation"
          >
            <div className="flex flex-col gap-3 p-4">
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
                    className={`block rounded-[20px] px-4 py-4 text-lg font-display ${
                      location.pathname === link.path
                        ? 'bg-surface-light/60 text-text'
                        : 'text-text-muted hover:bg-surface/45 hover:text-text'
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
