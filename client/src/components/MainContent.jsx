// /src/components/MainContent.jsx

import React from 'react';

export default function MainContent({ children }) {
    return (
        <main className="flex-grow container mx-auto p-4">
            {children}
        </main>
    );
};
