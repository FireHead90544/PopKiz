import React, { useState } from "react";
import BirthdayCountdown from "./components/BirthdayCountdown";
import WelcomeScreen from "./components/WelcomeScreen";
import PuzzleQuest from "./components/PuzzleQuest";
import MemoryLane from "./components/MemoryLane";
import MemoryMatch from "./components/MemoryMatch";
import TriviaFun from "./components/TriviaFun";
import VirtualGiftBox from "./components/VirtualGiftBox";
import BirthdayMessage from "./components/BirthdayMessage";
import birthdayData from "./content.json";

export type BirthdayDataType = typeof birthdayData;

const App: React.FC = () => {
  const stages: Record<number, React.ComponentType<{ onNext: () => void, data: BirthdayDataType }>> = {
    1: BirthdayCountdown,
    2: WelcomeScreen,
    3: PuzzleQuest,
    4: MemoryLane,
    5: MemoryMatch,
    6: TriviaFun,
    7: VirtualGiftBox,
    8: BirthdayMessage
  }
  const [stage, setStage] = useState(1);
  const CurrentStage = stages[stage];

  const goToNextStage = () => setStage(stage + 1);

  return (
    <div className="App select-none">
      <CurrentStage onNext={goToNextStage} data={birthdayData} />
      {/* {stage < 8 && (
        <button
          onClick={goToNextStage}
          className="fixed bottom-10 right-10 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
        >
          Next
        </button>
      )} */}
    </div>
  );
};

export default App;
