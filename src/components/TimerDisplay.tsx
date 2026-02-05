import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimerDisplayProps {
  minutes: number;
  seconds: number;
  label?: string;
  variant?: "default" | "rest";
  className?: string;
}

const TimerDisplay = ({ 
  minutes, 
  seconds, 
  label = "Time Left", 
  variant = "default",
  className 
}: TimerDisplayProps) => {
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  return (
    <motion.div 
      className={cn("text-center", className)}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <p className={cn(
        "text-sm font-semibold mb-1",
        variant === "rest" ? "text-rest" : "text-muted-foreground"
      )}>
        {label}
      </p>
      <motion.div
        className={cn(
          "text-5xl md:text-6xl font-black tracking-tight",
          variant === "rest" ? "text-rest" : "text-foreground"
        )}
        key={formattedTime}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {formattedTime}
      </motion.div>
    </motion.div>
  );
};

export default TimerDisplay;
