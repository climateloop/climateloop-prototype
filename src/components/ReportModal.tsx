import { useState, useRef } from "react";
import { X, Camera, Send, CloudRain, Wind, Thermometer, Flame, Snowflake, CloudHail, Waves, CloudLightning, Mountain, Droplets, Zap, Tornado, AlertTriangle, Loader2, CheckCircle, XCircle } from "lucide-react";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CategoryId = "chuva" | "vento" | "calor" | "incendio" | "helada" | "granizo" | "enchente" | "ciclone" | "deslizamento" | "seca" | "tempestade" | "tornado";

interface Category {
  id: CategoryId;
  labelKey: string;
  icon: React.ComponentType<{ className?: string }>;
}

const categories: Category[] = [
  { id: "chuva", labelKey: "catRain", icon: CloudRain },
  { id: "vento", labelKey: "catWind", icon: Wind },
  { id: "calor", labelKey: "catHeat", icon: Thermometer },
  { id: "incendio", labelKey: "catFire", icon: Flame },
  { id: "helada", labelKey: "catCold", icon: Snowflake },
  { id: "granizo", labelKey: "catHail", icon: CloudHail },
  { id: "enchente", labelKey: "catFlood", icon: Waves },
  { id: "ciclone", labelKey: "catCyclone", icon: Tornado },
  { id: "deslizamento", labelKey: "catLandslide", icon: Mountain },
  { id: "seca", labelKey: "catDrought", icon: Droplets },
  { id: "tempestade", labelKey: "catStorm", icon: CloudLightning },
  { id: "tornado", labelKey: "catTornado", icon: Zap },
];

const subOptionKeys: Record<CategoryId, string[]> = {
  chuva: ["subRain1", "subRain2", "subRain3", "subRain4"],
  vento: ["subWind1", "subWind2", "subWind3", "subWind4"],
  calor: ["subHeat1", "subHeat2", "subHeat3"],
  incendio: ["subFire1", "subFire2", "subFire3", "subFire4"],
  helada: ["subCold1", "subCold2", "subCold3"],
  granizo: ["subHail1", "subHail2", "subHail3"],
  enchente: ["subFlood1", "subFlood2", "subFlood3"],
  ciclone: ["subCyclone1", "subCyclone2", "subCyclone3"],
  deslizamento: ["subLandslide1", "subLandslide2", "subLandslide3"],
  seca: ["subDrought1", "subDrought2", "subDrought3"],
  tempestade: ["subStorm1", "subStorm2", "subStorm3"],
  tornado: ["subTornado1", "subTornado2", "subTornado3"],
};

type PhotoStatus = "idle" | "analyzing" | "accepted" | "rejected";

const ReportModal = ({ isOpen, onClose }: ReportModalProps) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoStatus, setPhotoStatus] = useState<PhotoStatus>("idle");
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setSelectedCategory(null);
    setSelectedSub(null);
    setTitle("");
    setAddress("");
    setNotes("");
    setPhotoFile(null);
    setPhotoPreview(null);
    setPhotoStatus("idle");
    setIsSending(false);
  };

  const handleSubmit = async () => {
    if (!selectedCategory || !selectedSub || !title.trim() || !address.trim() || photoStatus !== "accepted" || !photoFile) return;

    setIsSending(true);

    try {
      // Get current authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Você precisa estar logado para enviar um relato.");
        setIsSending(false);
        return;
      }
      const userId = user.id;

      // Upload photo to storage
      const fileExt = photoFile.name.split(".").pop() || "jpg";
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `reports/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("report-photos")
        .upload(filePath, photoFile, { contentType: photoFile.type });

      let photoUrl = "";
      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from("report-photos")
          .getPublicUrl(filePath);
        photoUrl = urlData.publicUrl;
      }

      // Insert report into database
      const { data: insertedReport, error: insertError } = await supabase
        .from("community_reports")
        .insert({
          user_id: userId,
          title: title.trim(),
          category: selectedCategory,
          sub_category: selectedSub,
          notes: notes.trim() || null,
          address: address.trim(),
          photo_url: photoUrl || null,
          status: "pending",
        })
        .select("id")
        .single();

      if (insertError) {
        console.error("Error inserting report:", insertError);
        toast.error(insertError.message);
      } else {
        toast.success(t.reportSuccess);
        resetForm();
        onClose();

        // Trigger async translation (fire-and-forget)
        if (insertedReport?.id) {
          supabase.functions.invoke("translate-report", {
            body: { report_id: insertedReport.id },
          }).catch((err) => console.error("Translation error:", err));
        }
      }
    } catch (err) {
      console.error("Error submitting report:", err);
    } finally {
      setIsSending(false);
    }
  };

  const validatePhotoWithAI = async (file: File) => {
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
    setPhotoStatus("analyzing");
    setPhotoFile(file);

    try {
      // Convert file to base64
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      let binary = "";
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const imageBase64 = btoa(binary);

      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/validate-photo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ imageBase64, mimeType: file.type }),
        }
      );

      const data = await resp.json();

      if (data.hasPeople) {
        setPhotoStatus("rejected");
        setTimeout(() => {
          setPhotoPreview(null);
          setPhotoFile(null);
          setPhotoStatus("idle");
          URL.revokeObjectURL(url);
        }, 3000);
      } else {
        setPhotoStatus("accepted");
      }
    } catch (err) {
      console.error("Photo validation error:", err);
      // On error, allow photo (fail-open)
      setPhotoStatus("accepted");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    validatePhotoWithAI(file);
    e.target.value = "";
  };

  const handlePhotoClick = () => {
    if (photoStatus === "analyzing") return;
    fileInputRef.current?.click();
  };

  const canSubmit = selectedCategory && selectedSub && title.trim() && address.trim() && photoStatus === "accepted" && !isSending;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-foreground/40 backdrop-blur-sm">
      <div className="bg-background w-full max-w-lg rounded-t-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
        <div className="sticky top-0 bg-background flex items-center justify-between p-4 border-b border-border z-10">
          <h2 className="text-lg font-bold text-foreground">
            {selectedCategory
              ? `${t.reportCategory} ${(t as any)[categories.find((c) => c.id === selectedCategory)?.labelKey || ""]}`
              : t.reportTitle}
          </h2>
          <button onClick={() => { resetForm(); onClose(); }} className="p-2 rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {!selectedCategory ? (
            <>
              <p className="text-sm text-muted-foreground">{t.reportSubtitle}</p>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-surface-elevated hover:border-primary hover:shadow-card transition-all"
                    >
                      <Icon className="w-6 h-6 text-primary" />
                      <span className="text-xs font-medium text-foreground">{(t as any)[cat.labelKey]}</span>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              {/* Sub-category selection */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">{t.reportWhat}</p>
                <div className="flex flex-wrap gap-2">
                  {subOptionKeys[selectedCategory]?.map((key) => {
                    const label = (t as any)[key];
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedSub(key)}
                        className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                          selectedSub === key
                            ? "border-primary bg-primary/10 text-primary font-medium"
                            : "border-border text-foreground hover:border-primary/50"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title field */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">{t.reportTitleLabel}</p>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t.reportTitlePlaceholder}
                  className="w-full p-3 rounded-xl border border-border bg-surface-elevated text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                  maxLength={200}
                />
              </div>

              {/* Address field */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">{t.reportAddressLabel}</p>
                <AddressAutocomplete
                  value={address}
                  onChange={(val) => setAddress(val)}
                  placeholder={t.reportAddressPlaceholder}
                />
              </div>

              {/* Notes */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">{t.reportNotes}</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.reportNotesPlaceholder}
                  className="w-full p-3 rounded-xl border border-border bg-surface-elevated text-sm text-foreground placeholder:text-muted-foreground resize-none h-20 outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Photo upload */}
              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {photoPreview ? (
                  <div className="relative rounded-xl overflow-hidden border border-border">
                    <img
                      src={photoPreview}
                      alt=""
                      className={`w-full h-40 object-cover ${photoStatus === "rejected" ? "opacity-40" : ""}`}
                    />
                    {photoStatus === "analyzing" && (
                      <div className="absolute inset-0 bg-foreground/50 flex flex-col items-center justify-center gap-2">
                        <Loader2 className="w-6 h-6 text-background animate-spin" />
                        <span className="text-xs font-medium text-background">{t.reportPhotoAnalyzing}</span>
                      </div>
                    )}
                    {photoStatus === "rejected" && (
                      <div className="absolute inset-0 bg-destructive/20 flex flex-col items-center justify-center gap-2 px-4">
                        <XCircle className="w-6 h-6 text-destructive" />
                        <span className="text-xs font-medium text-destructive text-center">{t.reportPhotoRejected}</span>
                      </div>
                    )}
                    {photoStatus === "accepted" && (
                      <div className="absolute top-2 right-2 bg-secondary/90 rounded-full p-1.5">
                        <CheckCircle className="w-4 h-4 text-secondary-foreground" />
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={handlePhotoClick}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    <Camera className="w-5 h-5" />
                    <span className="text-sm font-medium">{t.reportAddPhoto}</span>
                  </button>
                )}

                {photoStatus === "accepted" && (
                  <div className="flex items-center gap-2 px-2">
                    <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                    <p className="text-xs text-secondary">{t.reportPhotoAccepted}</p>
                  </div>
                )}

                {photoStatus === "idle" && (
                  <div className="flex items-start gap-2 px-2">
                    <Camera className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">{t.reportPhotoRequired}</p>
                  </div>
                )}

                <div className="flex items-start gap-2 px-2">
                  <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">{t.reportPhotoWarning}</p>
                </div>
              </div>

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm shadow-card hover:shadow-elevated transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t.reportSending}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t.reportSend}
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSub(null);
                  setTitle("");
                  setAddress("");
                  setPhotoPreview(null);
                  setPhotoFile(null);
                  setPhotoStatus("idle");
                }}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.reportBack}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
