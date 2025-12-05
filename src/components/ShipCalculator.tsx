import { useState } from "react";
import { ArrowLeft, Ship, Calculator, RotateCcw, Ruler, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "./ThemeToggle";
import { CurrencySelect } from "./CurrencySelect";
import { ConfirmModal } from "./ConfirmModal";
import { cn } from "@/lib/utils";

interface ShipCalculatorProps {
  onBack: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const ShipCalculator = ({ onBack, isDark, onToggleTheme }: ShipCalculatorProps) => {
  const [currency, setCurrency] = useState("FCFA");
  const [tarifCBM, setTarifCBM] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{ volume: number; cost: number } | null>(null);
  const [showModal, setShowModal] = useState(false);

  const calculateCost = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const tarif = parseFloat(tarifCBM);

    if (l > 0 && w > 0 && h > 0 && tarif > 0) {
      const volume = (l * w * h) / 1000000;
      const cost = volume * tarif;
      setResult({ volume, cost });
    }
  };

  const resetForm = () => {
    setCurrency("FCFA");
    setTarifCBM("");
    setLength("");
    setWidth("");
    setHeight("");
    setResult(null);
    setShowModal(false);
  };

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString("fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const isValid = parseFloat(length) > 0 && parseFloat(width) > 0 && parseFloat(height) > 0 && parseFloat(tarifCBM) > 0;

  return (
    <div className="min-h-screen gradient-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
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
          <div className="gradient-ship p-3 rounded-xl">
            <Ship className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-gradient-ship">
            Calcul Bateau
          </h1>
        </div>

        {/* Form */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <CurrencySelect value={currency} onChange={setCurrency} />

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Package className="h-4 w-4 text-muted-foreground" />
              Tarif CBM (par m³)
            </Label>
            <Input
              type="number"
              value={tarifCBM}
              onChange={(e) => setTarifCBM(e.target.value)}
              placeholder="Ex: 210000"
              className="bg-secondary border-border"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Ruler className="h-4 w-4 text-muted-foreground" />
              Dimensions du colis (en cm)
            </Label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">Longueur</Label>
                <Input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="150"
                  className="bg-secondary border-border"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">Largeur</Label>
                <Input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="55"
                  className="bg-secondary border-border"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">Hauteur</Label>
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="63.5"
                  className="bg-secondary border-border"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={calculateCost}
              disabled={!isValid}
              className="flex-1 gradient-ship text-primary-foreground hover:opacity-90 transition-opacity gap-2"
            >
              <Calculator className="h-5 w-5" />
              Calculer
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
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 bg-card border border-border rounded-2xl p-6 animate-fade-up glow-ship">
            <h2 className="font-display text-xl font-bold text-foreground mb-4 text-center">
              Résultat
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Volume du colis</span>
                <span className="font-semibold text-foreground">
                  {formatNumber(result.volume, 4)} m³
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Coût total</span>
                <span className="font-display text-2xl font-bold text-gradient-ship">
                  {formatNumber(result.cost)} {currency}
                </span>
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
        variant="ship"
      />
    </div>
  );
};
