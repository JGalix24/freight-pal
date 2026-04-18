import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronRight, ChevronLeft, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export interface TourStep {
  target: string; // data-tour attribute value
  title: string;
  description: string;
  position?: "top" | "bottom" | "left" | "right";
  requireClick?: boolean; // user must click the target to proceed
  navigateTo?: string; // mode to navigate to after click
  waitForTarget?: boolean; // wait for target to appear in DOM
}

interface GuidedTourProps {
  steps: TourStep[];
  isActive: boolean;
  currentStep: number;
  onStepChange: (step: number) => void;
  onClose: () => void;
  onNavigate?: (mode: string) => void;
}

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const GuidedTour = ({
  steps,
  isActive,
  currentStep,
  onStepChange,
  onClose,
  onNavigate,
}: GuidedTourProps) => {
  const { t } = useLanguage();
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({});
  const [arrowDir, setArrowDir] = useState<"top" | "bottom" | "left" | "right">("bottom");
  const [isAnimating, setIsAnimating] = useState(false);
  const [waitingForTarget, setWaitingForTarget] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const step = steps[currentStep];

  const findTarget = useCallback(() => {
    if (!step) return null;
    const el = document.querySelector(`[data-tour="${step.target}"]`) as HTMLElement;
    return el;
  }, [step]);

  const updatePosition = useCallback(() => {
    const el = findTarget();
    if (!el) {
      if (step?.waitForTarget) {
        setWaitingForTarget(true);
        setTargetRect(null);
      }
      return;
    }
    setWaitingForTarget(false);

    const rect = el.getBoundingClientRect();
    const padding = 8;
    const newRect = {
      top: rect.top - padding,
      left: rect.left - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
    };
    setTargetRect(newRect);

    // Calculate tooltip position
    const tooltipW = 320;
    const tooltipH = 180;
    const gap = 16;
    const pos = step.position || "auto";

    let finalPos = pos;
    if (pos === "auto" || !pos) {
      // Auto-detect best position
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const spaceRight = window.innerWidth - rect.right;
      const spaceLeft = rect.left;

      if (spaceBelow > tooltipH + gap) finalPos = "bottom";
      else if (spaceAbove > tooltipH + gap) finalPos = "top";
      else if (spaceRight > tooltipW + gap) finalPos = "right";
      else finalPos = "left";
    }

    let tStyle: React.CSSProperties = {};
    let aStyle: React.CSSProperties = {};

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    switch (finalPos) {
      case "bottom":
        tStyle = {
          top: rect.bottom + gap + padding,
          left: Math.max(16, Math.min(centerX - tooltipW / 2, window.innerWidth - tooltipW - 16)),
        };
        aStyle = {
          top: rect.bottom + padding + 2,
          left: centerX - 8,
        };
        setArrowDir("top");
        break;
      case "top":
        tStyle = {
          top: rect.top - tooltipH - gap - padding,
          left: Math.max(16, Math.min(centerX - tooltipW / 2, window.innerWidth - tooltipW - 16)),
        };
        aStyle = {
          top: rect.top - padding - 14,
          left: centerX - 8,
        };
        setArrowDir("bottom");
        break;
      case "right":
        tStyle = {
          top: Math.max(16, Math.min(centerY - tooltipH / 2, window.innerHeight - tooltipH - 16)),
          left: rect.right + gap + padding,
        };
        aStyle = {
          top: centerY - 8,
          left: rect.right + padding + 2,
        };
        setArrowDir("left");
        break;
      case "left":
        tStyle = {
          top: Math.max(16, Math.min(centerY - tooltipH / 2, window.innerHeight - tooltipH - 16)),
          left: rect.left - tooltipW - gap - padding,
        };
        aStyle = {
          top: centerY - 8,
          left: rect.left - padding - 14,
        };
        setArrowDir("right");
        break;
    }

    setTooltipStyle(tStyle);
    setArrowStyle(aStyle);
  }, [findTarget, step]);

  // Poll for position updates
  useEffect(() => {
    if (!isActive || !step) return;

    const tick = () => {
      updatePosition();
      rafRef.current = requestAnimationFrame(tick);
    };
    // Small delay to let DOM settle after mode switch
    const timeout = setTimeout(() => {
      tick();
    }, step.waitForTarget ? 100 : 50);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, step, updatePosition, currentStep]);

  // Handle click on target element
  useEffect(() => {
    if (!isActive || !step?.requireClick) return;

    const el = findTarget();
    if (!el) return;

    const handler = (e: Event) => {
      if (step.navigateTo && onNavigate) {
        onNavigate(step.navigateTo);
        // Move to next step after navigation
        setTimeout(() => {
          onStepChange(currentStep + 1);
        }, 600);
      } else {
        onStepChange(currentStep + 1);
      }
    };

    el.addEventListener("click", handler, { once: true });
    return () => el.removeEventListener("click", handler);
  }, [isActive, step, findTarget, currentStep, onStepChange, onNavigate]);

  // Animation on step change
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [currentStep]);

  if (!isActive || !step) return null;

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (step.requireClick) return; // Must click target
    if (currentStep < steps.length - 1) {
      onStepChange(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  const arrowClasses: Record<string, string> = {
    top: "border-l-transparent border-r-transparent border-t-transparent border-b-[hsl(var(--card))]",
    bottom: "border-l-transparent border-r-transparent border-b-transparent border-t-[hsl(var(--card))]",
    left: "border-t-transparent border-b-transparent border-l-transparent border-r-[hsl(var(--card))]",
    right: "border-t-transparent border-b-transparent border-r-transparent border-l-[hsl(var(--card))]",
  };

  return (
    <div className="fixed inset-0 z-[9999]" style={{ pointerEvents: "none" }}>
      {/* Dark overlay with cutout - click-through so target stays interactive */}
      <svg
        className="absolute inset-0 w-full h-full transition-all duration-500"
        style={{ pointerEvents: "none" }}
      >
        <defs>
          <mask id="tour-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {targetRect && (
              <rect
                x={targetRect.left}
                y={targetRect.top}
                width={targetRect.width}
                height={targetRect.height}
                rx="12"
                fill="black"
                className="transition-all duration-500 ease-out"
              />
            )}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.75)"
          mask="url(#tour-mask)"
        />
      </svg>

      {/* Spotlight glow ring */}
      {targetRect && (
        <div
          className="absolute rounded-xl transition-all duration-500 ease-out animate-pulse"
          style={{
            top: targetRect.top - 2,
            left: targetRect.left - 2,
            width: targetRect.width + 4,
            height: targetRect.height + 4,
            border: "2px solid hsl(var(--primary))",
            boxShadow: "0 0 20px hsl(var(--primary) / 0.4), inset 0 0 20px hsl(var(--primary) / 0.1)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Make the target area clickable */}
      {targetRect && (
        <div
          className="absolute rounded-xl"
          style={{
            top: targetRect.top,
            left: targetRect.left,
            width: targetRect.width,
            height: targetRect.height,
            pointerEvents: "auto",
            cursor: step.requireClick ? "pointer" : "default",
          }}
        />
      )}

      {/* Arrow */}
      {targetRect && !waitingForTarget && (
        <div
          className={`absolute w-0 h-0 border-[8px] transition-all duration-500 ${arrowClasses[arrowDir]}`}
          style={{ ...arrowStyle, pointerEvents: "none" }}
        />
      )}

      {/* Tooltip */}
      {!waitingForTarget && (
        <div
          ref={tooltipRef}
          className={`absolute w-[320px] bg-card border border-border rounded-2xl shadow-2xl transition-all duration-500 ease-out ${
            isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
          style={{ ...tooltipStyle, pointerEvents: "auto" }}
        >
          {/* Progress bar */}
          <div className="h-1 bg-muted rounded-t-2xl overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-5">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                    {currentStep + 1}/{steps.length}
                  </p>
                  <h3 className="font-display font-bold text-foreground text-sm leading-tight">
                    {step.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {step.description}
            </p>

            {/* Click hint */}
            {step.requireClick && (
              <div className="mb-4 bg-primary/10 border border-primary/20 rounded-lg px-3 py-2 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <p className="text-xs text-primary font-medium">
                  Clique sur l'élément pour continuer
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="gap-1 text-muted-foreground h-8 text-xs"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                {t.back}
              </Button>

              <div className="flex gap-1">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === currentStep
                        ? "bg-primary w-4"
                        : i < currentStep
                        ? "bg-primary/40 w-1.5"
                        : "bg-muted w-1.5"
                    }`}
                  />
                ))}
              </div>

              {!step.requireClick && (
                <Button
                  size="sm"
                  onClick={handleNext}
                  className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90 h-8 text-xs"
                >
                  {currentStep === steps.length - 1 ? "Terminé !" : "Suivant"}
                  {currentStep < steps.length - 1 && <ChevronRight className="h-3.5 w-3.5" />}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Waiting state */}
      {waitingForTarget && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: "auto" }}>
          <div className="bg-card border border-border rounded-2xl shadow-2xl p-6 text-center max-w-xs">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 animate-pulse">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm text-foreground font-medium mb-1">Chargement...</p>
            <p className="text-xs text-muted-foreground">L'interface se prépare</p>
          </div>
        </div>
      )}
    </div>
  );
};
