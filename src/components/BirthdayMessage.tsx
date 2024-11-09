import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const BirthdayMessage: React.FC = () => {
  const closeTab = () => {
    window.opener = null;
    window.open("https://shattereddisk.github.io/rickroll/rickroll.mp4", "_self");
    window.close();
  }

  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Update the window size state when the window is resized
  useEffect(() => {

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Set initial window size
    handleResize();

    // Add event listener for window resizing
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hide confetti after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-4">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-4xl font-bold text-purple-700 mb-4">
          Happy Birthday, Test123! 🎉
        </h2>
        <p className="text-gray-700 text-lg mb-6">
          Test123, today's all about you! 🌟 Wishing you the
          most fantastic day filled with love, laughter, and all your favorite things. 🎂
        </p>
        <p className="text-gray-700 mb-6">
          May this year bring you even more reasons to smile and endless
          memories. Thank you for being the amazing friend you are. Cheers
          to you! 🥂
        </p>
        <button
          onClick={closeTab}
          className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition mt-4"
        >
          Close Tab
        </button>
      </div>
    </div>
  );
};

export default BirthdayMessage;
