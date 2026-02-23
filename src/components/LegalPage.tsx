import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface LegalPageProps {
  onBack: () => void;
}

const LegalPage = ({ onBack }: LegalPageProps) => {
  const { t } = useLanguage();

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center gap-3 py-4">
        <button onClick={onBack} className="p-1.5 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">{t.legalTitle}</h1>
      </div>

      <p className="text-xs text-muted-foreground mb-4">Last updated: 23 February 2026</p>

      <div className="space-y-6">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">{t.legalTermsHeading}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {t.legalTermsContent}
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">{t.legalPrivacyHeading}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {t.legalPrivacyContent}
          </p>
        </section>
      </div>
    </div>
  );
};

export default LegalPage;
