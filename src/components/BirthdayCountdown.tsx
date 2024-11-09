// src/components/BirthdayCountdown.tsx
import React, { useEffect, useState } from "react";

const loadingMessages = [
  "Message 1",
  "Message 2",
  "Message 3",
  "Message 4",
  "Message 5",
  "Message 6",
];

const BirthdayCountdown: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const countdownTime = 5; // 30 seconds countdown
  const [timeLeft, setTimeLeft] = useState(countdownTime);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  
  // Initialize the audio with looping and preload settings
  const [audio] = useState(() => {
    const audioElement = new Audio("/happy-birthday.mp3"); // Make sure this file exists in the public folder
    audioElement.preload = "auto"; // Preload audio for quicker playback
    audioElement.loop = true;      // Set to loop
    return audioElement;
  });

  useEffect(() => {
    // Update countdown every second
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 1) return prevTime - 1;
        clearInterval(timerInterval);
        return 0;
      });
    }, 1000);

    // Change loading message every 5 seconds
    const messageInterval = setInterval(() => {
      setLoadingMessage((prevMessage) => {
        const nextIndex = (loadingMessages.indexOf(prevMessage) + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 5000);

    // Clean up intervals on unmount
    return () => {
      clearInterval(timerInterval);
      clearInterval(messageInterval);
    };
  }, []);

  // When countdown finishes, play music and reset the stage
  useEffect(() => {
    if (timeLeft === 0) {
      audio.play();
      onNext();
    }
  }, [timeLeft, audio, onNext]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-center">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">Countdown to Celebration 🎉</h2>
        <p className="text-2xl text-gray-800 font-semibold mb-6">{timeLeft}s</p>
        <p className="text-lg font-semibold text-gray-600 mb-6">{loadingMessage}</p>
      </div>
    </div>
  );
};

export default BirthdayCountdown;
