
import React from 'react';
import { Topic } from '../pages/Index';

interface TopicCardProps {
  topic: Topic;
  index: number;
  onClick: () => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic, index, onClick }) => {
  return (
    <div 
      className={`relative cursor-pointer transform transition-all duration-300 hover:scale-110 hover:-rotate-2 animate-fade-in group`}
      style={{ animationDelay: `${index * 0.2}s` }}
      onClick={onClick}
    >
      {/* Card Shadow */}
      <div className="absolute inset-0 bg-black rounded-3xl transform translate-x-2 translate-y-2 opacity-30"></div>
      
      {/* Main Card */}
      <div className={`relative bg-gradient-to-br ${topic.theme.primary} p-8 rounded-3xl border-4 border-white shadow-xl transform transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1`}>
        {/* Sparkle Effect */}
        <div className="absolute top-2 right-2 text-2xl animate-spin opacity-70">✨</div>
        <div className="absolute bottom-2 left-2 text-xl animate-pulse opacity-50">⭐</div>
        
        {/* Icon */}
        <div className="text-6xl mb-4 text-center animate-bounce">
          {topic.icon}
        </div>
        
        {/* Title */}
        <h3 className="text-2xl font-bold text-white text-center mb-4 drop-shadow-lg">
          {topic.name}
        </h3>
        
        {/* Play Button */}
        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full py-3 px-6 text-center border-2 border-white border-opacity-50 transition-all duration-300 group-hover:bg-opacity-30 group-hover:scale-105">
          <span className="text-white font-bold text-lg"> Play Now!</span>
        </div>
        
        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-0 rounded-3xl transition-all duration-300 group-hover:bg-opacity-10"></div>
      </div>
    </div>
  );
};
