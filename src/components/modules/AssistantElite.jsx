import React, { useState, useRef, useEffect } from "react";
import { Badge, Btn, SectionHeader } from "../ui";

const AssistantElite = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: "ai", text: "Bonjour ! Je suis votre Intelligence Stratégique. J'ai analysé vos 4 projets en cours. Comment puis-je optimiser vos opérations aujourd'hui ?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulated RAG Logic (Retrieval-Augmented Generation)
    setTimeout(() => {
      let response = "J'analyse vos données de portefeuille... ";
      if (input.toLowerCase().includes("budget")) {
        response += "Le projet 'Refonte SI' présente un risque de dépassement de 8%. Je recommande de geler les dépenses non-essentielles sur le module B.";
      } else if (input.toLowerCase().includes("retard") || input.toLowerCase().includes("délai")) {
        response += "La phase de tests sur l'App Mobile RH est critique. D'après l'historique de Sophie L., booster les tests unitaires maintenant réduira le délai final de 4 jours.";
      } else {
        response += "D'après vos KPIs (SPI: 0.95, CPI: 1.03), votre performance globale est stable mais nécessite une surveillance sur les ressources critiques.";
      }
      
      setMessages(prev => [...prev, { id: Date.now() + 1, role: "ai", text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] animate-entrance">
      <SectionHeader 
        title="Assistant Stratégique IA" 
        subtitle="Analyste neuronal connecté à votre base de connaissances projets" 
        action={<Badge value="Modèle: Elite-4.0" />}
      />

      <div className="flex-1 glass-card rounded-2xl p-6 overflow-y-auto mb-6 space-y-6 custom-scrollbar" ref={scrollRef}>
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`group relative max-w-[75%] p-4 rounded-2xl shadow-lg transition-all ${
              m.role === "user" 
                ? "premium-gradient text-white rounded-tr-none" 
                : "app-surface2 border app-border app-text rounded-tl-none"
            }`}>
              {m.role === "ai" && (
                <div className="absolute -left-10 top-0 w-8 h-8 rounded-full premium-gradient flex items-center justify-center text-[10px] font-bold text-white shadow-lg">IA</div>
              )}
              {m.role === "user" && (
                <div className="absolute -right-10 top-0 w-8 h-8 rounded-full app-surface3 flex items-center justify-center text-[10px] font-bold app-text border app-border2">MOI</div>
              )}
              <p className="text-sm leading-relaxed">{m.text}</p>
              <p className="text-[9px] opacity-40 mt-2 font-mono uppercase tracking-widest">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="app-surface2 border app-border p-4 rounded-2xl rounded-tl-none">
                <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                   <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:200ms]" />
                   <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:400ms]" />
                </div>
             </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 items-center">
        <div className="flex-1 relative">
          <input
            className="w-full app-surface2 border-2 app-border rounded-2xl px-6 py-4 text-sm app-text focus:outline-none focus:border-indigo-500/50 transition-all shadow-inner placeholder:app-text3"
            placeholder="Interrogez l'intelligence de votre organisation..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
             <button className="app-text3 hover:text-indigo-400 transition-colors p-1">🎤</button>
             <button className="app-text3 hover:text-indigo-400 transition-colors p-1">📎</button>
          </div>
        </div>
        <Btn onClick={handleSend} variant="primary" size="lg" className="h-[52px] w-[52px] rounded-2xl shadow-indigo-600/30">🚀</Btn>
      </div>
    </div>
  );
};

export default AssistantElite;
