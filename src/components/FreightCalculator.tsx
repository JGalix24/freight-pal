import { useState, useEffect } from "react";
import { HomePage } from "./HomePage";
import { ShipCalculator } from "./ShipCalculator";
import { PlaneCalculator } from "./PlaneCalculator";
import { CompareCalculator } from "./CompareCalculator";
import { MultiPackageCalculator } from "./MultiPackageCalculator";
import { SettingsPage } from "./SettingsPage";
import { HistoryPage } from "./HistoryPage";

type Mode = "home" | "ship" | "plane" | "compare" | "multi" | "settings" | "history";

export const FreightCalculator = () => {
  const [mode, setMode] = useState<Mode>("home");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
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
          onSelectMode={setMode}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
      );
  }
};
