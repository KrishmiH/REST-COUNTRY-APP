// /src/pages/Profile.jsx

import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import axios from 'axios';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [favoriteFlags, setFavoriteFlags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login';
          return;
        }

        const response = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUserData(response.data);

        // Fetch flags for favorite countries
        if (response.data.favorites?.length > 0) {
          const flags = await Promise.all(
            response.data.favorites.map(async (code) => {
              try {
                const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
                const data = await res.json();
                return {
                  code,
                  flag: data[0]?.flags?.png
                };
              } catch {
                return null;
              }
            })
          );
          setFavoriteFlags(flags.filter(Boolean));
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="w-full max-w-md p-6 bg-white rounded-lg">
          <div className="text-center">
            <i className="pi pi-exclamation-triangle text-4xl text-blue-500 mb-4"></i>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Profile Not Found</h2>
            <p className="text-gray-600 mb-4">Please log in to view your profile</p>
            <Button
              label="Go to Login"
              icon="pi pi-sign-in"
              onClick={() => window.location.href = '/login'}
              className="p-button-primary"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg p-6">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <i className="pi pi-user text-4xl text-blue-500"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
            <p className="text-gray-600">{userData.email}</p>
          </div>

          <Divider className="border-gray-100" />

          {favoriteFlags.length > 0 ? (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Favorite Countries</h2>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {favoriteFlags.map(({ code, flag }) => (
                  <div
                    key={code}
                    className="aspect-[3/2] rounded-lg overflow-hidden border border-gray-100 hover:border-blue-200 transition-colors"
                  >
                    <img
                      src={flag}
                      alt={`Flag of ${code}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <i className="pi pi-heart text-2xl mb-2 text-blue-500"></i>
              <p>No favorite countries yet</p>
            </div>
          )}

          <Divider className="border-gray-100" />

          <div className="mt-8">
            <Button
              label="Logout"
              icon="pi pi-sign-out"
              severity="danger"
              className="w-full"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
