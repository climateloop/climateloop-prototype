import { useState } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import WeatherCard from "@/components/WeatherCard";
import AlertCard from "@/components/AlertCard";
import ForecastComparison from "@/components/ForecastComparison";
import CommunityReports from "@/components/CommunityReports";
import AIChat from "@/components/AIChat";
import ReportModal from "@/components/ReportModal";
import AlertsPage from "@/components/AlertsPage";
import MapPage from "@/components/MapPage";
import ProfilePage from "@/components/ProfilePage";

const activeAlert = {
  id: "main",
  severity: "orange" as const,
  title: "Alerta Laranja: Chuva forte",
  description: "Previsão de chuvas acima de 50mm nas próximas horas. Fique atento às recomendações.",
  time: "Há 30 minutos",
  actions: [
    "Evite áreas de alagamento conhecidas",
    "Reporte qualquer alagamento visível",
    "Prepare kit de emergência",
    "Acompanhe as atualizações",
  ],
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("inicio");
  const [reportOpen, setReportOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    if (tab === "reportar") {
      setReportOpen(true);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      <Header />

      <main className="pt-4 pb-24 space-y-5">
        {activeTab === "inicio" && (
          <>
            {/* Active alert banner */}
            <div className="px-4">
              <AlertCard alert={activeAlert} compact />
            </div>

            {/* Current weather */}
            <WeatherCard />

            {/* Forecast comparison */}
            <ForecastComparison />

            {/* Community reports */}
            <CommunityReports />

            {/* AI Chat */}
            <AIChat />
          </>
        )}

        {activeTab === "alertas" && <AlertsPage />}
        {activeTab === "mapa" && <MapPage />}
        {activeTab === "perfil" && <ProfilePage />}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      <ReportModal isOpen={reportOpen} onClose={() => setReportOpen(false)} />
    </div>
  );
};

export default Index;
