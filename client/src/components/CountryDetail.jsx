// /src/components/CountryDetail.jsx

import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import LoveButton from './LoveButton';
import axios from 'axios';
import { ExclamationCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function CountryDetail({ countryCode, inline = false, onBorderClick }) {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteError, setFavoriteError] = useState(null);

  const fetchCountry = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      if (!response.ok) throw new Error('Country not found');
      const data = await response.json();
      setCountry(data[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkFavoriteStatus = async () => {
    try {
      setFavoriteError(null);
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await axios.get('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsFavorite(res.data.favorites?.includes(countryCode));
    } catch (err) {
      setFavoriteError('Unable to load favorite status');
      console.error('Error checking favorite status:', err);
    }
  };

  useEffect(() => {
    if (countryCode) {
      fetchCountry();
      checkFavoriteStatus();
    }
  }, [countryCode]);

  const ErrorMessage = ({ message, onRetry }) => (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-md border border-gray-200">
      <ExclamationCircleIcon className="w-14 h-14 text-blue-500 mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-600 text-center mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <ArrowPathIcon className="w-5 h-5" />
          Try Again
        </button>
      )}
    </div>
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchCountry} />;
  if (!country) return <ErrorMessage message="Country not found" />;

  return (
    <div className="p-6 sm:p-8 md:p-10 text-gray-900 max-w-4xl mx-auto">
      {!inline && (
        <button
          onClick={() => window.history.back()}
          className="mb-6 inline-flex items-center gap-1 px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          ← Back
        </button>
      )}

      <div className="flex flex-col items-center gap-3 text-center mb-8">
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="w-40 h-24 object-cover border border-gray-300 rounded-lg shadow-sm"
        />
        <h2 className="text-3xl font-bold leading-tight">{country.name.common}</h2>
        <p className="text-base text-gray-500">{country.name.official}</p>
        <div className="flex items-center gap-3">
          <LoveButton 
            countryCode={country.cca3} 
            initialIsLoved={isFavorite} 
            onError={setFavoriteError}
          />
          {favoriteError && (
            <div className="text-sm text-red-500 flex items-center gap-1">
              <ExclamationCircleIcon className="w-4 h-4" />
              {favoriteError}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm border-t border-b py-8">
        <div className="space-y-3">
          <p><span className="font-medium">Capital:</span> {country.capital?.join(', ') || 'N/A'}</p>
          <p><span className="font-medium">Region:</span> {country.region}</p>
          <p><span className="font-medium">Subregion:</span> {country.subregion || 'N/A'}</p>
          <p><span className="font-medium">Population:</span> {country.population.toLocaleString()}</p>
        </div>
        <div className="space-y-3">
          <p><span className="font-medium">Top-Level Domain:</span> {country.tld?.join(', ')}</p>
          <p><span className="font-medium">Currencies:</span> {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
          <p><span className="font-medium">Languages:</span> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
        </div>
      </div>

      {country.borders && country.borders.length > 0 && (
        <div className="mt-8">
          <h3 className="font-medium mb-4">Border Countries:</h3>
          <div className="flex flex-wrap gap-3">
            {country.borders.map((borderCode, index) => (
              <button
                key={index}
                onClick={() => onBorderClick && onBorderClick(borderCode)}
                className="px-4 py-1.5 bg-gray-50 hover:bg-gray-100 text-sm rounded-full border border-gray-300 transition shadow-sm"
              >
                {borderCode}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
