// /src/components/SubregionFilter.jsx

import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';

const allSubregions = [
  'Northern Europe', 'Western Europe', 'Southern Europe', 'Eastern Europe',
  'Northern Africa', 'Western Africa', 'Middle Africa', 'Eastern Africa', 'Southern Africa',
  'Central Asia', 'Eastern Asia', 'Southern Asia', 'Southeast Asia', 'Western Asia',
  'Caribbean', 'Central America', 'North America', 'South America',
  'Australia and New Zealand', 'Melanesia', 'Micronesia', 'Polynesia'
];

const regionSubregionsMap = {
  'Africa': ['Northern Africa', 'Western Africa', 'Middle Africa', 'Eastern Africa', 'Southern Africa'],
  'Americas': ['Caribbean', 'Central America', 'North America', 'South America'],
  'Asia': ['Central Asia', 'Eastern Asia', 'Southern Asia', 'Southeast Asia', 'Western Asia'],
  'Europe': ['Northern Europe', 'Western Europe', 'Southern Europe', 'Eastern Europe'],
  'Oceania': ['Australia and New Zealand', 'Melanesia', 'Micronesia', 'Polynesia']
};

export default function SubregionFilter({ onSelectSubregion, selectedRegion }) {
  const [filteredSubregions, setFilteredSubregions] = useState(allSubregions);
  const [selectedSubregion, setSelectedSubregion] = useState(null);

  useEffect(() => {
    if (selectedRegion && selectedRegion !== 'All Regions') {
      setFilteredSubregions(regionSubregionsMap[selectedRegion] || []);
      setSelectedSubregion(null);
      onSelectSubregion(null);
    } else {
      setFilteredSubregions(allSubregions);
      setSelectedSubregion(null);
      onSelectSubregion(null);
    }
  }, [selectedRegion]);

  const handleChange = (e) => {
    const subregion = e.value;
    setSelectedSubregion(subregion);
    onSelectSubregion(subregion);
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <Dropdown
        value={selectedSubregion}
        options={[
          ...filteredSubregions.map(sub => ({ label: sub, value: sub }))
        ]}
        onChange={handleChange}
        placeholder="Subregion"
        className="w-full md:w-14rem"
        disabled={!selectedRegion || selectedRegion === 'All Regions'}
      />
    </div>
  );
}
