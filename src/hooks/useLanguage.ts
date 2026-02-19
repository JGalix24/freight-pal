import { useState, useEffect, useCallback, useSyncExternalStore } from "react";

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
  
  // How it works
  howItWorks: string;
  howItWorksSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;

  // Calculator specific
  shipCalc: string;
  planeCalc: string;
  compareTitle: string;
  multiTitle: string;
  cbmRatePerm3: string;
  dimensionsCmLabel: string;
  packageWeight: string;
  estimatedDelay: string;
  packageVolume: string;
  commonCurrency: string;
  applicableRates: string;
  shipCBMRate: string;
  planeRate: string;
  packageList: string;
  calculateTotal: string;
  calculateComparison: string;
  summary: string;
  totalShip: string;
  totalPlane: string;
  totalVolumeLabel: string;
  totalWeightLabel: string;
  shipCheaperBy: string;
  planeCheaperBy: string;
  detailPerPackage: string;
  qty: string;
  estimatedCost: string;
  calculationDetails: string;
  isCheaper: string;
  savingsOf: string;
  lessPercent: string;
  fasterByPlane: string;
  winner: string;
  deleteEntry: string;
  deleteEntryConfirm: string;
  clearHistoryTitle: string;
  savedCalcs: string;
  clearAll: string;
  noHistoryCalc: string;
  pdfExported: string;
  historyCleared: string;
  entryDeleted: string;
  shipWins: string;
  planeWins: string;
  doAnother: string;
  doAnotherConfirm: string;
  cancelLabel: string;
  confirmLabel: string;
  quantity: string;
  destinationCountry: string;
  selectCountry: string;
  arrivalMessage: string;
  paymentMessage: string;

  // Onboarding
  onboardingWelcome: string;
  onboardingWelcomeDesc: string;
  onboardingModeLabel: string;
  onboardingGuideLabel: string;
  onboardingShipDesc: string;
  onboardingPlaneDesc: string;
  onboardingCompareDesc: string;
  onboardingMultiDesc: string;
  onboardingStep1Title: string;
  onboardingStep1Desc: string;
  onboardingStep2Title: string;
  onboardingStep2Desc: string;
  onboardingStep3Title: string;
  onboardingStep3Desc: string;
  onboardingStep4Title: string;
  onboardingStep4Desc: string;
  onboardingExportHint: string;
  onboardingNext: string;
  onboardingFinish: string;
  onboardingTutorial: string;
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
    howItWorks: "Comment ça marche ?",
    howItWorksSubtitle: "Suivez ces étapes simples pour calculer vos frais de transport",
    step1Title: "Choisissez le mode",
    step1Desc: "Sélectionnez Bateau, Avion, Comparaison ou Multi-colis selon votre besoin.",
    step2Title: "Renseignez les infos",
    step2Desc: "Entrez la devise, le tarif, les dimensions et le poids de votre colis.",
    step3Title: "Obtenez le résultat",
    step3Desc: "Le coût total, le volume et le délai estimé s'affichent instantanément.",
    step4Title: "Exportez ou comparez",
    step4Desc: "Téléchargez le résultat en PDF ou comparez les options bateau et avion.",
    shipCalc: "Calcul Bateau",
    planeCalc: "Calcul Avion",
    compareTitle: "Comparaison Bateau vs Avion",
    multiTitle: "Multi-Colis",
    cbmRatePerm3: "Tarif CBM (par m³)",
    dimensionsCmLabel: "Dimensions du colis (en cm)",
    packageWeight: "Poids du colis (en kg)",
    estimatedDelay: "Délai estimé",
    packageVolume: "Volume du colis",
    commonCurrency: "Devise commune pour la comparaison",
    applicableRates: "Tarifs applicables",
    shipCBMRate: "Tarif CBM Bateau (par m³)",
    planeRate: "Tarif Avion (par kg)",
    packageList: "Liste des colis",
    calculateTotal: "Calculer le total",
    calculateComparison: "Calculer la comparaison",
    summary: "Récapitulatif",
    totalShip: "Total Bateau",
    totalPlane: "Total Avion",
    totalVolumeLabel: "Volume total",
    totalWeightLabel: "Poids total",
    shipCheaperBy: "Le bateau est moins cher de",
    planeCheaperBy: "L'avion est moins cher de",
    detailPerPackage: "Détail par colis",
    qty: "Qté",
    estimatedCost: "Coût estimé",
    calculationDetails: "Détail des calculs",
    isCheaper: "est moins cher",
    savingsOf: "Économie de",
    lessPercent: "de moins",
    fasterByPlane: "par avion",
    winner: "Gagnant",
    deleteEntry: "Supprimer l'entrée",
    deleteEntryConfirm: "Êtes-vous sûr de vouloir supprimer cette entrée ?",
    clearHistoryTitle: "Effacer l'historique",
    savedCalcs: "calcul(s) sauvegardé(s)",
    clearAll: "Tout effacer",
    noHistoryCalc: "Aucun calcul dans l'historique",
    pdfExported: "PDF exporté !",
    historyCleared: "Historique effacé",
    entryDeleted: "Entrée supprimée",
    shipWins: "Le BATEAU",
    planeWins: "L'AVION",
    doAnother: "Refaire un autre calcul",
    doAnotherConfirm: "Êtes-vous sûr de vouloir effacer tous les champs et refaire un nouveau calcul ?",
    cancelLabel: "Annuler",
    confirmLabel: "Confirmer",
    quantity: "Quantité",
    destinationCountry: "Pays de destination",
    selectCountry: "Sélectionner un pays",
    arrivalMessage: "Votre colis sera",
    paymentMessage: "Pour récupérer votre colis, vous devez payer",
    onboardingWelcome: "Bienvenue sur Freight-Calculator !",
    onboardingWelcomeDesc: "Ce petit guide va vous montrer comment utiliser l'application en quelques étapes simples.",
    onboardingModeLabel: "Mode",
    onboardingGuideLabel: "Étape",
    onboardingShipDesc: "Calculez le coût d'expédition par voie maritime en saisissant les dimensions de votre colis. Idéal pour les grosses marchandises.",
    onboardingPlaneDesc: "Calculez le coût d'expédition par avion selon le poids de votre colis. Plus rapide, mais généralement plus cher.",
    onboardingCompareDesc: "Comparez côte à côte le coût et le délai entre le bateau et l'avion pour faire le meilleur choix.",
    onboardingMultiDesc: "Calculez le coût total pour plusieurs colis en même temps, avec détail par colis et récapitulatif global.",
    onboardingStep1Title: "Choisissez votre mode de transport",
    onboardingStep1Desc: "Depuis l'accueil, sélectionnez le mode qui correspond à votre besoin : Bateau, Avion, Comparaison ou Multi-colis.",
    onboardingStep2Title: "Renseignez les informations",
    onboardingStep2Desc: "Choisissez la devise, le pays de destination, entrez le tarif et le poids ou les dimensions de votre colis.",
    onboardingStep3Title: "Consultez vos résultats",
    onboardingStep3Desc: "Le coût total, le délai estimé et un message de récupération s'affichent instantanément après le calcul.",
    onboardingStep4Title: "Exportez ou comparez",
    onboardingStep4Desc: "Téléchargez votre résultat en PDF pour le partager, ou utilisez le mode Comparaison pour trouver la meilleure option.",
    onboardingExportHint: "Partagez facilement votre devis en un clic",
    onboardingNext: "Suivant",
    onboardingFinish: "Commencer !",
    onboardingTutorial: "Guide d'utilisation",
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
    howItWorks: "How does it work?",
    howItWorksSubtitle: "Follow these simple steps to calculate your shipping costs",
    step1Title: "Choose the mode",
    step1Desc: "Select Ship, Plane, Compare or Multi-package depending on your needs.",
    step2Title: "Enter the details",
    step2Desc: "Enter the currency, rate, dimensions and weight of your package.",
    step3Title: "Get the result",
    step3Desc: "Total cost, volume and estimated transit time are displayed instantly.",
    step4Title: "Export or compare",
    step4Desc: "Download the result as PDF or compare ship and plane options.",
    shipCalc: "Ship Calculation",
    planeCalc: "Plane Calculation",
    compareTitle: "Ship vs Plane Comparison",
    multiTitle: "Multi-Package",
    cbmRatePerm3: "CBM Rate (per m³)",
    dimensionsCmLabel: "Package dimensions (in cm)",
    packageWeight: "Package weight (in kg)",
    estimatedDelay: "Estimated delay",
    packageVolume: "Package volume",
    commonCurrency: "Common currency for comparison",
    applicableRates: "Applicable rates",
    shipCBMRate: "Ship CBM Rate (per m³)",
    planeRate: "Plane Rate (per kg)",
    packageList: "Package list",
    calculateTotal: "Calculate total",
    calculateComparison: "Calculate comparison",
    summary: "Summary",
    totalShip: "Ship Total",
    totalPlane: "Plane Total",
    totalVolumeLabel: "Total volume",
    totalWeightLabel: "Total weight",
    shipCheaperBy: "Ship is cheaper by",
    planeCheaperBy: "Plane is cheaper by",
    detailPerPackage: "Detail per package",
    qty: "Qty",
    estimatedCost: "Estimated cost",
    calculationDetails: "Calculation details",
    isCheaper: "is cheaper",
    savingsOf: "Savings of",
    lessPercent: "less",
    fasterByPlane: "by plane",
    winner: "Winner",
    deleteEntry: "Delete entry",
    deleteEntryConfirm: "Are you sure you want to delete this entry?",
    clearHistoryTitle: "Clear history",
    savedCalcs: "saved calculation(s)",
    clearAll: "Clear all",
    noHistoryCalc: "No calculations in history",
    pdfExported: "PDF exported!",
    historyCleared: "History cleared",
    entryDeleted: "Entry deleted",
    shipWins: "SHIP",
    planeWins: "PLANE",
    doAnother: "Start another calculation",
    doAnotherConfirm: "Are you sure you want to clear all fields and start a new calculation?",
    cancelLabel: "Cancel",
    confirmLabel: "Confirm",
    quantity: "Quantity",
    destinationCountry: "Destination country",
    selectCountry: "Select a country",
    arrivalMessage: "Your package will arrive",
    paymentMessage: "To collect your package, you must pay",
    onboardingWelcome: "Welcome to Freight-Calculator!",
    onboardingWelcomeDesc: "This quick guide will show you how to use the app in a few simple steps.",
    onboardingModeLabel: "Mode",
    onboardingGuideLabel: "Step",
    onboardingShipDesc: "Calculate sea freight costs by entering your package dimensions. Ideal for large or heavy goods.",
    onboardingPlaneDesc: "Calculate air freight costs based on your package weight. Faster, but generally more expensive.",
    onboardingCompareDesc: "Compare side-by-side the cost and transit time between sea and air shipping to make the best choice.",
    onboardingMultiDesc: "Calculate the total cost for multiple packages at once, with per-package details and a global summary.",
    onboardingStep1Title: "Choose your shipping mode",
    onboardingStep1Desc: "From the home screen, select the mode that matches your need: Ship, Plane, Compare or Multi-package.",
    onboardingStep2Title: "Enter the details",
    onboardingStep2Desc: "Choose the currency, destination country, enter the rate and the weight or dimensions of your package.",
    onboardingStep3Title: "View your results",
    onboardingStep3Desc: "Total cost, estimated transit time, and a collection reminder are displayed instantly after calculation.",
    onboardingStep4Title: "Export or compare",
    onboardingStep4Desc: "Download your result as a PDF to share it, or use the Compare mode to find the best shipping option.",
    onboardingExportHint: "Share your quote easily in one click",
    onboardingNext: "Next",
    onboardingFinish: "Let's start!",
    onboardingTutorial: "How to use",
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
    howItWorks: "¿Cómo funciona?",
    howItWorksSubtitle: "Sigue estos sencillos pasos para calcular tus costos de envío",
    step1Title: "Elige el modo",
    step1Desc: "Selecciona Barco, Avión, Comparar o Multi-paquete según tu necesidad.",
    step2Title: "Ingresa los datos",
    step2Desc: "Introduce la moneda, la tarifa, las dimensiones y el peso de tu paquete.",
    step3Title: "Obtén el resultado",
    step3Desc: "El costo total, el volumen y el tiempo de tránsito estimado se muestran al instante.",
    step4Title: "Exporta o compara",
    step4Desc: "Descarga el resultado en PDF o compara las opciones de barco y avión.",
    shipCalc: "Cálculo Barco",
    planeCalc: "Cálculo Avión",
    compareTitle: "Comparación Barco vs Avión",
    multiTitle: "Multi-Paquete",
    cbmRatePerm3: "Tarifa CBM (por m³)",
    dimensionsCmLabel: "Dimensiones del paquete (en cm)",
    packageWeight: "Peso del paquete (en kg)",
    estimatedDelay: "Plazo estimado",
    packageVolume: "Volumen del paquete",
    commonCurrency: "Moneda común para la comparación",
    applicableRates: "Tarifas aplicables",
    shipCBMRate: "Tarifa CBM Barco (por m³)",
    planeRate: "Tarifa Avión (por kg)",
    packageList: "Lista de paquetes",
    calculateTotal: "Calcular el total",
    calculateComparison: "Calcular la comparación",
    summary: "Resumen",
    totalShip: "Total Barco",
    totalPlane: "Total Avión",
    totalVolumeLabel: "Volumen total",
    totalWeightLabel: "Peso total",
    shipCheaperBy: "El barco es más barato por",
    planeCheaperBy: "El avión es más barato por",
    detailPerPackage: "Detalle por paquete",
    qty: "Cant",
    estimatedCost: "Costo estimado",
    calculationDetails: "Detalle de los cálculos",
    isCheaper: "es más barato",
    savingsOf: "Ahorro de",
    lessPercent: "menos",
    fasterByPlane: "por avión",
    winner: "Ganador",
    deleteEntry: "Eliminar entrada",
    deleteEntryConfirm: "¿Estás seguro de querer eliminar esta entrada?",
    clearHistoryTitle: "Borrar historial",
    savedCalcs: "cálculo(s) guardado(s)",
    clearAll: "Borrar todo",
    noHistoryCalc: "No hay cálculos en el historial",
    pdfExported: "¡PDF exportado!",
    historyCleared: "Historial borrado",
    entryDeleted: "Entrada eliminada",
    shipWins: "El BARCO",
    planeWins: "El AVIÓN",
    doAnother: "Hacer otro cálculo",
    doAnotherConfirm: "¿Seguro que quieres borrar todos los campos y hacer un nuevo cálculo?",
    cancelLabel: "Cancelar",
    confirmLabel: "Confirmar",
    quantity: "Cantidad",
    destinationCountry: "País de destino",
    selectCountry: "Seleccionar un país",
    arrivalMessage: "Su paquete llegará",
    paymentMessage: "Para recoger su paquete, debe pagar",
    onboardingWelcome: "¡Bienvenido a Freight-Calculator!",
    onboardingWelcomeDesc: "Esta pequeña guía te mostrará cómo usar la aplicación en unos sencillos pasos.",
    onboardingModeLabel: "Modo",
    onboardingGuideLabel: "Paso",
    onboardingShipDesc: "Calcula el costo de envío marítimo ingresando las dimensiones de tu paquete. Ideal para mercancías grandes.",
    onboardingPlaneDesc: "Calcula el costo de envío aéreo según el peso de tu paquete. Más rápido, pero generalmente más caro.",
    onboardingCompareDesc: "Compara lado a lado el costo y el tiempo de tránsito entre barco y avión para tomar la mejor decisión.",
    onboardingMultiDesc: "Calcula el costo total para varios paquetes a la vez, con detalle por paquete y resumen global.",
    onboardingStep1Title: "Elige tu modo de transporte",
    onboardingStep1Desc: "Desde el inicio, selecciona el modo que corresponde a tu necesidad: Barco, Avión, Comparar o Multi-paquete.",
    onboardingStep2Title: "Ingresa los datos",
    onboardingStep2Desc: "Elige la moneda, el país de destino, introduce la tarifa y el peso o las dimensiones de tu paquete.",
    onboardingStep3Title: "Consulta tus resultados",
    onboardingStep3Desc: "El costo total, el plazo estimado y un recordatorio de recogida se muestran al instante tras el cálculo.",
    onboardingStep4Title: "Exporta o compara",
    onboardingStep4Desc: "Descarga tu resultado en PDF para compartirlo, o usa el modo Comparar para encontrar la mejor opción.",
    onboardingExportHint: "Comparte tu presupuesto fácilmente en un clic",
    onboardingNext: "Siguiente",
    onboardingFinish: "¡Empezar!",
    onboardingTutorial: "Cómo usarlo",
  },
};

// Global store for language to sync all components
let currentLanguage: Language = (localStorage.getItem(LANGUAGE_KEY) as Language) || "fr";
const listeners = new Set<() => void>();

function getLanguageSnapshot(): Language {
  return currentLanguage;
}

function subscribeLanguage(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function setGlobalLanguage(lang: Language) {
  currentLanguage = lang;
  localStorage.setItem(LANGUAGE_KEY, lang);
  listeners.forEach((l) => l());
}

export const useLanguage = () => {
  const language = useSyncExternalStore(subscribeLanguage, getLanguageSnapshot);

  const setLanguage = useCallback((lang: Language) => {
    setGlobalLanguage(lang);
  }, []);

  const t = translations[language];

  const getDateLocale = useCallback(() => {
    switch (language) {
      case "en": return "en-US";
      case "es": return "es-ES";
      default: return "fr-FR";
    }
  }, [language]);

  return { language, setLanguage, t, getDateLocale };
};

export const LANGUAGES = [
  { value: "fr" as Language, label: "Français", flag: "🇫🇷" },
  { value: "en" as Language, label: "English", flag: "🇬🇧" },
  { value: "es" as Language, label: "Español", flag: "🇪🇸" },
];
