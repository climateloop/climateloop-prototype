import { useState } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIChat = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: t.aiInitialMessage },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [
      ...prev,
      userMsg,
      { role: "assistant", content: t.aiResponse },
    ]);
    setInput("");
  };

  return (
    <div className="mx-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-accent" />
        <h2 className="text-base font-semibold text-foreground">{t.aiTitle}</h2>
      </div>

      <div className="bg-surface-elevated rounded-xl border border-border shadow-card overflow-hidden">
        <div className="max-h-64 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              <div
                className={`rounded-xl px-3 py-2 max-w-[80%] text-sm ${
                  msg.role === "user"
                    ? "gradient-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-border p-3 flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={t.aiPlaceholder}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button
            onClick={handleSend}
            className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          >
            <Send className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
