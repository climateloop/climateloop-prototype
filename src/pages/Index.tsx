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
import { useLanguage } from "@/i18n/LanguageContext";

const Index = () => {
  const [activeTab, setActiveTab] = useState("inicio");
  const [reportOpen, setReportOpen] = useState(false);
  const { t } = useLanguage();

  const activeAlert = {
    id: "main",
    severity: "orange" as const,
    title: t.activeAlertTitle,
    description: t.activeAlertDesc,
    time: t.activeAlertTime,
    actions: [
      t.activeAlertAction1,
      t.activeAlertAction2,
      t.activeAlertAction3,
      t.activeAlertAction4,
    ],
  };

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
            <div className="px-4">
              <AlertCard alert={activeAlert} compact />
            </div>
            <WeatherCard />
            <ForecastComparison />
            <CommunityReports />
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
