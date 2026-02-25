import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import Header, { NotificationPanel } from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import WeatherCard from "@/components/WeatherCard";
import HomeMap from "@/components/HomeMap";
import AlertCard, { type Alert } from "@/components/AlertCard";
import { type CapAlert, useCapAlerts } from "@/hooks/useCapAlerts";
import ForecastComparison from "@/components/ForecastComparison";
import IoTStationCard from "@/components/IoTStationCard";
import CommunityReports from "@/components/CommunityReports";
import EmergencyNumbers from "@/components/EmergencyNumbers";
import AIChat from "@/components/AIChat";
import ReportModal from "@/components/ReportModal";
import AlertsPage from "@/components/AlertsPage";
import MapPage from "@/components/MapPage";
import ProfilePage from "@/components/ProfilePage";
import AlertDetail from "@/components/AlertDetail";
import ForecastDetail from "@/components/ForecastDetail";
import CommunityReportDetail from "@/components/CommunityReportDetail";
import MyContributions from "@/components/MyContributions";
import MyLocationPage from "@/components/MyLocationPage";
import AuthPage from "@/components/AuthPage";
import LegalPage from "@/components/LegalPage";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

type DetailView =
  | { type: "alert"; alert: Alert }
  | { type: "cap-alert"; capAlert: CapAlert }
  | { type: "forecast" }
  | { type: "community"; reportId: string }
  | { type: "contributions" }
  | { type: "location" }
  | { type: "legal" }
  | null;

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState("inicio");
  const [reportOpen, setReportOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatContext, setChatContext] = useState<string | null>(null);
  const [detailView, setDetailView] = useState<DetailView>(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const { t } = useLanguage();
  const { data: capData } = useCapAlerts();

  const [showLegalFromAuth, setShowLegalFromAuth] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      setLoadingAuth(false);
    });
    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      setSession(sess);
      setLoadingAuth(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session) {
    if (showLegalFromAuth) {
      return (
        <div className="min-h-screen bg-background max-w-lg mx-auto">
          <LegalPage onBack={() => setShowLegalFromAuth(false)} />
        </div>
      );
    }
    return <AuthPage onOpenLegal={() => setShowLegalFromAuth(true)} />;
  }

  // Pick the closest active or upcoming CAP alert for the home card
  const latestCapAlert: CapAlert | null = (() => {
    const active = capData?.immediate ?? [];
    const upcoming = capData?.future ?? [];
    const candidates = [...active, ...upcoming];
    if (candidates.length === 0) return null;
    const now = Date.now();
    candidates.sort((a, b) => {
      const aTime = a.onset ? Math.abs(new Date(a.onset).getTime() - now) : 0;
      const bTime = b.onset ? Math.abs(new Date(b.onset).getTime() - now) : 0;
      return aTime - bTime;
    });
    return candidates[0];
  })();

  const handleTabChange = (tab: string) => {
    if (tab === "reportar") {
      setReportOpen(true);
    } else if (tab === "comunidade") {
      setActiveTab("comunidade");
      setDetailView(null);
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

  const handleOpenCapAlertDetail = (capAlert: CapAlert) => {
    setDetailView({ type: "cap-alert", capAlert });
  };

  // For map marker clicks — look up alert by id from the known set
  const mapAlerts: Alert[] = [
    { id: "1", severity: "red",    title: t.activeAlertTitle, description: t.activeAlertDesc, time: t.activeAlertTime, actions: [t.activeAlertAction1, t.activeAlertAction2, t.activeAlertAction3, t.activeAlertAction4] },
    { id: "2", severity: "orange", title: t.activeAlertTitle, description: t.activeAlertDesc, time: t.activeAlertTime, actions: [t.activeAlertAction1, t.activeAlertAction2] },
    { id: "3", severity: "yellow", title: t.activeAlertTitle, description: t.activeAlertDesc, time: t.activeAlertTime },
    { id: "4", severity: "orange", title: t.activeAlertTitle, description: t.activeAlertDesc, time: t.activeAlertTime, actions: [t.activeAlertAction1] },
  ];

  const handleOpenAlertById = (alertId: string) => {
    const alert = mapAlerts.find((a) => a.id === alertId);
    if (alert) handleOpenAlertDetail(alert);
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

  const handleOpenLegal = () => {
    setDetailView({ type: "legal" });
    setActiveTab("inicio");
  };

  const handleOpenLocation = () => {
    setDetailView({ type: "location" });
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
              onOpenChat={() => setChatOpen(true)}
            />
          );
        case "cap-alert":
          return (
            <AlertDetail
              capAlert={detailView.capAlert}
              onBack={() => setDetailView(null)}
              onOpenChat={() => setChatOpen(true)}
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
          return <MyContributions onBack={() => { setDetailView(null); setActiveTab("perfil"); }} onOpenReport={handleOpenCommunityDetail} />;
        case "location":
          return <MyLocationPage onBack={() => setDetailView(null)} />;
        case "legal":
          return <LegalPage onBack={() => { setDetailView(null); setActiveTab("perfil"); }} />;
      }
    }

    if (activeTab === "inicio") {
      return (
        <>
          {latestCapAlert && (
            <div className="px-4">
              <AlertCard capAlert={latestCapAlert} compact onAskAI={() => handleOpenCapAlertDetail(latestCapAlert)} />
            </div>
          )}
          <WeatherCard />
          <HomeMap onOpenCommunityDetail={handleOpenCommunityDetail} />
          <CommunityReports onOpenReport={handleOpenCommunityDetail} preview />
          <IoTStationCard />
          <ForecastComparison onOpenDetail={handleOpenForecastDetail} />
          <EmergencyNumbers />
        </>
      );
    }

    if (activeTab === "comunidade") return <CommunityReports onOpenReport={handleOpenCommunityDetail} />;
    if (activeTab === "alertas") return <AlertsPage onAskAI={handleOpenCapAlertDetail} />;
    if (activeTab === "mapa") return <MapPage onOpenCommunityDetail={handleOpenCommunityDetail} />;
    if (activeTab === "perfil") return <ProfilePage onOpenContributions={handleOpenContributions} onOpenLocation={handleOpenLocation} onOpenLegal={handleOpenLegal} onLogout={() => supabase.auth.signOut()} />;
    return null;
  };

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      <Header
        onOpenNotifications={() => setNotifOpen(true)}
        onOpenLocation={handleOpenLocation}
        onOpenProfile={() => { setActiveTab("perfil"); setDetailView(null); }}
      />

      <main className="pt-4 pb-24 space-y-5">
        {renderContent()}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      <ReportModal isOpen={reportOpen} onClose={() => setReportOpen(false)} onSuccess={() => { setActiveTab("inicio"); setDetailView(null); }} />

      {/* Floating AI button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className={`fixed bottom-20 right-4 z-[500] w-12 h-12 rounded-full shadow-elevated flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
          chatOpen ? "gradient-heat" : "gradient-primary"
        }`}
        aria-label={t.navAI}
      >
        <Sparkles className="w-5 h-5 text-white" />
      </button>

      <AIChat
        isOpen={chatOpen}
        onToggle={() => setChatOpen(!chatOpen)}
        context={chatContext}
        onContextHandled={() => setChatContext(null)}
      />
      <NotificationPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
    </div>
  );
};

export default Index;

