import { useState } from "react";
import Header, { NotificationPanel, MenuPanel } from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import WeatherCard from "@/components/WeatherCard";
import AlertCard, { type Alert } from "@/components/AlertCard";
import ForecastComparison from "@/components/ForecastComparison";
import CommunityReports from "@/components/CommunityReports";
import AIChat from "@/components/AIChat";
import ReportModal from "@/components/ReportModal";
import AlertsPage from "@/components/AlertsPage";
import MapPage from "@/components/MapPage";
import ProfilePage from "@/components/ProfilePage";
import AlertDetail from "@/components/AlertDetail";
import ForecastDetail from "@/components/ForecastDetail";
import CommunityReportDetail from "@/components/CommunityReportDetail";
import MyContributions from "@/components/MyContributions";
import { useLanguage } from "@/i18n/LanguageContext";

type DetailView =
  | { type: "alert"; alert: Alert }
  | { type: "forecast" }
  | { type: "community"; reportId: string }
  | { type: "contributions" }
  | null;

const Index = () => {
  const [activeTab, setActiveTab] = useState("inicio");
  const [reportOpen, setReportOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatContext, setChatContext] = useState<string | null>(null);
  const [detailView, setDetailView] = useState<DetailView>(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  const activeAlert: Alert = {
    id: "main",
    severity: "orange",
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
      setDetailView(null);
    }
  };

  const handleOpenChat = (context?: string) => {
    setChatContext(context || null);
    setChatOpen(true);
  };

  const handleOpenAlertDetail = (alert: Alert) => {
    setDetailView({ type: "alert", alert });
  };

  const handleOpenForecastDetail = () => {
    setDetailView({ type: "forecast" });
  };

  const handleOpenCommunityDetail = (reportId: string) => {
    setDetailView({ type: "community", reportId });
  };

  const handleOpenContributions = () => {
    setDetailView({ type: "contributions" });
    setActiveTab("inicio");
  };

  const renderContent = () => {
    if (detailView) {
      switch (detailView.type) {
        case "alert":
          return (
            <AlertDetail
              alert={detailView.alert}
              onBack={() => setDetailView(null)}
              onOpenChat={() => handleOpenChat(detailView.alert.title)}
            />
          );
        case "forecast":
          return (
            <ForecastDetail
              onBack={() => setDetailView(null)}
              onOpenChat={() => handleOpenChat("forecast")}
            />
          );
        case "community":
          return (
            <CommunityReportDetail
              reportId={detailView.reportId}
              onBack={() => setDetailView(null)}
              onOpenChat={() => handleOpenChat(`community report #${detailView.reportId}`)}
            />
          );
        case "contributions":
          return <MyContributions onBack={() => setDetailView(null)} />;
      }
    }

    if (activeTab === "inicio") {
      return (
        <>
          <div className="px-4">
            <AlertCard alert={activeAlert} compact onAskAI={handleOpenAlertDetail} />
          </div>
          <WeatherCard />
          <ForecastComparison onOpenDetail={handleOpenForecastDetail} />
          <CommunityReports onOpenReport={handleOpenCommunityDetail} />
        </>
      );
    }

    if (activeTab === "alertas") return <AlertsPage onAskAI={handleOpenAlertDetail} />;
    if (activeTab === "mapa") return <MapPage />;
    if (activeTab === "perfil") return <ProfilePage onOpenContributions={handleOpenContributions} />;
    return null;
  };

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      <Header
        onOpenNotifications={() => setNotifOpen(true)}
        onOpenMenu={() => setMenuOpen(true)}
      />

      <main className="pt-4 pb-24 space-y-5">
        {renderContent()}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      <ReportModal isOpen={reportOpen} onClose={() => setReportOpen(false)} />
      <AIChat
        isOpen={chatOpen}
        onToggle={() => setChatOpen(!chatOpen)}
        context={chatContext}
        onContextHandled={() => setChatContext(null)}
      />
      <NotificationPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
      <MenuPanel isOpen={menuOpen} onClose={() => setMenuOpen(false)} onOpenContributions={handleOpenContributions} />
    </div>
  );
};

export default Index;
