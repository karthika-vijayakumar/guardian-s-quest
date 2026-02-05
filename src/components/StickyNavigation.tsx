import { motion } from "framer-motion";
import { Shield, Home, Swords, Moon, BarChart3, User, Info } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: <Home className="w-4 h-4" /> },
  { id: "mission", label: "Mission", icon: <Swords className="w-4 h-4" /> },
  { id: "rest", label: "Rest", icon: <Moon className="w-4 h-4" /> },
  { id: "progress", label: "Progress", icon: <BarChart3 className="w-4 h-4" /> },
  { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
  { id: "about", label: "About", icon: <Info className="w-4 h-4" /> },
];

interface StickyNavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const StickyNavigation = ({ activeSection, onNavigate }: StickyNavigationProps) => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass-nav"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate("home")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-black text-foreground text-lg hidden sm:block">
              Delay Defender
            </span>
          </motion.div>

          {/* Navigation Items */}
          <div className="flex items-center gap-1 md:gap-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  flex items-center gap-1.5 px-2 md:px-3 py-2 rounded-xl text-sm font-semibold
                  transition-all duration-300
                  ${activeSection === item.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
                <span className="hidden md:block">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default StickyNavigation;