import { useState, useEffect, useCallback } from "react";

export interface ExchangeRates {
  [key: string]: number;
}

const RATES_KEY = "freight-calculator-rates";
const MANUAL_RATES_KEY = "freight-calculator-manual-rates";
const BASE_CURRENCY = "EUR";

const DEFAULT_RATES: ExchangeRates = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.86,
  CAD: 1.47,
  FCFA: 655.96,
  ZAR: 20.5,
  TND: 3.4,
  MAD: 10.9,
  GHS: 15.8,
  KES: 165,
};

export const useCurrency = () => {
  const [rates, setRates] = useState<ExchangeRates>(DEFAULT_RATES);
  const [manualRates, setManualRates] = useState<ExchangeRates>({});
  const [useManual, setUseManual] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load saved rates
    const storedRates = localStorage.getItem(RATES_KEY);
    const storedManual = localStorage.getItem(MANUAL_RATES_KEY);
    
    if (storedRates) {
      try {
        const parsed = JSON.parse(storedRates);
        setRates(parsed.rates);
        setLastUpdate(parsed.lastUpdate);
      } catch {
        // Use defaults
      }
    }
    
    if (storedManual) {
      try {
        const parsed = JSON.parse(storedManual);
        setManualRates(parsed.rates);
        setUseManual(parsed.useManual);
      } catch {
        // Use defaults
      }
    }
  }, []);

  const fetchRates = useCallback(async () => {
    setIsLoading(true);
    try {
      // Frankfurter API - free, no key needed
      const response = await fetch(
        `https://api.frankfurter.app/latest?from=${BASE_CURRENCY}&to=USD,GBP,CAD,ZAR,TND,MAD`
      );
      
      if (!response.ok) throw new Error("Failed to fetch rates");
      
      const data = await response.json();
      
      const newRates: ExchangeRates = {
        EUR: 1,
        USD: data.rates.USD,
        GBP: data.rates.GBP,
        CAD: data.rates.CAD,
        FCFA: 655.957, // Fixed rate (CFA Franc is pegged to EUR)
        ZAR: data.rates.ZAR || 20.5,
        TND: data.rates.TND || 3.4,
        MAD: data.rates.MAD || 10.9,
        GHS: 15.8, // Not available in Frankfurter, use default
        KES: 165, // Not available in Frankfurter, use default
      };
      
      setRates(newRates);
      const now = new Date().toISOString();
      setLastUpdate(now);
      
      localStorage.setItem(RATES_KEY, JSON.stringify({
        rates: newRates,
        lastUpdate: now,
      }));
      
      return true;
    } catch (error) {
      console.error("Error fetching rates:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveManualRates = (newRates: ExchangeRates, useManualRates: boolean) => {
    setManualRates(newRates);
    setUseManual(useManualRates);
    localStorage.setItem(MANUAL_RATES_KEY, JSON.stringify({
      rates: newRates,
      useManual: useManualRates,
    }));
  };

  const convert = useCallback((amount: number, from: string, to: string): number => {
    const activeRates = useManual && Object.keys(manualRates).length > 0 ? manualRates : rates;
    
    if (from === to) return amount;
    
    // Convert to EUR first, then to target
    const inEur = amount / (activeRates[from] || 1);
    return inEur * (activeRates[to] || 1);
  }, [rates, manualRates, useManual]);

  const getActiveRates = useCallback(() => {
    return useManual && Object.keys(manualRates).length > 0 ? manualRates : rates;
  }, [rates, manualRates, useManual]);

  return {
    rates,
    manualRates,
    useManual,
    lastUpdate,
    isLoading,
    fetchRates,
    saveManualRates,
    convert,
    getActiveRates,
  };
};
