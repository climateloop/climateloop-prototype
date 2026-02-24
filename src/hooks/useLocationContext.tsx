import { createContext, useContext, useState, ReactNode } from "react";

interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface LocationContextType {
  location: Location;
  setLocation: (loc: Location) => void;
}

const DEFAULT_LOCATION: Location = {
  name: "Lugo, España",
  lat: 43.0096,
  lng: -7.5560,
};

const STORAGE_KEY = "climateloop_current_location";

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocationState] = useState<Location>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return DEFAULT_LOCATION;
  });

  const setLocation = (loc: Location) => {
    setLocationState(loc);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
  };

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used within LocationProvider");
  return ctx;
};
