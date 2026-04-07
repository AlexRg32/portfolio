const PLAUSIBLE_SCRIPT_ID = 'plausible-script';
const CLARITY_SCRIPT_ID = 'clarity-script';
const CLARITY_CONSENT_KEY = 'analytics-clarity-consent';
const CONSENT_ACCEPTED = 'accepted';
const CONSENT_REJECTED = 'rejected';
const CONSENT_UNKNOWN = 'unknown';

const rawPlausibleHost = import.meta.env.VITE_PLAUSIBLE_HOST?.trim() || 'https://plausible.io';

export const ANALYTICS_EVENTS = {
  contactClick: 'cta_contact_click',
  cvView: 'cta_cv_view',
  emailClick: 'cta_email_click',
  githubClick: 'cta_github_click',
  linkedinClick: 'cta_linkedin_click',
  projectDemoClick: 'project_live_click',
  projectOpen: 'project_open',
  workView: 'cta_work_view',
};

function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function canUseStorage() {
  if (!isBrowser()) return false;

  try {
    const probeKey = '__analytics_probe__';
    window.localStorage.setItem(probeKey, '1');
    window.localStorage.removeItem(probeKey);
    return true;
  } catch {
    return false;
  }
}

function normalizeHost(host) {
  return host.replace(/\/+$/, '');
}

function createScript({ id, src, attributes = {} }) {
  if (!isBrowser()) return null;

  const existingScript = document.getElementById(id);
  if (existingScript) {
    return existingScript;
  }

  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.defer = true;
  script.src = src;

  Object.entries(attributes).forEach(([key, value]) => {
    if (value) {
      script.setAttribute(key, value);
    }
  });

  document.head.appendChild(script);
  return script;
}

function ensurePlausibleQueue() {
  if (!isBrowser()) return;

  window.plausible =
    window.plausible ||
    function plausibleProxy() {
      (window.plausible.q = window.plausible.q || []).push(arguments);
    };
}

function ensureClarityQueue() {
  if (!isBrowser()) return;

  window.clarity =
    window.clarity ||
    function clarityProxy() {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
}

function getPageType(pathname) {
  if (pathname === '/') return 'home';
  if (pathname === '/work') return 'work-list';
  if (pathname.startsWith('/work/')) return 'project-detail';
  if (pathname === '/about') return 'about';
  if (pathname === '/hire') return 'hire';
  if (pathname === '/contact') return 'contact';
  return 'other';
}

export function isAnalyticsRuntimeEnabled() {
  return import.meta.env.PROD || import.meta.env.VITE_ENABLE_ANALYTICS_IN_DEV === 'true';
}

export function getPlausibleDomain() {
  return import.meta.env.VITE_PLAUSIBLE_DOMAIN?.trim() || '';
}

export function getClarityProjectId() {
  return import.meta.env.VITE_CLARITY_PROJECT_ID?.trim() || '';
}

export function hasPlausibleConfig() {
  return Boolean(getPlausibleDomain());
}

export function hasClarityConfig() {
  return Boolean(getClarityProjectId());
}

export function getClarityConsentState() {
  if (!canUseStorage()) return CONSENT_UNKNOWN;

  const storedValue = window.localStorage.getItem(CLARITY_CONSENT_KEY);
  if (storedValue === CONSENT_ACCEPTED || storedValue === CONSENT_REJECTED) {
    return storedValue;
  }

  return CONSENT_UNKNOWN;
}

export function setClarityConsentState(value) {
  if (!canUseStorage()) return;

  window.localStorage.setItem(CLARITY_CONSENT_KEY, value);
}

export function initPlausible() {
  if (!isAnalyticsRuntimeEnabled() || !hasPlausibleConfig()) {
    return false;
  }

  ensurePlausibleQueue();

  createScript({
    id: PLAUSIBLE_SCRIPT_ID,
    src: `${normalizeHost(rawPlausibleHost)}/js/script.js`,
    attributes: {
      'data-domain': getPlausibleDomain(),
    },
  });

  return true;
}

export function initClarity() {
  if (!isAnalyticsRuntimeEnabled() || !hasClarityConfig()) {
    return false;
  }

  ensureClarityQueue();

  createScript({
    id: CLARITY_SCRIPT_ID,
    src: `https://www.clarity.ms/tag/${getClarityProjectId()}`,
  });

  return true;
}

export function grantClarityConsent() {
  if (!isAnalyticsRuntimeEnabled() || !hasClarityConfig()) {
    return;
  }

  ensureClarityQueue();
  window.clarity('consent');
}

export function setClarityRouteContext(pathname) {
  if (!isAnalyticsRuntimeEnabled() || !hasClarityConfig()) {
    return;
  }

  ensureClarityQueue();
  window.clarity('set', 'route', pathname);
  window.clarity('set', 'page_type', getPageType(pathname));
}

export function trackAnalyticsEvent(name, props = {}) {
  if (!isAnalyticsRuntimeEnabled() || !name) {
    return;
  }

  if (hasPlausibleConfig()) {
    ensurePlausibleQueue();
    window.plausible(name, Object.keys(props).length > 0 ? { props } : undefined);
  }

  if (hasClarityConfig() && getClarityConsentState() === CONSENT_ACCEPTED) {
    ensureClarityQueue();
    window.clarity('event', name);
  }
}

export const CLARITY_CONSENT = {
  accepted: CONSENT_ACCEPTED,
  rejected: CONSENT_REJECTED,
  unknown: CONSENT_UNKNOWN,
};
