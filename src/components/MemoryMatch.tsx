import React, { useState, useEffect } from "react";
import { BirthdayDataType } from "../App";

interface Card {
  id: number;
  imageSrc: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryMatch: React.FC<{ onNext: () => void; data: BirthdayDataType }> = ({ onNext, data }) => {
  const cardImages = data.memoryMatch.cards;

  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    preloadImages();
    initializeCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const preloadImages = () => {
    cardImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  };

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

      if (cards[firstIndex].imageSrc === cards[secondIndex].imageSrc) {
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setFlippedIndices([]);

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 to-orange-400 p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-semibold text-orange-700 mb-4">
          Memory Match
        </h2>
        <p className="text-gray-700 mb-6">
          Use your smol brain to find all the matching pairs!
        </p>
        <div className="flex justify-center">
          <div className="grid grid-cols-3 gap-4 mb-6 w-full">
            {cards.map((card, index) => (
              <div
                key={card.id}
                onClick={() => flipCard(index)}
                className={`w-full h-24 md:h-32 lg:h-40 flex items-center justify-center bg-pink-300 rounded-md cursor-pointer transition-transform duration-300 ${
                  card.isFlipped || card.isMatched ? "bg-pink-500" : "bg-pink-300"
                }`}
              >
                {card.isFlipped || card.isMatched ? (
                  <img
                    src={card.imageSrc}
                    alt="Memory Match"
                    className="object-cover w-full h-full rounded-md"
                  />
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
        {isSolved ? (
          <div>
            <div className="text-green-700 font-bold text-lg mb-4">
              *yipee yipee*, you matched them all.. lesgooo!
            </div>
            <button
              onClick={onNext}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition"
            >
              Do not click
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MemoryMatch;
