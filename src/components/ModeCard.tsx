import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant: "ship" | "plane" | "compare";
  onClick: () => void;
}

const variantStyles = {
  ship: {
    gradient: "gradient-ship",
    glow: "glow-ship",
    text: "text-gradient-ship",
  },
  plane: {
    gradient: "gradient-plane",
    glow: "glow-plane",
    text: "text-gradient-plane",
  },
  compare: {
    gradient: "gradient-compare",
    glow: "glow-compare",
    text: "text-gradient-compare",
  },
};

export const ModeCard = ({ icon: Icon, title, description, variant, onClick }: ModeCardProps) => {
  const styles = variantStyles[variant];

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full p-6 rounded-2xl bg-card border border-border",
        "transition-all duration-300 hover:scale-105 hover:-translate-y-2",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
        variant === "ship" && "focus:ring-ship",
        variant === "plane" && "focus:ring-plane",
        variant === "compare" && "focus:ring-compare"
      )}
    >
      <div className={cn(
        "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        styles.glow
      )} />
      
      <div className="relative flex flex-col items-center gap-4">
        <div className={cn(
          "p-4 rounded-xl transition-all duration-300 group-hover:scale-110",
          styles.gradient
        )}>
          <Icon className="h-8 w-8 text-primary-foreground" />
        </div>
        
        <div className="text-center">
          <h3 className={cn(
            "font-display text-xl font-bold mb-1",
            styles.text
          )}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
};
