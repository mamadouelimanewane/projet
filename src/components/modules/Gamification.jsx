import React, { useState, useEffect } from "react";
import { Trophy, Award, Star, Medal, Crown, Target, TrendingUp, Users, CheckCircle, Flame, Zap } from "lucide-react";
import { SectionHeader, Card } from "../ui";

const Gamification = ({ data }) => {
  const [points, setPoints] = useState(() => {
    return parseInt(localStorage.getItem('projet-elite-points') || '0');
  });
  const [badges, setBadges] = useState(() => {
    const saved = localStorage.getItem('projet-elite-badges');
    return saved ? JSON.parse(saved) : [];
  });
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem('projet-elite-streak') || '1');
  });

  // Calculer level
  useEffect(() => {
    const newLevel = Math.floor(points / 1000) + 1;
    setLevel(newLevel);
    localStorage.setItem('projet-elite-points', points.toString());
    localStorage.setItem('projet-elite-streak', streak.toString());
  }, [points]);

  // Vérifier badges
  useEffect(() => {
    const nouveauxBadges = [];
    const projetsCount = data.projets?.length || 0;
    const tachesCount = data.taches?.filter(t => t.statut === "Fait").length || 0;
    const budgetTotal = data.projets?.reduce((s, p) => s + p.budget, 0) || 0;

    // Badges de projets
    if (projetsCount >= 1 && !badges.find(b => b.id === 'premier_projet')) {
      nouveauxBadges.push({
        id: 'premier_projet',
        nom: "Premier Projet",
        description: "Créer votre premier projet",
        icone: "target",
        points: 100,
        date: new Date().toISOString()
      });
    }

    if (projetsCount >= 5 && !badges.find(b => b.id === 'chef_projet')) {
      nouveauxBadges.push({
        id: 'chef_projet',
        nom: "Chef de Projet",
        description: "Gérer 5 projets",
        icone: "crown",
        points: 500,
        date: new Date().toISOString()
      });
    }

    // Badges de tâches
    if (tachesCount >= 10 && !badges.find(b => b.id === 'productif')) {
      nouveauxBadges.push({
        id: 'productif',
        nom: "Productif",
        description: "Compléter 10 tâches",
        icone: "check",
        points: 200,
        date: new Date().toISOString()
      });
    }

    if (tachesCount >= 50 && !badges.find(b => b.id === 'machine')) {
      nouveauxBadges.push({
        id: 'machine',
        nom: "Machine à Tâches",
        description: "Compléter 50 tâches",
        icone: "zap",
        points: 1000,
        date: new Date().toISOString()
      });
    }

    // Badges budget
    if (budgetTotal >= 1000000000 && !badges.find(b => b.id === 'milliardaire')) {
      nouveauxBadges.push({
        id: 'milliardaire',
        nom: "Gestionnaire Milliardaire",
        description: "Gérer 1 milliard FCFA de budget",
        icone: "star",
        points: 1500,
        date: new Date().toISOString()
      });
    }

    if (nouveauxBadges.length > 0) {
      const tousBadges = [...badges, ...nouveauxBadges];
      setBadges(tousBadges);
      localStorage.setItem('projet-elite-badges', JSON.stringify(tousBadges));
      
      // Ajouter points des badges
      const pointsBadge = nouveauxBadges.reduce((sum, b) => sum + b.points, 0);
      setPoints(prev => prev + pointsBadge);
    }
  }, [data]);

  // Progression vers prochain level
  const pointsPourLevel = level * 1000;
  const pointsActuelLevel = (level - 1) * 1000;
  const progression = ((points - pointsActuelLevel) / (pointsPourLevel - pointsActuelLevel)) * 100;

  // Badges disponibles
  const badgesDisponibles = [
    { id: 'premier_projet', nom: "Premier Projet", desc: "Créer 1 projet", requis: 1, type: "projets" },
    { id: 'chef_projet', nom: "Chef de Projet", desc: "Gérer 5 projets", requis: 5, type: "projets" },
    { id: 'expert', nom: "Expert", desc: "Gérer 10 projets", requis: 10, type: "projets" },
    { id: 'productif', nom: "Productif", desc: "10 tâches complétées", requis: 10, type: "taches" },
    { id: 'machine', nom: "Machine", desc: "50 tâches complétées", requis: 50, type: "taches" },
    { id: 'milliardaire', nom: "Milliardaire", desc: "1 milliard géré", requis: 1000000000, type: "budget" },
  ];

  const getBadgeIcon = (icone) => {
    switch(icone) {
      case "target": return <Target className="w-8 h-8" />;
      case "crown": return <Crown className="w-8 h-8" />;
      case "check": return <CheckCircle className="w-8 h-8" />;
      case "zap": return <Zap className="w-8 h-8" />;
      case "star": return <Star className="w-8 h-8" />;
      default: return <Award className="w-8 h-8" />;
    }
  };

  const getLevelTitle = (lvl) => {
    if (lvl >= 20) return "Légende";
    if (lvl >= 15) return "Maître";
    if (lvl >= 10) return "Expert";
    if (lvl >= 5) return "Confirmé";
    return "Débutant";
  };

  const stats = {
    projets: data.projets?.length || 0,
    taches: data.taches?.filter(t => t.statut === "Fait").length || 0,
    budget: data.projets?.reduce((s, p) => s + p.budget, 0) || 0,
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Gamification & Récompenses" 
        subtitle="Gagnez des points et débloquez des badges"
      />

      {/* Stats principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 glass-card rounded-2xl text-center bg-gradient-to-br from-indigo-600/20 to-purple-600/20">
          <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
          <p className="text-4xl font-bold text-white mb-1">{points.toLocaleString()}</p>
          <p className="text-sm app-text">Points Totaux</p>
        </Card>

        <Card className="p-6 glass-card rounded-2xl text-center bg-gradient-to-br from-emerald-600/20 to-teal-600/20">
          <Medal className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <p className="text-4xl font-bold text-white mb-1">Niveau {level}</p>
          <p className="text-sm app-text">{getLevelTitle(level)}</p>
        </Card>

        <Card className="p-6 glass-card rounded-2xl text-center bg-gradient-to-br from-orange-600/20 to-red-600/20">
          <Flame className="w-12 h-12 text-orange-400 mx-auto mb-3" />
          <p className="text-4xl font-bold text-white mb-1">{streak}</p>
          <p className="text-sm app-text">Jours Consécutifs</p>
        </Card>

        <Card className="p-6 glass-card rounded-2xl text-center bg-gradient-to-br from-pink-600/20 to-purple-600/20">
          <Award className="w-12 h-12 text-pink-400 mx-auto mb-3" />
          <p className="text-4xl font-bold text-white mb-1">{badges.length}</p>
          <p className="text-sm app-text">Badges Débloqués</p>
        </Card>
      </div>

      {/* Progression Level */}
      <Card className="p-6 glass-card rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Progression Niveau {level}</h3>
          <span className="text-sm app-text2">{points}/{pointsPourLevel} points</span>
        </div>
        <div className="w-full app-surface3 rounded-full h-4 mb-2">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all"
            style={{ width: `${Math.min(100, progression)}%` }}
          />
        </div>
        <p className="text-sm app-text2">
          {pointsPourLevel - points} points nécessaires pour le niveau {level + 1}
        </p>
      </Card>

      {/* Badges débloqués */}
      <Card className="p-6 glass-card rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          Badges Débloqués ({badges.length})
        </h3>

        {badges.length === 0 ? (
          <div className="text-center py-12 app-text3">
            <Award className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Aucun badge débloqué</p>
            <p className="text-sm mt-2">Continuez à utiliser l'application pour gagner des badges !</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map(badge => (
              <div key={badge.id} className="p-4 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-xl border border-indigo-500/30 text-center">
                <div className="text-indigo-400 mb-2 flex justify-center">
                  {getBadgeIcon(badge.icone)}
                </div>
                <h4 className="font-bold text-white text-sm mb-1">{badge.nom}</h4>
                <p className="text-xs app-text2 mb-2">{badge.description}</p>
                <div className="text-xs text-yellow-400 font-medium">
                  +{badge.points} pts
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Badges à débloquer */}
      <Card className="p-6 glass-card rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-400" />
          Objectifs à Atteindre
        </h3>

        <div className="space-y-3">
          {badgesDisponibles.map(badge => {
            const debloque = badges.find(b => b.id === badge.id);
            let progression = 0;
            
            if (badge.type === "projets") {
              progression = Math.min(100, (stats.projets / badge.requis) * 100);
            } else if (badge.type === "taches") {
              progression = Math.min(100, (stats.taches / badge.requis) * 100);
            } else if (badge.type === "budget") {
              progression = Math.min(100, (stats.budget / badge.requis) * 100);
            }

            return (
              <div key={badge.id} className={`p-4 rounded-xl ${debloque ? 'bg-emerald-600/10 border border-emerald-500/30' : 'app-surface2'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {debloque ? (
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <div className="w-6 h-6 rounded-full app-surface3" />
                    )}
                    <div>
                      <h4 className={`font-medium ${debloque ? 'text-emerald-400' : 'text-white'}`}>
                        {badge.nom}
                      </h4>
                      <p className="text-xs app-text2">{badge.desc}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-yellow-400">{badge.requis}</span>
                </div>
                {!debloque && (
                  <div className="w-full app-surface3 rounded-full h-2">
                    <div 
                      className="bg-indigo-500 h-2 rounded-full transition-all"
                      style={{ width: `${progression}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Leaderboard (simulation) */}
      <Card className="p-6 glass-card rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-400" />
          Classement (Top 5)
        </h3>

        <div className="space-y-3">
          {[
            { nom: "Vous", points: points, level: level, avatar: "👤" },
            { nom: "Marie K.", points: 4500, level: 5, avatar: "👩" },
            { nom: "Jean D.", points: 3200, level: 4, avatar: "👨" },
            { nom: "Paul M.", points: 2100, level: 3, avatar: "👨‍💼" },
            { nom: "Sophie L.", points: 1800, level: 2, avatar: "👩‍💼" },
          ].sort((a, b) => b.points - a.points).slice(0, 5).map((user, i) => (
            <div key={i} className={`flex items-center gap-4 p-4 rounded-xl ${
              user.nom === "Vous" ? 'bg-indigo-600/20 border border-indigo-500/50' : 'app-surface2'
            }`}>
              <div className="text-2xl font-bold app-text2 w-8">
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`}
              </div>
              <div className="text-3xl">{user.avatar}</div>
              <div className="flex-1">
                <h4 className="font-bold text-white">{user.nom}</h4>
                <p className="text-xs app-text2">Niveau {user.level}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-yellow-400">{user.points.toLocaleString()} pts</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Comment gagner des points */}
      <Card className="p-6 glass-card rounded-2xl bg-gradient-to-br from-yellow-600/10 to-orange-600/10 border border-yellow-500/30">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-yellow-400" />
          Comment Gagner des Points
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { action: "Créer un projet", points: "+100 pts" },
            { action: "Compléter une tâche", points: "+50 pts" },
            { action: "Mettre à jour budget", points: "+25 pts" },
            { action: "Identifier un risque", points: "+75 pts" },
            { action: "Exporter un rapport", points: "+30 pts" },
            { action: "Inviter un membre", points: "+200 pts" },
            { action: "Connexion quotidienne", points: "+10 pts" },
            { action: "Streak 7 jours", points: "+500 pts" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 app-surface2 rounded-lg">
              <span className="text-sm app-text">{item.action}</span>
              <span className="text-sm font-bold text-yellow-400">{item.points}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Gamification;
