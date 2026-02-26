import { useState, useEffect, useCallback } from "react";
import { HomePage } from "./HomePage";
import { ShipCalculator } from "./ShipCalculator";
import { PlaneCalculator } from "./PlaneCalculator";
import { CompareCalculator } from "./CompareCalculator";
import { MultiPackageCalculator } from "./MultiPackageCalculator";
import { SettingsPage } from "./SettingsPage";
import { HistoryPage } from "./HistoryPage";
import { ModeTransition } from "./ModeTransition";

type Mode = "home" | "ship" | "plane" | "compare" | "multi" | "settings" | "history";
type TransitionMode = "ship" | "plane" | "compare" | "multi";

const transitionModes: TransitionMode[] = ["ship", "plane", "compare", "multi"];

export const FreightCalculator = () => {
  const [mode, setMode] = useState<Mode>("home");
  const [isDark, setIsDark] = useState(true);
  const [transitioning, setTransitioning] = useState<TransitionMode | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  const goHome = () => setMode("home");

  const handleSelectMode = useCallback((m: Mode) => {
    if (transitionModes.includes(m as TransitionMode)) {
      setTransitioning(m as TransitionMode);
    } else {
      setMode(m);
    }
  }, []);

  const handleTransitionComplete = useCallback(() => {
    if (transitioning) {
      setMode(transitioning);
      setTransitioning(null);
    }
  }, [transitioning]);

  if (transitioning) {
    return <ModeTransition mode={transitioning} onComplete={handleTransitionComplete} />;
  }

  switch (mode) {
    case "ship":
      return (
        <ShipCalculator
          onBack={goHome}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
      );
    case "plane":
      return (
        <PlaneCalculator
          onBack={goHome}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
      );
    case "compare":
      return (
        <CompareCalculator
          onBack={goHome}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
      );
    case "multi":
      return (
        <MultiPackageCalculator
          onBack={goHome}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
      );
    case "settings":
      return (
        <SettingsPage
          onBack={goHome}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
      );
    case "history":
      return (
        <HistoryPage
          onBack={goHome}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
      );
    default:
      return (
        <HomePage
          onSelectMode={handleSelectMode}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
      );
  }
};
