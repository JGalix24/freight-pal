import { useState, useEffect } from "react";
import { HomePage } from "./HomePage";
import { ShipCalculator } from "./ShipCalculator";
import { PlaneCalculator } from "./PlaneCalculator";
import { CompareCalculator } from "./CompareCalculator";

type Mode = "home" | "ship" | "plane" | "compare";

export const FreightCalculator = () => {
  const [mode, setMode] = useState<Mode>("home");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Set dark mode by default
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  const goHome = () => setMode("home");

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
    default:
      return (
        <HomePage
          onSelectMode={setMode}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
      );
  }
};
