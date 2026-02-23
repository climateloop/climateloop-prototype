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

      <div className="space-y-6">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">{t.legalTermsHeading}</h2>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">{t.legalPrivacyHeading}</h2>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
            </p>
            <p>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LegalPage;
