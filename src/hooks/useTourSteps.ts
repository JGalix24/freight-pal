import { useMemo } from "react";
import { useLanguage } from "./useLanguage";
import type { TourStep } from "@/components/GuidedTour";

export const useTourSteps = (): TourStep[] => {
  const { language } = useLanguage();

  return useMemo(() => {
    const fr: TourStep[] = [
      {
        target: "logo",
        title: "Bienvenue ! 👋",
        description: "Je vais te guider à travers l'application. Suis les étapes pour tout comprendre !",
        position: "bottom",
      },
      {
        target: "mode-ship",
        title: "Mode Bateau 🚢",
        description: "Calcule le coût d'expédition par bateau en fonction du volume (CBM) de tes colis.",
        position: "bottom",
      },
      {
        target: "mode-plane",
        title: "Mode Avion ✈️",
        description: "Calcule le coût d'expédition par avion en fonction du poids de tes colis.",
        position: "bottom",
      },
      {
        target: "mode-compare",
        title: "Mode Comparaison ⚖️",
        description: "Compare les coûts bateau vs avion pour trouver l'option la moins chère.",
        position: "bottom",
      },
      {
        target: "mode-multi",
        title: "Multi-Colis 📦",
        description: "Calcule le coût total pour plusieurs colis différents en une seule fois.",
        position: "bottom",
      },
      {
        target: "mode-ship",
        title: "Essayons ensemble !",
        description: "Clique sur le mode Bateau pour voir comment ça fonctionne en détail.",
        position: "bottom",
        requireClick: true,
        navigateTo: "ship",
      },
      {
        target: "currency-select",
        title: "Choisis ta devise",
        description: "Sélectionne la devise dans laquelle tu souhaites afficher les résultats. Les tarifs se convertissent automatiquement.",
        position: "bottom",
        waitForTarget: true,
      },
      {
        target: "country-select",
        title: "Pays de destination",
        description: "Choisis le pays où ton colis sera livré. Le délai de transit sera estimé en conséquence.",
        position: "bottom",
      },
      {
        target: "tariff-input",
        title: "Tarif au m³",
        description: "Entre le tarif CBM (coût par mètre cube) que ton transitaire t'a communiqué.",
        position: "bottom",
      },
      {
        target: "dimensions-input",
        title: "Dimensions du colis",
        description: "Entre la longueur, largeur et hauteur de ton colis en centimètres. Le volume sera calculé automatiquement.",
        position: "top",
      },
      {
        target: "calculate-btn",
        title: "Lance le calcul !",
        description: "Une fois les champs remplis, clique ici pour obtenir le coût total, le délai estimé et un message de paiement.",
        position: "top",
      },
      {
        target: "back-btn",
        title: "Retour à l'accueil",
        description: "Clique ici pour revenir à l'écran principal et explorer les autres modes. Le guide est terminé ! 🎉",
        position: "bottom",
        requireClick: true,
        navigateTo: "home",
      },
    ];

    const en: TourStep[] = [
      {
        target: "logo",
        title: "Welcome! 👋",
        description: "I'll guide you through the application. Follow the steps to learn everything!",
        position: "bottom",
      },
      {
        target: "mode-ship",
        title: "Ship Mode 🚢",
        description: "Calculate shipping cost by sea based on the volume (CBM) of your packages.",
        position: "bottom",
      },
      {
        target: "mode-plane",
        title: "Plane Mode ✈️",
        description: "Calculate shipping cost by air based on the weight of your packages.",
        position: "bottom",
      },
      {
        target: "mode-compare",
        title: "Compare Mode ⚖️",
        description: "Compare ship vs plane costs to find the cheapest option.",
        position: "bottom",
      },
      {
        target: "mode-multi",
        title: "Multi-Package 📦",
        description: "Calculate total cost for multiple different packages at once.",
        position: "bottom",
      },
      {
        target: "mode-ship",
        title: "Let's try it!",
        description: "Click on Ship mode to see how it works in detail.",
        position: "bottom",
        requireClick: true,
        navigateTo: "ship",
      },
      {
        target: "currency-select",
        title: "Choose your currency",
        description: "Select the currency for displaying results. Tariffs convert automatically.",
        position: "bottom",
        waitForTarget: true,
      },
      {
        target: "country-select",
        title: "Destination country",
        description: "Choose the country where your package will be delivered. Transit time will be estimated accordingly.",
        position: "bottom",
      },
      {
        target: "tariff-input",
        title: "Rate per m³",
        description: "Enter the CBM rate (cost per cubic meter) your freight forwarder gave you.",
        position: "bottom",
      },
      {
        target: "dimensions-input",
        title: "Package dimensions",
        description: "Enter length, width and height of your package in centimeters. Volume will be calculated automatically.",
        position: "top",
      },
      {
        target: "calculate-btn",
        title: "Calculate!",
        description: "Once fields are filled, click here to get the total cost, estimated delay, and payment message.",
        position: "top",
      },
      {
        target: "back-btn",
        title: "Back to home",
        description: "Click here to return to the main screen and explore other modes. The guide is complete! 🎉",
        position: "bottom",
        requireClick: true,
        navigateTo: "home",
      },
    ];

    const es: TourStep[] = [
      {
        target: "logo",
        title: "¡Bienvenido! 👋",
        description: "Te guiaré a través de la aplicación. ¡Sigue los pasos para aprenderlo todo!",
        position: "bottom",
      },
      {
        target: "mode-ship",
        title: "Modo Barco 🚢",
        description: "Calcula el costo de envío por barco según el volumen (CBM) de tus paquetes.",
        position: "bottom",
      },
      {
        target: "mode-plane",
        title: "Modo Avión ✈️",
        description: "Calcula el costo de envío por avión según el peso de tus paquetes.",
        position: "bottom",
      },
      {
        target: "mode-compare",
        title: "Modo Comparación ⚖️",
        description: "Compara costos barco vs avión para encontrar la opción más barata.",
        position: "bottom",
      },
      {
        target: "mode-multi",
        title: "Multi-Paquete 📦",
        description: "Calcula el costo total de varios paquetes diferentes a la vez.",
        position: "bottom",
      },
      {
        target: "mode-ship",
        title: "¡Probemos juntos!",
        description: "Haz clic en el modo Barco para ver cómo funciona en detalle.",
        position: "bottom",
        requireClick: true,
        navigateTo: "ship",
      },
      {
        target: "currency-select",
        title: "Elige tu moneda",
        description: "Selecciona la moneda para mostrar los resultados. Las tarifas se convierten automáticamente.",
        position: "bottom",
        waitForTarget: true,
      },
      {
        target: "country-select",
        title: "País de destino",
        description: "Elige el país donde se entregará tu paquete. El tiempo de tránsito se estimará en consecuencia.",
        position: "bottom",
      },
      {
        target: "tariff-input",
        title: "Tarifa por m³",
        description: "Ingresa la tarifa CBM (costo por metro cúbico) que tu agente de carga te proporcionó.",
        position: "bottom",
      },
      {
        target: "dimensions-input",
        title: "Dimensiones del paquete",
        description: "Ingresa largo, ancho y alto de tu paquete en centímetros. El volumen se calculará automáticamente.",
        position: "top",
      },
      {
        target: "calculate-btn",
        title: "¡Calcular!",
        description: "Una vez llenos los campos, haz clic aquí para obtener el costo total, el tiempo estimado y el mensaje de pago.",
        position: "top",
      },
      {
        target: "back-btn",
        title: "Volver al inicio",
        description: "Haz clic aquí para volver a la pantalla principal y explorar otros modos. ¡La guía ha terminado! 🎉",
        position: "bottom",
        requireClick: true,
        navigateTo: "home",
      },
    ];

    switch (language) {
      case "en": return en;
      case "es": return es;
      default: return fr;
    }
  }, [language]);
};
