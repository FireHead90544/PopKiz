import React, { useState } from "react";
import { BirthdayDataType } from "../App";

const WelcomeScreen: React.FC<{
  onNext: () => void;
  data: BirthdayDataType;
}> = ({ onNext, data }) => {
  const messages = data.welcomeScreen.messages;

  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    setClicks(clicks + 1);
    if (clicks >= messages.length - 1) {
      onNext();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 p-4">
      <div className="text-center p-8 max-w-lg mx-auto bg-white rounded-xl shadow-2xl border-4 border-pink-300 transform transition-all duration-500 hover:scale-105">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
          Hieee {data.nickname} :3
        </h1>
        <p className="text-2xl text-gray-800 mb-6 italic font-medium">
          {messages[clicks][0]}
        </p>
        <button
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-110"
          onClick={handleClick}
        >
          {messages[clicks][1]}
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
