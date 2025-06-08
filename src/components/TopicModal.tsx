
import React from 'react';
import { Topic } from '../pages/Index';

interface TopicModalProps {
  topic: Topic;
  onStart: () => void;
  onClose: () => void;
}

export const TopicModal: React.FC<TopicModalProps> = ({ topic, onStart, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 transform animate-scale-in shadow-2xl border-4 border-gray-200">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4 animate-bounce">{topic.icon}</div>
          <h2 className="text-3xl font-bold mb-2 text-gray-800">{topic.name}</h2>
          <p className="text-gray-600 text-lg">Ready for the challenge?</p>
        </div>
        
        {/* Info */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span> Questions: 20</span>
            <span> No time limit</span>
            <span> Multiple choice</span>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
             Return
          </button>
          <button
            onClick={onStart}
            className={`flex-1 bg-gradient-to-r ${topic.theme.primary} hover:opacity-90 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg`}
          >
             Start!
          </button>
        </div>
      </div>
    </div>
  );
};
