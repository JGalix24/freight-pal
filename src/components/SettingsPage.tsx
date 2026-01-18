import { useState, useEffect } from "react";
import { ArrowLeft, Settings, DollarSign, RefreshCw, Globe, Moon, Sun } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { useCurrency, ExchangeRates } from "@/hooks/useCurrency";
import { useLanguage, LANGUAGES, Language } from "@/hooks/useLanguage";
import { toast } from "sonner";

interface SettingsPageProps {
  onBack: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const CURRENCIES = ["EUR", "USD", "GBP", "CAD", "FCFA", "ZAR", "TND", "MAD", "GHS", "KES"];

const CURRENCY_LABELS: Record<string, string> = {
  EUR: "Euro (€)",
  USD: "Dollar US ($)",
  GBP: "Livre sterling (£)",
  CAD: "Dollar canadien ($)",
  FCFA: "Franc CFA",
  ZAR: "Rand sud-africain (R)",
  TND: "Dinar tunisien",
  MAD: "Dirham marocain",
  GHS: "Cedi ghanéen (₵)",
  KES: "Shilling kényan (KSh)",
};

export const SettingsPage = ({ onBack, isDark, onToggleTheme }: SettingsPageProps) => {
  const { rates, manualRates, useManual, lastUpdate, isLoading, fetchRates, saveManualRates } = useCurrency();
  const { language, setLanguage, t, getDateLocale } = useLanguage();
  
  const [localManualRates, setLocalManualRates] = useState<ExchangeRates>({});
  const [localUseManual, setLocalUseManual] = useState(false);

  useEffect(() => {
    setLocalManualRates(Object.keys(manualRates).length > 0 ? manualRates : rates);
    setLocalUseManual(useManual);
  }, [rates, manualRates, useManual]);

  const handleFetchRates = async () => {
    const success = await fetchRates();
    if (success) {
      toast.success(t.ratesUpdated);
    } else {
      toast.error(t.errorFetchingRates);
    }
  };

  const handleSaveManualRates = () => {
    saveManualRates(localManualRates, localUseManual);
    toast.success(t.ratesSaved);
  };

  const handleRateChange = (currency: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setLocalManualRates(prev => ({
        ...prev,
        [currency]: numValue,
      }));
    }
  };

  return (
    <div className="min-h-screen gradient-background">
      {/* Header */}
      <header className="p-4 md:p-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="hidden sm:inline">{t.back}</span>
        </button>
        <Logo />
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Settings className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{t.settings}</h1>
        </div>

        {/* Language Card */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">{t.language}</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.value}
                onClick={() => setLanguage(lang.value)}
                className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                  language === lang.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-secondary hover:bg-muted"
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="font-medium">{lang.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Theme Card */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-4">
            {isDark ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
            <h2 className="text-xl font-semibold text-foreground">{t.theme}</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => isDark && onToggleTheme()}
              className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                !isDark
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-secondary hover:bg-muted"
              }`}
            >
              <Sun className="w-5 h-5" />
              <span className="font-medium">{t.lightMode}</span>
            </button>
            <button
              onClick={() => !isDark && onToggleTheme()}
              className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                isDark
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-secondary hover:bg-muted"
              }`}
            >
              <Moon className="w-5 h-5" />
              <span className="font-medium">{t.darkMode}</span>
            </button>
          </div>
        </div>

        {/* Exchange Rates Card */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">{t.exchangeRates}</h2>
            </div>
            <button
              onClick={handleFetchRates}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">{t.refresh}</span>
            </button>
          </div>

          {lastUpdate && (
            <p className="text-sm text-muted-foreground mb-4">
              {t.lastUpdate}: {new Date(lastUpdate).toLocaleString(getDateLocale())}
            </p>
          )}

          {/* Toggle manual rates */}
          <div className="flex items-center gap-3 mb-6 p-4 bg-muted/50 rounded-lg">
            <input
              type="checkbox"
              id="useManual"
              checked={localUseManual}
              onChange={(e) => setLocalUseManual(e.target.checked)}
              className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="useManual" className="text-foreground">
              {t.useManualRates}
            </label>
          </div>

          {/* Rates table */}
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t.baseCurrency} (FCFA = 655.957)
            </p>

            <div className="grid gap-3">
              {CURRENCIES.filter(c => c !== "EUR").map((currency) => (
                <div key={currency} className="flex items-center gap-4 p-3 bg-secondary rounded-lg">
                  <div className="flex-1">
                    <span className="font-semibold text-foreground">{currency}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {CURRENCY_LABELS[currency]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      API: {rates[currency]?.toFixed(4) || "N/A"}
                    </span>
                    <input
                      type="number"
                      step="0.0001"
                      value={localManualRates[currency] || ""}
                      onChange={(e) => handleRateChange(currency, e.target.value)}
                      className="w-24 px-3 py-2 bg-background border border-border rounded-lg text-foreground text-right"
                      disabled={!localUseManual}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save button */}
          <button
            onClick={handleSaveManualRates}
            className="w-full mt-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors"
          >
            {t.saveRates}
          </button>
        </div>
      </main>
    </div>
  );
};
