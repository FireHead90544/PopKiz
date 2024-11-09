import React, { useState, useEffect } from "react";

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryMatch: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    initializeCards();
  }, []);

  // Initialize cards with pairs
  const initializeCards = () => {
    const contents = ["🎉", "🎂", "🎈", "🎁", "🍰", "🌟"];
    const initialCards = contents
      .concat(contents) // Duplicate for pairs
      .map((content, index) => ({
        id: index,
        content,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5); // Shuffle
    setCards(initialCards);
  };

  const flipCard = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedIndices((prev) => [...prev, index]);

    if (flippedIndices.length === 1) {
      const firstIndex = flippedIndices[0];
      const secondIndex = index;

      if (cards[firstIndex].content === cards[secondIndex].content) {
        // If match, set both as matched
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setFlippedIndices([]);

        // Check if all pairs are matched
        if (newCards.every((card) => card.isMatched)) {
          setIsSolved(true);
        }
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setCards(newCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 to-orange-400 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-semibold text-orange-700 mb-4">
          Memory Match
        </h2>
        <p className="text-gray-700 mb-6">
          Find all the matching pairs!
        </p>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {cards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => flipCard(index)}
              className={`w-20 h-20 flex items-center justify-center bg-pink-300 text-2xl font-bold text-white rounded-md cursor-pointer ${
                card.isFlipped || card.isMatched ? "bg-pink-500" : "bg-pink-300"
              }`}
            >
              {card.isFlipped || card.isMatched ? card.content : ""}
            </div>
          ))}
        </div>
        {isSolved ? (
          <div>
            <div className="text-green-700 font-bold text-lg mb-4">
              Congratulations, you matched them all!
            </div>
            <button
              onClick={onNext}
              className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition"
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MemoryMatch;
