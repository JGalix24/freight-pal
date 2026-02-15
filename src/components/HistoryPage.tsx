import { ArrowLeft, Trash2, Ship, Plane, Scale, Boxes, FileDown, Clock } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useHistory, HistoryEntry } from "@/hooks/useHistory";
import { useLanguage } from "@/hooks/useLanguage";
import { ConfirmModal } from "./ConfirmModal";
import { useState } from "react";
import { exportToPdf } from "@/lib/exportPdf";
import { getTransitLabel } from "@/lib/transitTime";
import { toast } from "sonner";

interface HistoryPageProps {
  onBack: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const typeIcons = {
  ship: Ship,
  plane: Plane,
  compare: Scale,
  multi: Boxes,
};

const typeColors = {
  ship: "text-ship",
  plane: "text-plane",
  compare: "text-compare",
  multi: "text-multi",
};

export const HistoryPage = ({ onBack, isDark, onToggleTheme }: HistoryPageProps) => {
  const { t } = useLanguage();
  const { history, deleteFromHistory, clearHistory } = useHistory();
  const [showClearModal, setShowClearModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const typeLabels: Record<string, string> = {
    ship: t.ship,
    plane: t.plane,
    compare: t.compare,
    multi: t.multiPackage,
  };

  const handleExport = (entry: HistoryEntry) => {
    const inputs: { label: string; value: string }[] = [];
    const results: { label: string; value: string }[] = [];
    
    if (entry.type === "ship") {
      inputs.push(
        { label: t.cbmRate, value: `${entry.data.tariff} ${entry.currency}` },
        { label: t.dimensions, value: `${entry.data.length} × ${entry.data.width} × ${entry.data.height} cm` }
      );
      results.push(
        { label: t.volume, value: `${entry.result.volume} m³` },
        { label: t.totalCost, value: `${entry.result.cost} ${entry.currency}` }
      );
    } else if (entry.type === "plane") {
      inputs.push(
        { label: t.ratePerKg, value: `${entry.data.tariff} ${entry.currency}` },
        { label: t.weight, value: `${entry.data.weight} kg` }
      );
      results.push(
        { label: t.totalCost, value: `${entry.result.cost} ${entry.currency}` }
      );
    } else if (entry.type === "compare") {
      inputs.push(
        { label: `${t.ship} - ${t.cbmRate}`, value: `${entry.data.shipTariff} ${entry.currency}` },
        { label: `${t.ship} - ${t.dimensions}`, value: `${entry.data.length} × ${entry.data.width} × ${entry.data.height} cm` },
        { label: `${t.plane} - ${t.ratePerKg}`, value: `${entry.data.planeTariff} ${entry.currency}` },
        { label: `${t.plane} - ${t.weight}`, value: `${entry.data.weight} kg` }
      );
      results.push(
        { label: t.shipResult, value: `${entry.result.shipCost} ${entry.currency}` },
        { label: t.planeResult, value: `${entry.result.planeCost} ${entry.currency}` },
        { label: t.winner, value: entry.result.winner === "ship" ? t.ship : t.plane },
        { label: t.savings, value: `${entry.result.savings}%` }
      );
    }
    
    exportToPdf({
      title: typeLabels[entry.type],
      type: entry.type,
      currency: entry.currency,
      date: new Date(entry.date).toLocaleString("fr-FR"),
      inputs,
      results,
      transitTime: entry.type === "ship" || entry.type === "plane" 
        ? getTransitLabel(entry.type as "ship" | "plane", t.days) 
        : undefined,
    });
    
    toast.success(t.pdfExported);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getResultSummary = (entry: HistoryEntry): string => {
    switch (entry.type) {
      case "ship":
        return `${entry.result.volume} m³ → ${entry.result.cost} ${entry.currency}`;
      case "plane":
        return `${entry.data.weight} kg → ${entry.result.cost} ${entry.currency}`;
      case "compare":
        return `${entry.result.winner === "ship" ? t.ship : t.plane} (${entry.result.savings}%)`;
      case "multi":
        return `${entry.data.packageCount} ${t.package} → ${entry.result.totalCost} ${entry.currency}`;
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>{t.back}</span>
          </button>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{t.history}</h1>
          <p className="text-muted-foreground">{history.length} {t.savedCalcs}</p>
        </div>

        {history.length > 0 && (
          <div className="flex justify-end mb-4">
            <button onClick={() => setShowClearModal(true)} className="flex items-center gap-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
              {t.clearAll}
            </button>
          </div>
        )}

        {history.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>{t.noHistoryCalc}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((entry) => {
              const Icon = typeIcons[entry.type];
              return (
                <div key={entry.id} className="bg-card rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg bg-muted ${typeColors[entry.type]}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground">{typeLabels[entry.type]}</span>
                          <span className="text-xs text-muted-foreground">{formatDate(entry.date)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{getResultSummary(entry)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleExport(entry)} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title={t.exportPdf}>
                        <FileDown className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteId(entry.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors" title={t.removePackage}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <ConfirmModal
          isOpen={showClearModal}
          onClose={() => setShowClearModal(false)}
          onConfirm={() => {
            clearHistory();
            setShowClearModal(false);
            toast.success(t.historyCleared);
          }}
          title={t.clearHistoryTitle}
          message={t.confirmClear}
          variant="compare"
        />

        <ConfirmModal
          isOpen={!!deleteId}
          onClose={() => setDeleteId(null)}
          onConfirm={() => {
            if (deleteId) {
              deleteFromHistory(deleteId);
              setDeleteId(null);
              toast.success(t.entryDeleted);
            }
          }}
          title={t.deleteEntry}
          message={t.deleteEntryConfirm}
          variant="compare"
        />
      </div>
    </div>
  );
};
