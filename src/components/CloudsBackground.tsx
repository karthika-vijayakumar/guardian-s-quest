import { motion } from "framer-motion";

const CloudsBackground = () => {
  const clouds = [
    { size: "w-32 h-16", top: "10%", duration: 60, delay: 0 },
    { size: "w-40 h-20", top: "25%", duration: 80, delay: 10 },
    { size: "w-24 h-12", top: "15%", duration: 50, delay: 25 },
    { size: "w-36 h-18", top: "35%", duration: 70, delay: 40 },
    { size: "w-28 h-14", top: "5%", duration: 55, delay: 15 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {clouds.map((cloud, index) => (
        <motion.div
          key={index}
          className={`absolute ${cloud.size} opacity-40`}
          style={{ top: cloud.top }}
          initial={{ x: "-100%" }}
          animate={{ x: "100vw" }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            delay: cloud.delay,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 200 100" className="w-full h-full fill-white">
            <ellipse cx="60" cy="60" rx="50" ry="30" />
            <ellipse cx="100" cy="50" rx="60" ry="40" />
            <ellipse cx="150" cy="60" rx="45" ry="28" />
            <ellipse cx="80" cy="70" rx="40" ry="25" />
            <ellipse cx="130" cy="68" rx="35" ry="22" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default CloudsBackground;