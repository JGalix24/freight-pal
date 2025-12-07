import { ArrowLeft, Trash2, Ship, Plane, Scale, Boxes, FileDown, Clock } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useHistory, HistoryEntry } from "@/hooks/useHistory";
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

const typeLabels = {
  ship: "Bateau",
  plane: "Avion",
  compare: "Comparaison",
  multi: "Multi-Colis",
};

const typeColors = {
  ship: "text-ship",
  plane: "text-plane",
  compare: "text-compare",
  multi: "text-multi",
};

export const HistoryPage = ({ onBack, isDark, onToggleTheme }: HistoryPageProps) => {
  const { history, deleteFromHistory, clearHistory } = useHistory();
  const [showClearModal, setShowClearModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleExport = (entry: HistoryEntry) => {
    const inputs: { label: string; value: string }[] = [];
    const results: { label: string; value: string }[] = [];
    
    if (entry.type === "ship") {
      inputs.push(
        { label: "Tarif CBM", value: `${entry.data.tariff} ${entry.currency}` },
        { label: "Dimensions", value: `${entry.data.length} × ${entry.data.width} × ${entry.data.height} cm` }
      );
      results.push(
        { label: "Volume", value: `${entry.result.volume} m³` },
        { label: "Coût total", value: `${entry.result.cost} ${entry.currency}` }
      );
    } else if (entry.type === "plane") {
      inputs.push(
        { label: "Tarif/kg", value: `${entry.data.tariff} ${entry.currency}` },
        { label: "Poids", value: `${entry.data.weight} kg` }
      );
      results.push(
        { label: "Coût total", value: `${entry.result.cost} ${entry.currency}` }
      );
    } else if (entry.type === "compare") {
      inputs.push(
        { label: "Bateau - Tarif CBM", value: `${entry.data.shipTariff} ${entry.currency}` },
        { label: "Bateau - Dimensions", value: `${entry.data.length} × ${entry.data.width} × ${entry.data.height} cm` },
        { label: "Avion - Tarif/kg", value: `${entry.data.planeTariff} ${entry.currency}` },
        { label: "Avion - Poids", value: `${entry.data.weight} kg` }
      );
      results.push(
        { label: "Coût Bateau", value: `${entry.result.shipCost} ${entry.currency}` },
        { label: "Coût Avion", value: `${entry.result.planeCost} ${entry.currency}` },
        { label: "Gagnant", value: entry.result.winner === "ship" ? "Bateau" : "Avion" },
        { label: "Économie", value: `${entry.result.savings}%` }
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
        ? getTransitLabel(entry.type as "ship" | "plane") 
        : undefined,
    });
    
    toast.success("PDF exporté !");
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
        return `${entry.result.winner === "ship" ? "Bateau" : "Avion"} gagne (${entry.result.savings}% économie)`;
      case "multi":
        return `${entry.data.packageCount} colis → ${entry.result.totalCost} ${entry.currency}`;
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
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
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Historique</h1>
          <p className="text-muted-foreground">{history.length} calcul(s) sauvegardé(s)</p>
        </div>

        {/* Clear all button */}
        {history.length > 0 && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowClearModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Tout effacer
            </button>
          </div>
        )}

        {/* History list */}
        {history.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Aucun calcul dans l'historique</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((entry) => {
              const Icon = typeIcons[entry.type];
              return (
                <div
                  key={entry.id}
                  className="bg-card rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg bg-muted ${typeColors[entry.type]}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground">
                            {typeLabels[entry.type]}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(entry.date)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {getResultSummary(entry)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleExport(entry)}
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="Exporter en PDF"
                      >
                        <FileDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(entry.id)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Confirm modals */}
        <ConfirmModal
          isOpen={showClearModal}
          onClose={() => setShowClearModal(false)}
          onConfirm={() => {
            clearHistory();
            setShowClearModal(false);
            toast.success("Historique effacé");
          }}
          title="Effacer l'historique"
          message="Êtes-vous sûr de vouloir supprimer tout l'historique ?"
          variant="compare"
        />

        <ConfirmModal
          isOpen={!!deleteId}
          onClose={() => setDeleteId(null)}
          onConfirm={() => {
            if (deleteId) {
              deleteFromHistory(deleteId);
              setDeleteId(null);
              toast.success("Entrée supprimée");
            }
          }}
          title="Supprimer l'entrée"
          message="Êtes-vous sûr de vouloir supprimer cette entrée ?"
          variant="compare"
        />
      </div>
    </div>
  );
};
