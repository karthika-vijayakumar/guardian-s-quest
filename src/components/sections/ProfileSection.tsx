import { motion } from "framer-motion";
import { User, Trophy, Award, Edit } from "lucide-react";
import { GameButton } from "@/components/ui/game-button";

interface Badge {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  effect: "shimmer" | "glow";
}

interface ProfileSectionProps {
  userName: string;
  totalMissions: number;
  bestFocusTime: number;
  badges: Badge[];
  onEditProfile?: () => void;
}

const ProfileSection = ({
  userName,
  totalMissions,
  bestFocusTime,
  badges,
  onEditProfile,
}: ProfileSectionProps) => {
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
          {/* Avatar */}
          <motion.div
            className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-4xl">⚔️</span>
          </motion.div>

          {/* Name */}
          <h2 className="text-2xl font-bold text-foreground">{userName}</h2>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/30 rounded-xl p-4">
              <Trophy className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-2xl font-black text-foreground">{totalMissions}</p>
              <p className="text-sm text-muted-foreground">Total Missions</p>
            </div>
            <div className="bg-secondary/30 rounded-xl p-4">
              <Award className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-black text-foreground">{bestFocusTime} min</p>
              <p className="text-sm text-muted-foreground">Best Focus Time</p>
            </div>
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
          <h3 className="text-lg font-bold text-foreground mb-4">Badges</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                className={`
                  flex flex-col items-center p-4 rounded-xl
                  ${badge.unlocked 
                    ? "bg-accent/20 border-2 border-accent/30" 
                    : "bg-muted/30 border-2 border-muted/20 opacity-50"
                  }
                `}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: badge.unlocked ? 1 : 0.5, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={badge.unlocked ? { scale: 1.1 } : {}}
              >
                <motion.span
                  className="text-3xl mb-2"
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
                <span className="text-sm font-semibold text-foreground">
                  {badge.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Edit Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <GameButton
            variant="secondary"
            className="w-full"
            onClick={onEditProfile}
          >
            <Edit className="w-5 h-5" />
            Edit Profile
          </GameButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProfileSection;