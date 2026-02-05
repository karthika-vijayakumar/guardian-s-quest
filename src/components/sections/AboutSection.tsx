import { motion } from "framer-motion";
import { Info, Target, Moon, Trophy } from "lucide-react";

const features = [
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    text: "Stay focused",
  },
  {
    icon: <Moon className="w-6 h-6 text-rest" />,
    text: "Take healthy breaks",
  },
  {
    icon: <Trophy className="w-6 h-6 text-accent" />,
    text: "Build good habits",
  },
];

const AboutSection = () => {
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

        {/* Features */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.text}
              className="game-card flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 10 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                {feature.icon}
              </motion.div>
              <span className="text-lg font-semibold text-foreground">
                {feature.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-center text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          Made with 💚 for focused warriors everywhere
        </motion.p>
      </motion.div>
    </section>
  );
};

export default AboutSection;