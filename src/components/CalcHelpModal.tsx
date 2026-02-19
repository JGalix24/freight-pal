import { useState } from "react";
import { X, ChevronRight, ChevronLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export type CalcMode = "ship" | "plane" | "compare" | "multi";

interface CalcHelpModalProps {
  mode: CalcMode;
}

export const CalcHelpModal = ({ mode }: CalcHelpModalProps) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  const steps = (() => {
    switch (mode) {
      case "ship":
        return t.helpShipSteps;
      case "plane":
        return t.helpPlaneSteps;
      case "compare":
        return t.helpCompareSteps;
      case "multi":
        return t.helpMultiSteps;
    }
  })();

  const title = (() => {
    switch (mode) {
      case "ship": return t.shipCalc;
      case "plane": return t.planeCalc;
      case "compare": return t.compareTitle;
      case "multi": return t.multiTitle;
    }
  })();

  const gradientClass = (() => {
    switch (mode) {
      case "ship": return "gradient-ship";
      case "plane": return "gradient-plane";
      case "compare": return "gradient-compare";
      case "multi": return "gradient-multi";
    }
  })();

  const handleOpen = () => {
    setStep(0);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStep(0);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        title={t.onboardingTutorial}
      >
        <HelpCircle className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
          <div className="relative w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl animate-fade-up overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${gradientClass}`}>
                  <HelpCircle className="h-4 w-4 text-white" />
                </div>
                <span className="font-display font-bold text-foreground text-sm">{title}</span>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Progress */}
            <div className="h-0.5 bg-border mx-5 rounded-full overflow-hidden">
              <div
                className={`h-full ${gradientClass} rounded-full transition-all duration-500`}
                style={{ width: `${Math.round(((step + 1) / steps.length) * 100)}%` }}
              />
            </div>

            {/* Content */}
            <div className="px-6 py-5 min-h-[180px] flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-primary">{step + 1}</span>
                </div>
                <h3 className="font-display font-bold text-foreground">{steps[step].title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{steps[step].desc}</p>
              {steps[step].tip && (
                <div className="mt-4 bg-primary/5 border border-primary/20 rounded-lg px-3 py-2">
                  <p className="text-xs text-primary font-medium">💡 {steps[step].tip}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 pb-5 gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep(s => s - 1)}
                disabled={step === 0}
                className="gap-1 text-muted-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
                {t.back}
              </Button>
              <div className="flex gap-1">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setStep(i)}
                    className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                      i === step ? "bg-primary w-4" : i < step ? "bg-primary/40 w-1.5" : "bg-border w-1.5"
                    }`}
                  />
                ))}
              </div>
              <Button
                size="sm"
                onClick={() => step < steps.length - 1 ? setStep(s => s + 1) : handleClose()}
                className={`gap-1 ${gradientClass} text-primary-foreground hover:opacity-90`}
              >
                {step === steps.length - 1 ? t.onboardingFinish : t.onboardingNext}
                {step < steps.length - 1 && <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
