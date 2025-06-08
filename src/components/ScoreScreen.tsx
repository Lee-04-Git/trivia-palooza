
import React, { useEffect, useState } from 'react';
import { Topic } from '../pages/Index';

interface ScoreScreenProps {
  score: { correct: number; total: number };
  topic: Topic;
  onReturnHome: () => void;
}

export const ScoreScreen: React.FC<ScoreScreenProps> = ({ score, topic, onReturnHome }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const percentage = Math.round((score.correct / score.total) * 100);
  
  useEffect(() => {
    // Animate score counting up
    const timer = setTimeout(() => {
      if (animatedScore < score.correct) {
        setAnimatedScore(animatedScore + 1);
      }
    }, 100);

    if (animatedScore === score.correct && percentage >= 70) {
      setShowConfetti(true);
    }

    return () => clearTimeout(timer);
  }, [animatedScore, score.correct, percentage]);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "🏆 LEGENDARY!", color: "text-yellow-600" };
    if (percentage >= 80) return { message: "🌟 AMAZING!", color: "text-purple-600" };
    if (percentage >= 70) return { message: "🎉 GREAT JOB!", color: "text-green-600" };
    if (percentage >= 60) return { message: "👍 GOOD EFFORT!", color: "text-blue-600" };
    if (percentage >= 50) return { message: "📚 KEEP STUDYING!", color: "text-orange-600" };
    return { message: "💪 TRY AGAIN!", color: "text-red-600" };
  };

  const performance = getPerformanceMessage();

  return (
    <div className={`min-h-screen ${topic.theme.background} p-4 relative overflow-hidden`}>
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${Math.random() * 20 + 15}px`
              }}
            >
              {['🎉', '🎊', '✨', '🌟', '💫'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce">{topic.icon}</div>
        <div className="absolute top-40 right-20 text-4xl opacity-30 animate-pulse">🎯</div>
        <div className="absolute bottom-20 left-1/4 text-5xl opacity-25 animate-bounce" style={{animationDelay: '1s'}}>📚</div>
        <div className="absolute bottom-40 right-1/3 text-4xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}>🧠</div>
      </div>

      <div className="relative z-20 max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Quiz Complete!
          </h1>
          <div className="text-4xl mb-4 animate-bounce">{topic.icon}</div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-700">{topic.name}</h2>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-3xl p-12 shadow-2xl border-4 border-gray-200 mb-8 animate-scale-in">
          {/* Performance Message */}
          <div className={`text-3xl md:text-4xl font-bold mb-8 ${performance.color} animate-pulse`}>
            {performance.message}
          </div>

          {/* Score Display */}
          <div className="mb-8">
            <div className="text-8xl md:text-9xl font-bold text-gray-800 mb-4 animate-bounce">
              {animatedScore}<span className="text-gray-400">/{score.total}</span>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-gray-600">
              {percentage}% Correct
            </div>
          </div>

          {/* Progress Circle */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
                className={`transition-all duration-2000 ease-out ${percentage >= 70 ? 'text-green-500' : percentage >= 50 ? 'text-yellow-500' : 'text-red-500'}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-700">{percentage}%</span>
            </div>
          </div>
        </div>

        {/* Return Button */}
        <button
          onClick={onReturnHome}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xl py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 shadow-lg animate-fade-in"
          style={{ animationDelay: '1s' }}
        >
          🏠 Return to Home
        </button>
      </div>
    </div>
  );
};
