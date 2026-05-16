import React, { useState } from "react";
import { SectionHeader, Card, Btn, Badge } from "../ui";
import { Film, Music, Mic2, Star, Calendar, Users, BarChart3, Clock, Play, Layers, Award } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const MediaTechElite = ({ data = {}, setData }) => {
  const [activeProject, setActiveProject] = useState("Movie Production #01");

  const trendData = [
    { name: 'Lun', audience: 400, social: 240 },
    { name: 'Mar', audience: 300, social: 450 },
    { name: 'Mer', audience: 600, social: 520 },
    { name: 'Jeu', audience: 800, social: 750 },
    { name: 'Ven', audience: 950, social: 880 },
  ];

  const talentSkills = [
    { subject: 'Carisme', A: 120, fullMark: 150 },
    { subject: 'Technique', A: 98, fullMark: 150 },
    { subject: 'Notoriété', A: 86, fullMark: 150 },
    { subject: 'Engagement', A: 99, fullMark: 150 },
    { subject: 'Polyvalence', A: 85, fullMark: 150 },
  ];

  const mediaKpis = [
    { label: "Projets Actifs", value: "8", icon: <Film className="text-purple-400" /> },
    { label: "Audience Cumulée", value: "24.5M", icon: <Users className="text-pink-400" /> },
    { label: "Budget Engagé", value: "12M $", icon: <BarChart3 className="text-amber-400" /> },
    { label: "Awards / IP", value: "42", icon: <Award className="text-indigo-400" /> },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <SectionHeader 
        title="Creative Engine Elite™" 
        subtitle="Gestion de Production Média, Industries Créatives & Talents"
        icon={<Film className="w-8 h-8 text-purple-500" />}
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {mediaKpis.map((kpi, i) => (
          <Card key={i} className="p-4 border-l-4 border-l-purple-500 bg-slate-900/50 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-800 rounded-lg">{kpi.icon}</div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{kpi.label}</span>
            </div>
            <span className="text-2xl font-black text-white">{kpi.value}</span>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Timeline & Buzz */}
        <Card className="lg:col-span-2 p-6 glass-card border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-tighter flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-500" />
              Impact & Social Buzz (Live)
            </h3>
            <div className="flex gap-2">
               <Badge variant="info" className="bg-purple-500/20 text-purple-400 border-purple-500/30">#GravityShow</Badge>
               <Badge variant="info" className="bg-pink-500/20 text-pink-400 border-pink-500/30">Viral +15%</Badge>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorAudience" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }} />
                <Area type="monotone" dataKey="audience" stroke="#a855f7" fillOpacity={1} fill="url(#colorAudience)" strokeWidth={3} />
                <Area type="monotone" dataKey="social" stroke="#ec4899" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Talent Analytics Radar */}
        <Card className="p-6 glass-card border-slate-800 flex flex-col">
          <h3 className="text-sm font-black uppercase tracking-tighter mb-6 flex items-center gap-2 text-purple-400">
            <Mic2 className="w-4 h-4" />
            Analyse Performance Talent
          </h3>
          <div className="flex-1 h-48 w-full">
             <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={talentSkills}>
                   <PolarGrid stroke="#1e293b" />
                   <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={8} />
                   <PolarRadiusAxis angle={30} domain={[0, 150]} hide />
                   <Radar name="Performance" dataKey="A" stroke="#a855f7" fill="#a855f7" fillOpacity={0.5} />
                </RadarChart>
             </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-xs">EL</div>
                <div>
                   <p className="text-xs font-black text-white">Élimane L.</p>
                   <p className="text-[9px] text-slate-500 uppercase">Artiste / Influenceur</p>
                </div>
             </div>
             <Btn variant="primary" className="w-full text-xs h-9">Optimiser Stratégie</Btn>
          </div>
        </Card>
      </div>

      {/* Production Tasks & IP */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="p-6 glass-card border-slate-800">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-sm font-black uppercase tracking-tighter flex items-center gap-2">
               <Layers className="w-4 h-4 text-purple-400" />
               Workflow de Production
             </h3>
             <Btn variant="ghost" size="xs"><Play className="w-3 h-3 mr-1" /> Live Preview</Btn>
           </div>
           <div className="space-y-4">
              {[
                { title: "Étalonnage Épisode #04", status: "In-Review", time: "2h restantes" },
                { title: "Mixage Audio Master", status: "Done", time: "Terminé" },
                { title: "Castings Saison 2", status: "Draft", time: "J-4" },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-purple-500/30 transition-all cursor-pointer">
                   <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-slate-600" />
                      <div>
                         <p className="text-xs font-black text-white">{task.title}</p>
                         <p className="text-[9px] text-slate-500 uppercase">{task.time}</p>
                      </div>
                   </div>
                   <Badge variant={task.status === 'Done' ? 'success' : 'info'}>{task.status}</Badge>
                </div>
              ))}
           </div>
         </Card>

         <Card className="p-6 glass-card border-slate-800 bg-gradient-to-br from-slate-900 to-purple-900/20">
            <h3 className="text-sm font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400" />
              IP & Propriété Intellectuelle (Blockchain)
            </h3>
            <div className="space-y-4">
               <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-700 flex items-center justify-between">
                  <div>
                     <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-1">Dépôt #9901-X</p>
                     <p className="text-xs font-bold text-white uppercase">Format TV "Gravity Star"</p>
                     <p className="text-[8px] text-slate-500 mt-1 font-mono">HASH: 0x883...fE42</p>
                  </div>
                  <Badge variant="success">Protégé</Badge>
               </div>
               <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700 text-center">
                     <p className="text-[8px] font-black text-slate-500 uppercase">Contrats Signés</p>
                     <p className="text-[12px] font-bold text-white">124</p>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700 text-center">
                     <p className="text-[8px] font-black text-slate-500 uppercase">Droit à l'Image</p>
                     <p className="text-[12px] font-bold text-emerald-400">100% OK</p>
                  </div>
               </div>
            </div>
         </Card>
      </div>
    </div>
  );
};

export default MediaTechElite;
