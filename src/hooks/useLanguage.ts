import { useState, useEffect, useCallback } from "react";

export type Language = "fr" | "en" | "es";

const LANGUAGE_KEY = "freight-calculator-language";

export interface Translations {
  // Navigation
  home: string;
  history: string;
  settings: string;
  back: string;
  
  // Home page
  appTitle: string;
  appSubtitle: string;
  whatToCalculate: string;
  
  // Modes
  ship: string;
  plane: string;
  compare: string;
  multiPackage: string;
  shipDesc: string;
  planeDesc: string;
  compareDesc: string;
  multiDesc: string;
  
  // Calculator labels
  currency: string;
  selectCurrency: string;
  cbmRate: string;
  cbmRateDesc: string;
  ratePerKg: string;
  dimensions: string;
  dimensionsCm: string;
  length: string;
  width: string;
  height: string;
  weight: string;
  weightKg: string;
  calculate: string;
  reset: string;
  exportPdf: string;
  
  // Results
  results: string;
  volume: string;
  volumetricWeight: string;
  totalCost: string;
  transitTime: string;
  faster: string;
  cheaper: string;
  recommendation: string;
  savings: string;
  
  // Compare
  shipVsPlane: string;
  shipResult: string;
  planeResult: string;
  
  // Multi-package
  package: string;
  addPackage: string;
  removePackage: string;
  totalPackages: string;
  totalVolume: string;
  totalWeight: string;
  
  // Settings
  exchangeRates: string;
  refresh: string;
  lastUpdate: string;
  useManualRates: string;
  baseCurrency: string;
  saveRates: string;
  ratesSaved: string;
  ratesUpdated: string;
  language: string;
  selectLanguage: string;
  theme: string;
  darkMode: string;
  lightMode: string;
  
  // History
  calculationHistory: string;
  noHistory: string;
  clearHistory: string;
  confirmClear: string;
  cancel: string;
  confirm: string;
  
  // Errors
  fillAllFields: string;
  errorFetchingRates: string;
  
  // Time
  days: string;
}

const translations: Record<Language, Translations> = {
  fr: {
    home: "Accueil",
    history: "Historique",
    settings: "Paramètres",
    back: "Retour",
    appTitle: "Freight-Calculator",
    appSubtitle: "Calculez vos frais de transport en quelques clics",
    whatToCalculate: "Que voulez-vous calculer ?",
    ship: "Bateau",
    plane: "Avion",
    compare: "Comparaison",
    multiPackage: "Multi-colis",
    shipDesc: "Calcul CBM",
    planeDesc: "Calcul au poids",
    compareDesc: "Bateau vs Avion",
    multiDesc: "Plusieurs colis",
    currency: "Devise",
    selectCurrency: "Sélectionner une devise",
    cbmRate: "Tarif CBM",
    cbmRateDesc: "par m³",
    ratePerKg: "Tarif par kilogramme",
    dimensions: "Dimensions",
    dimensionsCm: "Dimensions du colis (en cm)",
    length: "Longueur",
    width: "Largeur",
    height: "Hauteur",
    weight: "Poids",
    weightKg: "Poids (kg)",
    calculate: "Calculer",
    reset: "Réinitialiser",
    exportPdf: "Exporter PDF",
    results: "Résultats",
    volume: "Volume",
    volumetricWeight: "Poids volumétrique",
    totalCost: "Coût total",
    transitTime: "Temps de transit",
    faster: "plus rapide",
    cheaper: "moins cher",
    recommendation: "Recommandation",
    savings: "Économie",
    shipVsPlane: "Bateau vs Avion",
    shipResult: "Résultat Bateau",
    planeResult: "Résultat Avion",
    package: "Colis",
    addPackage: "Ajouter un colis",
    removePackage: "Supprimer",
    totalPackages: "Total colis",
    totalVolume: "Volume total",
    totalWeight: "Poids total",
    exchangeRates: "Taux de change",
    refresh: "Actualiser",
    lastUpdate: "Dernière mise à jour",
    useManualRates: "Utiliser les taux manuels",
    baseCurrency: "Base: 1 EUR = X devise",
    saveRates: "Enregistrer",
    ratesSaved: "Taux enregistrés",
    ratesUpdated: "Taux mis à jour",
    language: "Langue",
    selectLanguage: "Sélectionner une langue",
    theme: "Thème",
    darkMode: "Mode sombre",
    lightMode: "Mode clair",
    calculationHistory: "Historique des calculs",
    noHistory: "Aucun calcul enregistré",
    clearHistory: "Effacer l'historique",
    confirmClear: "Voulez-vous vraiment effacer tout l'historique ?",
    cancel: "Annuler",
    confirm: "Confirmer",
    fillAllFields: "Veuillez remplir tous les champs",
    errorFetchingRates: "Erreur lors de la récupération des taux",
    days: "jours",
  },
  en: {
    home: "Home",
    history: "History",
    settings: "Settings",
    back: "Back",
    appTitle: "Freight-Calculator",
    appSubtitle: "Calculate your shipping costs in a few clicks",
    whatToCalculate: "What do you want to calculate?",
    ship: "Ship",
    plane: "Plane",
    compare: "Compare",
    multiPackage: "Multi-package",
    shipDesc: "CBM calculation",
    planeDesc: "Weight calculation",
    compareDesc: "Ship vs Plane",
    multiDesc: "Multiple packages",
    currency: "Currency",
    selectCurrency: "Select a currency",
    cbmRate: "CBM Rate",
    cbmRateDesc: "per m³",
    ratePerKg: "Rate per kilogram",
    dimensions: "Dimensions",
    dimensionsCm: "Package dimensions (in cm)",
    length: "Length",
    width: "Width",
    height: "Height",
    weight: "Weight",
    weightKg: "Weight (kg)",
    calculate: "Calculate",
    reset: "Reset",
    exportPdf: "Export PDF",
    results: "Results",
    volume: "Volume",
    volumetricWeight: "Volumetric weight",
    totalCost: "Total cost",
    transitTime: "Transit time",
    faster: "faster",
    cheaper: "cheaper",
    recommendation: "Recommendation",
    savings: "Savings",
    shipVsPlane: "Ship vs Plane",
    shipResult: "Ship Result",
    planeResult: "Plane Result",
    package: "Package",
    addPackage: "Add a package",
    removePackage: "Remove",
    totalPackages: "Total packages",
    totalVolume: "Total volume",
    totalWeight: "Total weight",
    exchangeRates: "Exchange rates",
    refresh: "Refresh",
    lastUpdate: "Last update",
    useManualRates: "Use manual rates",
    baseCurrency: "Base: 1 EUR = X currency",
    saveRates: "Save",
    ratesSaved: "Rates saved",
    ratesUpdated: "Rates updated",
    language: "Language",
    selectLanguage: "Select a language",
    theme: "Theme",
    darkMode: "Dark mode",
    lightMode: "Light mode",
    calculationHistory: "Calculation history",
    noHistory: "No calculations saved",
    clearHistory: "Clear history",
    confirmClear: "Are you sure you want to clear all history?",
    cancel: "Cancel",
    confirm: "Confirm",
    fillAllFields: "Please fill in all fields",
    errorFetchingRates: "Error fetching rates",
    days: "days",
  },
  es: {
    home: "Inicio",
    history: "Historial",
    settings: "Configuración",
    back: "Volver",
    appTitle: "Freight-Calculator",
    appSubtitle: "Calcula tus costos de envío en unos clics",
    whatToCalculate: "¿Qué quieres calcular?",
    ship: "Barco",
    plane: "Avión",
    compare: "Comparar",
    multiPackage: "Multi-paquete",
    shipDesc: "Cálculo CBM",
    planeDesc: "Cálculo por peso",
    compareDesc: "Barco vs Avión",
    multiDesc: "Varios paquetes",
    currency: "Moneda",
    selectCurrency: "Seleccionar moneda",
    cbmRate: "Tarifa CBM",
    cbmRateDesc: "por m³",
    ratePerKg: "Tarifa por kilogramo",
    dimensions: "Dimensiones",
    dimensionsCm: "Dimensiones del paquete (en cm)",
    length: "Largo",
    width: "Ancho",
    height: "Alto",
    weight: "Peso",
    weightKg: "Peso (kg)",
    calculate: "Calcular",
    reset: "Reiniciar",
    exportPdf: "Exportar PDF",
    results: "Resultados",
    volume: "Volumen",
    volumetricWeight: "Peso volumétrico",
    totalCost: "Costo total",
    transitTime: "Tiempo de tránsito",
    faster: "más rápido",
    cheaper: "más barato",
    recommendation: "Recomendación",
    savings: "Ahorro",
    shipVsPlane: "Barco vs Avión",
    shipResult: "Resultado Barco",
    planeResult: "Resultado Avión",
    package: "Paquete",
    addPackage: "Añadir paquete",
    removePackage: "Eliminar",
    totalPackages: "Total paquetes",
    totalVolume: "Volumen total",
    totalWeight: "Peso total",
    exchangeRates: "Tipos de cambio",
    refresh: "Actualizar",
    lastUpdate: "Última actualización",
    useManualRates: "Usar tipos manuales",
    baseCurrency: "Base: 1 EUR = X moneda",
    saveRates: "Guardar",
    ratesSaved: "Tipos guardados",
    ratesUpdated: "Tipos actualizados",
    language: "Idioma",
    selectLanguage: "Seleccionar idioma",
    theme: "Tema",
    darkMode: "Modo oscuro",
    lightMode: "Modo claro",
    calculationHistory: "Historial de cálculos",
    noHistory: "No hay cálculos guardados",
    clearHistory: "Borrar historial",
    confirmClear: "¿Seguro que quieres borrar todo el historial?",
    cancel: "Cancelar",
    confirm: "Confirmar",
    fillAllFields: "Por favor completa todos los campos",
    errorFetchingRates: "Error al obtener los tipos",
    days: "días",
  },
};

export const useLanguage = () => {
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() => {
    const stored = localStorage.getItem(LANGUAGE_KEY) as Language | null;
    if (stored && translations[stored]) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
  }, []);

  const t = translations[language];

  const getDateLocale = useCallback(() => {
    switch (language) {
      case "en": return "en-US";
      case "es": return "es-ES";
      default: return "fr-FR";
    }
  }, [language]);

  return {
    language,
    setLanguage,
    t,
    getDateLocale,
  };
};

export const LANGUAGES = [
  { value: "fr" as Language, label: "Français", flag: "🇫🇷" },
  { value: "en" as Language, label: "English", flag: "🇬🇧" },
  { value: "es" as Language, label: "Español", flag: "🇪🇸" },
];
