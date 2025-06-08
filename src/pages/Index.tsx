import React, { useState, useEffect } from 'react';
import { TopicCard } from '../components/TopicCard.jsx';
import { TopicModal } from '../components/TopicModal';
import { QuizScreen } from '../components/QuizScreen';
import { ScoreScreen } from '../components/ScoreScreen';
import { PauseModal } from '../components/PauseModal';

export type Topic = {
  id: string;
  name: string;
  apiUrl: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  icon: string;
};

const topics: Topic[] = [
  {
    id: 'anime',
    name: 'Anime/Manga',
    apiUrl: 'https://opentdb.com/api.php?amount=20&category=31&difficulty=hard&type=multiple',
    theme: {
      primary: 'from-pink-400 to-purple-600',
      secondary: 'bg-pink-100',
      accent: 'text-purple-800',
      background: 'bg-gradient-to-br from-pink-50 to-purple-100'
    },
    icon: '🌸'
  },
  {
    id: 'cartoons',
    name: 'Cartoons/Animation',
    apiUrl: 'https://opentdb.com/api.php?amount=20&category=32&difficulty=medium&type=multiple',
    theme: {
      primary: 'from-blue-400 to-cyan-600',
      secondary: 'bg-blue-100',
      accent: 'text-blue-800',
      background: 'bg-gradient-to-br from-blue-50 to-cyan-100'
    },
    icon: '🎨'
  },
  {
    id: 'videogames',
    name: 'Video Games',
    apiUrl: 'https://opentdb.com/api.php?amount=20&category=15&difficulty=medium&type=multiple',
    theme: {
      primary: 'from-green-400 to-emerald-600',
      secondary: 'bg-green-100',
      accent: 'text-green-800',
      background: 'bg-gradient-to-br from-green-50 to-emerald-100'
    },
    icon: '🎮'
  },
  {
    id: 'television',
    name: 'Television',
    apiUrl: 'https://opentdb.com/api.php?amount=10&category=14&difficulty=medium&type=multiple',
    theme: {
      primary: 'from-orange-400 to-red-600',
      secondary: 'bg-orange-100',
      accent: 'text-red-800',
      background: 'bg-gradient-to-br from-orange-50 to-red-100'
    },
    icon: '📺'
  },
  {
    id: 'comics',
    name: 'Comics',
    apiUrl: 'https://opentdb.com/api.php?amount=20&category=29&difficulty=medium&type=multiple',
    theme: {
      primary: 'from-yellow-400 to-orange-600',
      secondary: 'bg-yellow-100',
      accent: 'text-orange-800',
      background: 'bg-gradient-to-br from-yellow-50 to-orange-100'
    },
    icon: '💥'
  },
  {
    id: 'movies',
    name: 'Movies',
    apiUrl: 'https://opentdb.com/api.php?amount=20&category=11&difficulty=medium&type=multiple',
    theme: {
      primary: 'from-indigo-400 to-purple-600',
      secondary: 'bg-indigo-100',
      accent: 'text-purple-800',
      background: 'bg-gradient-to-br from-indigo-50 to-purple-100'
    },
    icon: '🎬'
  }
];

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'quiz' | 'score'>('home');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [finalScore, setFinalScore] = useState({ correct: 0, total: 0 });

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
    setShowTopicModal(true);
  };

  const handleStartQuiz = () => {
    setShowTopicModal(false);
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = (score: { correct: number; total: number }) => {
    setFinalScore(score);
    setCurrentScreen('score');
  };

  const handleReturnHome = () => {
    setCurrentScreen('home');
    setSelectedTopic(null);
    setShowTopicModal(false);
    setShowPauseModal(false);
  };

  const handlePause = () => {
    setShowPauseModal(true);
  };

  const handleResume = () => {
    setShowPauseModal(false);
  };

  if (currentScreen === 'quiz' && selectedTopic) {
    return (
      <>
        <QuizScreen 
          topic={selectedTopic}
          onComplete={handleQuizComplete}
          onPause={handlePause}
        />
        {showPauseModal && (
          <PauseModal
            onResume={handleResume}
            onExit={handleReturnHome}
          />
        )}
      </>
    );
  }

  if (currentScreen === 'score' && selectedTopic) {
    return (
      <ScoreScreen
        score={finalScore}
        topic={selectedTopic}
        onReturnHome={handleReturnHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 p-4">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-pink-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-300 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 right-1/3 w-18 h-18 bg-green-300 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent animate-pulse">
            🎪 Trivia-Palooza! 🎪
          </h1>
          <p className="text-2xl text-gray-700 font-semibold">
            Choose your adventure and test your knowledge!
          </p>
        </div>

        {/* Topic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {topics.map((topic, index) => (
            <TopicCard 
              key={topic.id}
              topic={topic}
              index={index}
              onClick={() => handleTopicClick(topic)}
            />
          ))}
        </div>
      </div>

      {/* Topic Modal */}
      {showTopicModal && selectedTopic && (
        <TopicModal
          topic={selectedTopic}
          onStart={handleStartQuiz}
          onClose={() => setShowTopicModal(false)}
        />
      )}
    </div>
  );
};

export default Index;
