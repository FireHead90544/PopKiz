import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { BirthdayDataType } from "../App";

const VirtualGiftBox: React.FC<{ onNext: () => void, data: BirthdayDataType }> = ({ onNext, data }) => {
  const messages = data.virtualGiftBox.subtleForeshadowing;

  const [isOpened, setIsOpened] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [showConfetti, setShowConfetti] = useState(false);

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

  // Randomize position within viewport boundaries
  const randomizePosition = () => {
    const newTop = Math.random() * 80 + 10 + "%";
    const newLeft = Math.random() * 80 + 10 + "%";
    setPosition({ top: newTop, left: newLeft });
  };

  useEffect(() => {
    const handleResize = () => randomizePosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-400 to-pink-500 p-4">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      
      {isOpened ? (
        <div className="max-w-md w-full bg-white rounded-lg shadow-md py-6 text-center">
          <p className="text-2xl font-semibold text-purple-700 mb-4">
            Surprise! 🎉
          </p>
          <img
            src={data.virtualGiftBox.image}
            alt="Surprise Gift"
            className="w-3/4 mx-auto h-auto rounded-lg mb-6 object-cover"
          />
          <p className="w-3/4 mx-auto text-gray-700 mb-6">
            {data.virtualGiftBox.message}
          </p>
          <button
            onClick={onNext}
            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
          >
            Meow
          </button>
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
          className="cursor-pointer flex flex-col items-center justify-center bg-purple-600 w-32 h-32 rounded-lg shadow-lg transform transition hover:scale-110"
        >
          {messages[clickCount] ? <span className="text-4xl">🎁</span> : <span className="text-7xl">🎁</span>}
          {messages[clickCount] && <p className="text-white mt-2 font-bold">
            {messages[clickCount] || "Open me!"}
          </p>}
        </div>
      )}
    </div>
  );
};

export default VirtualGiftBox;
