import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/i18n/LanguageContext";
import logo from "@/assets/climateloop-logo.png";

interface AuthPageProps {
  onLogin: () => void;
}

const AuthPage = ({ onLogin }: AuthPageProps) => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError(t.authErrorRequired);
      return;
    }
    if (isSignup && !name.trim()) {
      setError(t.authErrorName);
      return;
    }
    if (password.length < 6) {
      setError(t.authErrorPassword);
      return;
    }

    // Prototype: just navigate to home
    onLogin();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-3">
          <img src={logo} alt="ClimateLoop" className="h-14 w-auto" />
          <p className="text-sm text-muted-foreground text-center">
            {t.authTagline}
          </p>
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
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">{t.authName}</label>
                  <Input
                    type="text"
                    placeholder={t.authNamePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                  />
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">{t.authEmail}</label>
                <Input
                  type="email"
                  placeholder={t.authEmailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">{t.authPassword}</label>
                <Input
                  type="password"
                  placeholder={t.authPasswordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength={128}
                />
              </div>

              {error && (
                <p className="text-sm text-destructive font-medium">{error}</p>
              )}

              <Button type="submit" className="w-full">
                {isSignup ? t.authSignup : t.authLogin}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => { setIsSignup(!isSignup); setError(""); }}
                className="text-sm text-primary hover:underline"
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
