import { useEffect, useState } from 'react';
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
  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    setOpen(false);
  };

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main">{lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}</a>
      <header className="site-header">
        <div className="shell site-header__inner">
          <Link className="wordmark" to={home} aria-label="Alejandro Ruiz — Home">
            <span>Alejandro Ruiz</span>
          </Link>
          <nav id="site-navigation" className={`site-nav ${open ? 'is-open' : ''}`} aria-label={lang === 'es' ? 'Navegación principal' : 'Main navigation'}>
            <a href={`${home}#work`} onClick={closeMenu}>{copy.work}</a>
            <a href={`${home}#experience`} onClick={closeMenu}>{copy.experience}</a>
            <a href={`${home}#about`} onClick={closeMenu}>{copy.about}</a>
            <a className="site-nav__contact" href="mailto:alexrg32@icloud.com">{copy.contact}<span aria-hidden="true">↗</span></a>
            <Link className="site-nav__language" to={otherLanguage} lang={lang === 'es' ? 'en' : 'es'}>{lang === 'es' ? 'EN' : 'ES'}</Link>
          </nav>
          <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="site-navigation" aria-label={open ? copy.close : copy.menu}>
            <span /><span />
          </button>
        </div>
      </header>
      <Outlet />
      <footer className="site-footer">
        <div className="shell site-footer__top">
          <p>Alejandro Ruiz<br /><span>Frontend developer</span></p>
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
