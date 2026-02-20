import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Sparkles, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatProps {
  isOpen: boolean;
  onToggle: () => void;
  context?: string | null;
  onContextHandled?: () => void;
}

const AIChat = ({ isOpen, onToggle, context, onContextHandled }: AIChatProps) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>(() => [
    { role: "assistant", content: t.aiInitialMessage },
  ]);
  const [input, setInput] = useState("");
  const lastContextRef = useRef<string | null>(null);

  // When context changes and chat opens, reset conversation with new context
  useEffect(() => {
    if (isOpen && context && context !== lastContextRef.current) {
      lastContextRef.current = context;
      setMessages([
        { role: "assistant", content: `${t.aiResponse}\n\n${t.aiPlaceholder}` },
      ]);
      onContextHandled?.();
    }
  }, [isOpen, context, t, onContextHandled]);

  // When opened without context, start fresh
  useEffect(() => {
    if (isOpen && !context && lastContextRef.current === null) {
      setMessages([{ role: "assistant", content: t.aiInitialMessage }]);
    }
  }, [isOpen, context, t]);

  const handleClose = () => {
    lastContextRef.current = null;
    onToggle();
  };

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
    <>
      {/* Floating chat panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-2 left-2 max-w-lg mx-auto z-[9999] animate-in slide-in-from-bottom-4 duration-200">
          <div className="bg-background rounded-2xl border border-border shadow-elevated overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border gradient-heat">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-white">{t.aiTitle}</h3>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="max-h-72 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-primary-foreground" />
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
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
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
      )}

    </>
  );
};

export default AIChat;
