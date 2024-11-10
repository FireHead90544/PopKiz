import React, { useState, useEffect } from "react";
import { BirthdayDataType } from "../App";

const PuzzleQuest: React.FC<{ onNext: () => void, data: BirthdayDataType }> = ({ onNext, data }) => {
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

  // Shuffle to a solvable configuration
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
    const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 3, emptyIndex + 3];

    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          Puzzle Quest
        </h2>
        <p className="text-gray-700 mb-6">
          Arrange the tiles to complete the puzzle! Then only you can move ahead.
        </p>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-3 gap-x-6 gap-y-4 mb-6">
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
        </div>
        {isSolved ? (
          <div>
            <div className="text-green-700 font-bold text-lg mb-4">
              Woah, niceeee *pats*!
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
            Shuffle
          </button>
        )}
        <div className="mt-6">
          <div className="flex flex-col">
          <p className="text-gray-700 mb-2">Wanna skip by cheating? Beg for the password mueheheh 😈</p>
          <div className="flex space-x-2 items-center justify-center mb-4">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="border border-gray-300 rounded-md p-2"
            />
            <button
              onClick={handlePasswordSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleQuest;
