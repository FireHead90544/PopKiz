import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const VirtualGiftBox: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [showConfetti, setShowConfetti] = useState(false);

  // Messages to display on each click
  const messages = [
    "...",
    "mhmmmm... wut?",
    "chup, ni milega",
    "*tch tch* 😾☝️",
    "thike miljayega *pats*",
  ];

  // Handle box click
  const handleBoxClick = () => {
    if (clickCount < 5) {
      setClickCount(clickCount + 1);
      randomizePosition();
    } else {
      setIsOpened(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Confetti fades after 5 seconds
    }
  };

  // Randomize position within the viewport boundaries
  const randomizePosition = () => {
    const newTop = Math.random() * 80 + 10 + "%"; // Random position with padding
    const newLeft = Math.random() * 80 + 10 + "%";
    setPosition({ top: newTop, left: newLeft });
  };

  // Adjust position on window resize to keep box visible
  useEffect(() => {
    const handleResize = () => randomizePosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-400 to-pink-500 p-4">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      
      {/* Only show this container if the box is opened */}
      {isOpened ? (
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-2xl font-semibold text-purple-700 mb-4">
            Surprise! 🎉
          </p>
          <p className="text-gray-700 mb-6">
            I hope you love this surprise, Buddy! 🎈 Your real gift is on
            its way! 🎁
          </p>
          <button
            onClick={onNext}
            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
          >
            Next
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
          🎁
          <p className="text-white mt-2 font-bold">
            {messages[clickCount] || "Open me!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default VirtualGiftBox;
