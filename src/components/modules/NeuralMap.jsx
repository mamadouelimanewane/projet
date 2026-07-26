import React, { useRef, useMemo } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { Badge, StatCard, SectionHeader } from "../ui";

const NeuralMap = ({ data }) => {
  const fgRef = useRef();

  // Format data for the graph
  const graphData = useMemo(() => {
    // Combine projects and other entities (like integrations) as nodes
    const nodes = [
      ...data.projets.map(p => ({ id: p.id, name: p.nom, type: 'Project', status: p.statut, color: p.avancement > 80 ? '#10b981' : p.avancement < 40 ? '#ef4444' : '#6366f1' })),
      ...data.webhooks.map(w => ({ id: w.nom, name: w.nom, type: 'Integration', status: w.statut, color: '#94a3b8' }))
    ];

    const links = (data.dependencies || []).map(d => ({
      source: d.source,
      target: d.target,
      type: d.type
    }));

    return { nodes, links };
  }, [data]);

  return (
    <div className="space-y-6 animate-entrance flex flex-col h-[calc(100vh-160px)]">
      <SectionHeader 
        title="Neural Portfolio Map" 
        subtitle="Visualisation organique des interdépendances et de la santé systémique du portefeuille" 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
        <StatCard label="Nœuds Systémiques" value={graphData.nodes.length} color="#6366f1" icon="🌐" sub="Projets & Connecteurs" />
        <StatCard label="Criticités Détectées" value="2" color="#ef4444" icon="💀" sub="Dépendances en zone rouge" />
        <StatCard label="Fluidité du Flux" value="88%" color="#10b981" icon="✨" sub="Cohérence du backlog" />
      </div>

      <div className="flex-1 glass-card rounded-2xl overflow-hidden relative border border-indigo-500/20 shadow-[0_0_50px_rgba(99,102,241,0.05)]">
        <div className="absolute top-6 left-6 z-10 space-y-2">
          <div className="flex items-center gap-2 app-surface p-2 px-3 border app-border rounded-lg text-[10px] app-text backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Projet en bonne voie
          </div>
          <div className="flex items-center gap-2 app-surface p-2 px-3 border app-border rounded-lg text-[10px] app-text backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-indigo-500" /> En développement
          </div>
          <div className="flex items-center gap-2 app-surface p-2 px-3 border app-border rounded-lg text-[10px] app-text backdrop-blur">
             <span className="w-2 h-2 rounded-full bg-red-500" /> Risque de blocage cascade
          </div>
        </div>

        <ForceGraph2D
          graphData={graphData}
          nodeAutoColorBy="type"
          nodeLabel="name"
          linkDirectionalArrowLength={4}
          linkDirectionalArrowRelPos={1}
          linkColor={() => 'rgba(148, 163, 184, 0.2)'}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px DM Sans, sans-serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

            // Node Circle
            ctx.beginPath();
            ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
            ctx.fillStyle = node.color;
            ctx.shadowColor = node.color;
            ctx.shadowBlur = 15;
            ctx.fill();
            
            // Text Background
            ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
            ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2 - 10, bckgDimensions[0], bckgDimensions[1]);

            // Text Label
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#fff';
            ctx.fillText(label, node.x, node.y - 10);
            
            node.__bckgDimensions = bckgDimensions;
          }}
          backgroundColor="#020617"
          showNavInfo={false}
          width={window.innerWidth - 300}
          height={window.innerHeight - 400}
        />
        
        <div className="absolute right-6 bottom-6 app-surface p-4 border app-border rounded-xl text-[10px] app-text2 max-w-[200px]">
           💡 <b>Usage :</b> Utilisez la molette pour zoomer. Cliquez et faites glisser les nœuds pour réorganiser la topologie.
        </div>
      </div>
    </div>
  );
};

export default NeuralMap;
