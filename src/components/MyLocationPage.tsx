import { useState } from "react";
import { ArrowLeft, Navigation, MapPin, Star, Search, Loader2, X, Plus } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useLocation } from "@/hooks/useLocationContext";

interface SavedLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

const STORAGE_KEY = "climateloop_saved_locations";

const predefinedLocations = [
  { name: "Galicia, España", lat: 42.8782, lng: -8.5448 },
  { name: "Lugo, Galicia", lat: 43.0096, lng: -7.5560 },
  { name: "Rio de Janeiro, Brasil", lat: -22.9068, lng: -43.1729 },
  { name: "Bakel, Senegal", lat: 14.9025, lng: -12.4572 },
];

interface MyLocationPageProps {
  onBack: () => void;
}

const MyLocationPage = ({ onBack }: MyLocationPageProps) => {
  const { t } = useLanguage();
  const { location: currentLoc, setLocation } = useLocation();
  const [currentLocation, setCurrentLocation] = useState(currentLoc.name);
  const [detecting, setDetecting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>(() => {
    const defaultSaved: SavedLocation[] = [
      { id: "galicia", name: "Galicia, España", lat: 42.8782, lng: -8.5448 },
      { id: "lugo", name: "Lugo, Galicia", lat: 43.0096, lng: -7.5560 },
      { id: "rio", name: "Rio de Janeiro, Brasil", lat: -22.9068, lng: -43.1729 },
      { id: "bakel", name: "Bakel, Senegal", lat: 14.9025, lng: -12.4572 },
    ];
    // Always reset to defaults on first load to ensure correct saved locations
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSaved));
    return defaultSaved;
  });

  const persistSaved = (locs: SavedLocation[]) => {
    setSavedLocations(locs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locs));
  };

  const handleGPS = () => {
    if (!navigator.geolocation) return;
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const name = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        setCurrentLocation(name);
        setLocation({ name, lat: latitude, lng: longitude });
        setDetecting(false);
      },
      () => setDetecting(false),
      { timeout: 10000 }
    );
  };

  const selectLocation = (name: string, lat?: number, lng?: number) => {
    setCurrentLocation(name);
    if (lat !== undefined && lng !== undefined) {
      setLocation({ name, lat, lng });
    }
    setSearchQuery("");
  };

  const saveCurrentLocation = () => {
    const exists = savedLocations.some((l) => l.name === currentLocation);
    if (exists) return;
    const newLoc: SavedLocation = {
      id: Date.now().toString(),
      name: currentLocation,
      lat: 0,
      lng: 0,
    };
    persistSaved([...savedLocations, newLoc]);
  };

  const removeSaved = (id: string) => {
    persistSaved(savedLocations.filter((l) => l.id !== id));
  };

  const filteredLocations = searchQuery.trim()
    ? predefinedLocations.filter((l) =>
        l.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="px-4 pb-4 animate-in fade-in duration-200">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.backButton}
      </button>

      <h2 className="text-lg font-bold text-foreground mb-4">{t.myLocationTitle}</h2>

      {/* Current location */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-4 mb-4">
        <p className="text-xs text-muted-foreground mb-1">{t.myLocationCurrent}</p>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{currentLocation}</span>
        </div>
        <button
          onClick={saveCurrentLocation}
          className="mt-3 flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
        >
          <Plus className="w-3.5 h-3.5" />
          {t.myLocationSave}
        </button>
      </div>

      {/* GPS */}
      <button
        onClick={handleGPS}
        disabled={detecting}
        className="w-full flex items-center gap-3 bg-surface-elevated rounded-xl border border-border shadow-card p-4 mb-4 hover:bg-muted transition-colors"
      >
        {detecting ? (
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
        ) : (
          <Navigation className="w-5 h-5 text-primary" />
        )}
        <div className="text-left">
          <p className="text-sm font-medium text-foreground">{t.myLocationUseGPS}</p>
          <p className="text-xs text-muted-foreground">{detecting ? t.myLocationDetecting : t.myLocationGPSDesc}</p>
        </div>
      </button>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.myLocationSearchPlaceholder}
          className="w-full bg-surface-elevated border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Search results */}
      {filteredLocations.length > 0 && (
        <div className="bg-surface-elevated rounded-xl border border-border shadow-card overflow-hidden mb-4">
          {filteredLocations.map((loc) => (
            <button
              key={loc.name}
              onClick={() => selectLocation(loc.name, loc.lat, loc.lng)}
              className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors border-b border-border last:border-0"
            >
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{loc.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Saved locations */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 text-accent" />
          <p className="text-sm font-medium text-foreground">{t.myLocationSaved}</p>
        </div>
        {savedLocations.length === 0 ? (
          <p className="text-xs text-muted-foreground">{t.myLocationNoSaved}</p>
        ) : (
          <div className="space-y-2">
            {savedLocations.map((loc) => (
              <div key={loc.id} className="flex items-center justify-between py-2">
                <button
                  onClick={() => selectLocation(loc.name, loc.lat, loc.lng)}
                  className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  {loc.name}
                </button>
                <button
                  onClick={() => removeSaved(loc.id)}
                  className="p-1 rounded hover:bg-muted transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLocationPage;
