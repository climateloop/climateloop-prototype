import { MapPin, Bell, Menu } from "lucide-react";

interface HeaderProps {
  location?: string;
  notificationCount?: number;
}

const Header = ({ location = "São Paulo, Brasil", notificationCount = 3 }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background sticky top-0 z-50 border-b border-border">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">C</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground tracking-tight">ClimateLoop</h1>
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <MapPin className="w-3 h-3" />
            <span>{location}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>
        <button className="p-2 rounded-full hover:bg-muted transition-colors">
          <Menu className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </header>
  );
};

export default Header;
