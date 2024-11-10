import React, { useEffect, useState } from "react";
import { BirthdayDataType } from "../App";

const BirthdayCountdown: React.FC<{ onNext: () => void, data: BirthdayDataType }> = ({ onNext, data }) => {
  const loadingMessages = data.birthdayCountdown.messages;
  const countdownTime = data.birthdayCountdown.timer;

  const [timeLeft, setTimeLeft] = useState(countdownTime);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);
  
  const [audio] = useState(() => {
    const audioElement = new Audio("/happy-birthday.mp3");
    audioElement.preload = "auto";
    audioElement.loop = true;
    return audioElement;
  });

  useEffect(() => {
    // Countdown Timer
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 1) return prevTime - 1;
        clearInterval(timerInterval);
        setIsCountdownFinished(true);
        return 0;
      });
    }, 1000);

    // Countdown Message
    const messageInterval = setInterval(() => {
      setLoadingMessage((prevMessage) => {
        const nextIndex = (loadingMessages.indexOf(prevMessage) + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 5000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(messageInterval);
    };
    // eslint-disable-next-line
  }, []);

  const handlePlayAudioAndNext = () => {
    audio.play();
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-center">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">Mhmmm.. Go Away 😾</h2>
        {!isCountdownFinished && (
          <>
            <p className="text-2xl text-gray-800 font-semibold mb-6">{timeLeft}s</p>
            <p className="text-lg font-semibold text-gray-600 mb-6">{loadingMessage}</p>
          </>
        )}
        
        {isCountdownFinished && (
          <button
            onClick={handlePlayAudioAndNext}
            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition mt-4"
          >
            Ok Bye 🎶
          </button>
        )}
      </div>
    </div>
  );
};

export default BirthdayCountdown;
