import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import Home from './pages/Home';
import Work from './pages/Work';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import BrandingService from './pages/BrandingService';
import CinematographyService from './pages/CinematographyService';
import PhotographyService from './pages/PhotographyService';
import MotionDesignService from './pages/MotionDesignService';
import UIService from './pages/UIService';
import SocialService from './pages/SocialService';
import GraphicService from './pages/GraphicService';
import ProjectDetail from './pages/ProjectDetail';

function App() {
  return (
    <Router>
      <SmoothScroll>
        <CustomCursor />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/branding" element={<BrandingService />} />
              <Route path="/services/cinematography" element={<CinematographyService />} />
              <Route path="/services/photography" element={<PhotographyService />} />
              <Route path="/services/motion" element={<MotionDesignService />} />
              <Route path="/services/uiux" element={<UIService />} />
              <Route path="/services/social" element={<SocialService />} />
              <Route path="/services/graphic" element={<GraphicService />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
