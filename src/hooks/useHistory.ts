import { useState, useEffect } from "react";

export interface HistoryEntry {
  id: string;
  type: "ship" | "plane" | "compare" | "multi";
  date: string;
  currency: string;
  data: Record<string, any>;
  result: Record<string, any>;
}

const HISTORY_KEY = "freight-calculator-history";
const MAX_HISTORY = 50;

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const saveToHistory = (entry: Omit<HistoryEntry, "id" | "date">) => {
    const newEntry: HistoryEntry = {
      ...entry,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    
    setHistory((prev) => {
      const updated = [newEntry, ...prev].slice(0, MAX_HISTORY);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteFromHistory = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return { history, saveToHistory, deleteFromHistory, clearHistory };
};
