import React from "react";

const WelcomeScreen: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="text-center p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">
          Welcome to your surprise, Test123!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Click "Start" to begin the journey!
        </p>
        <button
          className="bg-purple-600 text-white py-2 px-4 rounded-lg text-lg hover:bg-purple-700 transition"
          onClick={() => onNext()}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
