import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { BirthdayDataType } from "../App";

const BirthdayMessage: React.FC<{ data: BirthdayDataType }> = ({ data }) => {
  const closeTab = () => {
    window.opener = null;
    window.open("https://shattereddisk.github.io/rickroll/rickroll.mp4", "_self");
    window.close();
  }

  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-4">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-4xl font-bold text-purple-700 mb-4">
          Happy Birthday, {data.name}! 🎉
        </h2>
        {imageLoaded ? (
          <img
            src={data.birthdayMessage.userImage}
            alt="Surprise Gift"
            className="w-3/4 mx-auto h-auto rounded-full mb-6 object-cover"
          />
        ) : (
          <div className="w-3/4 mx-auto h-48 bg-gray-200 rounded-full mb-6 animate-pulse"></div>
        )}
        <p className="text-gray-700 mb-2">
          {data.birthdayMessage.message}
        </p>
        <button
          onClick={closeTab}
          className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition mt-4"
        >
          Surprise Me
        </button>
      </div>
    </div>
  );
};

export default BirthdayMessage;
