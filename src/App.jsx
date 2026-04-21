import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnalyticsProvider from './components/analytics/AnalyticsProvider';
import Layout from './components/layout/Layout';
import CustomCursor from './components/layout/CustomCursor';
import GrainOverlay from './components/ui/GrainOverlay';

const Home = lazy(() => import('./pages/Home'));

export default function App() {
  return (
    <BrowserRouter>
      <AnalyticsProvider>
        <CustomCursor />
        <GrainOverlay />
        <Suspense fallback={<div className="min-h-screen bg-black" aria-hidden="true" />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/*" element={<Home />} />
            </Route>
          </Routes>
        </Suspense>
      </AnalyticsProvider>
    </BrowserRouter>
  );
}
