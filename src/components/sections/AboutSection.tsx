import { motion } from "framer-motion";
import { Info, Target, Moon, Trophy, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AboutSectionProps {
  completedMissions: number;
  totalRestPeriods: number;
  focusStreak: number;
}

const AboutSection = ({ 
  completedMissions = 0, 
  totalRestPeriods = 0, 
  focusStreak = 0 
}: AboutSectionProps) => {
  // Calculate dynamic feature progress
  const features = [
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      text: "Stay focused",
      description: "Complete focus missions to build concentration",
      progress: completedMissions,
      target: 10,
      unit: "missions",
      color: "primary",
    },
    {
      icon: <Moon className="w-6 h-6 text-rest" />,
      text: "Take healthy breaks",
      description: "Rest periods help your mind recharge",
      progress: totalRestPeriods,
      target: 5,
      unit: "breaks",
      color: "rest",
    },
    {
      icon: <Trophy className="w-6 h-6 text-accent" />,
      text: "Build good habits",
      description: "Maintain your focus streak daily",
      progress: focusStreak,
      target: 7,
      unit: "day streak",
      color: "accent",
    },
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 sky-section"
    >
      <motion.div
        className="w-full max-w-lg mx-auto space-y-8"
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
            <Info className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-black text-foreground">
              About Delay Defender
            </h1>
          </div>
        </motion.div>

        {/* Description Card */}
        <motion.div
          className="game-card text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-foreground leading-relaxed">
            <strong>Delay Defender</strong> is a gamified productivity app where
            a cartoon Guardian helps you stay focused, fights distractions, and
            encourages healthy breaks through a built-in rest cycle.
          </p>

          {/* Warrior illustration */}
          <motion.div
            className="text-6xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🛡️⚔️
          </motion.div>
        </motion.div>

        {/* Dynamic Features Progress */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-bold text-foreground text-center mb-4">
            Your Progress
          </h3>
          
          {features.map((feature, index) => {
            const progressPercent = Math.min((feature.progress / feature.target) * 100, 100);
            const isComplete = feature.progress >= feature.target;
            
            return (
              <motion.div
                key={feature.text}
                className="game-card space-y-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    className={isComplete ? "relative" : ""}
                  >
                    {feature.icon}
                    {isComplete && (
                      <motion.div
                        className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-0.5"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        <Check className="w-3 h-3" />
                      </motion.div>
                    )}
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-lg font-semibold text-foreground">
                        {feature.text}
                      </span>
                      <span className={`text-sm font-medium ${isComplete ? "text-primary" : "text-muted-foreground"}`}>
                        {feature.progress}/{feature.target} {feature.unit}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {feature.description}
                    </p>
                    <div className="relative">
                      <Progress 
                        value={progressPercent} 
                        className={`h-2 ${isComplete ? "animate-pulse" : ""}`}
                      />
                      {isComplete && (
                        <motion.span
                          className="absolute right-0 -top-6 text-xs font-medium text-primary"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          ✨ Goal achieved!
                        </motion.span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Tips Section */}
        <motion.div
          className="game-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-bold text-foreground mb-3">Quick Tips</h3>
          <ul className="space-y-2 text-muted-foreground">
            <motion.li 
              className="flex items-start gap-2"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-primary">💡</span>
              Start with shorter focus times and gradually increase
            </motion.li>
            <motion.li 
              className="flex items-start gap-2"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <span className="text-primary">💡</span>
              Take all rest breaks - they boost your productivity
            </motion.li>
            <motion.li 
              className="flex items-start gap-2"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <span className="text-primary">💡</span>
              Check your badges to track achievements
            </motion.li>
          </ul>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-center text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
        >
          Made with 💚 for focused warriors everywhere
        </motion.p>
      </motion.div>
    </section>
  );
};

export default AboutSection;
