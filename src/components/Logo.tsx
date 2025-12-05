import { Package } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-3 animate-fade-up">
      <div className="relative">
        <div className="absolute inset-0 gradient-ship rounded-2xl blur-xl opacity-50 animate-pulse-glow" />
        <div className="relative gradient-ship p-4 rounded-2xl">
          <Package className="h-10 w-10 text-primary-foreground" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-display text-2xl font-bold text-foreground">
          Freight
        </span>
        <span className="font-display text-xl font-semibold text-muted-foreground -mt-1">
          Calculator
        </span>
      </div>
    </div>
  );
};
