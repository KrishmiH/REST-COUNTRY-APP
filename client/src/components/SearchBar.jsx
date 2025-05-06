// /src/components/SearchBar.jsx

import React, { useState } from 'react';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
      <IconField iconPosition="left" className="w-full">
        <InputIcon className="pi pi-search" />
        <InputText
          placeholder="Search a country here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </IconField>
    </form>
  );
}
