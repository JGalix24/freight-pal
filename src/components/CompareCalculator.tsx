import { useState } from "react";
import { ArrowLeft, Scale, Calculator, RotateCcw, Ship, Plane, TrendingDown, Ruler, Weight, DollarSign, FileDown, Clock, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "./ThemeToggle";
import { CurrencySelect } from "./CurrencySelect";
import { ConfirmModal } from "./ConfirmModal";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CountrySelect, COUNTRIES, CUSTOM_COUNTRY_CODE, getCountryPreposition } from "./CountrySelect";
import { useHistory } from "@/hooks/useHistory";
import { useLanguage } from "@/hooks/useLanguage";
import { exportToPdf } from "@/lib/exportPdf";
import { getTransitLabel, getTransitDifference } from "@/lib/transitTime";
import { toast } from "sonner";
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
  const { t, language } = useLanguage();
  const [currency, setCurrency] = useState("FCFA");
  const [country, setCountry] = useState("TG");
  const [customCountry, setCustomCountry] = useState("");
  const [shipTarifCBM, setShipTarifCBM] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [planeTarifKg, setPlaneTarifKg] = useState("");
  const [planeWeight, setPlaneWeight] = useState("");
  const [result, setResult] = useState<CompareResult | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const { saveToHistory } = useHistory();

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
      const winner = shipCost <= planeCost ? "ship" : "plane";
      const difference = Math.abs(shipCost - planeCost);
      const maxCost = Math.max(shipCost, planeCost);
      const percentage = maxCost > 0 ? (difference / maxCost) * 100 : 0;

      setResult({ shipCost, shipVolume: volume, planeCost, planeWeight: pWeight, winner, difference, percentage });
      
      saveToHistory({
        type: "compare",
        currency,
        data: { shipTariff: shipTarif, length: l, width: w, height: h, planeTariff: planeTarif, weight: pWeight },
        result: { shipCost: formatNumber(shipCost), planeCost: formatNumber(planeCost), winner, savings: formatNumber(percentage, 1) },
      });
    }
  };

  const handleExportPdf = () => {
    if (!result) return;
    
    exportToPdf({
      title: t.compareTitle,
      type: "compare",
      currency,
      date: new Date().toLocaleString("fr-FR"),
      inputs: [
        { label: `${t.ship} - ${t.cbmRate}`, value: `${shipTarifCBM} ${currency}` },
        { label: `${t.ship} - ${t.dimensions}`, value: `${length} × ${width} × ${height} cm` },
        { label: `${t.plane} - ${t.ratePerKg}`, value: `${planeTarifKg} ${currency}` },
        { label: `${t.plane} - ${t.weight}`, value: `${planeWeight} kg` },
      ],
      results: [
        { label: t.shipResult, value: `${formatNumber(result.shipCost)} ${currency}` },
        { label: t.planeResult, value: `${formatNumber(result.planeCost)} ${currency}` },
        { label: t.winner, value: result.winner === "ship" ? t.ship : t.plane },
        { label: t.savings, value: `${formatNumber(result.percentage, 1)}%` },
      ],
      transitTime: `${t.ship}: ${getTransitLabel("ship", t.days)} | ${t.plane}: ${getTransitLabel("plane", t.days)}`,
      arrivalMessage: (() => {
        if (country === CUSTOM_COUNTRY_CODE) {
          if (!customCountry) return "";
          const transitType = result.winner === "ship" ? "ship" : "plane";
          return `${t.arrivalMessage} en ${customCountry} dans ${getTransitLabel(transitType, t.days)}`;
        }
        const c = COUNTRIES.find(c => c.code === country);
        if (!c) return "";
        const dest = getCountryPreposition(c, language);
        const transitType = result.winner === "ship" ? "ship" : "plane";
        return `${t.arrivalMessage} ${dest} dans ${getTransitLabel(transitType, t.days)}`;
      })(),
      paymentMessage: `${t.paymentMessage} ${formatNumber(result.winner === "ship" ? result.shipCost : result.planeCost)} ${currency}`,
    });
    
    toast.success(t.pdfExported);
  };

  const resetForm = () => {
    setCurrency("FCFA");
    setCountry("TG");
    setCustomCountry("");
    setShipTarifCBM("");
    setLength("");
    setWidth("");
    setHeight("");
    setPlaneTarifKg("");
    setPlaneWeight("");
    setResult(null);
    setShowModal(false);
  };

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  const isShipValid = parseFloat(length) > 0 && parseFloat(width) > 0 && parseFloat(height) > 0 && parseFloat(shipTarifCBM) > 0;
  const isPlaneValid = parseFloat(planeWeight) > 0 && parseFloat(planeTarifKg) > 0;
  const isValid = isShipValid && isPlaneValid;

  return (
    <div className="min-h-screen gradient-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
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
          <div className="gradient-compare p-3 rounded-xl">
            <Scale className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-gradient-compare text-center">{t.compareTitle}</h1>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 mb-6 animate-fade-up">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-compare" />
            <span className="font-medium text-foreground">{t.commonCurrency} :</span>
            <div className="flex-1 max-w-xs">
              <CurrencySelect value={currency} onChange={setCurrency} />
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4 mb-6 animate-fade-up">
          <CountrySelect value={country} onChange={setCountry} customCountry={customCountry} onCustomCountryChange={setCustomCountry} />
        </div>

        <div className="grid md:grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {/* Ship Column */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="gradient-ship p-2 rounded-lg">
                  <Ship className="h-5 w-5 text-primary-foreground" />
                </div>
                <h2 className="font-display text-xl font-bold text-gradient-ship">{t.ship.toUpperCase()}</h2>
              </div>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {getTransitLabel("ship", t.days)}
              </span>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground text-sm">{t.cbmRatePerm3} {currency}</Label>
              <Input type="number" value={shipTarifCBM} onChange={(e) => setShipTarifCBM(e.target.value)} placeholder="Ex: 210000" className="bg-secondary border-border" />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground text-sm">
                <Ruler className="h-4 w-4 text-muted-foreground" />
                {t.dimensionsCmLabel}
              </Label>
              <div className="grid grid-cols-3 gap-2">
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

            {isShipValid && (
              <div className="mt-4 p-3 bg-secondary/50 rounded-lg border border-ship/30">
                <p className="text-sm text-muted-foreground">
                  {t.volume}: <span className="font-semibold text-foreground">{formatNumber((parseFloat(length) * parseFloat(width) * parseFloat(height)) / 1000000, 4)} m³</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {t.estimatedCost}: <span className="font-semibold text-ship">{formatNumber(((parseFloat(length) * parseFloat(width) * parseFloat(height)) / 1000000) * parseFloat(shipTarifCBM))} {currency}</span>
                </p>
              </div>
            )}
          </div>

          {/* Plane Column */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="gradient-plane p-2 rounded-lg">
                  <Plane className="h-5 w-5 text-primary-foreground" />
                </div>
                <h2 className="font-display text-xl font-bold text-gradient-plane">{t.plane.toUpperCase()}</h2>
              </div>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {getTransitLabel("plane", t.days)}
              </span>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground text-sm">{t.ratePerKg} {currency}</Label>
              <Input type="number" value={planeTarifKg} onChange={(e) => setPlaneTarifKg(e.target.value)} placeholder="Ex: 3000" className="bg-secondary border-border" />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground text-sm">
                <Weight className="h-4 w-4 text-muted-foreground" />
                {t.packageWeight}
              </Label>
              <Input type="number" value={planeWeight} onChange={(e) => setPlaneWeight(e.target.value)} placeholder="Ex: 25" className="bg-secondary border-border" />
            </div>

            {isPlaneValid && (
              <div className="mt-4 p-3 bg-secondary/50 rounded-lg border border-plane/30">
                <p className="text-sm text-muted-foreground">
                  {t.weight}: <span className="font-semibold text-foreground">{formatNumber(parseFloat(planeWeight))} kg</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {t.estimatedCost}: <span className="font-semibold text-plane">{formatNumber(parseFloat(planeWeight) * parseFloat(planeTarifKg))} {currency}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <Button onClick={calculateComparison} disabled={!isValid} className="flex-1 gradient-compare text-primary-foreground hover:opacity-90 transition-opacity gap-2">
            <Calculator className="h-5 w-5" />
            {t.calculateComparison}
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(true)} className="gap-2">
            <RotateCcw className="h-5 w-5" />
            {t.reset}
          </Button>
        </div>

        {result && (
          <div className="mt-8 space-y-6 animate-fade-up">
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={handleExportPdf} className="gap-2">
                <FileDown className="h-4 w-4" />
                {t.exportPdf}
              </Button>
            </div>

            <div className={cn("rounded-2xl p-8 text-center", result.winner === "ship" ? "gradient-ship glow-ship" : "gradient-plane glow-plane")}>
              <div className="flex items-center justify-center gap-3 mb-4">
                {result.winner === "ship" ? <Ship className="h-12 w-12 text-primary-foreground" /> : <Plane className="h-12 w-12 text-primary-foreground" />}
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                {result.winner === "ship" ? t.shipWins : t.planeWins} {t.isCheaper}
              </h3>
              <p className="text-primary-foreground/90 text-lg mb-1">{t.savingsOf}</p>
              <p className="text-primary-foreground text-4xl md:text-5xl font-display font-bold mb-2">{formatNumber(result.difference)} {currency}</p>
              <div className="flex items-center justify-center gap-2 text-primary-foreground/80">
                <TrendingDown className="h-5 w-5" />
                <span className="text-lg">{formatNumber(result.percentage, 1)}% {t.lessPercent}</span>
              </div>
              {result.winner === "plane" && (
                <p className="mt-3 text-primary-foreground/70 text-sm flex items-center justify-center gap-1">
                  <Clock className="h-4 w-4" />
                  {getTransitDifference(`${t.days} ${t.faster}`)} {t.fasterByPlane} !
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className={cn("bg-card border-2 rounded-xl p-5", result.winner === "ship" ? "border-ship glow-ship" : "border-border")}>
                <div className="flex items-center gap-2 mb-3">
                  <Ship className="h-5 w-5 text-ship" />
                  <span className="font-semibold text-foreground">{t.ship} (CBM)</span>
                  {result.winner === "ship" && (
                    <span className="ml-auto text-xs gradient-ship text-primary-foreground px-2 py-1 rounded-full font-medium">✓ {t.cheaper}</span>
                  )}
                </div>
                <div className="space-y-1 mb-3">
                  <p className="text-sm text-muted-foreground">{t.cbmRate}: <span className="text-foreground">{formatNumber(parseFloat(shipTarifCBM))} {currency}/m³</span></p>
                  <p className="text-sm text-muted-foreground">{t.volume}: <span className="text-foreground">{formatNumber(result.shipVolume, 4)} m³</span></p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{t.estimatedDelay}: <span className="text-foreground">{getTransitLabel("ship", t.days)}</span></p>
                </div>
                <div className="pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-1">{t.totalCost}</p>
                  <p className={cn("font-display text-2xl font-bold", result.winner === "ship" ? "text-gradient-ship" : "text-foreground")}>{formatNumber(result.shipCost)} {currency}</p>
                </div>
              </div>

              <div className={cn("bg-card border-2 rounded-xl p-5", result.winner === "plane" ? "border-plane glow-plane" : "border-border")}>
                <div className="flex items-center gap-2 mb-3">
                  <Plane className="h-5 w-5 text-plane" />
                  <span className="font-semibold text-foreground">{t.plane} ({t.weight})</span>
                  {result.winner === "plane" && (
                    <span className="ml-auto text-xs gradient-plane text-primary-foreground px-2 py-1 rounded-full font-medium">✓ {t.cheaper}</span>
                  )}
                </div>
                <div className="space-y-1 mb-3">
                  <p className="text-sm text-muted-foreground">{t.ratePerKg}: <span className="text-foreground">{formatNumber(parseFloat(planeTarifKg))} {currency}/kg</span></p>
                  <p className="text-sm text-muted-foreground">{t.weight}: <span className="text-foreground">{formatNumber(result.planeWeight)} kg</span></p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{t.estimatedDelay}: <span className="text-foreground">{getTransitLabel("plane", t.days)}</span></p>
                </div>
                <div className="pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-1">{t.totalCost}</p>
                  <p className={cn("font-display text-2xl font-bold", result.winner === "plane" ? "text-gradient-plane" : "text-foreground")}>{formatNumber(result.planeCost)} {currency}</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-2">{t.calculationDetails} :</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p>🚢 <strong>{t.ship}:</strong></p>
                  <p className="ml-4">{t.volume} = ({length} × {width} × {height}) / 1 000 000 = {formatNumber(result.shipVolume, 4)} m³</p>
                  <p className="ml-4">{t.totalCost} = {formatNumber(result.shipVolume, 4)} × {formatNumber(parseFloat(shipTarifCBM))} = <strong>{formatNumber(result.shipCost)} {currency}</strong></p>
                </div>
                <div>
                  <p>✈️ <strong>{t.plane}:</strong></p>
                  <p className="ml-4">{t.weight} = {formatNumber(result.planeWeight)} kg</p>
                  <p className="ml-4">{t.totalCost} = {formatNumber(result.planeWeight)} × {formatNumber(parseFloat(planeTarifKg))} = <strong>{formatNumber(result.planeCost)} {currency}</strong></p>
                </div>
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-muted-foreground text-sm mt-8">By Mr.G</p>
      </div>

      <ConfirmModal isOpen={showModal} onConfirm={resetForm} onCancel={() => setShowModal(false)} variant="compare" />
    </div>
  );
};
