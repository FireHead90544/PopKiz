import React, { useState } from "react";
import { BirthdayDataType } from "../App";

const TriviaFun: React.FC<{ onNext: () => void; data: BirthdayDataType }> = ({
  onNext,
  data,
}) => {
  const questions = data.triviaFun.questions;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Handle answer click and provide feedback
  const handleAnswerClick = (option: string) => {
    setSelectedAnswer(option);
    const correct = option === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  // Proceed to the next question or finish
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onNext();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 p-4 text-center">
      <div className="max-w-lg w-full bg-white bg-opacity-90 rounded-2xl shadow-2xl p-6 border-4 border-yellow-300">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
          Trivia Time! <span className="text-white">🎉</span>
        </h2>

        {!showFeedback ? (
          <>
            <p className="text-xl font-semibold mb-6 text-gray-800">
              {questions[currentQuestion].question}
            </p>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  className={`w-full py-3 px-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedAnswer === option
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-8">
            <p
              className={`text-2xl font-bold mb-6 ${
                isCorrect ? "text-green-600 animate-pulse" : "text-red-600 animate-bounce"
              }`}
            >
              {isCorrect
                ? questions[currentQuestion].feedback.correct
                : questions[currentQuestion].feedback.incorrect}
            </p>
            <button
              onClick={handleNextQuestion}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "Sleep Now?"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TriviaFun;
