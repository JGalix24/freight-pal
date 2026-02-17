import { useState } from "react";
import { ArrowLeft, Package, Calculator, RotateCcw, Ship, Plane, Plus, Trash2, Boxes, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "./ThemeToggle";
import { CurrencySelect } from "./CurrencySelect";
import { ConfirmModal } from "./ConfirmModal";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CountrySelect, COUNTRIES, getCountryPreposition } from "./CountrySelect";
import { useLanguage } from "@/hooks/useLanguage";
import { getTransitLabel } from "@/lib/transitTime";
import { cn } from "@/lib/utils";

interface MultiPackageCalculatorProps {
  onBack: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

interface PackageItem {
  id: number;
  length: string;
  width: string;
  height: string;
  weight: string;
  quantity: string;
}

interface PackageResult {
  id: number;
  volume: number;
  totalVolume: number;
  weight: number;
  totalWeight: number;
  shipCost: number;
  planeCost: number;
  quantity: number;
}

export const MultiPackageCalculator = ({ onBack, isDark, onToggleTheme }: MultiPackageCalculatorProps) => {
  const { t, language } = useLanguage();
  const [currency, setCurrency] = useState("FCFA");
  const [country, setCountry] = useState("TG");
  const [shipTarifCBM, setShipTarifCBM] = useState("");
  const [planeTarifKg, setPlaneTarifKg] = useState("");
  
  const [packages, setPackages] = useState<PackageItem[]>([
    { id: 1, length: "", width: "", height: "", weight: "", quantity: "1" }
  ]);
  
  const [results, setResults] = useState<{
    packages: PackageResult[];
    totalShipCost: number;
    totalPlaneCost: number;
    totalVolume: number;
    totalWeight: number;
    totalPackages: number;
  } | null>(null);
  
  const [showModal, setShowModal] = useState(false);

  const addPackage = () => {
    const newId = Math.max(...packages.map(p => p.id)) + 1;
    setPackages([...packages, { id: newId, length: "", width: "", height: "", weight: "", quantity: "1" }]);
  };

  const removePackage = (id: number) => {
    if (packages.length > 1) {
      setPackages(packages.filter(p => p.id !== id));
    }
  };

  const updatePackage = (id: number, field: keyof PackageItem, value: string) => {
    setPackages(packages.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const calculateCosts = () => {
    const shipTarif = parseFloat(shipTarifCBM);
    const planeTarif = parseFloat(planeTarifKg);
    if (shipTarif <= 0 && planeTarif <= 0) return;

    const packageResults: PackageResult[] = [];
    let totalShipCost = 0, totalPlaneCost = 0, totalVolume = 0, totalWeight = 0, totalPackages = 0;

    packages.forEach(pkg => {
      const l = parseFloat(pkg.length) || 0;
      const w = parseFloat(pkg.width) || 0;
      const h = parseFloat(pkg.height) || 0;
      const weight = parseFloat(pkg.weight) || 0;
      const qty = parseInt(pkg.quantity) || 1;

      if ((l > 0 && w > 0 && h > 0) || weight > 0) {
        const volume = (l * w * h) / 1000000;
        const pkgTotalVolume = volume * qty;
        const pkgTotalWeight = weight * qty;
        const shipCost = shipTarif > 0 ? pkgTotalVolume * shipTarif : 0;
        const planeCost = planeTarif > 0 ? pkgTotalWeight * planeTarif : 0;

        packageResults.push({ id: pkg.id, volume, totalVolume: pkgTotalVolume, weight, totalWeight: pkgTotalWeight, shipCost, planeCost, quantity: qty });
        totalShipCost += shipCost;
        totalPlaneCost += planeCost;
        totalVolume += pkgTotalVolume;
        totalWeight += pkgTotalWeight;
        totalPackages += qty;
      }
    });

    if (packageResults.length > 0) {
      setResults({ packages: packageResults, totalShipCost, totalPlaneCost, totalVolume, totalWeight, totalPackages });
    }
  };

  const resetForm = () => {
    setCurrency("FCFA");
    setCountry("TG");
    setShipTarifCBM("");
    setPlaneTarifKg("");
    setPackages([{ id: 1, length: "", width: "", height: "", weight: "", quantity: "1" }]);
    setResults(null);
    setShowModal(false);
  };

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  const hasValidPackage = packages.some(pkg => {
    const l = parseFloat(pkg.length) || 0;
    const w = parseFloat(pkg.width) || 0;
    const h = parseFloat(pkg.height) || 0;
    const weight = parseFloat(pkg.weight) || 0;
    return (l > 0 && w > 0 && h > 0) || weight > 0;
  });

  const hasTarif = parseFloat(shipTarifCBM) > 0 || parseFloat(planeTarifKg) > 0;
  const isValid = hasValidPackage && hasTarif;

  return (
    <div className="min-h-screen gradient-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
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
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-xl">
            <Boxes className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">{t.multiTitle}</h1>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 mb-6 animate-fade-up">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">{t.applicableRates}</h2>
          <div className="mb-4">
            <CurrencySelect value={currency} onChange={setCurrency} />
          </div>
          <div className="mb-4">
            <CountrySelect value={country} onChange={setCountry} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground">
                <Ship className="h-4 w-4 text-ship" />
                {t.shipCBMRate}
              </Label>
              <Input type="number" value={shipTarifCBM} onChange={(e) => setShipTarifCBM(e.target.value)} placeholder="Ex: 210000" className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground">
                <Plane className="h-4 w-4 text-plane" />
                {t.planeRate}
              </Label>
              <Input type="number" value={planeTarifKg} onChange={(e) => setPlaneTarifKg(e.target.value)} placeholder="Ex: 3000" className="bg-secondary border-border" />
            </div>
          </div>
        </div>

        <div className="space-y-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-foreground">{t.packageList} ({packages.length})</h2>
            <Button onClick={addPackage} variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              {t.addPackage}
            </Button>
          </div>

          {packages.map((pkg, index) => (
            <div key={pkg.id} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">{t.package} #{index + 1}</span>
                </div>
                {packages.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removePackage(pkg.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">{t.length} (cm)</Label>
                  <Input type="number" value={pkg.length} onChange={(e) => updatePackage(pkg.id, "length", e.target.value)} placeholder="150" className="bg-secondary border-border" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">{t.width} (cm)</Label>
                  <Input type="number" value={pkg.width} onChange={(e) => updatePackage(pkg.id, "width", e.target.value)} placeholder="55" className="bg-secondary border-border" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">{t.height} (cm)</Label>
                  <Input type="number" value={pkg.height} onChange={(e) => updatePackage(pkg.id, "height", e.target.value)} placeholder="63.5" className="bg-secondary border-border" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">{t.weight} (kg)</Label>
                  <Input type="number" value={pkg.weight} onChange={(e) => updatePackage(pkg.id, "weight", e.target.value)} placeholder="25" className="bg-secondary border-border" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">{t.quantity}</Label>
                  <Input type="number" value={pkg.quantity} onChange={(e) => updatePackage(pkg.id, "quantity", e.target.value)} placeholder="1" min="1" className="bg-secondary border-border" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <Button onClick={calculateCosts} disabled={!isValid} className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-primary-foreground hover:opacity-90 transition-opacity gap-2">
            <Calculator className="h-5 w-5" />
            {t.calculateTotal}
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(true)} className="gap-2">
            <RotateCcw className="h-5 w-5" />
            {t.reset}
          </Button>
        </div>

        {results && (
          <div className="mt-8 space-y-6 animate-fade-up">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-primary-foreground">
              <h2 className="font-display text-2xl font-bold mb-4 text-center">{t.summary} - {results.totalPackages} {t.package}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {parseFloat(shipTarifCBM) > 0 && (
                  <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Ship className="h-5 w-5" />
                      <span className="font-medium">{t.totalShip}</span>
                    </div>
                    <p className="text-sm opacity-80 mb-1">{t.totalVolumeLabel}: {formatNumber(results.totalVolume, 4)} m³</p>
                    <p className="font-display text-3xl font-bold">{formatNumber(results.totalShipCost)} {currency}</p>
                  </div>
                )}
                {parseFloat(planeTarifKg) > 0 && (
                  <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Plane className="h-5 w-5" />
                      <span className="font-medium">{t.totalPlane}</span>
                    </div>
                    <p className="text-sm opacity-80 mb-1">{t.totalWeightLabel}: {formatNumber(results.totalWeight)} kg</p>
                    <p className="font-display text-3xl font-bold">{formatNumber(results.totalPlaneCost)} {currency}</p>
                  </div>
                )}
              </div>

              {parseFloat(shipTarifCBM) > 0 && parseFloat(planeTarifKg) > 0 && results.totalShipCost !== results.totalPlaneCost && (
                <div className="mt-4 text-center bg-primary-foreground/20 rounded-lg p-3">
                  <p className="font-medium">
                    {results.totalShipCost < results.totalPlaneCost ? (
                      <>🚢 {t.shipCheaperBy} <strong>{formatNumber(results.totalPlaneCost - results.totalShipCost)} {currency}</strong></>
                    ) : (
                      <>✈️ {t.planeCheaperBy} <strong>{formatNumber(results.totalShipCost - results.totalPlaneCost)} {currency}</strong></>
                    )}
                  </p>
                </div>
              )}

              {/* Arrival & Payment messages */}
              {(() => {
                const c = COUNTRIES.find(c => c.code === country);
                const dest = c ? getCountryPreposition(c, language) : "";
                return (
                  <div className="mt-4 space-y-2">
                    {parseFloat(shipTarifCBM) > 0 && (
                      <div className="bg-primary-foreground/15 rounded-lg p-3 text-center">
                        <p className="text-sm font-medium">{t.arrivalMessage} {dest} dans {getTransitLabel("ship", t.days)} (Bateau)</p>
                        <p className="text-sm mt-1 flex items-center justify-center gap-1">
                          <Wallet className="h-3 w-3" />
                          {t.paymentMessage} {formatNumber(results.totalShipCost)} {currency}
                        </p>
                      </div>
                    )}
                    {parseFloat(planeTarifKg) > 0 && (
                      <div className="bg-primary-foreground/15 rounded-lg p-3 text-center">
                        <p className="text-sm font-medium">{t.arrivalMessage} {dest} dans {getTransitLabel("plane", t.days)} (Avion)</p>
                        <p className="text-sm mt-1 flex items-center justify-center gap-1">
                          <Wallet className="h-3 w-3" />
                          {t.paymentMessage} {formatNumber(results.totalPlaneCost)} {currency}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">{t.detailPerPackage}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-2 text-muted-foreground font-medium">{t.package}</th>
                      <th className="text-left py-2 px-2 text-muted-foreground font-medium">{t.qty}</th>
                      <th className="text-left py-2 px-2 text-muted-foreground font-medium">{t.volume}</th>
                      <th className="text-left py-2 px-2 text-muted-foreground font-medium">{t.weight}</th>
                      {parseFloat(shipTarifCBM) > 0 && <th className="text-right py-2 px-2 text-ship font-medium">{t.shipResult}</th>}
                      {parseFloat(planeTarifKg) > 0 && <th className="text-right py-2 px-2 text-plane font-medium">{t.planeResult}</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {results.packages.map((pkg, index) => (
                      <tr key={pkg.id} className="border-b border-border/50">
                        <td className="py-2 px-2 text-foreground">#{index + 1}</td>
                        <td className="py-2 px-2 text-foreground">×{pkg.quantity}</td>
                        <td className="py-2 px-2 text-foreground">{formatNumber(pkg.totalVolume, 4)} m³</td>
                        <td className="py-2 px-2 text-foreground">{formatNumber(pkg.totalWeight)} kg</td>
                        {parseFloat(shipTarifCBM) > 0 && <td className="py-2 px-2 text-right font-medium text-ship">{formatNumber(pkg.shipCost)} {currency}</td>}
                        {parseFloat(planeTarifKg) > 0 && <td className="py-2 px-2 text-right font-medium text-plane">{formatNumber(pkg.planeCost)} {currency}</td>}
                      </tr>
                    ))}
                    <tr className="font-bold">
                      <td className="py-3 px-2 text-foreground">TOTAL</td>
                      <td className="py-3 px-2 text-foreground">{results.totalPackages}</td>
                      <td className="py-3 px-2 text-foreground">{formatNumber(results.totalVolume, 4)} m³</td>
                      <td className="py-3 px-2 text-foreground">{formatNumber(results.totalWeight)} kg</td>
                      {parseFloat(shipTarifCBM) > 0 && <td className="py-3 px-2 text-right text-ship">{formatNumber(results.totalShipCost)} {currency}</td>}
                      {parseFloat(planeTarifKg) > 0 && <td className="py-3 px-2 text-right text-plane">{formatNumber(results.totalPlaneCost)} {currency}</td>}
                    </tr>
                  </tbody>
                </table>
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
