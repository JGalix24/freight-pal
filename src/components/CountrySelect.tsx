import { useState, useRef, useEffect } from "react";
import { MapPin, Search, PenLine, ChevronDown, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export interface Country {
  code: string;
  name: string;
  /** Preposition for French: "au", "en", "aux" */
  prepFr: string;
  /** Preposition for Spanish: "a", "en", "al" */
  prepEs: string;
  /** Preposition for English: "in", "to" */
  prepEn: string;
}

export const COUNTRIES: Country[] = [
  { code: "AF", name: "Afghanistan", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "ZA", name: "Afrique du Sud", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "AL", name: "Albanie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "DZ", name: "Algérie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "DE", name: "Allemagne", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "AD", name: "Andorre", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "AO", name: "Angola", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "AG", name: "Antigua-et-Barbuda", prepFr: "à", prepEs: "en", prepEn: "in" },
  { code: "SA", name: "Arabie Saoudite", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "AR", name: "Argentine", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "AM", name: "Arménie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "AU", name: "Australie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "AT", name: "Autriche", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "AZ", name: "Azerbaïdjan", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "BS", name: "Bahamas", prepFr: "aux", prepEs: "en", prepEn: "in" },
  { code: "BH", name: "Bahreïn", prepFr: "à", prepEs: "en", prepEn: "in" },
  { code: "BD", name: "Bangladesh", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "BB", name: "Barbade", prepFr: "à", prepEs: "en", prepEn: "in" },
  { code: "BE", name: "Belgique", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "BZ", name: "Belize", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "BJ", name: "Bénin", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "BT", name: "Bhoutan", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "BY", name: "Biélorussie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "BO", name: "Bolivie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "BA", name: "Bosnie-Herzégovine", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "BW", name: "Botswana", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "BR", name: "Brésil", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "BN", name: "Brunei", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "BG", name: "Bulgarie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "BF", name: "Burkina Faso", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "BI", name: "Burundi", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "CV", name: "Cap-Vert", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "KH", name: "Cambodge", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "CM", name: "Cameroun", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "CA", name: "Canada", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "CF", name: "Centrafrique", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "CL", name: "Chili", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "CN", name: "Chine", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "CY", name: "Chypre", prepFr: "à", prepEs: "en", prepEn: "in" },
  { code: "CO", name: "Colombie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "KM", name: "Comores", prepFr: "aux", prepEs: "en", prepEn: "in" },
  { code: "CG", name: "Congo", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "CD", name: "RD Congo", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "KP", name: "Corée du Nord", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "KR", name: "Corée du Sud", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "CR", name: "Costa Rica", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "CI", name: "Côte d'Ivoire", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "HR", name: "Croatie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "CU", name: "Cuba", prepFr: "à", prepEs: "en", prepEn: "in" },
  { code: "DK", name: "Danemark", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "DJ", name: "Djibouti", prepFr: "à", prepEs: "en", prepEn: "in" },
  { code: "DM", name: "Dominique", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "EG", name: "Égypte", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "AE", name: "Émirats Arabes Unis", prepFr: "aux", prepEs: "a los", prepEn: "in" },
  { code: "EC", name: "Équateur", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "ER", name: "Érythrée", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "ES", name: "Espagne", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "EE", name: "Estonie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "SZ", name: "Eswatini", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "US", name: "États-Unis", prepFr: "aux", prepEs: "a", prepEn: "in" },
  { code: "ET", name: "Éthiopie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "FJ", name: "Fidji", prepFr: "aux", prepEs: "en", prepEn: "in" },
  { code: "FI", name: "Finlande", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "FR", name: "France", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "GA", name: "Gabon", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "GM", name: "Gambie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "GE", name: "Géorgie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "GH", name: "Ghana", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "GR", name: "Grèce", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "GD", name: "Grenade", prepFr: "à", prepEs: "en", prepEn: "in" },
  { code: "GT", name: "Guatemala", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "GN", name: "Guinée", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "GW", name: "Guinée-Bissau", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "GQ", name: "Guinée équatoriale", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "GY", name: "Guyana", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "HT", name: "Haïti", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "HN", name: "Honduras", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "HU", name: "Hongrie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "IN", name: "Inde", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "ID", name: "Indonésie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "IQ", name: "Irak", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "IR", name: "Iran", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "IE", name: "Irlande", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "IS", name: "Islande", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "IL", name: "Israël", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "IT", name: "Italie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "JM", name: "Jamaïque", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "JP", name: "Japon", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "JO", name: "Jordanie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "KZ", name: "Kazakhstan", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "KE", name: "Kenya", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "KG", name: "Kirghizistan", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "KI", name: "Kiribati", prepFr: "aux", prepEs: "en", prepEn: "in" },
  { code: "KW", name: "Koweït", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "LA", name: "Laos", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "LS", name: "Lesotho", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "LV", name: "Lettonie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "LB", name: "Liban", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "LR", name: "Liberia", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "LY", name: "Libye", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "LI", name: "Liechtenstein", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "LT", name: "Lituanie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "LU", name: "Luxembourg", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "MG", name: "Madagascar", prepFr: "à", prepEs: "en", prepEn: "in" },
  { code: "MY", name: "Malaisie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "MW", name: "Malawi", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "MV", name: "Maldives", prepFr: "aux", prepEs: "en", prepEn: "in" },
  { code: "ML", name: "Mali", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "MT", name: "Malte", prepFr: "à", prepEs: "en", prepEn: "in" },
  { code: "MA", name: "Maroc", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "MH", name: "Marshall", prepFr: "aux", prepEs: "en", prepEn: "in" },
  { code: "MR", name: "Mauritanie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "MU", name: "Maurice", prepFr: "à", prepEs: "en", prepEn: "in" },
  { code: "MX", name: "Mexique", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "FM", name: "Micronésie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "MD", name: "Moldavie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "MC", name: "Monaco", prepFr: "à", prepEs: "en", prepEn: "in" },
  { code: "MN", name: "Mongolie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "ME", name: "Monténégro", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "MZ", name: "Mozambique", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "MM", name: "Myanmar", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "NA", name: "Namibie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "NR", name: "Nauru", prepFr: "à", prepEs: "en", prepEn: "in" },
  { code: "NP", name: "Népal", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "NI", name: "Nicaragua", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "NE", name: "Niger", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "NG", name: "Nigeria", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "NO", name: "Norvège", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "NZ", name: "Nouvelle-Zélande", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "OM", name: "Oman", prepFr: "à", prepEs: "en", prepEn: "in" },
  { code: "UG", name: "Ouganda", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "UZ", name: "Ouzbékistan", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "PK", name: "Pakistan", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "PW", name: "Palaos", prepFr: "aux", prepEs: "en", prepEn: "in" },
  { code: "PA", name: "Panama", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "PG", name: "Papouasie-Nouvelle-Guinée", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "PY", name: "Paraguay", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "NL", name: "Pays-Bas", prepFr: "aux", prepEs: "en", prepEn: "in" },
  { code: "PE", name: "Pérou", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "PH", name: "Philippines", prepFr: "aux", prepEs: "en", prepEn: "in" },
  { code: "PL", name: "Pologne", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "PT", name: "Portugal", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "QA", name: "Qatar", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "RO", name: "Roumanie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "GB", name: "Royaume-Uni", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "RU", name: "Russie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "RW", name: "Rwanda", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "KN", name: "Saint-Kitts-et-Nevis", prepFr: "à", prepEs: "en", prepEn: "in" },
  { code: "LC", name: "Sainte-Lucie", prepFr: "à", prepEs: "en", prepEn: "in" },
  { code: "VC", name: "Saint-Vincent", prepFr: "à", prepEs: "en", prepEn: "in" },
  { code: "SB", name: "Salomon", prepFr: "aux", prepEs: "en", prepEn: "in" },
  { code: "WS", name: "Samoa", prepFr: "aux", prepEs: "en", prepEn: "in" },
  { code: "SM", name: "Saint-Marin", prepFr: "à", prepEs: "en", prepEn: "in" },
  { code: "ST", name: "São Tomé-et-Príncipe", prepFr: "à", prepEs: "en", prepEn: "in" },
  { code: "SN", name: "Sénégal", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "RS", name: "Serbie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "SC", name: "Seychelles", prepFr: "aux", prepEs: "en", prepEn: "in" },
  { code: "SL", name: "Sierra Leone", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "SG", name: "Singapour", prepFr: "à", prepEs: "en", prepEn: "in" },
  { code: "SK", name: "Slovaquie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "SI", name: "Slovénie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "SO", name: "Somalie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "SS", name: "Soudan du Sud", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "SD", name: "Soudan", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "LK", name: "Sri Lanka", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "SE", name: "Suède", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "CH", name: "Suisse", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "SR", name: "Suriname", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "SY", name: "Syrie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "TJ", name: "Tadjikistan", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "TZ", name: "Tanzanie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "TD", name: "Tchad", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "CZ", name: "Tchéquie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "TH", name: "Thaïlande", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "TL", name: "Timor-Leste", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "TG", name: "Togo", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "TO", name: "Tonga", prepFr: "aux", prepEs: "en", prepEn: "in" },
  { code: "TT", name: "Trinité-et-Tobago", prepFr: "à", prepEs: "en", prepEn: "in" },
  { code: "TN", name: "Tunisie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "TM", name: "Turkménistan", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "TR", name: "Turquie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "TV", name: "Tuvalu", prepFr: "aux", prepEs: "en", prepEn: "in" },
  { code: "UA", name: "Ukraine", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "UY", name: "Uruguay", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "VU", name: "Vanuatu", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "VE", name: "Venezuela", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "VN", name: "Vietnam", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "YE", name: "Yémen", prepFr: "au", prepEs: "en", prepEn: "in" },
  { code: "ZM", name: "Zambie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "ZW", name: "Zimbabwe", prepFr: "au", prepEs: "en", prepEn: "in" },
];

export const CUSTOM_COUNTRY_CODE = "__CUSTOM__";

export const getCountryPreposition = (
  country: Country | { code: string; name: string; customPrep?: string },
  lang: "fr" | "en" | "es"
): string => {
  if ("customPrep" in country && country.customPrep) {
    return `${country.customPrep} ${country.name}`;
  }
  const c = country as Country;
  switch (lang) {
    case "en": return `${c.prepEn} ${c.name}`;
    case "es": return `${c.prepEs} ${c.name}`;
    default: return `${c.prepFr} ${c.name}`;
  }
};

interface CountrySelectProps {
  value: string;
  onChange: (code: string) => void;
  customCountry?: string;
  onCustomCountryChange?: (name: string) => void;
}

export const CountrySelect = ({
  value,
  onChange,
  customCountry = "",
  onCustomCountryChange,
}: CountrySelectProps) => {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [isCustom, setIsCustom] = useState(value === CUSTOM_COUNTRY_CODE);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const selected = COUNTRIES.find((c) => c.code === value);

  useEffect(() => {
    setIsCustom(value === CUSTOM_COUNTRY_CODE);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    onChange(code);
    setOpen(false);
    setSearch("");
    setIsCustom(false);
  };

  const handleCustomMode = () => {
    onChange(CUSTOM_COUNTRY_CODE);
    setOpen(false);
    setSearch("");
    setIsCustom(true);
  };

  const displayValue = isCustom
    ? customCountry || "Saisie manuelle..."
    : selected?.name || t.selectCountry;

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-foreground">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        {t.destinationCountry}
      </Label>

      <div className="relative" ref={dropdownRef}>
        {/* Trigger */}
        <button
          type="button"
          onClick={() => { setOpen((o) => !o); setIsCustom(false); }}
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <span className={selected || isCustom ? "text-foreground" : "text-muted-foreground"}>
            {displayValue}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-lg text-popover-foreground">
            {/* Search */}
            <div className="flex items-center border-b border-border px-3 py-2 gap-2">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un pays..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {search && (
                <button onClick={() => setSearch("")}>
                  <X className="h-3 w-3 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-52 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">Aucun pays trouvé</p>
              ) : (
                filtered.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleSelect(c.code)}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors ${value === c.code ? "bg-accent text-accent-foreground font-medium" : ""}`}
                  >
                    {c.name}
                  </button>
                ))
              )}
            </div>

            {/* Manual entry option */}
            <div className="border-t border-border p-2">
              <button
                type="button"
                onClick={handleCustomMode}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md text-primary hover:bg-accent transition-colors"
              >
                <PenLine className="h-4 w-4" />
                Mon pays n'est pas dans la liste
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Custom input */}
      {isCustom && (
        <div className="flex items-center gap-2 mt-2">
          <Input
            value={customCountry}
            onChange={(e) => onCustomCountryChange?.(e.target.value)}
            placeholder="Entrez le nom du pays..."
            className="bg-secondary border-border"
            autoFocus
          />
          {customCountry && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => { onChange("TG"); setIsCustom(false); onCustomCountryChange?.(""); }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
