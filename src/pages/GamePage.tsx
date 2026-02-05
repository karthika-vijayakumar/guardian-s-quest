import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Pause, Play, Trophy } from "lucide-react";
import { GameButton } from "@/components/ui/game-button";
import WarriorCharacter from "@/components/WarriorCharacter";
import TimerDisplay from "@/components/TimerDisplay";
import PowerBar from "@/components/PowerBar";
import StatusMessage from "@/components/StatusMessage";
import { useGame } from "@/context/GameContext";
import useGameTimer from "@/hooks/useGameTimer";

const statusMessages = [
  "Fighting monsters…",
  "Crushing procrastination!",
  "Guardian is on fire!",
  "Stay focused, warrior!",
  "Enemies are retreating!"
];

const GamePage = () => {
  const navigate = useNavigate();
  const { gameState, endMission } = useGame();
  const [currentStatus, setCurrentStatus] = useState(statusMessages[0]);
  const [showTiredMessage, setShowTiredMessage] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const statusIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Redirect if no task set
  useEffect(() => {
    if (!gameState.task) {
      navigate("/");
    }
  }, [gameState.task, navigate]);

  const handleHalfway = () => {
    setShowTiredMessage(true);
    setCurrentStatus("Guardian getting tired…");
    
    // Clear status rotation
    if (statusIntervalRef.current) {
      clearInterval(statusIntervalRef.current);
    }
    
    // Redirect after 3 seconds
    redirectTimeoutRef.current = setTimeout(() => {
      navigate("/rest");
    }, 3000);
  };

  const handleComplete = () => {
    setIsComplete(true);
    endMission();
    if (statusIntervalRef.current) {
      clearInterval(statusIntervalRef.current);
    }
  };

  const timer = useGameTimer({
    initialMinutes: gameState.focusMinutes || 1,
    onHalfway: handleHalfway,
    onComplete: handleComplete,
    autoStart: true
  });

  // Calculate power based on time progress
  const power = 100 - timer.progress;

  // Rotate status messages
  useEffect(() => {
    if (!showTiredMessage && !isComplete) {
      statusIntervalRef.current = setInterval(() => {
        setCurrentStatus(statusMessages[Math.floor(Math.random() * statusMessages.length)]);
      }, 4000);
    }

    return () => {
      if (statusIntervalRef.current) clearInterval(statusIntervalRef.current);
      if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
    };
  }, [showTiredMessage, isComplete]);

  const getWarriorState = () => {
    if (showTiredMessage) return "tired";
    return "active";
  };

  if (!gameState.task) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <motion.div
        className="game-card w-full max-w-md mx-auto text-center space-y-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Mission Complete overlay */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="game-card text-center space-y-6 mx-4"
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.4 }}
                >
                  <Trophy className="w-20 h-20 mx-auto text-accent" />
                </motion.div>
                <h2 className="text-3xl font-black text-foreground">
                  Mission Successful!
                </h2>
                <p className="text-lg text-muted-foreground">
                  You defeated Procrastination! 🎉
                </p>
                <p className="text-foreground font-semibold">
                  Completed: {gameState.task}
                </p>
                <GameButton
                  size="lg"
                  onClick={() => navigate("/")}
                  className="w-full"
                >
                  <Swords className="w-5 h-5" />
                  New Mission
                </GameButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div>
          <motion.h1
            className="text-2xl md:text-3xl font-black text-foreground flex items-center justify-center gap-2"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
          >
            <Swords className="w-7 h-7 text-primary" />
            Mission in Progress
          </motion.h1>
          <p className="text-muted-foreground font-medium mt-2">
            {gameState.task}
          </p>
        </div>

        {/* Warrior character */}
        <WarriorCharacter state={getWarriorState()} />

        {/* Tired message overlay */}
        <AnimatePresence>
          {showTiredMessage && !isComplete && (
            <motion.div
              className="bg-power-low/20 rounded-xl p-4 border-2 border-power-low"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-power-low font-bold text-lg">
                😓 Your Guardian is tired.
              </p>
              <p className="text-muted-foreground">
                Redirecting to Rest Mode…
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timer */}
        <TimerDisplay
          minutes={timer.minutes}
          seconds={timer.seconds}
          label="Time Left"
        />

        {/* Power bar */}
        <PowerBar power={power} />

        {/* Status message */}
        <StatusMessage
          message={currentStatus}
          variant={showTiredMessage ? "warning" : "default"}
        />

        {/* Controls */}
        <div className="flex gap-4 justify-center">
          {timer.isPaused ? (
            <GameButton variant="secondary" onClick={timer.resume}>
              <Play className="w-5 h-5" />
              Resume
            </GameButton>
          ) : (
            <GameButton variant="secondary" onClick={timer.pause}>
              <Pause className="w-5 h-5" />
              Pause
            </GameButton>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default GamePage;
