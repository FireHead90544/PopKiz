import React, { useState } from "react";
import { BirthdayDataType } from "../App";

const WelcomeScreen: React.FC<{ onNext: () => void, data: BirthdayDataType }> = ({ onNext , data }) => {
  const [clicks, setClicks] = useState(0);
  const messages = data.welcomeScreen.messages;

  const handleClick = () => {
    setClicks(clicks + 1);
    if (clicks >= messages.length - 1) {
      onNext();
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="text-center p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">
          Hieee {data.nickname} :3
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          {messages[clicks][0]}
        </p>
        <button
          className="bg-purple-600 text-white py-2 px-4 rounded-lg text-lg hover:bg-purple-700 transition"
          onClick={() => handleClick()}
        >
          {messages[clicks][1]}
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
