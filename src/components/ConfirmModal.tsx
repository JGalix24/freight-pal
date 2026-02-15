import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  variant: "ship" | "plane" | "compare" | "multi";
  title?: string;
  message?: string;
}

const variantStyles = {
  ship: "gradient-ship",
  plane: "gradient-plane",
  compare: "gradient-compare",
  multi: "gradient-multi",
};

export const ConfirmModal = ({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  onClose,
  variant,
  title,
  message,
}: ConfirmModalProps) => {
  const { t } = useLanguage();
  
  if (!isOpen) return null;

  const handleClose = onClose || onCancel || (() => {});
  const displayTitle = title || t.doAnother;
  const displayMessage = message || t.doAnotherConfirm;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={handleClose} />
      
      <div className="relative bg-card border border-border rounded-2xl p-6 max-w-md w-full animate-scale-in shadow-xl">
        <div className="flex flex-col items-center text-center gap-4">
          <div className={cn("p-3 rounded-full", variantStyles[variant])}>
            <AlertTriangle className="h-6 w-6 text-primary-foreground" />
          </div>
          
          <div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">{displayTitle}</h3>
            <p className="text-muted-foreground">{displayMessage}</p>
          </div>
          
          <div className="flex gap-3 w-full mt-2">
            <Button variant="outline" className="flex-1" onClick={handleClose}>
              {t.cancelLabel}
            </Button>
            <Button className={cn("flex-1 text-primary-foreground", variantStyles[variant])} onClick={onConfirm}>
              {t.confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
