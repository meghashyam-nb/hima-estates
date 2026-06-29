import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { styles } from './styles/globalStyles';
import Home from './pages/Home';
import PropertyDetail from './pages/PropertyDetail';

export default function HimaEstates() {
  return (
    <BrowserRouter>
      <style>{styles}</style>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/villas/:slug" element={<PropertyDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
