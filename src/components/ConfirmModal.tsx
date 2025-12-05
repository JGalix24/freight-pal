import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  variant: "ship" | "plane" | "compare";
}

const variantStyles = {
  ship: "gradient-ship",
  plane: "gradient-plane",
  compare: "gradient-compare",
};

export const ConfirmModal = ({ isOpen, onConfirm, onCancel, variant }: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      <div className="relative bg-card border border-border rounded-2xl p-6 max-w-md w-full animate-scale-in shadow-xl">
        <div className="flex flex-col items-center text-center gap-4">
          <div className={cn("p-3 rounded-full", variantStyles[variant])}>
            <AlertTriangle className="h-6 w-6 text-primary-foreground" />
          </div>
          
          <div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              Refaire un autre calcul
            </h3>
            <p className="text-muted-foreground">
              Êtes-vous sûr de vouloir effacer tous les champs et refaire un nouveau calcul ?
            </p>
          </div>
          
          <div className="flex gap-3 w-full mt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onCancel}
            >
              Annuler
            </Button>
            <Button
              className={cn("flex-1 text-primary-foreground", variantStyles[variant])}
              onClick={onConfirm}
            >
              Oui, refaire
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
