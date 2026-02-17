import { MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/hooks/useLanguage";

export interface Country {
  code: string;
  name: string;
  /** Preposition for French: "au", "en", "aux" */
  prepFr: string;
  /** Preposition for Spanish: "a", "en" */
  prepEs: string;
  /** Preposition for English: "in", "to" */
  prepEn: string;
}

export const COUNTRIES: Country[] = [
  { code: "TG", name: "Togo", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "BJ", name: "Bénin", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "CI", name: "Côte d'Ivoire", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "SN", name: "Sénégal", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "CM", name: "Cameroun", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "GH", name: "Ghana", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "NG", name: "Nigeria", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "ML", name: "Mali", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "BF", name: "Burkina Faso", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "NE", name: "Niger", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "GA", name: "Gabon", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "CG", name: "Congo", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "CD", name: "RD Congo", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "GN", name: "Guinée", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "TD", name: "Tchad", prepFr: "au", prepEs: "a", prepEn: "in" },
  { code: "MR", name: "Mauritanie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "FR", name: "France", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "DE", name: "Allemagne", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "CN", name: "Chine", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "TR", name: "Turquie", prepFr: "en", prepEs: "en", prepEn: "in" },
  { code: "AE", name: "Émirats Arabes Unis", prepFr: "aux", prepEs: "a los", prepEn: "in" },
  { code: "US", name: "États-Unis", prepFr: "aux", prepEs: "a", prepEn: "in" },
];

export const getCountryPreposition = (country: Country, lang: "fr" | "en" | "es"): string => {
  switch (lang) {
    case "en": return `${country.prepEn} ${country.name}`;
    case "es": return `${country.prepEs} ${country.name}`;
    default: return `${country.prepFr} ${country.name}`;
  }
};

interface CountrySelectProps {
  value: string;
  onChange: (code: string) => void;
}

export const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-foreground">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        {t.destinationCountry}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-secondary border-border">
          <SelectValue placeholder={t.selectCountry} />
        </SelectTrigger>
        <SelectContent>
          {COUNTRIES.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
