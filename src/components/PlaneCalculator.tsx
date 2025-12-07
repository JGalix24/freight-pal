import { useState } from "react";
import { ArrowLeft, Plane, Calculator, RotateCcw, Weight, FileDown, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "./ThemeToggle";
import { CurrencySelect } from "./CurrencySelect";
import { ConfirmModal } from "./ConfirmModal";
import { useHistory } from "@/hooks/useHistory";
import { exportToPdf } from "@/lib/exportPdf";
import { getTransitLabel } from "@/lib/transitTime";
import { toast } from "sonner";

interface PlaneCalculatorProps {
  onBack: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const PlaneCalculator = ({ onBack, isDark, onToggleTheme }: PlaneCalculatorProps) => {
  const [currency, setCurrency] = useState("FCFA");
  const [tarifKg, setTarifKg] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<{ weight: number; cost: number } | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const { saveToHistory } = useHistory();

  const calculateCost = () => {
    const w = parseFloat(weight);
    const tarif = parseFloat(tarifKg);

    if (w > 0 && tarif > 0) {
      const cost = w * tarif;
      setResult({ weight: w, cost });
      
      // Save to history
      saveToHistory({
        type: "plane",
        currency,
        data: { tariff: tarif, weight: w },
        result: { cost: formatNumber(cost) },
      });
    }
  };

  const handleExportPdf = () => {
    if (!result) return;
    
    exportToPdf({
      title: "Calcul Avion (Poids)",
      type: "plane",
      currency,
      date: new Date().toLocaleString("fr-FR"),
      inputs: [
        { label: "Tarif/kg", value: `${tarifKg} ${currency}` },
        { label: "Poids", value: `${weight} kg` },
      ],
      results: [
        { label: "Coût total", value: `${formatNumber(result.cost)} ${currency}` },
      ],
      transitTime: getTransitLabel("plane"),
    });
    
    toast.success("PDF exporté !");
  };

  const resetForm = () => {
    setCurrency("FCFA");
    setTarifKg("");
    setWeight("");
    setResult(null);
    setShowModal(false);
  };

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString("fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const isValid = parseFloat(weight) > 0 && parseFloat(tarifKg) > 0;

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
          <div className="gradient-plane p-3 rounded-xl">
            <Plane className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-gradient-plane">
            Calcul Avion
          </h1>
        </div>

        {/* Form */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <CurrencySelect value={currency} onChange={setCurrency} />

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Weight className="h-4 w-4 text-muted-foreground" />
              Tarif par kilogramme
            </Label>
            <Input
              type="number"
              value={tarifKg}
              onChange={(e) => setTarifKg(e.target.value)}
              placeholder="Ex: 3000"
              className="bg-secondary border-border"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Weight className="h-4 w-4 text-muted-foreground" />
              Poids du colis (en kg)
            </Label>
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Ex: 25"
              className="bg-secondary border-border"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={calculateCost}
              disabled={!isValid}
              className="flex-1 gradient-plane text-primary-foreground hover:opacity-90 transition-opacity gap-2"
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
          <div className="mt-6 bg-card border border-border rounded-2xl p-6 animate-fade-up glow-plane">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-foreground">
                Résultat
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPdf}
                className="gap-2"
              >
                <FileDown className="h-4 w-4" />
                PDF
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Poids du colis</span>
                <span className="font-semibold text-foreground">
                  {formatNumber(result.weight)} kg
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Coût total</span>
                <span className="font-display text-2xl font-bold text-gradient-plane">
                  {formatNumber(result.cost)} {currency}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Délai estimé
                </span>
                <span className="font-semibold text-plane">
                  {getTransitLabel("plane")}
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
        variant="plane"
      />
    </div>
  );
};
