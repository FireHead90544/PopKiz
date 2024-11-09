import React, { useState } from "react";

const questions = [
  {
    question: "What's my favorite food?",
    options: ["Pizza", "Sushi", "Tacos", "Pasta"],
    correctAnswer: "Pizza",
    feedback: {
      correct: "Yes! You know me well. 🍕",
      incorrect: "Nope, you should know it's pizza! 🍕",
    },
  },
  {
    question: "Where have I hidden your gift? 😼",
    options: ["Laptop", "Cloud storage", "Old Diary", "Under the bed"],
    correctAnswer: "Old Diary",
    feedback: {
      correct: "Haha, you know! Hidden in plain sight. 📓",
      incorrect: "Nope! Check the diary again. 😉",
    },
  },
  {
    question: "What's my favorite color?",
    options: ["Blue", "Purple", "Green", "Red"],
    correctAnswer: "Purple",
    feedback: {
      correct: "Correct! Purple is my color! 💜",
      incorrect: "Wrong! Purple should be unforgettable. 💜",
    },
  },
];

const TriviaFun: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerClick = (option: string) => {
    setSelectedAnswer(option);
    const correct = option === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
  };

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-yellow-500 to-purple-600 p-4 text-center">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          Trivia Time! 🎉
        </h2>

        {!showFeedback ? (
          <>
            <p className="text-lg font-semibold mb-4 text-gray-700">
              {questions[currentQuestion].question}
            </p>
            <div className="space-y-2">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  className={`w-full py-2 px-4 rounded-lg ${
                    selectedAnswer === option
                      ? "bg-purple-700 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } transition`}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-6">
            <p
              className={`text-lg font-semibold mb-4 ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {isCorrect
                ? questions[currentQuestion].feedback.correct
                : questions[currentQuestion].feedback.incorrect}
            </p>
            <button
              onClick={handleNextQuestion}
              className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "Finish"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TriviaFun;
