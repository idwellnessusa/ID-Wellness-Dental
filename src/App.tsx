import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import Services from './pages/Services';
import Contact from './pages/Contact';
import About from './pages/About';
import DoctorProfile from './pages/DoctorProfile';
import Financing from './pages/Financing';
import FAQ from './pages/FAQ';
import BlogFeed from './pages/BlogFeed';
import BlogPost from './pages/BlogPost';
import ReferralCatcher from './pages/ReferralCatcher';
import ScrollToTop from './components/ScrollToTop';
import SEO from './components/SEO';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <BrowserRouter>
            <ScrollToTop>
              <SEO />
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="team/:id" element={<DoctorProfile />} />
                  <Route path="services" element={<Services />} />
                  <Route path="service/:id" element={<ServicePage />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="financing" element={<Financing />} />
                  <Route path="faq" element={<FAQ />} />
                  <Route path="blog" element={<BlogFeed />} />
                  <Route path="blog/:slug" element={<BlogPost />} />
                </Route>
                <Route path="/ref/:id" element={<ReferralCatcher />} />
              </Routes>
            </ScrollToTop>
          </BrowserRouter>
        </Suspense>
      </ErrorBoundary>
    </HelmetProvider>
  );
}
