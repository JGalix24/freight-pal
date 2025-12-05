import { Ship, Plane, Scale, Boxes } from "lucide-react";
import { Logo } from "./Logo";
import { ModeCard } from "./ModeCard";
import { ThemeToggle } from "./ThemeToggle";

type Mode = "home" | "ship" | "plane" | "compare" | "multi";

interface HomePageProps {
  onSelectMode: (mode: Mode) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const HomePage = ({ onSelectMode, isDark, onToggleTheme }: HomePageProps) => {
  return (
    <div className="min-h-screen gradient-background flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6 flex items-center justify-between">
        <Logo />
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Bienvenue sur{" "}
            <span className="text-gradient-ship">Freight</span>
            <span className="text-gradient-plane">-</span>
            <span className="text-gradient-compare">Calculator</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Calculez rapidement vos frais de transport maritime et aérien
          </p>
        </div>

        <div className="w-full max-w-5xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground text-center mb-8">
            QUE VOULEZ-VOUS CALCULER ?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ModeCard
              icon={Ship}
              title="BATEAU"
              description="Calcul CBM"
              variant="ship"
              onClick={() => onSelectMode("ship")}
            />
            <ModeCard
              icon={Plane}
              title="AVION"
              description="Calcul au poids"
              variant="plane"
              onClick={() => onSelectMode("plane")}
            />
            <ModeCard
              icon={Scale}
              title="COMPARAISON"
              description="Bateau vs Avion"
              variant="compare"
              onClick={() => onSelectMode("compare")}
            />
            <ModeCard
              icon={Boxes}
              title="MULTI-COLIS"
              description="Plusieurs colis"
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
