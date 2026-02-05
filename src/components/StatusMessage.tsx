import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatusMessageProps {
  message: string;
  variant?: "default" | "warning" | "rest" | "success";
  className?: string;
}

const StatusMessage = ({ message, variant = "default", className }: StatusMessageProps) => {
  const variantStyles = {
    default: "text-foreground/80",
    warning: "text-power-low",
    rest: "text-rest",
    success: "text-primary"
  };

  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={message}
        className={cn(
          "text-lg md:text-xl font-semibold text-center",
          variantStyles[variant],
          className
        )}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {message}
      </motion.p>
    </AnimatePresence>
  );
};

export default StatusMessage;
