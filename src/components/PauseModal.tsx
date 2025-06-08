
import React from 'react';

interface PauseModalProps {
  onResume: () => void;
  onExit: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({ onResume, onExit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 transform animate-scale-in shadow-2xl border-4 border-gray-200">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-pulse"></div>
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Game Paused</h2>
          <p className="text-gray-600 text-lg">Take a break! Your progress is saved.</p>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={onResume}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg"
          >
            ▶ Resume Game
          </button>
          <button
            onClick={onExit}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
             Exit to Home
          </button>
        </div>
      </div>
    </div>
  );
};
