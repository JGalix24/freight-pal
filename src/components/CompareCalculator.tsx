import { useState } from "react";
import { ArrowLeft, Scale, Calculator, RotateCcw, Ship, Plane, TrendingDown, Ruler, Weight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "./ThemeToggle";
import { CurrencySelect } from "./CurrencySelect";
import { ConfirmModal } from "./ConfirmModal";
import { cn } from "@/lib/utils";

interface CompareCalculatorProps {
  onBack: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

interface CompareResult {
  shipCost: number;
  shipVolume: number;
  planeCost: number;
  planeWeight: number;
  winner: "ship" | "plane";
  difference: number;
  percentage: number;
}

export const CompareCalculator = ({ onBack, isDark, onToggleTheme }: CompareCalculatorProps) => {
  // Ship state
  const [shipCurrency, setShipCurrency] = useState("FCFA");
  const [shipTarifCBM, setShipTarifCBM] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  // Plane state
  const [planeCurrency, setPlaneCurrency] = useState("FCFA");
  const [planeTarifKg, setPlaneTarifKg] = useState("");
  const [planeWeight, setPlaneWeight] = useState("");

  const [result, setResult] = useState<CompareResult | null>(null);
  const [showModal, setShowModal] = useState(false);

  const calculateComparison = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const shipTarif = parseFloat(shipTarifCBM);
    const pWeight = parseFloat(planeWeight);
    const planeTarif = parseFloat(planeTarifKg);

    if (l > 0 && w > 0 && h > 0 && shipTarif > 0 && pWeight > 0 && planeTarif > 0) {
      const volume = (l * w * h) / 1000000;
      const shipCost = volume * shipTarif;
      const planeCost = pWeight * planeTarif;

      const winner = shipCost < planeCost ? "ship" : "plane";
      const difference = Math.abs(shipCost - planeCost);
      const maxCost = Math.max(shipCost, planeCost);
      const percentage = (difference / maxCost) * 100;

      setResult({
        shipCost,
        shipVolume: volume,
        planeCost,
        planeWeight: pWeight,
        winner,
        difference,
        percentage,
      });
    }
  };

  const resetForm = () => {
    setShipCurrency("FCFA");
    setShipTarifCBM("");
    setLength("");
    setWidth("");
    setHeight("");
    setPlaneCurrency("FCFA");
    setPlaneTarifKg("");
    setPlaneWeight("");
    setResult(null);
    setShowModal(false);
  };

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString("fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const isShipValid = parseFloat(length) > 0 && parseFloat(width) > 0 && parseFloat(height) > 0 && parseFloat(shipTarifCBM) > 0;
  const isPlaneValid = parseFloat(planeWeight) > 0 && parseFloat(planeTarifKg) > 0;
  const isValid = isShipValid && isPlaneValid;

  return (
    <div className="min-h-screen gradient-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
            Retour
          </Button>
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>

        {/* Title */}
        <div className="flex items-center justify-center gap-3 mb-8 animate-fade-up">
          <div className="gradient-compare p-3 rounded-xl">
            <Scale className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-gradient-compare text-center">
            Comparaison Bateau vs Avion
          </h1>
        </div>

        {/* Two Column Form */}
        <div className="grid md:grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {/* Ship Column */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="gradient-ship p-2 rounded-lg">
                <Ship className="h-5 w-5 text-primary-foreground" />
              </div>
              <h2 className="font-display text-xl font-bold text-gradient-ship">BATEAU</h2>
            </div>

            <CurrencySelect value={shipCurrency} onChange={setShipCurrency} />

            <div className="space-y-2">
              <Label className="text-foreground text-sm">Tarif CBM (par m³)</Label>
              <Input
                type="number"
                value={shipTarifCBM}
                onChange={(e) => setShipTarifCBM(e.target.value)}
                placeholder="Ex: 210000"
                className="bg-secondary border-border"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground text-sm">
                <Ruler className="h-4 w-4 text-muted-foreground" />
                Dimensions (cm)
              </Label>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="L"
                  className="bg-secondary border-border"
                />
                <Input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="l"
                  className="bg-secondary border-border"
                />
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="h"
                  className="bg-secondary border-border"
                />
              </div>
            </div>
          </div>

          {/* Plane Column */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="gradient-plane p-2 rounded-lg">
                <Plane className="h-5 w-5 text-primary-foreground" />
              </div>
              <h2 className="font-display text-xl font-bold text-gradient-plane">AVION</h2>
            </div>

            <CurrencySelect value={planeCurrency} onChange={setPlaneCurrency} />

            <div className="space-y-2">
              <Label className="text-foreground text-sm">Tarif par kilogramme</Label>
              <Input
                type="number"
                value={planeTarifKg}
                onChange={(e) => setPlaneTarifKg(e.target.value)}
                placeholder="Ex: 3000"
                className="bg-secondary border-border"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground text-sm">
                <Weight className="h-4 w-4 text-muted-foreground" />
                Poids du colis (kg)
              </Label>
              <Input
                type="number"
                value={planeWeight}
                onChange={(e) => setPlaneWeight(e.target.value)}
                placeholder="Ex: 25"
                className="bg-secondary border-border"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <Button
            onClick={calculateComparison}
            disabled={!isValid}
            className="flex-1 gradient-compare text-primary-foreground hover:opacity-90 transition-opacity gap-2"
          >
            <Calculator className="h-5 w-5" />
            Calculer la comparaison
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowModal(true)}
            className="gap-2"
          >
            <RotateCcw className="h-5 w-5" />
            Refaire
          </Button>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-8 space-y-6 animate-fade-up">
            {/* Winner Card */}
            <div className={cn(
              "rounded-2xl p-8 text-center",
              result.winner === "ship" ? "gradient-ship glow-ship" : "gradient-plane glow-plane"
            )}>
              <div className="flex items-center justify-center gap-3 mb-4">
                {result.winner === "ship" ? (
                  <Ship className="h-12 w-12 text-primary-foreground" />
                ) : (
                  <Plane className="h-12 w-12 text-primary-foreground" />
                )}
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                {result.winner === "ship" ? "Le BATEAU" : "L'AVION"} est moins cher
              </h3>
              <p className="text-primary-foreground/90 text-4xl md:text-5xl font-display font-bold mb-2">
                {formatNumber(result.difference)} {result.winner === "ship" ? shipCurrency : planeCurrency}
              </p>
              <div className="flex items-center justify-center gap-2 text-primary-foreground/80">
                <TrendingDown className="h-5 w-5" />
                <span className="text-lg">Vous économisez {formatNumber(result.percentage, 1)}%</span>
              </div>
            </div>

            {/* Comparison Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className={cn(
                "bg-card border rounded-xl p-4",
                result.winner === "ship" ? "border-ship glow-ship" : "border-border"
              )}>
                <div className="flex items-center gap-2 mb-3">
                  <Ship className="h-5 w-5 text-ship" />
                  <span className="font-semibold text-foreground">Bateau</span>
                  {result.winner === "ship" && (
                    <span className="ml-auto text-xs gradient-ship text-primary-foreground px-2 py-1 rounded-full">
                      Moins cher
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Volume: {formatNumber(result.shipVolume, 4)} m³
                </p>
                <p className={cn(
                  "font-display text-xl font-bold",
                  result.winner === "ship" ? "text-gradient-ship" : "text-foreground"
                )}>
                  {formatNumber(result.shipCost)} {shipCurrency}
                </p>
              </div>

              <div className={cn(
                "bg-card border rounded-xl p-4",
                result.winner === "plane" ? "border-plane glow-plane" : "border-border"
              )}>
                <div className="flex items-center gap-2 mb-3">
                  <Plane className="h-5 w-5 text-plane" />
                  <span className="font-semibold text-foreground">Avion</span>
                  {result.winner === "plane" && (
                    <span className="ml-auto text-xs gradient-plane text-primary-foreground px-2 py-1 rounded-full">
                      Moins cher
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Poids: {formatNumber(result.planeWeight)} kg
                </p>
                <p className={cn(
                  "font-display text-xl font-bold",
                  result.winner === "plane" ? "text-gradient-plane" : "text-foreground"
                )}>
                  {formatNumber(result.planeCost)} {planeCurrency}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-muted-foreground text-sm mt-8">
          By Mr.G
        </p>
      </div>

      <ConfirmModal
        isOpen={showModal}
        onConfirm={resetForm}
        onCancel={() => setShowModal(false)}
        variant="compare"
      />
    </div>
  );
};
