import { createContext, useContext, useState, ReactNode } from "react";

interface Mission {
  id: string;
  task: string;
  duration: number;
  completed: boolean;
}

interface GameState {
  task: string;
  focusMinutes: number;
  isInMission: boolean;
  completedMissions: number;
  totalFocusTime: number;
  focusStreak: number;
  missionHistory: Mission[];
  userName: string;
  bestFocusTime: number;
}

interface GameContextType {
  gameState: GameState;
  setTask: (task: string) => void;
  setFocusMinutes: (minutes: number) => void;
  startMission: () => void;
  endMission: (completed?: boolean) => void;
  resetGame: () => void;
  setUserName: (name: string) => void;
}

const defaultState: GameState = {
  task: "",
  focusMinutes: 25,
  isInMission: false,
  completedMissions: 3,
  totalFocusTime: 75,
  focusStreak: 2,
  missionHistory: [
    { id: "1", task: "Study Java", duration: 25, completed: true },
    { id: "2", task: "Math Homework", duration: 30, completed: true },
    { id: "3", task: "Coding Practice", duration: 20, completed: false },
  ],
  userName: "Warrior",
  bestFocusTime: 30,
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

  const endMission = (completed: boolean = true) => {
    setGameState((prev) => {
      const newMission: Mission = {
        id: Date.now().toString(),
        task: prev.task,
        duration: prev.focusMinutes,
        completed,
      };

      return {
        ...prev,
        isInMission: false,
        completedMissions: completed ? prev.completedMissions + 1 : prev.completedMissions,
        totalFocusTime: completed ? prev.totalFocusTime + prev.focusMinutes : prev.totalFocusTime,
        focusStreak: completed ? prev.focusStreak : prev.focusStreak,
        missionHistory: [newMission, ...prev.missionHistory].slice(0, 10),
        bestFocusTime: completed && prev.focusMinutes > prev.bestFocusTime 
          ? prev.focusMinutes 
          : prev.bestFocusTime,
        task: "",
      };
    });
  };

  const resetGame = () => {
    setGameState(defaultState);
  };

  const setUserName = (name: string) => {
    setGameState((prev) => ({ ...prev, userName: name }));
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        setTask,
        setFocusMinutes,
        startMission,
        endMission,
        resetGame,
        setUserName,
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