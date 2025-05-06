// /src/components/LoveButton.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as OutlineHeart } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function LoveButton({ countryCode, initialIsLoved = false, onError }) {
    const [loved, setLoved] = useState(initialIsLoved);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkFavorite = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const res = await axios.get('/api/user/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setLoved(res.data.favorites?.includes(countryCode));
            } catch (err) {
                console.error('Error checking favorite status', err);
                onError?.('Unable to load favorite status');
            }
        };

        checkFavorite();
    }, [countryCode, onError]);

    const toggleFavorite = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            // Optimistic update
            setLoved(!loved);
            setLoading(true);
            onError?.(null);

            await axios.post(
                '/api/user/favorite',
                { countryCode },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
        } catch (err) {
            // Revert on error
            setLoved(!loved);
            onError?.('Failed to update favorite status');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button 
            onClick={toggleFavorite} 
            className={`text-red-500 hover:scale-110 transition cursor-pointer ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
            title={loading ? 'Updating...' : loved ? 'Remove from favorites' : 'Add to favorites'}
        >
            {loved ? (
                <HeartIcon className="w-6 h-6" />
            ) : (
                <OutlineHeart className="w-6 h-6" />
            )}
        </button>
    );
}
