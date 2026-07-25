import React, { useState, useEffect, useRef } from "react";
import { Send, Users, MessageSquare, Phone, Video, Smile, Paperclip, Search, Hash, AtSign, FileText, Image, Check, CheckCheck, Cloud, CloudOff } from "lucide-react";
import { SectionHeader, Card, Btn } from "../ui";
import { supabase } from "../../lib/supabaseClient";

const ChatTempsReel = ({ data }) => {
  const [salons, setSalons] = useState([
    { id: "general", nom: "# général", description: "Discussion générale", membres: 12, messages: 156 },
    { id: "projet-si", nom: "# projet-si", description: "Refonte SI Comptable", membres: 5, messages: 89 },
    { id: "budget", nom: "# budget", description: "Questions budgétaires", membres: 8, messages: 67 },
    { id: "risques", nom: "# risques", description: "Gestion des risques", membres: 6, messages: 45 },
  ]);
  const [salonActif, setSalonActif] = useState("general");
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");
  const [user, setUser] = useState(() => {
    return localStorage.getItem('projet-elite-chat-user') || "Vous";
  });
  const [showUserSelect, setShowUserSelect] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Utilisateurs simulés
  const utilisateurs = [
    { nom: "Vous", avatar: "👤", statut: "online" },
    { nom: "Marie K.", avatar: "👩", statut: "online" },
    { nom: "Jean D.", avatar: "👨", statut: "online" },
    { nom: "Paul M.", avatar: "👨‍💼", statut: "offline" },
    { nom: "Sophie L.", avatar: "👩‍💼", statut: "online" },
  ];

  // Charger messages depuis Supabase et s'abonner au temps réel
  useEffect(() => {
    if (!supabase) {
      // Fallback localStorage si Supabase n'est pas configuré
      const saved = localStorage.getItem('projet-elite-chat-messages');
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        const defaultMessages = {
          "general": [
            { id: 1, user: "Marie K.", avatar: "👩", content: "Bonjour à tous ! (Mode Local)", timestamp: new Date(Date.now() - 3600000).toISOString(), lu: true },
          ]
        };
        setMessages(defaultMessages);
      }
      return;
    }

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) console.error(error);
      else {
        const grouped = data.reduce((acc, msg) => {
          if (!acc[msg.salon_id]) acc[msg.salon_id] = [];
          acc[msg.salon_id].push({
            id: msg.id,
            user: msg.user_name,
            avatar: msg.avatar,
            content: msg.content,
            timestamp: msg.created_at,
            lu: true
          });
          return acc;
        }, {});
        setMessages(grouped);
      }
    };

    fetchMessages();

    // Souscription temps réel
    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
        const msg = payload.new;
        setMessages(prev => {
          const salonMsgs = prev[msg.salon_id] || [];
          if (salonMsgs.some(m => m.id === msg.id)) return prev;
          
          return {
            ...prev,
            [msg.salon_id]: [...salonMsgs, {
              id: msg.id,
              user: msg.user_name,
              avatar: msg.avatar,
              content: msg.content,
              timestamp: msg.created_at,
              lu: false
            }]
          };
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulation typing
  useEffect(() => {
    if (input.length > 0) {
      setTyping(true);
      const timer = setTimeout(() => setTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [input]);

  // Envoyer message
  const envoyerMessage = async () => {
    if (!input.trim()) return;

    const msgData = {
      salon_id: salonActif,
      user_name: user,
      avatar: utilisateurs.find(u => u.nom === user)?.avatar || "👤",
      content: input,
    };

    if (supabase) {
      const { error } = await supabase.from('messages').insert([msgData]);
      if (error) console.error(error);
    } else {
      // Fallback Local
      const nouveauMessage = {
        id: Date.now(),
        ...msgData,
        timestamp: new Date().toISOString(),
        lu: false
      };
      const nouveauxMessages = {
        ...messages,
        [salonActif]: [...(messages[salonActif] || []), nouveauMessage]
      };
      setMessages(nouveauxMessages);
      localStorage.setItem('projet-elite-chat-messages', JSON.stringify(nouveauxMessages));
      
      // Simuler réponse auto uniquement en mode local
      setTimeout(() => simulateResponse(), 2000);
    }
    setInput("");
  };

  // Simuler réponse
  const simulateResponse = () => {
    const reponses = [
      "D'accord, je regarde ça ! 👍",
      "Bonne idée ! On en discute en réunion ?",
      "Je viens de mettre à jour le document",
      "Parfait, merci pour l'info !",
      "Attention, il y a un risque sur ce point ⚠️",
      "Je suis en train de finaliser ma partie",
      "On peut se faire un call rapidement ? 📞",
      "Le budget semble sous contrôle ✅",
    ];

    const repondants = utilisateurs.filter(u => u.nom !== user && u.statut === "online");
    if (repondants.length === 0) return;

    const repondant = repondants[Math.floor(Math.random() * repondants.length)];
    const reponse = reponses[Math.floor(Math.random() * reponses.length)];

    const salonMessages = messages[salonActif] || [];
    const messageReponse = {
      id: Date.now() + 1,
      user: repondant.nom,
      avatar: repondant.avatar,
      content: reponse,
      timestamp: new Date().toISOString(),
      lu: false
    };

    const nouveauxMessages = {
      ...messages,
      [salonActif]: [...salonMessages, messageReponse]
    };

    setMessages(nouveauxMessages);
    localStorage.setItem('projet-elite-chat-messages', JSON.stringify(nouveauxMessages));
  };

  // Formater heure
  const formatHeure = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  // Filtrer messages
  const messagesFiltres = (messages[salonActif] || []).filter(msg =>
    msg.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Total messages non lus
  const totalNonLus = Object.values(messages).reduce((total, salonMsgs) => 
    total + salonMsgs.filter(m => !m.lu).length, 0
  );

  return (
    <div className="space-y-4 h-[calc(100vh-200px)] flex flex-col">
      <SectionHeader 
        title="Chat Temps Réel" 
        subtitle={`Communication d'équipe • ${totalNonLus} message(s) non lu(s)`}
        action={
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 app-surface2 rounded-lg border app-border">
              {supabase ? (
                <><Cloud className="w-4 h-4 text-emerald-400" /> <span className="text-xs text-emerald-400">Cloud Sync Actif</span></>
              ) : (
                <><CloudOff className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-amber-400">Mode Local</span>
                  <span className="text-xs app-text3 hidden lg:inline"> · Configurer Supabase pour le temps réel</span>
                </>
              )}
            </div>
            <div className="flex -space-x-2">
              {utilisateurs.filter(u => u.statut === "online").slice(0, 4).map((u, i) => (
                <div key={i} className="w-8 h-8 rounded-full app-surface3 flex items-center justify-center border-2 app-border" title={u.nom}>
                  {u.avatar}
                </div>
              ))}
            </div>
            <span className="text-sm text-emerald-400">
              {utilisateurs.filter(u => u.statut === "online").length} en ligne
            </span>
          </div>
        }
      />

      <div className="flex gap-4 flex-1 min-h-0">
        {/* Sidebar salons */}
        <Card className="hidden md:flex w-64 p-4 glass-card rounded-2xl flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Hash className="w-4 h-4" />
              Salons
            </h3>
            <Btn size="sm" variant="ghost">+</Btn>
          </div>

          <div className="space-y-1 flex-1 overflow-y-auto">
            {salons.map(salon => (
              <button
                key={salon.id}
                onClick={() => {
                  setSalonActif(salon.id);
                  setSearchTerm("");
                }}
                className={`w-full text-left p-3 rounded-xl transition-colors ${
                  salonActif === salon.id
                    ? 'bg-indigo-600/30 border border-indigo-500/50'
                    : 'hover:app-surface2'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-white text-sm">{salon.nom}</span>
                  {messages[salon.id]?.filter(m => !m.lu).length > 0 && (
                    <span className="px-2 py-0.5 bg-indigo-600 text-white text-xs rounded-full">
                      {messages[salon.id].filter(m => !m.lu).length}
                    </span>
                  )}
                </div>
                <p className="text-xs app-text2 truncate">{salon.description}</p>
                <p className="text-xs app-text3 mt-1">{salon.membres} membres</p>
              </button>
            ))}
          </div>

          {/* Utilisateurs en ligne */}
          <div className="mt-4 pt-4 border-t app-border">
            <h4 className="text-xs font-medium app-text2 mb-2">EN LIGNE</h4>
            <div className="space-y-2">
              {utilisateurs.filter(u => u.statut === "online").map((u, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span>{u.avatar}</span>
                  <span className="app-text">{u.nom}</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Zone de chat */}
        <Card className="flex-1 glass-card rounded-2xl flex flex-col">
          {/* Header salon */}
          <div className="p-4 border-b app-border flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white">
                {salons.find(s => s.id === salonActif)?.nom}
              </h3>
              <p className="text-xs app-text2">
                {salons.find(s => s.id === salonActif)?.description}
              </p>
            </div>
            <div className="flex gap-2">
              <Btn size="sm" variant="ghost">
                <Phone className="w-4 h-4" />
              </Btn>
              <Btn size="sm" variant="ghost">
                <Video className="w-4 h-4" />
              </Btn>
            </div>
          </div>

          {/* Recherche */}
          {messagesFiltres.length > 0 && (
            <div className="p-3 border-b app-border">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 app-text2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher dans les messages..."
                  className="w-full pl-10 pr-4 py-2 app-surface2 border app-border rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messagesFiltres.map(msg => (
              <div key={msg.id} className={`flex gap-3 ${msg.user === user ? 'flex-row-reverse' : ''}`}>
                <div className="w-8 h-8 rounded-full app-surface3 flex items-center justify-center flex-shrink-0">
                  {msg.avatar}
                </div>
                <div className={`max-w-[70%] ${msg.user === user ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-white">{msg.user}</span>
                    <span className="text-xs app-text3">{formatHeure(msg.timestamp)}</span>
                  </div>
                  <div className={`p-3 rounded-xl ${
                    msg.user === user
                      ? 'bg-indigo-600 text-white'
                      : 'app-surface2 text-slate-200'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  {msg.user === user && (
                    <div className="flex items-center gap-1 mt-1 justify-end">
                      <CheckCheck className="w-3 h-3 text-indigo-400" />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {messagesFiltres.length === 0 && (
              <div className="text-center py-12 app-text3">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Aucun message</p>
                <p className="text-sm">Soyez le premier à écrire !</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t app-border">
            {showUserSelect && (
              <div className="mb-3 p-3 app-surface2 rounded-lg">
                <p className="text-xs app-text2 mb-2">Vous êtes :</p>
                <div className="flex flex-wrap gap-2">
                  {utilisateurs.map((u, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setUser(u.nom);
                        localStorage.setItem('projet-elite-chat-user', u.nom);
                        setShowUserSelect(false);
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        user === u.nom
                          ? 'bg-indigo-600 text-white'
                          : 'app-surface3 app-text hover:bg-slate-600'
                      }`}
                    >
                      {u.avatar} {u.nom}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Btn size="sm" variant="ghost" className="hidden sm:flex">
                <Paperclip className="w-4 h-4" />
              </Btn>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && envoyerMessage()}
                placeholder="Écrire un message..."
                className="flex-1 px-3 py-2 app-surface2 border app-border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
              />
              <Btn size="sm" variant="ghost">
                <Smile className="w-4 h-4" />
              </Btn>
              <Btn onClick={envoyerMessage} disabled={!input.trim()}>
                <Send className="w-4 h-4" />
              </Btn>
            </div>

            <div className="flex items-center justify-between mt-2">
              <button
                onClick={() => setShowUserSelect(!showUserSelect)}
                className="text-xs app-text3 hover:app-text flex items-center gap-1"
              >
                <AtSign className="w-3 h-3" />
                Changer d'utilisateur ({user})
              </button>
              {typing && (
                <span className="text-xs text-indigo-400 animate-pulse">
                  En train d'écrire...
                </span>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatTempsReel;
