import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Battery, Sparkles } from "lucide-react";
import WarriorCharacter from "@/components/WarriorCharacter";
import TimerDisplay from "@/components/TimerDisplay";
import StatusMessage from "@/components/StatusMessage";
import StarsBackground from "@/components/StarsBackground";
import useGameTimer from "@/hooks/useGameTimer";

interface RestSectionProps {
  isActive: boolean;
  onComplete: () => void;
}

const RestSection = ({ isActive, onComplete }: RestSectionProps) => {
  const [showRecharged, setShowRecharged] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0.2);

  const handleRestComplete = () => {
    setShowRecharged(true);
    setTimeout(() => {
      onComplete();
      setShowRecharged(false);
    }, 2000);
  };

  const timer = useGameTimer({
    initialMinutes: 5,
    onComplete: handleRestComplete,
    autoStart: isActive,
  });

  // Increase glow as time progresses
  useEffect(() => {
    if (isActive) {
      const newIntensity = 0.2 + (timer.progress / 100) * 0.8;
      setGlowIntensity(newIntensity);
    }
  }, [timer.progress, isActive]);

  // Reset and start timer when section becomes active
  useEffect(() => {
    if (isActive && !timer.isRunning) {
      timer.reset();
      timer.start();
    }
  }, [isActive]);

  return (
    <section
      id="rest"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 rest-background relative"
    >
      <StarsBackground />

      {/* Floating Zzz bubbles */}
      {isActive && (
        <>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl text-rest-foreground/60 pointer-events-none"
              style={{
                left: `${45 + (i % 2) * 10}%`,
                top: `${35 + i * 8}%`,
              }}
              animate={{
                y: [-10, -30, -10],
                x: [0, 10, 0],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              💤
            </motion.div>
          ))}
        </>
      )}

      <motion.div
        className="game-card w-full max-w-md mx-auto text-center space-y-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
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
                {/* Sparkle burst effect */}
                <div className="relative">
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Battery className="w-16 h-16 mx-auto text-primary" />
                  </motion.div>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2"
                      initial={{ scale: 0, x: 0, y: 0 }}
                      animate={{
                        scale: [0, 1, 0],
                        x: Math.cos((i * Math.PI) / 4) * 50,
                        y: Math.sin((i * Math.PI) / 4) * 50,
                      }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}
                    >
                      <Sparkles className="w-4 h-4 text-accent" />
                    </motion.div>
                  ))}
                </div>
                <h2 className="text-2xl font-black text-foreground">
                  Guardian Recharged! ⚡
                </h2>
                <p className="text-muted-foreground">Returning to battle…</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          initial={{ y: -20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
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

        {/* Resting warrior with growing glow */}
        <div className="relative py-4">
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{
              boxShadow: `0 0 ${60 * glowIntensity}px ${40 * glowIntensity}px hsl(270 60% 70% / ${glowIntensity})`,
            }}
            style={{
              borderRadius: "50%",
              width: "200px",
              height: "200px",
              margin: "auto",
            }}
          />
          <WarriorCharacter state="resting" />

          {/* Floating sparkles */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{
                top: `${20 + i * 15}%`,
                left: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <Sparkles className="w-5 h-5 text-rest" />
            </motion.div>
          ))}
        </div>

        {/* Rest message */}
        <motion.div
          className="bg-rest/10 rounded-2xl p-6 border-2 border-rest/30"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-lg text-foreground font-medium">
            📱 Place your phone down and let your Guardian recharge.
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
        <StatusMessage message="Recharging energy…" variant="rest" />

        {/* Zen tip */}
        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          💆 Take a deep breath. Stretch. Look away from the screen.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default RestSection;