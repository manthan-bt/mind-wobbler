import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import Home from './pages/Home';
import Work from './pages/Work';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Unsubscribe from './pages/Unsubscribe';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Cookies from './pages/Cookies';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';
import CookieConsent from './components/CookieConsent';

const MainLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <SmoothScroll>
        <CustomCursor />
        <CookieConsent />
        <Routes>
          {/* Main Site Routes with Navbar & Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
          </Route>

          {/* 404 & Error Routes without Navbar & Footer */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SmoothScroll>
    </Router>
  );
}

export default App;
