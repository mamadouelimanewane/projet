import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Trash2, Download, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { SectionHeader, Btn, Input } from "../ui";

const AssistantIA = ({ data }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const messagesEndRef = useRef(null);

  // Charger conversations sauvegardées
  useEffect(() => {
    const saved = localStorage.getItem('projet-elite-ia-chat');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      // Message de bienvenue
      setMessages([
        {
          id: Date.now(),
          role: "assistant",
          content: `Bonjour ! 👋 Je suis votre assistant IA Projet Élite.

Je peux vous aider à :
📊 **Analyser** vos projets et performances
⚠️ **Identifier** les risques et problèmes
💡 **Recommander** des actions d'optimisation
📈 **Prédire** les tendances budgétaires
📝 **Générer** des rapports et résumés

Comment puis-je vous aider aujourd'hui ?`,
          timestamp: new Date().toISOString(),
          feedback: null
        }
      ]);
    }
  }, []);

  // Sauvegarder dans localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('projet-elite-ia-chat', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Analyser les données du projet
  const analyzeProjectData = () => {
    const insights = [];

    // Analyse budget
    const totalBudget = data.projets?.reduce((sum, p) => sum + p.budget, 0) || 0;
    const totalReel = data.projets?.reduce((sum, p) => sum + (p.budgetReel || 0), 0) || 0;
    const budgetPct = totalBudget > 0 ? (totalReel / totalBudget * 100).toFixed(1) : 0;
    
    if (budgetPct > 90) {
      insights.push(`⚠️ **Alerte Budget** : ${budgetPct}% du budget total est déjà consommé`);
    } else if (budgetPct < 50) {
      insights.push(`✅ **Budget** : Bonne maîtrise, ${budgetPct}% consommé`);
    }

    // Analyse retards
    const retards = data.delais?.filter(d => d.reel && new Date(d.reel) > new Date(d.planifie)) || [];
    if (retards.length > 0) {
      insights.push(`⏱️ **${retards.length} tâche(s) en retard** détectée(s)`);
    }

    // Analyse risques
    const risquesEleves = data.risques?.filter(r => r.gravite * r.probabilite >= 12) || [];
    if (risquesEleves.length > 0) {
      insights.push(`🔴 **${risquesEleves.length} risque(s) élevé(s)** nécessitent attention`);
    }

    // Analyse avancement
    const avgProgress = data.projets?.length > 0 
      ? (data.projets.reduce((sum, p) => sum + p.avancement, 0) / data.projets.length).toFixed(0)
      : 0;
    insights.push(`📊 **Avancement moyen** : ${avgProgress}%`);

    return insights.join('\n\n');
  };

  // Générer réponse IA (simulation - en production: appel API OpenAI)
  const generateAIResponse = async (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    // Commandes spéciales
    if (msg.includes('analyser') || msg.includes('analyse') || msg.includes('rapport')) {
      return `📊 **ANALYSE DE VOS PROJETS**\n\n${analyzeProjectData()}\n\n💡 **Recommandations** :\n- Surveillez les budgets > 90%\n- Priorisez les tâches en retard\n- Activez les plans d'atténuation pour risques élevés`;
    }

    if (msg.includes('risque') || msg.includes('danger') || msg.includes('problème')) {
      const risquesActifs = data.risques?.filter(r => r.statut === "Actif") || [];
      const topRisques = risquesActifs
        .sort((a, b) => (b.gravite * b.probabilite) - (a.gravite * a.probabilite))
        .slice(0, 3);
      
      let response = `⚠️ **RISQUES ACTIFS** (${risquesActifs.length} total)\n\n`;
      topRisques.forEach((r, i) => {
        const score = r.gravite * r.probabilite;
        response += `${i + 1}. **${r.risque}**\n`;
        response += `   Score: ${score}/25 | Gravité: ${r.gravite}/5 | Proba: ${r.probabilite}/5\n`;
        response += `   Atténuation: ${r.attenuation}\n\n`;
      });
      return response;
    }

    if (msg.includes('budget') || msg.includes('coût') || msg.includes('finance')) {
      const budgetData = data.budget || [];
      const depassements = budgetData.filter(b => b.reel > b.planifie);
      
      let response = `💰 **ANALYSE BUDGÉTAIRE**\n\n`;
      if (depassements.length > 0) {
        response += `🔴 **${depassements.length} dépassement(s) détecté(s)** :\n\n`;
        depassements.forEach(d => {
          const ecart = ((d.reel - d.planifie) / d.planifie * 100).toFixed(1);
          response += `- **${d.categorie}** : +${ecart}% (${((d.reel - d.planifie)/1000000).toFixed(2)}M FCFA)\n`;
        });
      } else {
        response += `✅ Tous les budgets sont sous contrôle\n\n`;
      }
      response += `\n💡 **Conseil** : Révisez les estimations pour les prochains mois`;
      return response;
    }

    if (msg.includes('tâche') || msg.includes('task') || msg.includes('travail')) {
      const tachesEnCours = data.taches?.filter(t => t.statut === "En cours") || [];
      const tachesRetard = data.delais?.filter(d => d.reel) || [];
      
      return `📋 **ÉTAT DES TÂCHES**\n\n` +
        `✅ Terminées : ${data.taches?.filter(t => t.statut === "Fait").length || 0}\n` +
        `🔄 En cours : ${tachesEnCours.length}\n` +
        `⏳ À faire : ${data.taches?.filter(t => t.statut === "À faire").length || 0}\n` +
        `⚠️ En retard : ${tachesRetard.length}\n\n` +
        `💡 **Optimisation** : Concentrez les ressources sur les tâches critiques en retard`;
    }

    if (msg.includes('aider') || msg.includes('help') || msg.includes('peux')) {
      return `🎯 **CE QUE JE PEUX FAIRE** :\n\n` +
        `📊 **Analyse** : "Analyse mes projets"\n` +
        `⚠️ **Risques** : "Quels sont les risques ?"\n` +
        `💰 **Budget** : "État du budget"\n` +
        `📋 **Tâches** : "Point sur les tâches"\n` +
        `📈 **Prédictions** : "Prédis les dérives"\n` +
        `📝 **Rapports** : "Génère un rapport"\n` +
        `💡 **Conseils** : "Comment optimiser ?"\n\n` +
        `Posez-moi une question ! 😊`;
    }

    if (msg.includes('prédir') || msg.includes('prediction') || msg.includes('tendance')) {
      return `📈 **PRÉDICTIONS** (basées sur tendances actuelles)\n\n` +
        `🔮 **Dans 30 jours** :\n` +
        `- Budget consommé : ~${Math.min(100, (data.projets?.reduce((s, p) => s + (p.budgetReel || 0), 0) / data.projets?.reduce((s, p) => s + p.budget, 0) * 100 + 15).toFixed(0))}%\n` +
        `- Avancement moyen : +8-12%\n` +
        `- Risques probables : 2-3 nouveaux\n\n` +
        `⚠️ **Alertes** :\n` +
        `- Probabilité dépassement budget : 35%\n` +
        `- Risque retard livraison : 25%\n\n` +
        `💡 **Actions préventives** :\n` +
        `- Renégocier contrats fournisseurs\n` +
        `- Ajouter buffer planning 10%\n` +
        `- Renforcer équipe sur tâches critiques`;
    }

    if (msg.includes('optimis') || msg.includes('améliorer') || msg.includes('conseil')) {
      return `💡 **RECOMMANDATIONS D'OPTIMISATION**\n\n` +
        `**1. Budget** :\n` +
        `- Négocier remises volume fournisseurs\n` +
        `- Réviser estimations mensuellement\n` +
        `- Créer réserve imprévus 10%\n\n` +
        `**2. Planning** :\n` +
        `- Paralléliser tâches indépendantes\n` +
        `- Buffer 15% sur estimations\n` +
        `- Revue hebdo avancement\n\n` +
        `**3. Risques** :\n` +
        `- Plans d'atténuation documentés\n` +
        `- Monitoring continu indicateurs\n` +
        `- Escalade proactive\n\n` +
        `**4. Équipe** :\n` +
        `- Formation continue\n` +
        `- Recognition achievements\n` +
        `- Équilibre charge travail`;
    }

    if (msg.includes('rapport') || msg.includes('génér') || msg.includes('résumé')) {
      return `📝 **RÉSUMÉ EXÉCUTIF**\n\n` +
        `**Portefeuille** : ${data.projets?.length || 0} projets\n` +
        `- En cours : ${data.projets?.filter(p => p.statut === "En cours").length || 0}\n` +
        `- Terminés : ${data.projets?.filter(p => p.statut === "Terminé").length || 0}\n\n` +
        `**Performance** :\n` +
        `- Budget total : ${(data.projets?.reduce((s, p) => s + p.budget, 0) / 1000000).toFixed(1)}M FCFA\n` +
        `- Consommé : ${(data.projets?.reduce((s, p) => s + (p.budgetReel || 0), 0) / 1000000).toFixed(1)}M FCFA\n` +
        `- Avancement moyen : ${(data.projets?.reduce((s, p) => s + p.avancement, 0) / (data.projets?.length || 1)).toFixed(0)}%\n\n` +
        `**Alertes** :\n` +
        `- Risques actifs : ${data.risques?.filter(r => r.statut === "Actif").length || 0}\n` +
        `- Problèmes ouverts : ${data.problemes?.filter(p => p.statut !== "Résolu").length || 0}\n\n` +
        `📊 **Statut global** : ${(() => {
          const avgProg = data.projets?.reduce((s, p) => s + p.avancement, 0) / (data.projets?.length || 1);
          return avgProg > 70 ? "✅ BON" : avgProg > 40 ? "⚠️ MOYEN" : "🔴 ATTENTION";
        })()}`;
    }

    // Réponse par défaut intelligente
    return `Merci pour votre question ! 🤔\n\n` +
      `Basé sur l'analyse de vos données :\n\n` +
      `📊 **État actuel** :\n` +
      `- ${data.projets?.length || 0} projets actifs\n` +
      `- ${data.taches?.length || 0} tâches suivies\n` +
      `- ${data.risques?.filter(r => r.statut === "Actif").length || 0} risques actifs\n\n` +
      `💡 **Essayez** :\n` +
      `- "Analyse mes projets"\n` +
      `- "Quels sont les risques ?"\n` +
      `- "État du budget"\n` +
      `- "Prédis les tendances"\n\n` +
      `Je suis là pour vous aider ! 😊`;
  };

  // Envoyer message
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simuler délai IA (1-2 secondes)
    setTimeout(async () => {
      const aiResponse = await generateAIResponse(input);
      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: aiResponse,
        timestamp: new Date().toISOString(),
        feedback: null
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  // Vider conversation
  const clearChat = () => {
    if (confirm("Vider la conversation ?")) {
      setMessages([{
        id: Date.now(),
        role: "assistant",
        content: "Conversation réinitialisée. Comment puis-je vous aider ?",
        timestamp: new Date().toISOString()
      }]);
      localStorage.removeItem('projet-elite-ia-chat');
    }
  };

  // Exporter conversation
  const exportChat = () => {
    const text = messages.map(m => 
      `[${new Date(m.timestamp).toLocaleString()}] ${m.role === 'user' ? 'Vous' : 'IA'}:\n${m.content}\n`
    ).join('\n---\n\n');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `conversation_ia_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
  };

  // Copier message
  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Feedback
  const giveFeedback = (messageId, feedback) => {
    setMessages(messages.map(m => 
      m.id === messageId ? { ...m, feedback } : m
    ));
  };

  // Formatage texte (markdown simple)
  const formatText = (text) => {
    return text.split('\n').map((line, i) => {
      // Gras
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Listes
      if (line.startsWith('- ')) {
        return <li key={i} className="ml-4 text-slate-300" dangerouslySetInnerHTML={{ __html: line.substring(2) }} />;
      }
      return <p key={i} className="mb-1" dangerouslySetInnerHTML={{ __html: line }} />;
    });
  };

  return (
    <div className="space-y-4 h-[calc(100vh-200px)] flex flex-col">
      <SectionHeader 
        title="Assistant IA Projet Élite" 
        subtitle="Votre conseiller intelligent pour la gestion de projet"
        action={
          <div className="flex gap-2">
            <Btn onClick={exportChat} variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Btn>
            <Btn onClick={clearChat} variant="ghost" size="sm">
              <Trash2 className="w-4 h-4" />
            </Btn>
          </div>
        }
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 glass-card rounded-2xl">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === 'assistant' ? 'bg-indigo-600' : 'bg-slate-600'
            }`}>
              {msg.role === 'assistant' ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
            </div>

            {/* Message */}
            <div className={`max-w-[70%] space-y-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`p-4 rounded-2xl ${
                msg.role === 'assistant' 
                  ? 'bg-slate-800 text-slate-200' 
                  : 'bg-indigo-600 text-white'
              }`}>
                <div className="text-sm whitespace-pre-wrap">
                  {formatText(msg.content)}
                </div>
              </div>

              {/* Actions message IA */}
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 px-2">
                  <button onClick={() => copyMessage(msg.content)} className="text-slate-500 hover:text-slate-300 transition-colors">
                    <Copy className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => giveFeedback(msg.id, 'up')}
                    className={`transition-colors ${msg.feedback === 'up' ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => giveFeedback(msg.id, 'down')}
                    className={`transition-colors ${msg.feedback === 'down' ? 'text-red-400' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    <ThumbsDown className="w-3 h-3" />
                  </button>
                  <span className="text-xs text-slate-600 ml-2">
                    {new Date(msg.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Indicateur de frappe */}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-800">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions rapides */}
      <div className="flex flex-wrap gap-2 px-4">
        {[
          "Analyse mes projets",
          "Quels sont les risques ?",
          "État du budget",
          "Prédis les tendances",
          "Comment optimiser ?"
        ].map((suggestion, i) => (
          <button
            key={i}
            onClick={() => {
              setInput(suggestion);
              handleSend();
            }}
            className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-colors border border-slate-700"
          >
            <Sparkles className="w-3 h-3 inline mr-1" />
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3 p-4 glass-card rounded-2xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Posez votre question..."
          className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <Btn onClick={handleSend} disabled={!input.trim() || isTyping} className="px-6">
          <Send className="w-5 h-5" />
        </Btn>
      </div>
    </div>
  );
};

export default AssistantIA;
