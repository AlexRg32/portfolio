import { flushSync } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { prefersReducedMotion } from '../motion/config';

function isPlainLeftClick(event) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey &&
    !event.defaultPrevented
  );
}

/**
 * A Link that carries the project plate across into the case study using the
 * View Transition API. Strictly progressive: without support, or with reduced
 * motion, it navigates exactly like a normal Link.
 */
export default function TransitionLink({ to, onClick, children, ...rest }) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    onClick?.(event);
    if (!isPlainLeftClick(event)) return;
    if (typeof document.startViewTransition !== 'function') return;
    if (prefersReducedMotion()) return;

    event.preventDefault();
    document.startViewTransition(() => {
      flushSync(() => navigate(to));
    });
  };

  return (
    <Link to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
