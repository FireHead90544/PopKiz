import React, { useState, useEffect } from "react";
import { BirthdayDataType } from "../App";

const MemoryLane: React.FC<{ onNext: () => void; data: BirthdayDataType }> = ({
  onNext,
  data,
}) => {
  const memories = data.memoryLane.memories;

  const [currentMemory, setCurrentMemory] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  // Preload all memory images
  useEffect(() => {
    memories.forEach((memory) => {
      const img = new Image();
      img.src = memory.src;
    });
  }, [memories]);

  const handleNext = () => {
    setShowMessage(false);
    setCurrentMemory((prev) => (prev + 1) % memories.length);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 p-4">
      <div className="max-w-lg w-full bg-white bg-opacity-90 rounded-2xl shadow-2xl p-6 text-center border-4 border-purple-300">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6">
          Memory Lane
        </h2>
        <p className="text-base text-gray-700 mb-6 italic">
          Clicking on image does nothing. The "More" button is fake as well. Go
          sleep now.
        </p>
        <div className="mb-8 relative w-full h-56 sm:h-96 rounded-lg overflow-hidden border-2 border-purple-300 shadow-lg">
          <img
            src={memories[currentMemory].src}
            alt="Memory"
            className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => setShowMessage(!showMessage)}
          />
          {showMessage && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white font-semibold text-lg p-4 rounded-lg">
              {memories[currentMemory].message}
            </div>
          )}
        </div>

        <div className="flex space-x-4 items-center justify-center">
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-6 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-110"
          >
            More ✨
          </button>
          <button
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-6 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-110"
            onClick={onNext}
          >
            Next 🎉
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoryLane;
