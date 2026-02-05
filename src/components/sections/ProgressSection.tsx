import { motion } from "framer-motion";
import { BarChart3, Star, Flame, Clock, CheckCircle, XCircle } from "lucide-react";

interface Mission {
  id: string;
  task: string;
  duration: number;
  completed: boolean;
}

interface ProgressSectionProps {
  completedMissions: number;
  totalFocusTime: number;
  focusStreak: number;
  missionHistory: Mission[];
}

const ProgressSection = ({
  completedMissions,
  totalFocusTime,
  focusStreak,
  missionHistory,
}: ProgressSectionProps) => {
  const stats = [
    {
      icon: <Star className="w-8 h-8 text-accent" />,
      label: "Missions Completed",
      value: completedMissions,
      color: "from-accent/20 to-accent/5",
    },
    {
      icon: <Flame className="w-8 h-8 text-progress" />,
      label: "Focus Streak",
      value: `${focusStreak} days`,
      color: "from-progress/20 to-progress/5",
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      label: "Total Focus Time",
      value: `${totalFocusTime} min`,
      color: "from-primary/20 to-primary/5",
    },
  ];

  return (
    <section
      id="progress"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 progress-section"
    >
      <motion.div
        className="w-full max-w-2xl mx-auto space-y-8"
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
            <BarChart3 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-black text-foreground">
              Your Progress
            </h1>
          </div>
          <p className="text-muted-foreground">Track your focus journey</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`game-card text-center bg-gradient-to-br ${stat.color}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                className="mb-3"
              >
                {stat.icon}
              </motion.div>
              <motion.p
                className="text-3xl font-black text-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mission History */}
        <motion.div
          className="game-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-foreground mb-4">
            Mission History
          </h2>
          <div className="space-y-3">
            {missionHistory.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No missions completed yet. Start your first mission!
              </p>
            ) : (
              missionHistory.map((mission, index) => (
                <motion.div
                  key={mission.id}
                  className={`flex items-center justify-between p-4 rounded-xl ${
                    mission.completed
                      ? "bg-primary/10 border border-primary/20"
                      : "bg-destructive/10 border border-destructive/20"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    {mission.completed ? (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive" />
                    )}
                    <span className="font-semibold text-foreground">
                      {mission.task}
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    {mission.duration} min
                  </span>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProgressSection;