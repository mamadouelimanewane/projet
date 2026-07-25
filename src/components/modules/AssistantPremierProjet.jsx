import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Sparkles, BookOpen, ChevronRight, Play } from 'lucide-react';
import { Card, Btn } from '../ui';

const AssistantPremierProjet = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-entrance">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* Header Illustration */}
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
          <div className="relative w-24 h-24 app-surface border-2 border-indigo-500/30 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 mx-auto">
            <Rocket className="w-12 h-12 text-indigo-400" />
          </div>
          <div className="absolute -top-4 -right-4 w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center animate-bounce">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Bienvenue sur Projet Élite
          </h1>
          <p className="text-lg app-text2 max-w-xl mx-auto leading-relaxed">
            Votre espace de travail est prêt. Créez votre premier projet pour commencer à utiliser toute la puissance de la plateforme (IA, prédictions ML, collaboration temps réel).
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          
          <Card className="p-6 glass-card rounded-2xl border border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/10 transition-all text-left cursor-pointer group" onClick={() => navigate('/multiprojets')}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center">
                <Play className="w-6 h-6 text-indigo-400" />
              </div>
              <ChevronRight className="w-5 h-5 text-indigo-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Créer un Projet</h3>
            <p className="text-sm app-text2">
              Lancez votre premier projet en quelques clics. Définissez le budget, le calendrier et invitez votre équipe.
            </p>
          </Card>

          <Card className="p-6 glass-card rounded-2xl border app-border hover:app-border2 transition-all text-left cursor-pointer group" onClick={() => navigate('/onboarding')}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl app-surface2 flex items-center justify-center">
                <BookOpen className="w-6 h-6 app-text2" />
              </div>
              <ChevronRight className="w-5 h-5 app-text2 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Suivre le Tutoriel</h3>
            <p className="text-sm app-text2">
              Découvrez les 20 fonctionnalités avancées grâce à notre guide interactif pour débutants.
            </p>
          </Card>

        </div>

        {/* Bot Assistant Prompt */}
        <div className="mt-12 p-4 app-surface2 rounded-xl border app-border inline-flex items-center gap-4 text-left mx-auto">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
            <span className="text-sm font-bold text-white">IA</span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-200">Besoin d'aide pour commencer ?</p>
            <p className="text-xs app-text2">Ouvrez l'Assistant IA dans le menu pour des conseils personnalisés.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AssistantPremierProjet;
