import { useState, useEffect, useRef } from "react";
import { MapPin, Loader2 } from "lucide-react";

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string, lat?: number, lng?: number) => void;
  placeholder?: string;
  className?: string;
}

const AddressAutocomplete = ({ value, onChange, placeholder, className }: AddressAutocompleteProps) => {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync external value changes
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Close dropdown on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const searchAddress = async (q: string) => {
    if (q.trim().length < 3) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);
    try {
      const params = new URLSearchParams({
        q,
        format: "json",
        limit: "5",
        addressdetails: "1",
        countrycodes: "es,pt,fr",
        "accept-language": "es,gl,pt,en",
      });

      const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
        headers: { "User-Agent": "ClimateLoop/1.0" },
      });

      if (res.ok) {
        const data: NominatimResult[] = await res.json();
        setResults(data);
        setShowDropdown(data.length > 0);
      }
    } catch (err) {
      console.error("Nominatim search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (val: string) => {
    setQuery(val);
    onChange(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchAddress(val), 400);
  };

  const handleSelect = (result: NominatimResult) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    setQuery(result.display_name);
    onChange(result.display_name, lat, lng);
    setShowDropdown(false);
    setResults([]);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => results.length > 0 && setShowDropdown(true)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 p-3 rounded-xl border border-border bg-surface-elevated text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors ${className || ""}`}
          maxLength={300}
          autoComplete="off"
        />
        {isSearching && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
        )}
      </div>

      {showDropdown && results.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-surface-elevated border border-border rounded-xl shadow-elevated overflow-hidden max-h-48 overflow-y-auto">
          {results.map((r) => (
            <button
              key={r.place_id}
              onClick={() => handleSelect(r)}
              className="w-full text-left flex items-start gap-2.5 px-3 py-2.5 hover:bg-muted transition-colors border-b border-border last:border-0"
            >
              <MapPin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <span className="text-xs text-foreground leading-snug line-clamp-2">{r.display_name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressAutocomplete;
