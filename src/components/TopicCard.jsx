
import React from 'react';

export const TopicCard = ({ topic, index, onClick }) => {
  // Define unique animations for each topic
  const getTopicAnimation = () => {
    switch (topic.id) {
      case 'anime':
        return 'animate-pulse hover:animate-bounce';
      case 'cartoons':
        return 'hover:animate-spin hover:duration-1000';
      case 'videogames':
        return 'animate-bounce hover:animate-pulse';
      case 'television':
        return 'hover:animate-ping';
      case 'comics':
        return 'hover-wiggle';
      case 'movies':
        return 'animate-pulse hover:animate-spin hover:duration-700';
      default:
        return 'hover:animate-bounce';
    }
  };

  // Define unique hover effects for each topic
  const getHoverTransform = () => {
    switch (topic.id) {
      case 'anime':
        return 'hover:scale-105 hover:rotate-3';
      case 'cartoons':
        return 'hover:scale-110 hover:-rotate-6';
      case 'videogames':
        return 'hover:scale-115 hover:rotate-2';
      case 'television':
        return 'hover:scale-105 hover:-rotate-1';
      case 'comics':
        return 'hover:scale-120 hover:rotate-6';
      case 'movies':
        return 'hover:scale-110 hover:-rotate-3';
      default:
        return 'hover:scale-110 hover:-rotate-2';
    }
  };

  return (
    <div 
      className={`relative cursor-pointer transform transition-all duration-300 ${getHoverTransform()} ${getTopicAnimation()} animate-fade-in group`}
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
        
        {/* Icon with topic-specific animation */}
        <div className={`text-6xl mb-4 text-center ${topic.id === 'anime' ? 'animate-bounce' : topic.id === 'videogames' ? 'animate-pulse' : 'animate-bounce'}`}>
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
