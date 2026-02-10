import { useState } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Olá! Sou o assistente do ClimateLoop. Com base nos dados oficiais e nas previsões de ML, vejo que sua região tem **55% de chance de chuva intensa** nas próximas 6 horas. A comunidade já reportou 3 alagamentos próximos. Posso explicar mais ou responder perguntas sobre o clima na sua área.",
  },
];

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [
      ...prev,
      userMsg,
      {
        role: "assistant",
        content:
          "Baseado nos dados históricos de ML e nos alertas CAP ativos, recomendo que você evite áreas baixas nas próximas horas. A previsão oficial indica 40% de chuva, mas nosso modelo indica 55% — a diferença se deve aos padrões de umidade que o ML detectou nos últimos 3 dias. As fotos enviadas pela comunidade também mostram nuvens de chuva se formando a oeste.",
      },
    ]);
    setInput("");
  };

  return (
    <div className="mx-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-accent" />
        <h2 className="text-base font-semibold text-foreground">Assistente IA</h2>
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
            placeholder="Pergunte sobre o clima..."
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
