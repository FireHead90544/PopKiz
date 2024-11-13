import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { BirthdayDataType } from "../App";

const BirthdayMessage: React.FC<{ data: BirthdayDataType }> = ({ data }) => {
  const closeTab = () => {
    window.opener = null;
    window.open("https://shattereddisk.github.io/rickroll/rickroll.mp4", "_self");
    window.close();
  };

  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  // Handle image preload and window resize
  useEffect(() => {
    const image = new Image();
    image.src = data.birthdayMessage.userImage;
    image.onload = () => setImageLoaded(true);

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [data.birthdayMessage.userImage]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 p-4">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}
      
      <div className="max-w-lg w-full bg-white bg-opacity-90 rounded-2xl shadow-2xl p-6 text-center border-4 border-purple-300 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
          Happy Birthday, {data.name}! <span className="text-white">🎉</span>
        </h2>

        {imageLoaded ? (
          <img
            src={data.birthdayMessage.userImage}
            alt="Birthday Surprise"
            className="w-2/3 mx-auto rounded-full shadow-lg mb-8 transform transition-transform hover:scale-105"
          />
        ) : (
          <div className="w-2/3 mx-auto h-56 bg-gray-200 rounded-full mb-8 animate-pulse"></div>
        )}

        <p className="text-xl font-medium text-gray-800 mb-6 px-4">
          {data.birthdayMessage.message}
        </p>

        <button
          onClick={closeTab}
          className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          Surprise Me
        </button>
      </div>
    </div>
  );
};

export default BirthdayMessage;
