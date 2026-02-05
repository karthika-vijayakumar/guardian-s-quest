import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Swords, Clock, Sparkles } from "lucide-react";
import { GameButton } from "@/components/ui/game-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CloudsBackground from "@/components/CloudsBackground";
import warriorActive from "@/assets/warrior-active.png";

interface HomeSectionProps {
  onStartMission: (task: string, minutes: number) => void;
}

const HomeSection = ({ onStartMission }: HomeSectionProps) => {
  const [taskInput, setTaskInput] = useState("");
  const [timeInput, setTimeInput] = useState(25);
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    if (!taskInput.trim()) return;
    setIsStarting(true);
    setTimeout(() => {
      onStartMission(taskInput, timeInput);
      setIsStarting(false);
    }, 500);
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 sky-section relative"
    >
      <CloudsBackground />

      <motion.div
        className="game-card w-full max-w-md mx-auto text-center space-y-8 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo and Title */}
        <motion.div
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
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
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.img
            src={warriorActive}
            alt="Your Guardian"
            className={`w-40 h-40 mx-auto ${isStarting ? "animate-battle-stance" : "float-animation"}`}
          />
          {/* Sparkles near sword */}
          <motion.div
            className="absolute top-4 right-1/4"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6 text-accent" />
          </motion.div>
          <motion.div
            className="absolute bottom-8 left-1/4"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          >
            <Sparkles className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>

        {/* Form */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
            className="w-full group"
            onClick={handleStart}
            disabled={!taskInput.trim() || isStarting}
          >
            <Swords className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            {isStarting ? "Preparing..." : "Start Mission"}
          </GameButton>
        </motion.div>

        {/* Footer tip */}
        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          💡 Your Guardian fights best when you stay focused!
        </motion.p>
      </motion.div>
    </section>
  );
};

export default HomeSection;