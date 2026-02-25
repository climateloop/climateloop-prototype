import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage, type Locale } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import logo from "@/assets/climateloop-logo.png";

const flags: { locale: Locale; label: string }[] = [
  { locale: "en", label: "EN" },
  { locale: "es", label: "ES" },
  { locale: "pt", label: "PT" },
  { locale: "fr", label: "FR" },
];

interface AuthPageProps {
  onOpenLegal?: () => void;
}

const AuthPage = ({ onOpenLegal }: AuthPageProps) => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("teste@teste.com");
  const [password, setPassword] = useState("123456");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { t, locale, setLocale } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError(t.authErrorRequired);
      return;
    }

    if (isSignup) {
      if (!name.trim()) {
        setError(t.authErrorName);
        return;
      }
      if (password.length < 6) {
        setError(t.authErrorPassword);
        return;
      }
      if (!acceptedTerms) {
        setError(t.authErrorTerms);
        return;
      }
    }

    setLoading(true);

    try {
      if (isSignup) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { display_name: name.trim() },
            emailRedirectTo: window.location.origin,
          },
        });
        if (signUpError) {
          setError(signUpError.message);
        } else {
          toast.success("Check your email to confirm your account!");
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInError) {
          setError(signInError.message);
        }
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Climate Loop" className="h-14 w-auto" />
        </div>

        {/* Language selector */}
        <div className="flex justify-center gap-2">
          {flags.map((f) => (
            <button
              key={f.locale}
              type="button"
              onClick={() => setLocale(f.locale)}
              className={`text-sm font-semibold px-3 py-1.5 rounded-lg transition-all ${
                locale === f.locale
                  ? "bg-primary text-primary-foreground ring-2 ring-primary scale-105"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <Card className="shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-center">
              {isSignup ? t.authSignup : t.authLogin}
            </CardTitle>
            <CardDescription className="text-center">
              {isSignup ? t.authSignupDesc : t.authLoginDesc}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <Input
                  type="text"
                  placeholder={t.authNamePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  disabled={loading}
                />
              )}
              <Input
                type="email"
                placeholder={t.authEmailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                disabled={loading}
              />
              <Input
                type="password"
                placeholder={t.authPasswordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={128}
                disabled={loading}
              />

              {isSignup && (
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(v) => setAcceptedTerms(v === true)}
                    className="mt-0.5"
                    disabled={loading}
                  />
                  <label htmlFor="terms" className="text-xs text-muted-foreground leading-tight">
                    {t.authTermsCheckbox}{" "}
                    <button
                      type="button"
                      onClick={() => onOpenLegal?.()}
                      className="text-primary hover:underline"
                    >
                      {t.authTermsLink}
                    </button>
                  </label>
                </div>
              )}

              {error && (
                <p className="text-sm text-destructive font-medium">{error}</p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  isSignup ? t.authSignup : t.authLogin
                )}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => { setIsSignup(!isSignup); setError(""); }}
                className="text-sm text-primary hover:underline"
                disabled={loading}
              >
                {isSignup ? t.authHaveAccount : t.authNoAccount}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
