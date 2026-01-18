import { Ship, Plane, Scale, Boxes, Settings, Clock } from "lucide-react";
import { Logo } from "./Logo";
import { ModeCard } from "./ModeCard";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";

type Mode = "home" | "ship" | "plane" | "compare" | "multi" | "settings" | "history";

interface HomePageProps {
  onSelectMode: (mode: Mode) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const HomePage = ({ onSelectMode, isDark, onToggleTheme }: HomePageProps) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen gradient-background flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2 md:gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => onSelectMode("history")}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            title={t.history}
          >
            <Clock className="h-5 w-5" />
          </button>
          <button
            onClick={() => onSelectMode("settings")}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            title={t.settings}
          >
            <Settings className="h-5 w-5" />
          </button>
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t.appSubtitle.includes("clics") ? (
              <>
                Bienvenue sur{" "}
                <span className="text-gradient-ship">Freight</span>
                <span className="text-gradient-plane">-</span>
                <span className="text-gradient-compare">Calculator</span>
              </>
            ) : t.appSubtitle.includes("clicks") ? (
              <>
                Welcome to{" "}
                <span className="text-gradient-ship">Freight</span>
                <span className="text-gradient-plane">-</span>
                <span className="text-gradient-compare">Calculator</span>
              </>
            ) : (
              <>
                Bienvenido a{" "}
                <span className="text-gradient-ship">Freight</span>
                <span className="text-gradient-plane">-</span>
                <span className="text-gradient-compare">Calculator</span>
              </>
            )}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.appSubtitle}
          </p>
        </div>

        <div className="w-full max-w-5xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground text-center mb-8">
            {t.whatToCalculate.toUpperCase()}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ModeCard
              icon={Ship}
              title={t.ship.toUpperCase()}
              description={t.shipDesc}
              variant="ship"
              onClick={() => onSelectMode("ship")}
            />
            <ModeCard
              icon={Plane}
              title={t.plane.toUpperCase()}
              description={t.planeDesc}
              variant="plane"
              onClick={() => onSelectMode("plane")}
            />
            <ModeCard
              icon={Scale}
              title={t.compare.toUpperCase()}
              description={t.compareDesc}
              variant="compare"
              onClick={() => onSelectMode("compare")}
            />
            <ModeCard
              icon={Boxes}
              title={t.multiPackage.toUpperCase()}
              description={t.multiDesc}
              variant="multi"
              onClick={() => onSelectMode("multi")}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 md:p-6 text-center">
        <p className="text-muted-foreground text-sm">
          By <span className="font-semibold">Mr.G</span>
        </p>
      </footer>
    </div>
  );
};
