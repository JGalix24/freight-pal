import { useState } from "react";
import { ArrowLeft, Plane, Calculator, RotateCcw, Weight, FileDown, Clock, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "./ThemeToggle";
import { CurrencySelect } from "./CurrencySelect";
import { CountrySelect, COUNTRIES, CUSTOM_COUNTRY_CODE, getCountryPreposition } from "./CountrySelect";
import { ConfirmModal } from "./ConfirmModal";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useHistory } from "@/hooks/useHistory";
import { useLanguage } from "@/hooks/useLanguage";
import { exportToPdf } from "@/lib/exportPdf";
import { getTransitLabel } from "@/lib/transitTime";
import { toast } from "sonner";

interface PlaneCalculatorProps {
  onBack: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const PlaneCalculator = ({ onBack, isDark, onToggleTheme }: PlaneCalculatorProps) => {
  const { t, language } = useLanguage();
  const [currency, setCurrency] = useState("FCFA");
  const [country, setCountry] = useState("TG");
  const [customCountry, setCustomCountry] = useState("");
  const [tarifKg, setTarifKg] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<{ weight: number; cost: number } | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const { saveToHistory } = useHistory();

  const getArrivalText = () => {
    if (country === CUSTOM_COUNTRY_CODE) {
      if (!customCountry) return "";
      return `${t.arrivalMessage} en ${customCountry} dans ${getTransitLabel("plane", t.days)}`;
    }
    const c = COUNTRIES.find(c => c.code === country);
    if (!c) return "";
    const dest = getCountryPreposition(c, language);
    return `${t.arrivalMessage} ${dest} dans ${getTransitLabel("plane", t.days)}`;
  };

  const getPaymentText = (cost: string) => {
    return `${t.paymentMessage} ${cost} ${currency}`;
  };

  const calculateCost = () => {
    const w = parseFloat(weight);
    const tarif = parseFloat(tarifKg);

    if (w > 0 && tarif > 0) {
      const cost = w * tarif;
      setResult({ weight: w, cost });
      
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
      title: t.planeCalc,
      type: "plane",
      currency,
      date: new Date().toLocaleString("fr-FR"),
      inputs: [
        { label: t.ratePerKg, value: `${formatNumber(parseFloat(tarifKg))} ${currency}` },
        { label: t.weight, value: `${weight} kg` },
      ],
      results: [
        { label: t.totalCost, value: `${formatNumber(result.cost)} ${currency}` },
      ],
      transitTime: getTransitLabel("plane", t.days),
      arrivalMessage: getArrivalText(),
      paymentMessage: getPaymentText(formatNumber(result.cost)),
    });
    
    toast.success(t.pdfExported);
  };

  const resetForm = () => {
    setCurrency("FCFA");
    setCountry("TG");
    setCustomCountry("");
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
          <div className="gradient-plane p-3 rounded-xl">
            <Plane className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-gradient-plane">{t.planeCalc}</h1>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <CurrencySelect value={currency} onChange={setCurrency} />
          <CountrySelect value={country} onChange={setCountry} customCountry={customCountry} onCustomCountryChange={setCustomCountry} />

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Weight className="h-4 w-4 text-muted-foreground" />
              {t.ratePerKg}
            </Label>
            <Input type="number" value={tarifKg} onChange={(e) => setTarifKg(e.target.value)} placeholder="Ex: 3000" className="bg-secondary border-border" />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Weight className="h-4 w-4 text-muted-foreground" />
              {t.packageWeight}
            </Label>
            <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Ex: 25" className="bg-secondary border-border" />
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={calculateCost} disabled={!isValid} className="flex-1 gradient-plane text-primary-foreground hover:opacity-90 transition-opacity gap-2">
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
          <div className="mt-6 bg-card border border-border rounded-2xl p-6 animate-fade-up glow-plane">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-foreground">{t.results}</h2>
              <Button variant="outline" size="sm" onClick={handleExportPdf} className="gap-2">
                <FileDown className="h-4 w-4" />
                PDF
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">{t.packageWeight}</span>
                <span className="font-semibold text-foreground">{formatNumber(result.weight)} kg</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">{t.totalCost}</span>
                <span className="font-display text-2xl font-bold text-gradient-plane">{formatNumber(result.cost)} {currency}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {t.estimatedDelay}
                </span>
                <span className="font-semibold text-plane">{getTransitLabel("plane", t.days)}</span>
              </div>
              <div className="bg-blue-500/10 rounded-lg p-3 text-center">
                <p className="text-sm font-medium text-blue-400">{getArrivalText()}</p>
              </div>
              <div className="bg-amber-500/10 rounded-lg p-3 text-center flex items-center justify-center gap-2">
                <Wallet className="h-4 w-4 text-amber-400" />
                <p className="text-sm font-medium text-amber-400">
                  {getPaymentText(formatNumber(result.cost))}
                </p>
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-muted-foreground text-sm mt-8">By Mr.G</p>
      </div>

      <ConfirmModal isOpen={showModal} onConfirm={resetForm} onCancel={() => setShowModal(false)} variant="plane" />
    </div>
  );
};
