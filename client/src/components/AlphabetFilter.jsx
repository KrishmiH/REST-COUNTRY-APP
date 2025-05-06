// /src/components/AlphabetFilter.jsx

import React, { useState } from 'react';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function AlphabetFilter({ onSelectLetter }) {
  const [selectedLetter, setSelectedLetter] = useState(null);

  const handleClick = (letter) => {
    if (selectedLetter === letter) {
      // Deselect: Show all countries
      setSelectedLetter(null);
      onSelectLetter(null);
    } else {
      // Select new letter
      setSelectedLetter(letter);
      onSelectLetter(letter);
    }
  };

  return (
    <div className="py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 p-4">
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() => handleClick(letter)}
              className={`w-10 h-10 flex items-center justify-center rounded-md border transition-colors cursor-pointer
                ${selectedLetter === letter
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300'
                }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
