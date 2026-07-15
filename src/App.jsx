import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home lang="es" />} />
          <Route path="trabajo/:slug" element={<CaseStudy lang="es" />} />
          <Route path="privacidad" element={<Privacy lang="es" />} />

          <Route path="en" element={<Home lang="en" />} />
          <Route path="en/work/:slug" element={<CaseStudy lang="en" />} />
          <Route path="en/privacy" element={<Privacy lang="en" />} />

          <Route path="work/:slug" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
