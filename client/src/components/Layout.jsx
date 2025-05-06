// /src/components/Layout.jsx

import React from 'react';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';

const Layout = ({ 
  children, 
  onSearch = () => {}, 
  onSelectRegion = () => {}, 
  onSelectSubregion = () => {}, 
  selectedRegion = null 
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header 
        onSearch={onSearch} 
        onSelectRegion={onSelectRegion}
        onSelectSubregion={onSelectSubregion}
        selectedRegion={selectedRegion}
      />
      <MainContent>{children}</MainContent>
      <Footer />
    </div>
  );
};

export default Layout;