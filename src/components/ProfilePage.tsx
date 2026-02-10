import { User, Settings, Bell, Shield, MapPin, LogOut, ChevronRight } from "lucide-react";

const ProfilePage = () => {
  const menuItems = [
    { icon: MapPin, label: "Minha localização", value: "São Paulo, SP" },
    { icon: Bell, label: "Notificações", value: "Ativas" },
    { icon: Shield, label: "Privacidade", value: "" },
    { icon: Settings, label: "Configurações", value: "" },
  ];

  return (
    <div className="px-4 pb-4">
      {/* Profile header */}
      <div className="flex flex-col items-center py-6">
        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-3">
          <User className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="text-lg font-bold text-foreground">Usuário Demo</h2>
        <p className="text-sm text-muted-foreground">usuario@climateloop.app</p>
        <div className="flex items-center gap-4 mt-4">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">Relatos</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">45</p>
            <p className="text-xs text-muted-foreground">Dias ativo</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="text-lg font-bold text-secondary">92%</p>
            <p className="text-xs text-muted-foreground">Precisão</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card overflow-hidden">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted transition-colors ${
                i < menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <Icon className="w-5 h-5 text-primary" />
              <span className="flex-1 text-left text-sm text-foreground">{item.label}</span>
              {item.value && <span className="text-xs text-muted-foreground">{item.value}</span>}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          );
        })}
      </div>

      <button className="w-full flex items-center justify-center gap-2 mt-6 py-3 rounded-xl border border-destructive/30 text-destructive text-sm font-medium hover:bg-destructive/5 transition-colors">
        <LogOut className="w-4 h-4" />
        Sair da conta
      </button>
    </div>
  );
};

export default ProfilePage;
