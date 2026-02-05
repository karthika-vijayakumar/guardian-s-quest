import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PowerBarProps {
  power: number;
  maxPower?: number;
  label?: string;
  className?: string;
}

const PowerBar = ({ power, maxPower = 100, label = "Guardian Power", className }: PowerBarProps) => {
  const percentage = Math.max(0, Math.min(100, (power / maxPower) * 100));
  
  const getColorClass = () => {
    if (percentage > 60) return "bg-power";
    if (percentage > 30) return "bg-power-low";
    return "bg-power-critical";
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-foreground/80">{label}</span>
        <span className="text-sm font-bold text-foreground">{Math.round(percentage)}%</span>
      </div>
      <div className="power-bar bg-muted">
        <motion.div
          className={cn("h-full rounded-full", getColorClass())}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default PowerBar;
