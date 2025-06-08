
import React, { useState, useEffect } from 'react';
import { Topic } from '../pages/Index';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface QuizScreenProps {
  topic: Topic;
  onComplete: (score: { correct: number; total: number }) => void;
  onPause: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ topic, onComplete, onPause }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  useEffect(() => {
    fetchQuestions();
  }, [topic]);

  useEffect(() => {
    if (questions.length > 0 && currentQuestion < questions.length) {
      const current = questions[currentQuestion];
      const answers = [...current.incorrect_answers, current.correct_answer];
      setShuffledAnswers(shuffleArray(answers));
    }
  }, [questions, currentQuestion]);

  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch(topic.apiUrl);
      const data = await response.json();
      setQuestions(data.results);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      setLoading(false);
    }
  };

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion + 1 >= questions.length) {
        onComplete({ correct: answer === questions[currentQuestion].correct_answer ? score + 1 : score, total: questions.length });
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 2000);
  };

  const decodeHtml = (html: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${topic.theme.background} flex items-center justify-center`}>
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">{topic.icon}</div>
          <p className="text-2xl font-bold text-gray-700">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className={`min-h-screen ${topic.theme.background} flex items-center justify-center`}>
        <div className="text-center">
          <div className="text-6xl mb-4"></div>
          <p className="text-2xl font-bold text-gray-700">Failed to load questions</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className={`min-h-screen ${topic.theme.background} p-4`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="bg-white rounded-full px-6 py-3 shadow-lg border-2 border-gray-200">
          <span className="text-lg font-bold text-gray-700">
            Question {currentQuestion + 1}/{questions.length}
          </span>
        </div>
        
        <button
          onClick={onPause}
          className="bg-red-500 hover:bg-red-600 text-white text-2xl w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          ⏸️
        </button>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-full h-4 mb-8 shadow-inner border-2 border-gray-200 overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${topic.theme.primary} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-gray-200 mb-8 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center leading-relaxed">
            {decodeHtml(currentQ.question)}
          </h2>
        </div>

        {/* Answers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shuffledAnswers.map((answer, index) => {
            const isSelected = selectedAnswer === answer;
            const isCorrect = answer === currentQ.correct_answer;
            const isWrong = isSelected && !isCorrect;
            
            let buttonClass = "bg-white hover:bg-gray-50 border-gray-300";
            
            if (showResult) {
              if (isCorrect) {
                buttonClass = "bg-green-500 text-white border-green-500";
              } else if (isWrong) {
                buttonClass = "bg-red-500 text-white border-red-500";
              } else {
                buttonClass = "bg-gray-200 text-gray-500 border-gray-300";
              }
            } else if (isSelected) {
              buttonClass = `bg-gradient-to-r ${topic.theme.primary} text-white border-transparent`;
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(answer)}
                disabled={showResult}
                className={`p-6 rounded-2xl border-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg ${buttonClass} ${!showResult ? 'hover:shadow-xl' : ''}`}
              >
                <span className="text-xl mr-3">
                  {String.fromCharCode(65 + index)})
                </span>
                {decodeHtml(answer)}
                {showResult && isCorrect && <span className="ml-2">✅</span>}
                {showResult && isWrong && <span className="ml-2">❌</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
