import React, { useState, useEffect } from "react";
import { BirthdayDataType } from "../App";

const PuzzleQuest: React.FC<{ onNext: () => void; data: BirthdayDataType }> = ({
  onNext,
  data,
}) => {
  const initialTiles = [1, 2, 3, 4, 5, 6, 7, 8, null];
  const [tiles, setTiles] = useState(initialTiles);
  const [isSolved, setIsSolved] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    setTiles(shuffle([...initialTiles]));
    setIsShuffled(true);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isShuffled) {
      checkSolved();
    }
    // eslint-disable-next-line
  }, [tiles, isShuffled]);

  const shuffle = (array: (number | null)[]) => {
    do {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    } while (!isSolvable(array));
    return array;
  };

  const isSolvable = (array: (number | null)[]) => {
    const inversions = array.reduce((acc: number, curr, i) => {
      if (curr === null) return acc;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] !== null && array[j]! < curr) acc++;
      }
      return acc;
    }, 0);
    return inversions % 2 === 0;
  };

  const checkSolved = () => {
    if (tiles.every((tile, index) => tile === initialTiles[index])) {
      setIsSolved(true);
    } else {
      setIsSolved(false);
    }
  };

  const moveTile = (index: number) => {
    const emptyIndex = tiles.indexOf(null);
    const validMoves = [
      emptyIndex - 1,
      emptyIndex + 1,
      emptyIndex - 3,
      emptyIndex + 3,
    ];

    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[index],
      ];
      setTiles(newTiles);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === data.puzzleQuest.skipPassword) {
      onNext();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-500 via-blue-500 to-purple-500 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border-4 border-blue-300 transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
          Puzzle Quest
        </h2>
        <p className="text-lg font-medium text-gray-700 mb-8">
          Arrange the tiles to complete the puzzle! Only then can you proceed.
        </p>
        <div className="flex justify-center items-center mb-8">
          <div className="grid grid-cols-3 gap-4">
            {tiles.map((tile, index) => (
              <div
                key={index}
                className={`w-20 h-20 flex items-center justify-center text-3xl font-bold rounded-lg cursor-pointer transition-colors duration-300 ${
                  tile === null
                    ? "bg-transparent border-2 border-dashed border-gray-400"
                    : "bg-blue-500 text-white shadow-lg hover:bg-blue-600"
                }`}
                onClick={() => moveTile(index)}
              >
                {tile}
              </div>
            ))}
          </div>
        </div>
        {isSolved ? (
          <div>
            <div className="text-green-600 font-bold text-xl mb-4 animate-bounce">
              Woah, niceee! *pats*
            </div>
            <button
              onClick={onNext}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
            >
              Next
            </button>
          </div>
        ) : (
          <button
            onClick={() => setTiles(shuffle([...initialTiles]))}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Shuffle
          </button>
        )}
        <div className="mt-8 w-full px-4 sm:px-0">
          <p className="text-gray-600 mb-3 text-base sm:text-lg font-medium text-center">
            Wanna skip by cheating? Beg for the password 😈
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full sm:w-auto bg-white border border-gray-300 rounded-lg p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md transition"
              placeholder="Enter password"
            />
            <button
              onClick={handlePasswordSubmit}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleQuest;
