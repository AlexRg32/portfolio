import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { content } from '../data/content';

export default function SiteLayout() {
  const location = useLocation();
  const lang = location.pathname === '/en' || location.pathname.startsWith('/en/') ? 'en' : 'es';
  const copy = content[lang].nav;
  const home = lang === 'en' ? '/en' : '/';
  const otherLanguage = lang === 'en'
    ? location.pathname.startsWith('/en/work/')
      ? location.pathname.replace('/en/work/', '/trabajo/')
      : location.pathname === '/en/privacy' ? '/privacidad' : '/'
    : location.pathname.startsWith('/trabajo/')
      ? location.pathname.replace('/trabajo/', '/en/work/')
      : location.pathname === '/privacidad' ? '/en/privacy' : '/en';
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const closeMenu = () => setOpen(false);
  const skipToContent = (event) => {
    const main = document.getElementById('main');
    if (!main) return;
    event.preventDefault();
    main.tabIndex = -1;
    main.focus();
    window.history.replaceState(null, '', '#main');
  };

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (!open) return () => document.body.classList.remove('menu-open');

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = [...headerRef.current.querySelectorAll('a[href], button:not([disabled])')]
        .filter((element) => element.getClientRects().length > 0);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('menu-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main" onClick={skipToContent}>{lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}</a>
      <header ref={headerRef} className={`site-header ${open ? 'is-menu-open' : ''}`}>
        <div className="shell site-header__inner">
          <Link className="wordmark" to={home} aria-label="Alejandro Ruiz — Home" onClick={closeMenu}>
            <span>Alejandro Ruiz</span>
          </Link>
          <nav id="site-navigation" className={`site-nav ${open ? 'is-open' : ''}`} aria-label={lang === 'es' ? 'Navegación principal' : 'Main navigation'}>
            <a href={`${home}#work`} onClick={closeMenu}>{copy.work}</a>
            <a href={`${home}#experience`} onClick={closeMenu}>{copy.experience}</a>
            <a href={`${home}#about`} onClick={closeMenu}>{copy.about}</a>
            <a className="site-nav__contact" href="mailto:alexrg32@icloud.com" onClick={closeMenu}>{copy.contact}<span aria-hidden="true">↗</span></a>
            <Link className="site-nav__language" to={otherLanguage} lang={lang === 'es' ? 'en' : 'es'} onClick={closeMenu}>{lang === 'es' ? 'EN' : 'ES'}</Link>
          </nav>
          <button ref={menuButtonRef} className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="site-navigation" aria-label={open ? copy.close : copy.menu}>
            <span /><span />
          </button>
        </div>
      </header>
      <div className="site-content" inert={open} aria-hidden={open ? 'true' : undefined}>
        <Outlet />
      </div>
      <footer className="site-footer" inert={open} aria-hidden={open ? 'true' : undefined}>
        <div className="shell site-footer__top">
          <p><span className="site-footer__name">Alejandro Ruiz</span><span className="sr-only"> — </span><br aria-hidden="true" /><span className="site-footer__role">Frontend developer</span></p>
          <div className="site-footer__links">
            <a href="mailto:alexrg32@icloud.com">Email ↗</a>
            <a href="https://www.linkedin.com/in/alejandro-ruiz-gasch-0230542b3/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="https://github.com/AlexRg32" target="_blank" rel="noreferrer">GitHub ↗</a>
            <Link to={lang === 'es' ? '/privacidad' : '/en/privacy'}>{lang === 'es' ? 'Privacidad' : 'Privacy'}</Link>
          </div>
        </div>
        <div className="shell site-footer__bottom">
          <span>© {new Date().getFullYear()} AR</span>
          <span>Alicante, ES</span>
          <a href="#top">{lang === 'es' ? 'Volver arriba ↑' : 'Back to top ↑'}</a>
        </div>
      </footer>
    </>
  );
}
