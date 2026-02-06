import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Trophy, Award, Edit, X, Check, Target, Flame, Clock, Shield, Zap, Crown } from "lucide-react";
import { GameButton } from "@/components/ui/game-button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface Badge {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  effect: "shimmer" | "glow";
  description: string;
  progress: number;
  requirement: number;
}

interface ProfileSectionProps {
  userName: string;
  totalMissions: number;
  bestFocusTime: number;
  totalFocusTime: number;
  focusStreak: number;
  badges: Badge[];
  onEditProfile?: (name: string) => void;
}

const ProfileSection = ({
  userName,
  totalMissions,
  bestFocusTime,
  totalFocusTime,
  focusStreak,
  badges,
  onEditProfile,
}: ProfileSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userName);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const handleSaveProfile = () => {
    if (editName.trim() && onEditProfile) {
      onEditProfile(editName.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditName(userName);
    setIsEditing(false);
  };

  // Calculate level based on total missions
  const level = Math.floor(totalMissions / 5) + 1;
  const levelProgress = (totalMissions % 5) * 20;

  return (
    <section
      id="profile"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 sky-section"
    >
      <motion.div
        className="w-full max-w-md mx-auto space-y-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ y: -20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <User className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-black text-foreground">
              Guardian Profile
            </h1>
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          className="game-card text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Avatar with Level */}
          <div className="relative inline-block">
            <motion.div
              className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-4xl">⚔️</span>
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground rounded-full w-10 h-10 flex items-center justify-center font-black text-sm border-2 border-background"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              Lv{level}
            </motion.div>
          </div>

          {/* Level Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Level {level}</span>
              <span>Level {level + 1}</span>
            </div>
            <Progress value={levelProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {5 - (totalMissions % 5)} missions to next level
            </p>
          </div>

          {/* Name with Edit */}
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-2 justify-center"
              >
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="max-w-[200px] text-center font-bold"
                  placeholder="Enter your name"
                  autoFocus
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSaveProfile}
                  className="p-2 bg-primary text-primary-foreground rounded-full"
                >
                  <Check className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCancelEdit}
                  className="p-2 bg-muted text-muted-foreground rounded-full"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="display"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-2 justify-center"
              >
                <h2 className="text-2xl font-bold text-foreground">{userName}</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              className="bg-secondary/30 rounded-xl p-4"
              whileHover={{ scale: 1.02 }}
            >
              <Trophy className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-2xl font-black text-foreground">{totalMissions}</p>
              <p className="text-sm text-muted-foreground">Total Missions</p>
            </motion.div>
            <motion.div
              className="bg-secondary/30 rounded-xl p-4"
              whileHover={{ scale: 1.02 }}
            >
              <Award className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-black text-foreground">{bestFocusTime} min</p>
              <p className="text-sm text-muted-foreground">Best Focus Time</p>
            </motion.div>
            <motion.div
              className="bg-secondary/30 rounded-xl p-4"
              whileHover={{ scale: 1.02 }}
            >
              <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-black text-foreground">{focusStreak}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </motion.div>
            <motion.div
              className="bg-secondary/30 rounded-xl p-4"
              whileHover={{ scale: 1.02 }}
            >
              <Clock className="w-6 h-6 text-rest mx-auto mb-2" />
              <p className="text-2xl font-black text-foreground">{totalFocusTime}</p>
              <p className="text-sm text-muted-foreground">Minutes Focused</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          className="game-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">Badges</h3>
            <span className="text-sm text-muted-foreground">
              {badges.filter(b => b.unlocked).length}/{badges.length} Unlocked
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {badges.map((badge, index) => (
              <motion.button
                key={badge.id}
                className={`
                  flex flex-col items-center p-3 rounded-xl transition-all
                  ${badge.unlocked 
                    ? "bg-accent/20 border-2 border-accent/30" 
                    : "bg-muted/30 border-2 border-muted/20"
                  }
                `}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedBadge(badge)}
              >
                <motion.span
                  className={`text-2xl mb-1 ${!badge.unlocked ? "grayscale opacity-50" : ""}`}
                  animate={
                    badge.unlocked && badge.effect === "shimmer"
                      ? { 
                          filter: [
                            "brightness(1)",
                            "brightness(1.5)",
                            "brightness(1)",
                          ],
                        }
                      : badge.unlocked && badge.effect === "glow"
                      ? {
                          filter: [
                            "drop-shadow(0 0 5px gold)",
                            "drop-shadow(0 0 15px gold)",
                            "drop-shadow(0 0 5px gold)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {badge.icon}
                </motion.span>
                <span className="text-xs font-semibold text-foreground text-center leading-tight">
                  {badge.name}
                </span>
                {!badge.unlocked && (
                  <div className="w-full mt-2">
                    <Progress value={(badge.progress / badge.requirement) * 100} className="h-1" />
                    <span className="text-[10px] text-muted-foreground">
                      {badge.progress}/{badge.requirement}
                    </span>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Badge Detail Modal */}
        <AnimatePresence>
          {selectedBadge && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBadge(null)}
            >
              <motion.div
                className="game-card max-w-sm w-full text-center space-y-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.span
                  className={`text-6xl block ${!selectedBadge.unlocked ? "grayscale opacity-50" : ""}`}
                  animate={
                    selectedBadge.unlocked
                      ? {
                          scale: [1, 1.1, 1],
                          filter: selectedBadge.effect === "glow" 
                            ? ["drop-shadow(0 0 10px gold)", "drop-shadow(0 0 20px gold)", "drop-shadow(0 0 10px gold)"]
                            : ["brightness(1)", "brightness(1.3)", "brightness(1)"]
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {selectedBadge.icon}
                </motion.span>
                <h3 className="text-xl font-bold text-foreground">{selectedBadge.name}</h3>
                <p className="text-muted-foreground">{selectedBadge.description}</p>
                
                {!selectedBadge.unlocked && (
                  <div className="space-y-2">
                    <Progress 
                      value={(selectedBadge.progress / selectedBadge.requirement) * 100} 
                      className="h-3" 
                    />
                    <p className="text-sm text-muted-foreground">
                      Progress: {selectedBadge.progress} / {selectedBadge.requirement}
                    </p>
                  </div>
                )}
                
                {selectedBadge.unlocked && (
                  <p className="text-primary font-semibold">✨ Unlocked!</p>
                )}

                <GameButton
                  variant="secondary"
                  onClick={() => setSelectedBadge(null)}
                  className="w-full"
                >
                  Close
                </GameButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default ProfileSection;
