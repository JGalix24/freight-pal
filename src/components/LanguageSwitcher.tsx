import { useLanguage, Language } from "@/hooks/useLanguage";
import { Globe } from "lucide-react";

const flags: Record<Language, string> = {
  fr: "🇫🇷",
  en: "🇬🇧",
  es: "🇪🇸",
};

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languages: Language[] = ["fr", "en", "es"];

  return (
    <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`px-2 py-1 rounded-md text-sm transition-all ${
            language === lang
              ? "bg-primary text-primary-foreground shadow-sm"
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          }`}
          title={lang.toUpperCase()}
        >
          {flags[lang]}
        </button>
      ))}
    </div>
  );
};
