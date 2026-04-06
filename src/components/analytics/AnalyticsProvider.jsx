import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AnalyticsConsentBanner from './AnalyticsConsentBanner';
import {
  CLARITY_CONSENT,
  getClarityConsentState,
  grantClarityConsent,
  hasClarityConfig,
  initClarity,
  initPlausible,
  isAnalyticsRuntimeEnabled,
  setClarityConsentState,
  setClarityRouteContext,
} from '../../utils/analytics';

export default function AnalyticsProvider({ children }) {
  const location = useLocation();
  const [clarityConsent, setClarityConsent] = useState(() => getClarityConsentState());

  useEffect(() => {
    initPlausible();
  }, []);

  useEffect(() => {
    if (clarityConsent !== CLARITY_CONSENT.accepted) {
      return;
    }

    initClarity();
    grantClarityConsent();
  }, [clarityConsent]);

  useEffect(() => {
    if (clarityConsent !== CLARITY_CONSENT.accepted) {
      return;
    }

    setClarityRouteContext(location.pathname);
  }, [clarityConsent, location.pathname]);

  const handleAccept = () => {
    setClarityConsentState(CLARITY_CONSENT.accepted);
    setClarityConsent(CLARITY_CONSENT.accepted);
  };

  const handleReject = () => {
    setClarityConsentState(CLARITY_CONSENT.rejected);
    setClarityConsent(CLARITY_CONSENT.rejected);
  };

  const shouldShowBanner =
    isAnalyticsRuntimeEnabled() &&
    hasClarityConfig() &&
    clarityConsent === CLARITY_CONSENT.unknown;

  return (
    <>
      {children}
      {shouldShowBanner && <AnalyticsConsentBanner onAccept={handleAccept} onReject={handleReject} />}
    </>
  );
}
