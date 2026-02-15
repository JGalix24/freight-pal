import { useState } from "react";
import { ArrowLeft, Ship, Calculator, RotateCcw, Ruler, Package, FileDown, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "./ThemeToggle";
import { CurrencySelect } from "./CurrencySelect";
import { ConfirmModal } from "./ConfirmModal";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useHistory } from "@/hooks/useHistory";
import { useLanguage } from "@/hooks/useLanguage";
import { exportToPdf } from "@/lib/exportPdf";
import { getTransitLabel } from "@/lib/transitTime";
import { toast } from "sonner";

interface ShipCalculatorProps {
  onBack: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const ShipCalculator = ({ onBack, isDark, onToggleTheme }: ShipCalculatorProps) => {
  const { t } = useLanguage();
  const [currency, setCurrency] = useState("FCFA");
  const [tarifCBM, setTarifCBM] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{ volume: number; cost: number } | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const { saveToHistory } = useHistory();

  const calculateCost = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const tarif = parseFloat(tarifCBM);

    if (l > 0 && w > 0 && h > 0 && tarif > 0) {
      const volume = (l * w * h) / 1000000;
      const cost = volume * tarif;
      setResult({ volume, cost });
      
      saveToHistory({
        type: "ship",
        currency,
        data: { tariff: tarif, length: l, width: w, height: h },
        result: { volume: formatNumber(volume, 4), cost: formatNumber(cost) },
      });
    }
  };

  const handleExportPdf = () => {
    if (!result) return;
    
    exportToPdf({
      title: t.shipCalc,
      type: "ship",
      currency,
      date: new Date().toLocaleString("fr-FR"),
      inputs: [
        { label: t.cbmRate, value: `${tarifCBM} ${currency}` },
        { label: t.dimensions, value: `${length} × ${width} × ${height} cm` },
      ],
      results: [
        { label: t.volume, value: `${formatNumber(result.volume, 4)} m³` },
        { label: t.totalCost, value: `${formatNumber(result.cost)} ${currency}` },
      ],
      transitTime: getTransitLabel("ship", t.days),
    });
    
    toast.success(t.pdfExported);
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
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
            {t.back}
          </Button>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mb-8 animate-fade-up">
          <div className="gradient-ship p-3 rounded-xl">
            <Ship className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-gradient-ship">{t.shipCalc}</h1>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <CurrencySelect value={currency} onChange={setCurrency} />

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Package className="h-4 w-4 text-muted-foreground" />
              {t.cbmRatePerm3}
            </Label>
            <Input type="number" value={tarifCBM} onChange={(e) => setTarifCBM(e.target.value)} placeholder="Ex: 210000" className="bg-secondary border-border" />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Ruler className="h-4 w-4 text-muted-foreground" />
              {t.dimensionsCmLabel}
            </Label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">{t.length}</Label>
                <Input type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="150" className="bg-secondary border-border" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">{t.width}</Label>
                <Input type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="55" className="bg-secondary border-border" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">{t.height}</Label>
                <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="63.5" className="bg-secondary border-border" />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={calculateCost} disabled={!isValid} className="flex-1 gradient-ship text-primary-foreground hover:opacity-90 transition-opacity gap-2">
              <Calculator className="h-5 w-5" />
              {t.calculate}
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(true)} className="gap-2">
              <RotateCcw className="h-5 w-5" />
              {t.reset}
            </Button>
          </div>
        </div>

        {result && (
          <div className="mt-6 bg-card border border-border rounded-2xl p-6 animate-fade-up glow-ship">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-foreground">{t.results}</h2>
              <Button variant="outline" size="sm" onClick={handleExportPdf} className="gap-2">
                <FileDown className="h-4 w-4" />
                PDF
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">{t.packageVolume}</span>
                <span className="font-semibold text-foreground">{formatNumber(result.volume, 4)} m³</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">{t.totalCost}</span>
                <span className="font-display text-2xl font-bold text-gradient-ship">{formatNumber(result.cost)} {currency}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {t.estimatedDelay}
                </span>
                <span className="font-semibold text-ship">{getTransitLabel("ship", t.days)}</span>
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-muted-foreground text-sm mt-8">By Mr.G</p>
      </div>

      <ConfirmModal isOpen={showModal} onConfirm={resetForm} onCancel={() => setShowModal(false)} variant="ship" />
    </div>
  );
};
