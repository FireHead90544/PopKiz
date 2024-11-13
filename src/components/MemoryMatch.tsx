import React, { useState, useEffect } from "react";
import { BirthdayDataType } from "../App";

interface Card {
  id: number;
  imageSrc: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryMatch: React.FC<{ onNext: () => void; data: BirthdayDataType }> = ({
  onNext,
  data,
}) => {
  const cardImages = data.memoryMatch.cards;

  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isSolved, setIsSolved] = useState(false);

  // Preload images and initialize cards on component mount
  useEffect(() => {
    preloadImages();
    initializeCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Preload images for smoother gameplay
  const preloadImages = () => {
    cardImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  };

  // Initialize cards with flipped and matched states
  const initializeCards = () => {
    const initialCards = cardImages
      .concat(cardImages)
      .map((imageSrc, index) => ({
        id: index,
        imageSrc,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);
    setCards(initialCards);
  };

  // Handle card flip logic
  const flipCard = (index: number) => {
    if (
      flippedIndices.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedIndices((prev) => [...prev, index]);

    // Check for match if two cards are flipped
    if (flippedIndices.length === 1) {
      const firstIndex = flippedIndices[0];
      const secondIndex = index;

      if (cards[firstIndex].imageSrc === cards[secondIndex].imageSrc) {
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setFlippedIndices([]);

        // Check if all cards are matched
        if (newCards.every((card) => card.isMatched)) {
          setIsSolved(true);
        }
      } else {
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 p-4">
      <div className="max-w-lg w-full bg-white bg-opacity-90 rounded-2xl shadow-2xl p-6 text-center border-4 border-purple-300">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
          Memory Match
        </h2>
        <p className="text-gray-700 font-medium mb-6">
          Use your brain to find all the matching pairs!
        </p>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {cards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => flipCard(index)}
              className={`w-full h-24 md:h-32 lg:h-36 flex items-center justify-center rounded-lg cursor-pointer transition-transform duration-300 ${
                card.isFlipped || card.isMatched
                  ? "bg-purple-500 transform scale-105"
                  : "bg-pink-300 hover:scale-105"
              } shadow-lg`}
            >
              {card.isFlipped || card.isMatched ? (
                <img
                  src={card.imageSrc}
                  alt="Memory Match"
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-pink-300 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">?</span>
                </div>
              )}
            </div>
          ))}
        </div>
        {isSolved && (
          <div>
            <div className="text-green-600 font-bold text-lg mb-4 animate-bounce">
              *yipee yipee*, you matched them all.. lesgooo!
            </div>
            <button
              onClick={onNext}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
            >
              Do not click
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryMatch;
