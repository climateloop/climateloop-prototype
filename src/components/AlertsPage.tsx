import AlertCard, { type Alert } from "./AlertCard";
import { Bell, Filter } from "lucide-react";

const alerts: Alert[] = [
  {
    id: "1",
    severity: "red",
    title: "Alerta vermelho: Chuva intensa",
    description:
      "Previsão de chuva acima de 80mm/h para as próximas 3 horas. Risco de alagamentos e deslizamentos.",
    time: "Há 10 minutos",
    actions: [
      "Evite áreas baixas e encostas",
      "Não atravesse ruas alagadas",
      "Tenha documentos e kit de emergência prontos",
      "Se necessário, dirija-se ao abrigo mais próximo",
    ],
  },
  {
    id: "2",
    severity: "orange",
    title: "Alerta laranja: Temperatura elevada",
    description:
      "Temperaturas acima de 38°C esperadas para amanhã. Risco à saúde para idosos e crianças.",
    time: "Há 1 hora",
    actions: [
      "Mantenha-se hidratado",
      "Evite exposição ao sol entre 10h e 16h",
      "Use roupas leves e protetor solar",
    ],
  },
  {
    id: "3",
    severity: "yellow",
    title: "Alerta amarelo: Vento moderado",
    description:
      "Rajadas de vento de até 60 km/h esperadas para a tarde. Atenção com objetos soltos.",
    time: "Há 2 horas",
    actions: ["Recolha objetos leves de áreas externas", "Evite estacionar sob árvores"],
  },
  {
    id: "4",
    severity: "yellow",
    title: "Previsão ML: Risco futuro de granizo",
    description:
      "O modelo de machine learning detectou padrões que indicam 35% de chance de granizo em 48h.",
    time: "Previsão ML - 48h",
  },
];

const AlertsPage = () => {
  return (
    <div className="px-4 pb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Alertas ativos</h2>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors">
          <Filter className="w-3.5 h-3.5" />
          Filtrar
        </button>
      </div>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
};

export default AlertsPage;
