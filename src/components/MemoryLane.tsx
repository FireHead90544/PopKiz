import React, { useState } from "react";
import { BirthdayDataType } from "../App";

const MemoryLane: React.FC<{ onNext: () => void, data: BirthdayDataType }> = ({ onNext, data })  => {
  const memories = data.memoryLane.memories;

  const [currentMemory, setCurrentMemory] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const handleNext = () => {
    setShowMessage(false);
    setCurrentMemory((prev) => (prev + 1) % memories.length);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 to-yellow-500 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-semibold text-pink-700 mb-4">
          Memory Lane
        </h2>
        <p className="text-gray-700 mb-6">
          Clicking on image does nothing. The More button is fake as well. Go sleep now.
        </p>
        <div className="mb-6 relative">
          <img
            src={memories[currentMemory].src}
            alt="Memory"
            className="rounded-lg shadow-md w-full cursor-pointer"
            onClick={() => setShowMessage(!showMessage)}
          />
          {showMessage && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-semibold text-lg p-4 rounded-lg">
              {memories[currentMemory].message}
            </div>
          )}
        </div>
        <div className="flex space-x-2 items-center justify-center">
          <button
            onClick={handleNext}
            className="bg-pink-600 text-white py-2 px-4 rounded-lg text-lg hover:bg-pink-700 transition"
          >
            More
          </button>
          <button
            className="bg-purple-600 text-white py-2 px-4 rounded-lg text-lg hover:bg-purple-700 transition"
            onClick={() => onNext()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoryLane;
