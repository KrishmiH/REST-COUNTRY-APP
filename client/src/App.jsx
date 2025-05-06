// /src/App.jsx

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import Layout from './components/Layout';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';
import Spinner from './components/Spinner';
import AlphabetFilter from './components/AlphabetFilter';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [regionLoading, setRegionLoading] = useState(false);
  const [subregionLoading, setSubregionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) throw new Error('Failed to fetch countries');
        const data = await response.json();
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setAllCountries(data);
        setDisplayedCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCountries();
  }, []);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setDisplayedCountries(allCountries);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}`);
      if (!response.ok) throw new Error('Country not found');
      const data = await response.json();
      setDisplayedCountries(data);
    } catch (error) {
      setDisplayedCountries([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleRegionFilter = async (region) => {
    setSelectedRegion(region);
    if (!region || region === 'All Regions') {
      setDisplayedCountries(allCountries);
      return;
    }

    setRegionLoading(true);
    try {
      const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
      if (!response.ok) throw new Error('Failed to fetch region');
      const data = await response.json();
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      setDisplayedCountries(data);
    } catch (error) {
      setDisplayedCountries([]);
    } finally {
      setRegionLoading(false);
    }
  };

  const handleSubregionFilter = async (subregion) => {
    if (!subregion || subregion === 'All Subregions') {
      if (selectedRegion && selectedRegion !== 'All Regions') {
        handleRegionFilter(selectedRegion);
      } else {
        setDisplayedCountries(allCountries);
      }
      return;
    }

    setSubregionLoading(true);
    try {
      const response = await fetch(`https://restcountries.com/v3.1/subregion/${subregion}`);
      if (!response.ok) throw new Error('Failed to fetch subregion');
      const data = await response.json();
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      setDisplayedCountries(data);
    } catch (error) {
      setDisplayedCountries([]);
    } finally {
      setSubregionLoading(false);
    }
  };

  return (
    <PrimeReactProvider value={{ ripple: true, inputStyle: 'outlined' }}>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              onSearch={handleSearch}
              onSelectRegion={handleRegionFilter}
              onSelectSubregion={handleSubregionFilter}
              selectedRegion={selectedRegion}
            >
              {loading ? (
                <Spinner />
              ) : error ? (
                <div className="text-center py-8 text-red-500">Error: {error}</div>
              ) : (
                <>
                  <AlphabetFilter
                    onSelectLetter={(letter) => {
                      if (!letter) {
                        setDisplayedCountries(allCountries);
                      } else {
                        const filtered = allCountries.filter(
                          (c) => c.name.common.charAt(0).toUpperCase() === letter
                        );
                        setDisplayedCountries(filtered);
                      }
                    }}
                  />
                  {(searchLoading || regionLoading || subregionLoading) && <Spinner />}
                  <CountryList countries={displayedCountries} />
                </>
              )}
            </Layout>
          }
        />
        <Route
          path="/country/:countryCode"
          element={
            <Layout>
              <CountryDetail />
            </Layout>
          }
        />
        <Route path='/register' element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={
          <Layout>
            <Profile />
          </Layout>
        } />
      </Routes>
    </PrimeReactProvider>
  );
}

export default App;
