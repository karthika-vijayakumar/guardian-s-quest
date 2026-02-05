import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Monster {
  id: number;
  type: "blob" | "ghost" | "skull";
  isDefeated: boolean;
}

interface MonsterBattleProps {
  isActive: boolean;
  isPaused: boolean;
  power: number;
}

const MonsterBattle = ({ isActive, isPaused, power }: MonsterBattleProps) => {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [slashEffects, setSlashEffects] = useState<{ id: number; x: number; y: number }[]>([]);
  const [poofEffects, setPoofEffects] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isSwinging, setIsSwinging] = useState(false);

  // Spawn monsters periodically
  useEffect(() => {
    if (!isActive || isPaused) return;

    const spawnInterval = setInterval(() => {
      const newMonster: Monster = {
        id: Date.now(),
        type: ["blob", "ghost", "skull"][Math.floor(Math.random() * 3)] as Monster["type"],
        isDefeated: false,
      };
      setMonsters((prev) => [...prev.slice(-2), newMonster]); // Keep max 3 monsters
    }, 3000);

    return () => clearInterval(spawnInterval);
  }, [isActive, isPaused]);

  // Attack animation every 2-3 seconds
  useEffect(() => {
    if (!isActive || isPaused) return;

    const attackInterval = setInterval(() => {
      setIsSwinging(true);
      
      // Create slash effect
      const slashId = Date.now();
      setSlashEffects((prev) => [...prev, { id: slashId, x: 50, y: 30 }]);
      
      // Remove slash after animation
      setTimeout(() => {
        setSlashEffects((prev) => prev.filter((s) => s.id !== slashId));
      }, 300);

      // Defeat a monster
      setMonsters((prev) => {
        const activeMonsters = prev.filter((m) => !m.isDefeated);
        if (activeMonsters.length > 0) {
          const targetId = activeMonsters[0].id;
          
          // Create poof effect
          const poofId = Date.now() + 1;
          setPoofEffects((p) => [...p, { id: poofId, x: 70, y: 40 }]);
          setTimeout(() => {
            setPoofEffects((p) => p.filter((e) => e.id !== poofId));
          }, 400);

          return prev.map((m) =>
            m.id === targetId ? { ...m, isDefeated: true } : m
          );
        }
        return prev;
      });

      setTimeout(() => setIsSwinging(false), 400);
    }, power > 50 ? 2500 : 3500); // Slower attacks when tired

    return () => clearInterval(attackInterval);
  }, [isActive, isPaused, power]);

  // Clean up defeated monsters
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      setMonsters((prev) => prev.filter((m) => !m.isDefeated));
    }, 1000);

    return () => clearInterval(cleanupInterval);
  }, []);

  const getMonsterEmoji = (type: Monster["type"]) => {
    switch (type) {
      case "blob": return "👾";
      case "ghost": return "👻";
      case "skull": return "💀";
    }
  };

  const speedMultiplier = power > 50 ? 1 : 0.7;

  return (
    <div className="relative w-full h-40 overflow-hidden">
      {/* Slash Effects */}
      <AnimatePresence>
        {slashEffects.map((slash) => (
          <motion.div
            key={slash.id}
            className="absolute text-4xl pointer-events-none"
            style={{ left: `${slash.x}%`, top: `${slash.y}%` }}
            initial={{ opacity: 1, scale: 0.5, rotate: -30 }}
            animate={{ opacity: 0, scale: 1.5, rotate: -30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            ⚔️
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Poof Effects */}
      <AnimatePresence>
        {poofEffects.map((poof) => (
          <motion.div
            key={poof.id}
            className="absolute text-3xl pointer-events-none"
            style={{ left: `${poof.x}%`, top: `${poof.y}%` }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            💨
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Monsters */}
      <AnimatePresence>
        {monsters.map((monster, index) => (
          <motion.div
            key={monster.id}
            className={`absolute text-4xl ${monster.isDefeated ? "opacity-0" : ""}`}
            style={{ 
              right: `${10 + index * 15}%`, 
              top: `${30 + index * 10}%` 
            }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ 
              x: monster.isDefeated ? -50 : 0, 
              opacity: monster.isDefeated ? 0 : 1,
              y: [0, -5, 0, 5, 0],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: monster.isDefeated ? 0.3 : 0.5,
              y: {
                duration: 2 / speedMultiplier,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }}
          >
            {getMonsterEmoji(monster.type)}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Warrior Sword Animation Overlay */}
      {isSwinging && (
        <motion.div
          className="absolute left-1/4 top-1/3 text-3xl"
          initial={{ rotate: 0 }}
          animate={{ rotate: -45 }}
          transition={{ duration: 0.15 }}
        >
          🗡️
        </motion.div>
      )}
    </div>
  );
};

export default MonsterBattle;