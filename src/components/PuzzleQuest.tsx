import React, { useState, useEffect } from "react";

const PuzzleQuest: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const initialTiles = [1, 2, 3, 4, 5, 6, 7, 8, null];
  const [tiles, setTiles] = useState(initialTiles);
  const [isSolved, setIsSolved] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false); // New flag for shuffling check

  // Shuffle and set initial tiles on first render
  useEffect(() => {
    setTiles(shuffle([...initialTiles]));
    setIsShuffled(true); // Set to true once shuffled
  }, []);

  useEffect(() => {
    if (isShuffled) {
      checkSolved();
    }
  }, [tiles, isShuffled]);

  // Shuffle function
  const shuffle = (array: (number | null)[]) => {
    // for (let i = array.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * (i + 1));
    //   [array[i], array[j]] = [array[j], array[i]];
    // }
    return array;
  };

  // Check if puzzle is solved
  const checkSolved = () => {
    if (tiles.every((tile, index) => tile === initialTiles[index])) {
      setIsSolved(true);
    } else {
      setIsSolved(false);
    }
  };

  // Move tiles by swapping with the empty slot
  const moveTile = (index: number) => {
    const emptyIndex = tiles.indexOf(null);
    const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 3, emptyIndex + 3];

    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          Puzzle Quest
        </h2>
        <p className="text-gray-700 mb-6">
          Arrange the tiles to complete the puzzle!
        </p>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {tiles.map((tile, index) => (
            <div
              key={index}
              className={`w-20 h-20 flex items-center justify-center bg-blue-300 text-2xl font-bold text-white rounded-md cursor-pointer ${
                tile === null ? "bg-transparent" : ""
              }`}
              onClick={() => moveTile(index)}
            >
              {tile}
            </div>
          ))}
        </div>
        {isSolved ? (
          <div>
            <div className="text-green-700 font-bold text-lg mb-4">
              Congratulations, you solved it!
            </div>
            <button
              onClick={onNext}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        ) : (
          <button
            onClick={() => setTiles(shuffle([...initialTiles]))}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Shuffle Again
          </button>
        )}
      </div>
    </div>
  );
};

export default PuzzleQuest;
