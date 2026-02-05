import { createContext, useContext, useState, ReactNode } from "react";

interface GameState {
  task: string;
  focusMinutes: number;
  isInMission: boolean;
  completedMissions: number;
}

interface GameContextType {
  gameState: GameState;
  setTask: (task: string) => void;
  setFocusMinutes: (minutes: number) => void;
  startMission: () => void;
  endMission: () => void;
  resetGame: () => void;
}

const defaultState: GameState = {
  task: "",
  focusMinutes: 25,
  isInMission: false,
  completedMissions: 0
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(defaultState);

  const setTask = (task: string) => {
    setGameState((prev) => ({ ...prev, task }));
  };

  const setFocusMinutes = (minutes: number) => {
    setGameState((prev) => ({ ...prev, focusMinutes: minutes }));
  };

  const startMission = () => {
    setGameState((prev) => ({ ...prev, isInMission: true }));
  };

  const endMission = () => {
    setGameState((prev) => ({
      ...prev,
      isInMission: false,
      completedMissions: prev.completedMissions + 1
    }));
  };

  const resetGame = () => {
    setGameState(defaultState);
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        setTask,
        setFocusMinutes,
        startMission,
        endMission,
        resetGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
