import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant: "ship" | "plane" | "compare" | "multi";
  onClick: () => void;
}

const variantStyles = {
  ship: {
    gradient: "gradient-ship",
    glow: "glow-ship",
    text: "text-gradient-ship",
    ring: "focus:ring-ship",
  },
  plane: {
    gradient: "gradient-plane",
    glow: "glow-plane",
    text: "text-gradient-plane",
    ring: "focus:ring-plane",
  },
  compare: {
    gradient: "gradient-compare",
    glow: "glow-compare",
    text: "text-gradient-compare",
    ring: "focus:ring-compare",
  },
  multi: {
    gradient: "bg-gradient-to-br from-amber-500 to-orange-600",
    glow: "hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]",
    text: "bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent",
    ring: "focus:ring-amber-500",
  },
};

export const ModeCard = ({ icon: Icon, title, description, variant, onClick }: ModeCardProps) => {
  const styles = variantStyles[variant];

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full p-6 rounded-2xl glass border",
        "transition-all duration-300 hover:scale-105 hover:-translate-y-2",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
        styles.ring,
        styles.glow
      )}
    >
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
