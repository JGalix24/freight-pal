import { useState, useEffect } from "react";
import { ArrowLeft, RefreshCw, Save, Settings, DollarSign } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useCurrency, ExchangeRates } from "@/hooks/useCurrency";
import { toast } from "sonner";

interface SettingsPageProps {
  onBack: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const CURRENCIES = ["EUR", "USD", "GBP", "CAD", "FCFA"];

export const SettingsPage = ({ onBack, isDark, onToggleTheme }: SettingsPageProps) => {
  const { rates, manualRates, useManual, lastUpdate, isLoading, fetchRates, saveManualRates } = useCurrency();
  
  const [localManualRates, setLocalManualRates] = useState<ExchangeRates>({});
  const [localUseManual, setLocalUseManual] = useState(false);

  useEffect(() => {
    if (Object.keys(manualRates).length > 0) {
      setLocalManualRates(manualRates);
    } else {
      setLocalManualRates({ ...rates });
    }
    setLocalUseManual(useManual);
  }, [rates, manualRates, useManual]);

  const handleFetchRates = async () => {
    const success = await fetchRates();
    if (success) {
      toast.success("Taux de change mis à jour !");
      setLocalManualRates({ ...rates });
    } else {
      toast.error("Erreur lors de la récupération des taux");
    }
  };

  const handleSave = () => {
    saveManualRates(localManualRates, localUseManual);
    toast.success("Paramètres sauvegardés !");
  };

  const handleRateChange = (currency: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setLocalManualRates((prev) => ({ ...prev, [currency]: numValue }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Settings className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Paramètres</h1>
          <p className="text-muted-foreground">Configurez les taux de change</p>
        </div>

        {/* Exchange Rates Card */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Taux de change</h2>
            </div>
            <button
              onClick={handleFetchRates}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Actualiser</span>
            </button>
          </div>

          {lastUpdate && (
            <p className="text-sm text-muted-foreground mb-4">
              Dernière mise à jour: {new Date(lastUpdate).toLocaleString("fr-FR")}
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
              Utiliser les taux manuels
            </label>
          </div>

          {/* Rates table */}
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Base: 1 EUR = X devise (FCFA est fixé à 655.957)
            </p>
            
            {CURRENCIES.map((currency) => (
              <div key={currency} className="flex items-center gap-4">
                <span className="w-16 font-medium text-foreground">{currency}</span>
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-muted-foreground">API:</span>
                  <span className="text-foreground">{rates[currency]?.toFixed(4) || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Manuel:</span>
                  <input
                    type="number"
                    step="0.0001"
                    value={localManualRates[currency] || ""}
                    onChange={(e) => handleRateChange(currency, e.target.value)}
                    disabled={currency === "EUR"}
                    className="w-28 px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all hover:scale-[1.02]"
          >
            <Save className="w-5 h-5" />
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
};
