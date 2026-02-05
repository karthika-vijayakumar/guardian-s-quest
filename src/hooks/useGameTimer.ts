import { useState, useEffect, useCallback, useRef } from "react";

interface UseGameTimerProps {
  initialMinutes: number;
  onHalfway?: () => void;
  onComplete?: () => void;
  autoStart?: boolean;
}

interface UseGameTimerReturn {
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isRunning: boolean;
  isPaused: boolean;
  progress: number;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

const useGameTimer = ({
  initialMinutes,
  onHalfway,
  onComplete,
  autoStart = false
}: UseGameTimerProps): UseGameTimerReturn => {
  const totalInitialSeconds = initialMinutes * 60;
  const [totalSeconds, setTotalSeconds] = useState(totalInitialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);
  const halfwayTriggered = useRef(false);
  const completeTriggered = useRef(false);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const progress = ((totalInitialSeconds - totalSeconds) / totalInitialSeconds) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && !isPaused && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => {
          const newValue = prev - 1;
          
          // Check halfway point
          if (!halfwayTriggered.current && newValue <= totalInitialSeconds / 2) {
            halfwayTriggered.current = true;
            onHalfway?.();
          }
          
          // Check completion
          if (!completeTriggered.current && newValue <= 0) {
            completeTriggered.current = true;
            onComplete?.();
          }
          
          return Math.max(0, newValue);
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isPaused, totalSeconds, totalInitialSeconds, onHalfway, onComplete]);

  const start = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const reset = useCallback(() => {
    setTotalSeconds(totalInitialSeconds);
    setIsRunning(false);
    setIsPaused(false);
    halfwayTriggered.current = false;
    completeTriggered.current = false;
  }, [totalInitialSeconds]);

  return {
    minutes,
    seconds,
    totalSeconds,
    isRunning,
    isPaused,
    progress,
    start,
    pause,
    resume,
    reset
  };
};

export default useGameTimer;
