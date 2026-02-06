import { useState, useRef, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GameProvider, useGame, getBadges } from "@/context/GameContext";
import StickyNavigation from "@/components/StickyNavigation";
import HomeSection from "@/components/sections/HomeSection";
import MissionSection from "@/components/sections/MissionSection";
import RestSection from "@/components/sections/RestSection";
import ProgressSection from "@/components/sections/ProgressSection";
import ProfileSection from "@/components/sections/ProfileSection";
import AboutSection from "@/components/sections/AboutSection";

const queryClient = new QueryClient();

const AppContent = () => {
  const { gameState, setTask, setFocusMinutes, startMission, endMission, setUserName, incrementRestPeriods } = useGame();
  const [activeSection, setActiveSection] = useState("home");
  const [missionActive, setMissionActive] = useState(false);
  const [restActive, setRestActive] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [currentMinutes, setCurrentMinutes] = useState(25);
  
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Handle navigation
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    scrollToSection(sectionId);
  };

  // Handle start mission from home
  const handleStartMission = (task: string, minutes: number) => {
    setCurrentTask(task);
    setCurrentMinutes(minutes);
    setTask(task);
    setFocusMinutes(minutes);
    startMission();
    setMissionActive(true);
    setRestActive(false);
    
    setTimeout(() => {
      scrollToSection("mission");
      setActiveSection("mission");
    }, 500);
  };

  // Handle halfway - go to rest
  const handleHalfway = () => {
    setMissionActive(false);
    setRestActive(true);
    
    setTimeout(() => {
      scrollToSection("rest");
      setActiveSection("rest");
    }, 100);
  };

  // Handle rest complete - back to mission
  const handleRestComplete = () => {
    setRestActive(false);
    setMissionActive(true);
    incrementRestPeriods();
    
    setTimeout(() => {
      scrollToSection("mission");
      setActiveSection("mission");
    }, 100);
  };

  // Handle mission complete
  const handleMissionComplete = () => {
    endMission(true);
    setMissionActive(false);
    
    setTimeout(() => {
      scrollToSection("progress");
      setActiveSection("progress");
    }, 2000);
  };

  // Handle end mission early
  const handleEndMission = () => {
    endMission(false);
    setMissionActive(false);
    setRestActive(false);
    
    scrollToSection("progress");
    setActiveSection("progress");
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "mission", "rest", "progress", "profile", "about"];
      const navHeight = 80;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= navHeight + 100 && rect.bottom >= navHeight + 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <StickyNavigation 
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
      />
      
      <main>
        <HomeSection onStartMission={handleStartMission} />
        
        <MissionSection
          isActive={missionActive}
          task={currentTask}
          focusMinutes={currentMinutes}
          onHalfway={handleHalfway}
          onComplete={handleMissionComplete}
          onEnd={handleEndMission}
        />
        
        <RestSection
          isActive={restActive}
          onComplete={handleRestComplete}
        />
        
        <ProgressSection
          completedMissions={gameState.completedMissions}
          totalFocusTime={gameState.totalFocusTime}
          focusStreak={gameState.focusStreak}
          missionHistory={gameState.missionHistory}
        />
        
        <ProfileSection
          userName={gameState.userName}
          totalMissions={gameState.completedMissions}
          bestFocusTime={gameState.bestFocusTime}
          totalFocusTime={gameState.totalFocusTime}
          focusStreak={gameState.focusStreak}
          badges={getBadges(gameState)}
          onEditProfile={setUserName}
        />
        
        <AboutSection
          completedMissions={gameState.completedMissions}
          totalRestPeriods={gameState.totalRestPeriods}
          focusStreak={gameState.focusStreak}
        />
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GameProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </GameProvider>
  </QueryClientProvider>
);

export default App;