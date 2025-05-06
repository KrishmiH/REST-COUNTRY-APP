// /src/components/Header.jsx

import SearchBar from './SearchBar';
import RegionFilter from './RegionFilter';
import SubregionFilter from './SubregionFilter';
import SignUpButton from './SignUpButton';
import SignInButton from './SignInButton';
import UserProfileButton from './UserProfileButton';
import { Link } from 'react-router-dom';

export default function Header({ onSearch, onSelectRegion, onSelectSubregion, selectedRegion }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  return (
    <header className="bg-gray-800 text-white p-5 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <h1>Rest Countries Explorer</h1>
          </Link>
        </div>

        <div className="w-full md:w-auto flex flex-col md:flex-row items-end md:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="w-full sm:w-48">
              <RegionFilter onSelectRegion={onSelectRegion} />
            </div>
            <div className="w-full sm:w-48">
              <SubregionFilter
                onSelectSubregion={onSelectSubregion}
                selectedRegion={selectedRegion}
              />
            </div>
          </div>

          <div className="w-full md:w-96">
            <SearchBar onSearch={onSearch} />
          </div>

          <div className="flex gap-2 mt-2 md:mt-0">
            {token ? (
              <UserProfileButton />
            ) : (
              <>
                <SignUpButton />
                <SignInButton />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
