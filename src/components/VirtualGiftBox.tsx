import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { BirthdayDataType } from "../App";

const VirtualGiftBox: React.FC<{ onNext: () => void; data: BirthdayDataType }> = ({
  onNext,
  data,
}) => {
  const messages = data.virtualGiftBox.subtleForeshadowing;
  const [isOpened, setIsOpened] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [showConfetti, setShowConfetti] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload gift image
  useEffect(() => {
    const image = new Image();
    image.src = data.virtualGiftBox.image;
    image.onload = () => setImageLoaded(true);
  }, [data.virtualGiftBox.image]);

  const handleBoxClick = () => {
    if (clickCount < messages.length - 1) {
      setClickCount(clickCount + 1);
      randomizePosition();
    } else {
      setIsOpened(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  // Randomize gift box position within viewport boundaries
  const randomizePosition = () => {
    const newTop = Math.random() * 70 + 15 + "%";
    const newLeft = Math.random() * 70 + 15 + "%";
    setPosition({ top: newTop, left: newLeft });
  };

  // Re-randomize position on window resize
  useEffect(() => {
    const handleResize = () => randomizePosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 via-red-400 to-yellow-500 p-4">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      {isOpened ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="max-w-lg w-full bg-white bg-opacity-90 rounded-2xl shadow-2xl p-6 border-4 border-yellow-300 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
            Surprise! <span className="text-white">🎉</span>
          </h2>
      
          {imageLoaded ? (
            <img
              src={data.virtualGiftBox.image}
              alt="Surprise Gift"
              className="w-4/5 mx-auto rounded-2xl object-cover shadow-lg mb-8 transform transition-transform hover:scale-105"
            />
          ) : (
            <div className="w-4/5 mx-auto h-56 bg-gray-200 rounded-2xl mb-8 animate-pulse"></div>
          )}
      
          <p className="text-xl font-medium text-gray-800 mb-6 px-4">
            {data.virtualGiftBox.message}
          </p>
      
          <button
            onClick={onNext}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Meow
          </button>
        </div>
      </div>      
      ) : (
        <div
          onClick={handleBoxClick}
          style={{
            position: "absolute",
            top: position.top,
            left: position.left,
            transform: "translate(-50%, -50%)",
          }}
          className="cursor-pointer flex flex-col items-center justify-center bg-purple-500 w-36 h-36 rounded-lg shadow-2xl transform transition-all hover:scale-110 hover:bg-pink-500"
        >
          <span className={`text-5xl ${clickCount === messages.length - 1 ? "animate-bounce" : ""}`}>
            🎁
          </span>
          {messages[clickCount] && (
            <p className="text-white mt-2 text-lg font-semibold animate-pulse">
              {messages[clickCount]}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default VirtualGiftBox;
