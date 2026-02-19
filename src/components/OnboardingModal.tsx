import { useState } from "react";
import { Ship, Plane, Scale, Boxes, X, ChevronRight, ChevronLeft, MousePointerClick, ClipboardEdit, BarChart3, FileDown, Globe, Calculator, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const modes = [
    {
      icon: Ship,
      title: t.ship,
      desc: t.onboardingShipDesc,
      gradient: "gradient-ship",
      textGradient: "text-gradient-ship",
      bg: "bg-ship/10",
      border: "border-ship/30",
    },
    {
      icon: Plane,
      title: t.plane,
      desc: t.onboardingPlaneDesc,
      gradient: "gradient-plane",
      textGradient: "text-gradient-plane",
      bg: "bg-plane/10",
      border: "border-plane/30",
    },
    {
      icon: Scale,
      title: t.compare,
      desc: t.onboardingCompareDesc,
      gradient: "gradient-compare",
      textGradient: "text-gradient-compare",
      bg: "bg-compare/10",
      border: "border-compare/30",
    },
    {
      icon: Boxes,
      title: t.multiPackage,
      desc: t.onboardingMultiDesc,
      gradient: "gradient-multi",
      textGradient: "text-gradient-multi",
      bg: "bg-multi/10",
      border: "border-multi/30",
    },
  ];

  const tutorialSteps = [
    {
      icon: MousePointerClick,
      title: t.onboardingStep1Title,
      desc: t.onboardingStep1Desc,
      visual: (
        <div className="grid grid-cols-2 gap-2 mt-4">
          {modes.map((m) => (
            <div key={m.title} className={`flex items-center gap-2 p-2 rounded-lg border ${m.bg} ${m.border}`}>
              <div className={`p-1.5 rounded-lg ${m.gradient}`}>
                <m.icon className="h-3.5 w-3.5 text-white" />
              </div>
              <span className={`text-xs font-semibold ${m.textGradient}`}>{m.title}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: Globe,
      title: t.onboardingStep2Title,
      desc: t.onboardingStep2Desc,
      visual: (
        <div className="mt-4 space-y-2">
          {[
            { label: t.currency, value: "FCFA" },
            { label: t.destinationCountry, value: "🇫🇷 France" },
            { label: t.ratePerKg, value: "3 000" },
            { label: t.packageWeight, value: "25 kg" },
          ].map((f) => (
            <div key={f.label} className="flex items-center justify-between bg-secondary/60 rounded-lg px-3 py-1.5">
              <span className="text-xs text-muted-foreground">{f.label}</span>
              <span className="text-xs font-semibold text-foreground">{f.value}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: Calculator,
      title: t.onboardingStep3Title,
      desc: t.onboardingStep3Desc,
      visual: (
        <div className="mt-4 space-y-2">
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">{t.totalCost}</p>
            <p className="text-2xl font-bold text-primary">75 000 FCFA</p>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 bg-secondary border border-border rounded-lg p-2 text-center">
              <p className="text-xs text-muted-foreground">{t.estimatedDelay}</p>
              <p className="text-sm font-bold text-foreground">7-14 {t.days}</p>
            </div>
            <div className="flex-1 bg-secondary border border-border rounded-lg p-2 text-center">
              <p className="text-xs text-muted-foreground">{t.destinationCountry}</p>
              <p className="text-sm font-bold text-foreground">🇫🇷 France</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: FileDown,
      title: t.onboardingStep4Title,
      desc: t.onboardingStep4Desc,
      visual: (
        <div className="mt-4 flex flex-col items-center gap-3">
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-secondary/60 border border-border rounded-lg px-4 py-2">
              <FileDown className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">PDF</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary border border-border rounded-lg px-4 py-2">
              <Scale className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{t.compare}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center">{t.onboardingExportHint}</p>
        </div>
      ),
    },
  ];

  // Pages: 0=intro, 1-4=modes, 5-8=guide, 9=fin
  const TOTAL_PAGES = 1 + modes.length + tutorialSteps.length + 1;

  const handleNext = () => {
    if (step < TOTAL_PAGES - 1) setStep(step + 1);
    else onClose();
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleClose = () => {
    setStep(0);
    onClose();
  };

  const renderContent = () => {
    // Page 0 : Introduction
    if (step === 0) {
      return (
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-4xl">👋</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">{t.onboardingWelcome}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
            {t.onboardingWelcomeDesc}
          </p>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {modes.map((m) => (
              <div key={m.title} className={`flex items-center gap-2 p-2.5 rounded-xl border ${m.bg} ${m.border}`}>
                <div className={`p-1.5 rounded-lg ${m.gradient}`}>
                  <m.icon className="h-4 w-4 text-white" />
                </div>
                <span className={`text-sm font-semibold ${m.textGradient}`}>{m.title}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Pages 1-4 : Présentation des modes
    if (step >= 1 && step <= modes.length) {
      const mode = modes[step - 1];
      const ModeIcon = mode.icon;
      return (
        <div className="text-center space-y-4">
          <div className={`mx-auto w-16 h-16 rounded-2xl ${mode.gradient} flex items-center justify-center shadow-lg`}>
            <ModeIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
              {t.onboardingModeLabel} {step}/{modes.length}
            </p>
            <h2 className={`font-display text-2xl font-bold ${mode.textGradient}`}>{mode.title}</h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{mode.desc}</p>
        </div>
      );
    }

    // Dernière page : où retrouver le guide
    if (step === TOTAL_PAGES - 1) {
      return (
        <div className="text-center space-y-5">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <span className="text-3xl">🎉</span>
            </div>
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">{t.onboardingReadyTitle}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
            {t.onboardingReadyDesc}
          </p>
          <div className="bg-secondary border border-border rounded-xl p-4 text-left space-y-3">
            <p className="text-xs font-semibold text-foreground uppercase tracking-widest">{t.onboardingFindAgain}</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center shrink-0">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">{t.onboardingFindAgainDesc}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center shrink-0">
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">{t.onboardingCalcHelpDesc}</p>
            </div>
          </div>
        </div>
      );
    }

    // Pages 5-8 : Guide d'utilisation
    const tutStep = tutorialSteps[step - 1 - modes.length];
    const TutIcon = tutStep.icon;
    const tutIndex = step - modes.length;
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <TutIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              {t.onboardingGuideLabel} {tutIndex}/{tutorialSteps.length}
            </p>
            <h2 className="font-display text-lg font-bold text-foreground">{tutStep.title}</h2>
          </div>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">{tutStep.desc}</p>
        {tutStep.visual}
      </div>
    );
  };

  const progressPercent = Math.round(((step + 1) / TOTAL_PAGES) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl animate-fade-up overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex gap-1.5 flex-wrap max-w-[80%]">
            {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
              <div
                key={i}
                onClick={() => setStep(i)}
                className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                  i === step ? "bg-primary w-5" : i < step ? "bg-primary/40 w-2" : "bg-border w-2"
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-border mx-5 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Content */}
        <div className="px-6 py-5 min-h-[300px] flex flex-col justify-center">
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 pb-5 gap-3">
          <Button
            variant="ghost"
            onClick={handlePrev}
            disabled={step === 0}
            className="gap-1.5 text-muted-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            {t.back}
          </Button>
          <span className="text-xs text-muted-foreground">
            {step + 1} / {TOTAL_PAGES}
          </span>
          <Button onClick={handleNext} className="gap-1.5 gradient-ship text-primary-foreground hover:opacity-90">
            {step === TOTAL_PAGES - 1 ? t.onboardingFinish : t.onboardingNext}
            {step < TOTAL_PAGES - 1 && <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};
