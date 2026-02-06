import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Pause, Play, StopCircle, Trophy } from "lucide-react";
import { GameButton } from "@/components/ui/game-button";
import WarriorCharacter from "@/components/WarriorCharacter";
import TimerDisplay from "@/components/TimerDisplay";
import PowerBar from "@/components/PowerBar";
import StatusMessage from "@/components/StatusMessage";
import MonsterBattle from "@/components/MonsterBattle";
import CloudsBackground from "@/components/CloudsBackground";
import useGameTimer from "@/hooks/useGameTimer";

const statusMessages = [
  "Fighting monsters…",
  "Crushing procrastination!",
  "Guardian is on fire!",
  "Stay focused, warrior!",
  "Enemies are retreating!",
];

interface MissionSectionProps {
  isActive: boolean;
  task: string;
  focusMinutes: number;
  onHalfway: () => void;
  onComplete: () => void;
  onEnd: () => void;
}

const MissionSection = ({
  isActive,
  task,
  focusMinutes,
  onHalfway,
  onComplete,
  onEnd,
}: MissionSectionProps) => {
  const [currentStatus, setCurrentStatus] = useState(statusMessages[0]);
  const [showTiredMessage, setShowTiredMessage] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const statusIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const halfwayTriggeredRef = useRef(false);

  // Reset state when a new mission starts
  useEffect(() => {
    if (isActive && focusMinutes > 0) {
      setShowTiredMessage(false);
      setIsComplete(false);
      halfwayTriggeredRef.current = false;
      setCurrentStatus(statusMessages[0]);
    }
  }, [focusMinutes, isActive]);

  const handleHalfway = () => {
    if (halfwayTriggeredRef.current) return;
    halfwayTriggeredRef.current = true;
    setShowTiredMessage(true);
    setCurrentStatus("Guardian getting tired…");

    if (statusIntervalRef.current) {
      clearInterval(statusIntervalRef.current);
    }

    setTimeout(() => {
      onHalfway();
    }, 3000);
  };

  const handleComplete = () => {
    setIsComplete(true);
    if (statusIntervalRef.current) {
      clearInterval(statusIntervalRef.current);
    }
    onComplete();
  };

  const timer = useGameTimer({
    initialMinutes: focusMinutes || 1,
    onHalfway: handleHalfway,
    onComplete: handleComplete,
    autoStart: isActive,
  });

  const power = 100 - timer.progress;

  // Rotate status messages
  useEffect(() => {
    if (!showTiredMessage && !isComplete && isActive) {
      statusIntervalRef.current = setInterval(() => {
        setCurrentStatus(
          statusMessages[Math.floor(Math.random() * statusMessages.length)]
        );
      }, 4000);
    }

    return () => {
      if (statusIntervalRef.current) clearInterval(statusIntervalRef.current);
    };
  }, [showTiredMessage, isComplete, isActive]);

  // Reset state when mission becomes active again
  useEffect(() => {
    if (isActive && !timer.isRunning) {
      timer.start();
    }
  }, [isActive]);

  const getWarriorState = () => {
    if (showTiredMessage) return "tired";
    return "active";
  };

  const getPowerGlowClass = () => {
    if (power > 80) return "power-glow-high";
    if (power > 40) return "power-glow-medium";
    return "power-glow-low";
  };

  return (
    <section
      id="mission"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 sky-section relative"
    >
      <CloudsBackground />

      <motion.div
        className="glass-card w-full max-w-lg mx-auto text-center space-y-6 relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
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
                <p className="text-foreground font-semibold">Completed: {task}</p>
                <GameButton size="lg" onClick={onEnd} className="w-full">
                  <Swords className="w-5 h-5" />
                  View Progress
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
          {task && (
            <p className="text-muted-foreground font-medium mt-2">{task}</p>
          )}
        </div>

        {/* Battle Arena */}
        <div className="relative">
          <div className={`transition-all duration-500 ${getPowerGlowClass()}`}>
            <WarriorCharacter state={getWarriorState()} />
          </div>
          <MonsterBattle 
            isActive={isActive && !showTiredMessage} 
            isPaused={timer.isPaused}
            power={power}
          />
        </div>

        {/* Tired message */}
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
              Pause Mission
            </GameButton>
          )}
          <GameButton variant="outline" onClick={onEnd}>
            <StopCircle className="w-5 h-5" />
            End Mission
          </GameButton>
        </div>
      </motion.div>
    </section>
  );
};

export default MissionSection;