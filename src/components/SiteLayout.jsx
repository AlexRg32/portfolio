import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { content, SITE_EMAIL, LINKEDIN_URL, GITHUB_URL, CV_URL } from '../data/content';
import { getLang, homePath, otherLanguagePath, sectionHref, privacyPath } from '../utils/routes';
import Monogram from './Monogram';
import IntroCurtain from './IntroCurtain';
import ScrollManager from './ScrollManager';
import Cursor from './Cursor';
import LocalTime from './LocalTime';
import useSmoothScroll from '../motion/useSmoothScroll';

export default function SiteLayout() {
  const location = useLocation();
  const lang = getLang(location.pathname);
  const copy = content[lang];
  const home = homePath(lang);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(location.pathname);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  useSmoothScroll();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close the menu when the route changes, including on back/forward.
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname);
    if (menuOpen) setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    // One frame after hydration, so the server and client markup agree first.
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-locked', menuOpen);
    if (!menuOpen) return () => document.body.classList.remove('is-locked');

    const node = menuRef.current;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMenuOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }
      if (event.key !== 'Tab' || !node) return;
      // The close control lives in the masthead, so the trap has to span both.
      const focusable = [
        ...document.querySelectorAll(
          '.masthead a[href], .masthead button:not([disabled]), #site-menu a[href], #site-menu button:not([disabled])',
        ),
      ].filter((element) => element.getClientRects().length > 0);
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

    requestAnimationFrame(() => node?.querySelector('a[href], button')?.focus());
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('is-locked');
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const skipToContent = (event) => {
    const main = document.getElementById('main');
    if (!main) return;
    event.preventDefault();
    main.tabIndex = -1;
    main.focus();
    window.history.replaceState(null, '', '#main');
  };

  const otherLang = otherLanguagePath(location.pathname);

  return (
    <>
      <ScrollManager />

      {/* First tab stop, always. */}
      <a className="skip-link" href="#main" onClick={skipToContent}>{copy.skip}</a>

      <IntroCurtain lang={lang} />
      <Cursor />
      <div className="grain" aria-hidden="true" />

      <header className={`masthead${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-open' : ''}`}>
        <div className="shell masthead__inner">
          <Link className="signature" to={home} onClick={closeMenu}>
            <Monogram className="signature__mark" strokeWidth={1.8} />
            <span className="signature__text accent">{copy.footer.name}</span>
          </Link>

          <div className="masthead__actions">
            <Link
              className="masthead__lang mono"
              to={otherLang}
              lang={lang === 'es' ? 'en' : 'es'}
              onClick={closeMenu}
            >
              {copy.nav.langLabel}
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span className="menu-toggle__label mono">{menuOpen ? copy.nav.close : copy.nav.menu}</span>
              <span className="menu-toggle__bars" aria-hidden="true"><span /><span /></span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        ref={menuRef}
        className={`menu on-ink${menuOpen ? ' is-open' : ''}`}
        aria-label={copy.nav.label}
        role="dialog"
        aria-modal={menuOpen ? 'true' : undefined}
        inert={!menuOpen}
      >
        <div className="shell menu__inner">
          <nav className="menu__nav" aria-label={copy.nav.label}>
            <ul>
              {copy.nav.items.map((item) => (
                <li key={item.id}>
                  <Link to={sectionHref(lang, item.id)} onClick={closeMenu} data-cursor="link">
                    <span className="menu__index mono">{item.index}</span>
                    <span className="menu__label display">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="menu__aside">
            <p className="mono menu__meta">{copy.nav.menuMeta}</p>
            <ul className="menu__links">
              <li><a href={`mailto:${SITE_EMAIL}`} onClick={closeMenu}>{SITE_EMAIL}<span aria-hidden="true"> ↗</span></a></li>
              <li><a href={LINKEDIN_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>LinkedIn<span aria-hidden="true"> ↗</span></a></li>
              <li><a href={GITHUB_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>GitHub<span aria-hidden="true"> ↗</span></a></li>
              <li><a href={CV_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>{copy.footer.cv}<span aria-hidden="true"> ↗</span></a></li>
              <li>
                <Link to={otherLang} lang={lang === 'es' ? 'en' : 'es'} onClick={closeMenu}>
                  {copy.nav.langLabel}
                </Link>
              </li>
            </ul>
            <p className="mono menu__time">
              <span>{copy.footer.localTimeLabel}</span> <LocalTime locale={copy.locale} />
            </p>
          </div>
        </div>
      </div>

      <div className="site-body" inert={menuOpen}>
        <Outlet />

        <footer className="colophon">
          <div className="shell colophon__inner">
            <p className="colophon__identity">
              <span className="colophon__name accent">{copy.footer.name}</span>
              <span className="mono colophon__role">{copy.footer.role}</span>
            </p>

            <p className="mono colophon__place">
              {copy.footer.place}
              <span className="colophon__time"><LocalTime locale={copy.locale} /></span>
            </p>

            <p className="colophon__legal">
              <Link className="mono" to={privacyPath(lang)}>{copy.footer.privacy}</Link>
              <a className="mono" href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
              <a className="mono colophon__top-link" href="#top">{copy.footer.backToTop} ↑</a>
            </p>

            <p className="mono colophon__rights">© {new Date().getFullYear()} {copy.footer.rights}</p>
          </div>
        </footer>
      </div>
    </>
  );
}
