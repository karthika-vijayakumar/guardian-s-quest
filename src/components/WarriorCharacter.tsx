import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import warriorActive from "@/assets/warrior-active.png";
import warriorResting from "@/assets/warrior-resting.png";

interface WarriorCharacterProps {
  state: "active" | "resting" | "tired";
  className?: string;
}

const WarriorCharacter = ({ state, className }: WarriorCharacterProps) => {
  const isResting = state === "resting";
  const isTired = state === "tired";
  
  return (
    <motion.div
      className={cn(
        "relative flex items-center justify-center",
        isResting && "rest-glow rounded-full p-4",
        className
      )}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: isTired ? 0.7 : 1,
        y: isResting ? 0 : undefined
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Glow effect for resting state */}
      {isResting && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(270 60% 70% / 0.3) 0%, transparent 70%)"
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Warrior image */}
      <motion.img
        src={isResting ? warriorResting : warriorActive}
        alt={isResting ? "Warrior resting" : "Warrior in battle"}
        className={cn(
          "w-48 h-48 md:w-64 md:h-64 object-contain relative z-10",
          !isResting && "float-animation"
        )}
        animate={isTired ? {
          rotate: [-2, 2, -2],
          y: [0, 2, 0]
        } : {}}
        transition={{
          duration: 2,
          repeat: isTired ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
      
      {/* Status indicator */}
      {isTired && (
        <motion.div
          className="absolute -top-2 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-2xl">😓</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WarriorCharacter;
