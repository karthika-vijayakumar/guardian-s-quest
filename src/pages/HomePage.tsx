import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Swords, Clock, Sparkles } from "lucide-react";
import { GameButton } from "@/components/ui/game-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGame } from "@/context/GameContext";
import warriorActive from "@/assets/warrior-active.png";

const HomePage = () => {
  const navigate = useNavigate();
  const { setTask, setFocusMinutes, startMission } = useGame();
  const [taskInput, setTaskInput] = useState("");
  const [timeInput, setTimeInput] = useState(25);

  const handleStartMission = () => {
    if (!taskInput.trim()) return;
    setTask(taskInput);
    setFocusMinutes(timeInput);
    startMission();
    navigate("/game");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Floating decorative elements */}
      <motion.div
        className="fixed top-10 left-10 text-4xl opacity-20"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        ⚔️
      </motion.div>
      <motion.div
        className="fixed bottom-20 right-10 text-4xl opacity-20"
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        🛡️
      </motion.div>

      {/* Main content */}
      <motion.div
        className="game-card w-full max-w-md mx-auto text-center space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo and Title */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-black text-foreground">
              Delay Defender
            </h1>
          </div>
          <p className="text-lg text-muted-foreground font-medium">
            Turn your focus into a game.
          </p>
        </motion.div>

        {/* Warrior character */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.img
            src={warriorActive}
            alt="Your Guardian"
            className="w-40 h-40 mx-auto float-animation"
          />
          <motion.div
            className="absolute -top-2 right-1/4"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6 text-accent" />
          </motion.div>
        </motion.div>

        {/* Form */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Task input */}
          <div className="space-y-2 text-left">
            <Label htmlFor="task" className="text-base font-semibold flex items-center gap-2">
              <Swords className="w-4 h-4" />
              Enter your task
            </Label>
            <Input
              id="task"
              type="text"
              placeholder="Study Java / Finish Assignment"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              className="h-14 text-lg rounded-xl bg-secondary/50 border-2 border-transparent focus:border-primary transition-colors"
            />
          </div>

          {/* Time input */}
          <div className="space-y-2 text-left">
            <Label htmlFor="time" className="text-base font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Set focus time (minutes)
            </Label>
            <Input
              id="time"
              type="number"
              min={1}
              max={120}
              value={timeInput}
              onChange={(e) => setTimeInput(Math.max(1, parseInt(e.target.value) || 1))}
              className="h-14 text-lg rounded-xl bg-secondary/50 border-2 border-transparent focus:border-primary transition-colors"
            />
          </div>

          {/* Start button */}
          <GameButton
            size="lg"
            className="w-full"
            onClick={handleStartMission}
            disabled={!taskInput.trim()}
          >
            <Swords className="w-6 h-6" />
            Start Mission
          </GameButton>
        </motion.div>

        {/* Footer tip */}
        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          💡 Your Guardian fights best when you stay focused!
        </motion.p>
      </motion.div>
    </div>
  );
};

export default HomePage;
