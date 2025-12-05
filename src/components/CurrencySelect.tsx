import { DollarSign } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface CurrencySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const currencies = [
  { value: "FCFA", label: "FCFA" },
  { value: "EUR", label: "EUR (€)" },
  { value: "USD", label: "USD ($)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "CAD", label: "CAD ($)" },
];

export const CurrencySelect = ({ value, onChange }: CurrencySelectProps) => {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-foreground">
        <DollarSign className="h-4 w-4 text-muted-foreground" />
        Devise
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-secondary border-border">
          <SelectValue placeholder="Sélectionner une devise" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {currencies.map((currency) => (
            <SelectItem key={currency.value} value={currency.value}>
              {currency.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
