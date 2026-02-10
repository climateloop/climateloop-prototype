import { useState } from "react";
import { X, Camera, Send, CloudRain, Wind, Thermometer, Flame, Snowflake, CloudHail } from "lucide-react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { id: "chuva", label: "Chuva", icon: CloudRain },
  { id: "vento", label: "Vento", icon: Wind },
  { id: "calor", label: "Calor", icon: Thermometer },
  { id: "incendio", label: "Incêndio", icon: Flame },
  { id: "helada", label: "Frio intenso", icon: Snowflake },
  { id: "granizo", label: "Granizo", icon: CloudHail },
];

const subOptions: Record<string, string[]> = {
  chuva: ["Chuva leve", "Chuva moderada", "Chuva forte", "Alagamento"],
  vento: ["Vento leve", "Vento forte", "Vendaval", "Árvore caída"],
  calor: ["Muito quente", "Asfalto derretendo", "Pessoas passando mal"],
  incendio: ["Fumaça visível", "Fogo pequeno", "Fogo próximo", "Incêndio ativo"],
  helada: ["Frio intenso", "Geada", "Gelo na pista"],
  granizo: ["Granizo pequeno", "Granizo grande", "Danos visíveis"],
};

const ReportModal = ({ isOpen, onClose }: ReportModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    alert("Relato enviado com sucesso! Obrigado por contribuir.");
    setSelectedCategory(null);
    setSelectedSub(null);
    setNotes("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-foreground/40 backdrop-blur-sm">
      <div className="bg-background w-full max-w-lg rounded-t-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
        <div className="sticky top-0 bg-background flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">
            {selectedCategory
              ? `Reportar ${categories.find((c) => c.id === selectedCategory)?.label}`
              : "Ajude sua comunidade"}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {!selectedCategory ? (
            <>
              <p className="text-sm text-muted-foreground">
                Reporte o que você está observando na sua região
              </p>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-surface-elevated hover:border-primary hover:shadow-card transition-all"
                    >
                      <Icon className="w-6 h-6 text-primary" />
                      <span className="text-xs font-medium text-foreground">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-sm font-medium text-foreground mb-2">O que você está observando?</p>
                <div className="flex flex-wrap gap-2">
                  {subOptions[selectedCategory]?.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedSub(opt)}
                      className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                        selectedSub === opt
                          ? "border-primary bg-primary/10 text-primary font-medium"
                          : "border-border text-foreground hover:border-primary/50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-2">
                  Notas adicionais (opcional)
                </p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Descreva o que observa..."
                  className="w-full p-3 rounded-xl border border-border bg-surface-elevated text-sm text-foreground placeholder:text-muted-foreground resize-none h-20 outline-none focus:border-primary transition-colors"
                />
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                <Camera className="w-5 h-5" />
                <span className="text-sm font-medium">Adicionar foto</span>
              </button>

              <button
                onClick={handleSubmit}
                disabled={!selectedSub}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm shadow-card hover:shadow-elevated transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                Enviar relato
              </button>

              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSub(null);
                }}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Voltar às categorias
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
