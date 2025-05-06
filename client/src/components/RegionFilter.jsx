// /src/components/RegionFilter.jsx

import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

const regions = [
  { label: 'All Regions', value: 'All Regions' },
  { label: 'Africa', value: 'Africa' },
  { label: 'Americas', value: 'Americas' },
  { label: 'Asia', value: 'Asia' },
  { label: 'Europe', value: 'Europe' },
  { label: 'Oceania', value: 'Oceania' }
];

export default function RegionFilter({ onSelectRegion }) {
  const [selectedRegion, setSelectedRegion] = useState('All Regions');

  const handleChange = (e) => {
    const region = e.value;
    setSelectedRegion(region);
    onSelectRegion(region);
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <Dropdown
        value={selectedRegion}
        options={regions}
        onChange={handleChange}
        placeholder="Select a Region"
        className="w-full md:w-14rem"
      />
    </div>
  );
}
