import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Battery, Sparkles } from "lucide-react";
import WarriorCharacter from "@/components/WarriorCharacter";
import TimerDisplay from "@/components/TimerDisplay";
import StatusMessage from "@/components/StatusMessage";
import { useGame } from "@/context/GameContext";
import useGameTimer from "@/hooks/useGameTimer";

const RestPage = () => {
  const navigate = useNavigate();
  const { gameState } = useGame();
  const [showRecharged, setShowRecharged] = useState(false);

  // Redirect if no task set
  useEffect(() => {
    if (!gameState.task) {
      navigate("/");
    }
  }, [gameState.task, navigate]);

  const handleRestComplete = () => {
    setShowRecharged(true);
    setTimeout(() => {
      navigate("/game");
    }, 2000);
  };

  const timer = useGameTimer({
    initialMinutes: 5, // 5 minute rest
    onComplete: handleRestComplete,
    autoStart: true
  });

  if (!gameState.task) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 rest-background">
      {/* Floating stars */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed text-2xl pointer-events-none"
          style={{
            top: `${15 + (i * 15)}%`,
            left: `${10 + (i % 3) * 35}%`
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3
          }}
        >
          ✨
        </motion.div>
      ))}

      <motion.div
        className="game-card w-full max-w-md mx-auto text-center space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Recharged popup */}
        <AnimatePresence>
          {showRecharged && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="game-card text-center space-y-4 mx-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Battery className="w-16 h-16 mx-auto text-primary" />
                </motion.div>
                <h2 className="text-2xl font-black text-foreground">
                  Guardian Recharged! ⚡
                </h2>
                <p className="text-muted-foreground">
                  Returning to battle…
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-center gap-2">
            <Moon className="w-8 h-8 text-rest" />
            <h1 className="text-3xl md:text-4xl font-black text-foreground">
              Rest Mode
            </h1>
          </div>
          <p className="text-muted-foreground font-medium">
            Your Guardian needs to recharge
          </p>
        </motion.div>

        {/* Resting warrior with glow */}
        <div className="relative py-4">
          <WarriorCharacter state="resting" />
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${30 + (i % 2) * 40}%`
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              >
                <Sparkles className="w-5 h-5 text-rest" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Rest message */}
        <motion.div
          className="bg-rest/10 rounded-2xl p-6 border-2 border-rest/30"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-lg text-foreground font-medium">
            📱 Keep your phone down and let your Guardian recharge.
          </p>
        </motion.div>

        {/* Timer */}
        <TimerDisplay
          minutes={timer.minutes}
          seconds={timer.seconds}
          label="Rest Time Remaining"
          variant="rest"
        />

        {/* Status */}
        <StatusMessage
          message="Recharging energy…"
          variant="rest"
        />

        {/* Zen tip */}
        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          💆 Take a deep breath. Stretch. Look away from the screen.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default RestPage;
