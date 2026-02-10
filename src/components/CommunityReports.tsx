import { Users, FileText, TrendingUp, Camera, MapPin } from "lucide-react";

interface CommunityReport {
  id: string;
  user: string;
  type: string;
  description: string;
  time: string;
  hasPhoto: boolean;
  distance: string;
}

const reports: CommunityReport[] = [
  {
    id: "1",
    user: "Maria S.",
    type: "Alagamento",
    description: "Rua completamente alagada na Av. Paulista",
    time: "Há 15 min",
    hasPhoto: true,
    distance: "1.2 km",
  },
  {
    id: "2",
    user: "João P.",
    type: "Calor extremo",
    description: "Asfalto derretendo na zona leste",
    time: "Há 32 min",
    hasPhoto: false,
    distance: "3.5 km",
  },
  {
    id: "3",
    user: "Ana L.",
    type: "Vento forte",
    description: "Árvore caída na Rua Augusta",
    time: "Há 1h",
    hasPhoto: true,
    distance: "0.8 km",
  },
];

const typeColors: Record<string, string> = {
  Alagamento: "bg-primary/10 text-primary",
  "Calor extremo": "bg-destructive/10 text-destructive",
  "Vento forte": "bg-warning/10 text-warning",
  Incêndio: "bg-destructive/10 text-destructive",
};

const CommunityReports = () => {
  return (
    <div className="mx-4">
      <h2 className="text-base font-semibold text-foreground mb-1">Comunidade ao redor</h2>
      <p className="text-xs text-muted-foreground mb-3">Relatos num raio de 5km da sua localização</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-surface-elevated rounded-xl p-3 text-center shadow-card border border-border">
          <Users className="w-4 h-4 mx-auto text-primary mb-1" />
          <p className="text-xl font-bold text-foreground">84</p>
          <p className="text-[10px] text-muted-foreground">Ativos agora</p>
        </div>
        <div className="bg-surface-elevated rounded-xl p-3 text-center shadow-card border border-border">
          <FileText className="w-4 h-4 mx-auto text-secondary mb-1" />
          <p className="text-xl font-bold text-foreground">156</p>
          <p className="text-[10px] text-muted-foreground">Relatos hoje</p>
        </div>
        <div className="bg-surface-elevated rounded-xl p-3 text-center shadow-card border border-border">
          <TrendingUp className="w-4 h-4 mx-auto text-accent mb-1" />
          <p className="text-xl font-bold text-foreground">91%</p>
          <p className="text-[10px] text-muted-foreground">Precisão</p>
        </div>
      </div>

      {/* Reports list */}
      <div className="space-y-3">
        {reports.map((r) => (
          <div key={r.id} className="bg-surface-elevated rounded-xl p-3 shadow-card border border-border">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColors[r.type] || "bg-muted text-muted-foreground"}`}>
                    {r.type}
                  </span>
                  {r.hasPhoto && <Camera className="w-3.5 h-3.5 text-muted-foreground" />}
                </div>
                <p className="text-sm text-foreground">{r.description}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-xs text-muted-foreground">{r.user}</span>
                  <span className="text-xs text-muted-foreground">{r.time}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                    <MapPin className="w-3 h-3" /> {r.distance}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityReports;
