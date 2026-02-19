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
  onboardingReadyTitle: string;
  onboardingReadyDesc: string;
  onboardingFindAgain: string;
  onboardingFindAgainDesc: string;
  onboardingCalcHelpDesc: string;

  // Contextual help steps per calculator
  helpShipSteps: { title: string; desc: string; tip?: string }[];
  helpPlaneSteps: { title: string; desc: string; tip?: string }[];
  helpCompareSteps: { title: string; desc: string; tip?: string }[];
  helpMultiSteps: { title: string; desc: string; tip?: string }[];
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
    onboardingReadyTitle: "Vous êtes prêt(e) !",
    onboardingReadyDesc: "Vous connaissez maintenant toutes les fonctionnalités. Lancez votre premier calcul !",
    onboardingFindAgain: "Pour revoir ce guide",
    onboardingFindAgainDesc: "Appuyez sur le bouton ? dans la barre du haut de la page d'accueil.",
    onboardingCalcHelpDesc: "Dans chaque calculateur, appuyez sur le bouton ? pour voir un guide spécifique à ce mode.",
    helpShipSteps: [
      { title: "Le tarif CBM", desc: "Le CBM (mètre cube) est l'unité de mesure du fret maritime. Demandez ce tarif à votre transporteur.", tip: "Ex : 210 000 FCFA par m³" },
      { title: "Les dimensions", desc: "Mesurez votre colis en centimètres : Longueur × Largeur × Hauteur. L'app calcule automatiquement le volume.", tip: "Volume = L × l × H ÷ 1 000 000" },
      { title: "Choisir la destination", desc: "Sélectionnez le pays où le colis sera livré. Un message d'arrivée personnalisé s'affichera dans les résultats." },
      { title: "Lire les résultats", desc: "Vous obtenez le volume en m³, le coût total, le délai estimé (45-60 jours), et le montant à payer pour récupérer votre colis." },
      { title: "Exporter en PDF", desc: "Cliquez sur le bouton PDF pour télécharger un récapitulatif complet à partager avec votre client ou fournisseur.", tip: "Le PDF inclut toutes les infos : tarif, dimensions, coût, délai" },
    ],
    helpPlaneSteps: [
      { title: "Le tarif par kg", desc: "Le fret aérien se calcule au kilogramme. Demandez le tarif au kilo à votre transporteur aérien.", tip: "Ex : 3 000 FCFA par kg" },
      { title: "Le poids du colis", desc: "Entrez le poids réel de votre colis en kilogrammes. Le coût = Poids × Tarif par kg.", tip: "Pesez votre colis avant de saisir" },
      { title: "Choisir la destination", desc: "Sélectionnez le pays de destination. Le délai estimé pour l'avion est de 7 à 14 jours." },
      { title: "Lire les résultats", desc: "Vous obtenez le coût total, le délai estimé (7-14 jours) et le montant à payer pour récupérer le colis." },
      { title: "Exporter en PDF", desc: "Téléchargez le résultat en PDF pour le partager facilement avec vos clients ou contacts.", tip: "Plus rapide que le bateau, mais généralement plus cher" },
    ],
    helpCompareSteps: [
      { title: "Pourquoi comparer ?", desc: "Ce mode vous permet de voir en un coup d'œil quelle option est la moins chère : bateau ou avion, pour un même colis." },
      { title: "Remplir la partie Bateau", desc: "Entrez le tarif CBM et les dimensions du colis pour calculer le coût maritime.", tip: "Le volume est calculé automatiquement" },
      { title: "Remplir la partie Avion", desc: "Entrez le tarif au kg et le poids du colis pour calculer le coût aérien." },
      { title: "Lire la comparaison", desc: "L'app affiche le gagnant (moins cher), l'économie réalisée et la différence de délai entre les deux modes.", tip: "L'avion est ~38 jours plus rapide, mais souvent plus cher" },
      { title: "Exporter le résultat", desc: "Téléchargez la comparaison en PDF pour l'envoyer à votre client et l'aider à décider." },
    ],
    helpMultiSteps: [
      { title: "Ajouter des colis", desc: "Cliquez sur « Ajouter un colis » pour chaque article à expédier. Chaque colis a ses propres dimensions, poids et quantité.", tip: "Vous pouvez ajouter autant de colis que vous voulez" },
      { title: "Remplir chaque colis", desc: "Pour chaque colis : entrez longueur, largeur, hauteur (en cm), poids (kg) et quantité. Le sous-total est calculé automatiquement." },
      { title: "Tarifs et destination", desc: "Choisissez la devise, le pays de destination, et entrez le tarif CBM (bateau) et/ou le tarif au kg (avion)." },
      { title: "Calculer le total", desc: "Cliquez sur Calculer pour obtenir le coût total bateau, total avion, le volume global et le poids total de tous vos colis." },
      { title: "Détail par colis", desc: "Le récapitulatif montre le détail de chaque colis : son volume, son coût unitaire bateau et avion.", tip: "Pratique pour les commandes avec plusieurs types de marchandises" },
    ],
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
    onboardingReadyTitle: "You're all set!",
    onboardingReadyDesc: "You now know all the features. Start your first calculation!",
    onboardingFindAgain: "To view this guide again",
    onboardingFindAgainDesc: "Tap the ? button in the top bar on the home page.",
    onboardingCalcHelpDesc: "In each calculator, tap the ? button to see a guide specific to that mode.",
    helpShipSteps: [
      { title: "The CBM rate", desc: "CBM (cubic meter) is the unit of measurement for sea freight. Ask your carrier for this rate.", tip: "Ex: 210,000 FCFA per m³" },
      { title: "The dimensions", desc: "Measure your package in centimeters: Length × Width × Height. The app automatically calculates the volume.", tip: "Volume = L × W × H ÷ 1,000,000" },
      { title: "Choose the destination", desc: "Select the country where the package will be delivered. A personalized arrival message will appear in the results." },
      { title: "Read the results", desc: "You get the volume in m³, the total cost, the estimated transit time (45-60 days), and the amount to pay to collect your package." },
      { title: "Export to PDF", desc: "Click the PDF button to download a complete summary to share with your client or supplier.", tip: "The PDF includes all info: rate, dimensions, cost, transit time" },
    ],
    helpPlaneSteps: [
      { title: "The rate per kg", desc: "Air freight is calculated per kilogram. Ask your air carrier for the per-kg rate.", tip: "Ex: 3,000 FCFA per kg" },
      { title: "Package weight", desc: "Enter the actual weight of your package in kilograms. Cost = Weight × Rate per kg.", tip: "Weigh your package before entering" },
      { title: "Choose the destination", desc: "Select the destination country. The estimated transit time for air is 7 to 14 days." },
      { title: "Read the results", desc: "You get the total cost, estimated transit time (7-14 days), and the amount to pay to collect the package." },
      { title: "Export to PDF", desc: "Download the result as a PDF to easily share with your clients or contacts.", tip: "Faster than sea, but generally more expensive" },
    ],
    helpCompareSteps: [
      { title: "Why compare?", desc: "This mode lets you see at a glance which option is cheaper: sea or air, for the same package." },
      { title: "Fill in the Ship section", desc: "Enter the CBM rate and package dimensions to calculate the sea shipping cost.", tip: "Volume is calculated automatically" },
      { title: "Fill in the Plane section", desc: "Enter the per-kg rate and package weight to calculate the air shipping cost." },
      { title: "Read the comparison", desc: "The app shows the winner (cheapest), the savings, and the transit time difference between the two modes.", tip: "Air is ~38 days faster, but often more expensive" },
      { title: "Export the result", desc: "Download the comparison as a PDF to send to your client and help them decide." },
    ],
    helpMultiSteps: [
      { title: "Add packages", desc: "Click 'Add a package' for each item to ship. Each package has its own dimensions, weight and quantity.", tip: "You can add as many packages as you need" },
      { title: "Fill in each package", desc: "For each package: enter length, width, height (in cm), weight (kg) and quantity. The subtotal is calculated automatically." },
      { title: "Rates and destination", desc: "Choose the currency, destination country, and enter the CBM rate (sea) and/or the per-kg rate (air)." },
      { title: "Calculate the total", desc: "Click Calculate to get the total sea cost, total air cost, overall volume and total weight of all your packages." },
      { title: "Per-package breakdown", desc: "The summary shows the details of each package: its volume, its unit sea and air cost.", tip: "Useful for orders with multiple types of goods" },
    ],
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
    onboardingReadyTitle: "¡Estás listo/a!",
    onboardingReadyDesc: "Ya conoces todas las funciones. ¡Haz tu primer cálculo!",
    onboardingFindAgain: "Para ver esta guía de nuevo",
    onboardingFindAgainDesc: "Toca el botón ? en la barra superior de la página de inicio.",
    onboardingCalcHelpDesc: "En cada calculadora, toca el botón ? para ver una guía específica de ese modo.",
    helpShipSteps: [
      { title: "La tarifa CBM", desc: "El CBM (metro cúbico) es la unidad de medida del flete marítimo. Pide esta tarifa a tu transportista.", tip: "Ej: 210.000 FCFA por m³" },
      { title: "Las dimensiones", desc: "Mide tu paquete en centímetros: Largo × Ancho × Alto. La app calcula el volumen automáticamente.", tip: "Volumen = L × A × H ÷ 1.000.000" },
      { title: "Elegir el destino", desc: "Selecciona el país donde se entregará el paquete. Aparecerá un mensaje de llegada personalizado." },
      { title: "Leer los resultados", desc: "Obtienes el volumen en m³, el costo total, el plazo estimado (45-60 días) y el monto a pagar para recoger tu paquete." },
      { title: "Exportar a PDF", desc: "Haz clic en el botón PDF para descargar un resumen completo para compartir.", tip: "El PDF incluye toda la info: tarifa, dimensiones, costo, plazo" },
    ],
    helpPlaneSteps: [
      { title: "La tarifa por kg", desc: "El flete aéreo se calcula por kilogramo. Pide la tarifa por kilo a tu transportista aéreo.", tip: "Ej: 3.000 FCFA por kg" },
      { title: "El peso del paquete", desc: "Introduce el peso real de tu paquete en kilogramos. Costo = Peso × Tarifa por kg.", tip: "Pesa tu paquete antes de introducir el dato" },
      { title: "Elegir el destino", desc: "Selecciona el país de destino. El plazo estimado para avión es de 7 a 14 días." },
      { title: "Leer los resultados", desc: "Obtienes el costo total, el plazo estimado (7-14 días) y el monto a pagar para recoger el paquete." },
      { title: "Exportar a PDF", desc: "Descarga el resultado en PDF para compartirlo fácilmente.", tip: "Más rápido que el barco, pero generalmente más caro" },
    ],
    helpCompareSteps: [
      { title: "¿Por qué comparar?", desc: "Este modo te permite ver de un vistazo qué opción es más barata: barco o avión, para el mismo paquete." },
      { title: "Rellenar la sección Barco", desc: "Introduce la tarifa CBM y las dimensiones del paquete para calcular el costo marítimo.", tip: "El volumen se calcula automáticamente" },
      { title: "Rellenar la sección Avión", desc: "Introduce la tarifa por kg y el peso del paquete para calcular el costo aéreo." },
      { title: "Leer la comparación", desc: "La app muestra el ganador (más barato), el ahorro y la diferencia de plazo entre los dos modos.", tip: "El avión es ~38 días más rápido, pero suele ser más caro" },
      { title: "Exportar el resultado", desc: "Descarga la comparación en PDF para enviársela a tu cliente y ayudarle a decidir." },
    ],
    helpMultiSteps: [
      { title: "Añadir paquetes", desc: "Haz clic en 'Añadir paquete' para cada artículo a enviar. Cada paquete tiene sus propias dimensiones, peso y cantidad.", tip: "Puedes añadir tantos paquetes como necesites" },
      { title: "Rellenar cada paquete", desc: "Para cada paquete: introduce largo, ancho, alto (en cm), peso (kg) y cantidad. El subtotal se calcula automáticamente." },
      { title: "Tarifas y destino", desc: "Elige la moneda, el país de destino e introduce la tarifa CBM (barco) y/o la tarifa por kg (avión)." },
      { title: "Calcular el total", desc: "Haz clic en Calcular para obtener el costo total barco, total avión, el volumen global y el peso total de todos tus paquetes." },
      { title: "Detalle por paquete", desc: "El resumen muestra el detalle de cada paquete: su volumen, su costo unitario barco y avión.", tip: "Útil para pedidos con varios tipos de mercancía" },
    ],
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
