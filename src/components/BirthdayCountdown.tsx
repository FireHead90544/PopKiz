import React, { useEffect, useState } from "react";
import { BirthdayDataType } from "../App";

const BirthdayCountdown: React.FC<{
  onNext: () => void;
  data: BirthdayDataType;
}> = ({ onNext, data }) => {
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
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 1) return prevTime - 1;
        clearInterval(timerInterval);
        setIsCountdownFinished(true);
        return 0;
      });
    }, 1000);

    const messageInterval = setInterval(() => {
      setLoadingMessage((prevMessage) => {
        const nextIndex =
          (loadingMessages.indexOf(prevMessage) + 1) % loadingMessages.length;
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 text-center p-4 sm:p-6">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 border-2 border-purple-300 relative z-10">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6">
          Mhmmm.. Go Away <span className="text-white">😾</span>
        </h2>
        {!isCountdownFinished && (
          <>
            <p className="text-5xl font-extrabold text-indigo-600 mb-6">
              {timeLeft}s
            </p>
            <p className="text-lg font-semibold text-gray-600 mb-6 italic">
              {loadingMessage}
            </p>
          </>
        )}
        {isCountdownFinished && (
          <button
            onClick={handlePlayAudioAndNext}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:bg-purple-700 transition-all transform hover:scale-105"
          >
            Ok Bye 🎶
          </button>
        )}
      </div>
    </div>
  );
};

export default BirthdayCountdown;
