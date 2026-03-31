import React, { useState } from "react";
import * as XLSX from "xlsx";
import useStore from "../../store/useStore";
import { Badge, StatCard, SectionHeader, Btn } from "../ui";

const ExcelIntegration = () => {
  const { data, updateTaches } = useStore();
  const [importData, setImportData] = useState([]);
  const [loading, setLoading] = useState(false);

  // EXPORT LOGIC
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.taches);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tâches");
    
    // Formatting can be added here if needed (e.g. bold header)
    XLSX.writeFile(workbook, `Projet_Elite_Taches_${new Date().getTime()}.xlsx`);
  };

  // IMPORT LOGIC
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const bstr = event.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      
      setImportData(json);
      setLoading(false);
    };

    reader.readAsBinaryString(file);
  };

  const confirmImport = () => {
    // Map Excel rows to the internal data structure
    const newTaches = importData.map((row, index) => ({
      id: (data.taches.length + index + 1),
      nom: row.Nom || row.Task || row.Label || "Nouvelle tâche",
      avancement: row.Avancement || row.Progress || 0,
      statut: row.Statut || row.Status || "À faire",
      priorite: row.Priorite || row.Priority || "Moyenne",
      equipe: row.Equipe || row.Team || "Alpha",
      debut: row.Debut || row.Start || new Date().toISOString().split('T')[0],
      fin: row.Fin || row.End || new Date().toISOString().split('T')[0],
      projetId: 1 // Default to first project for now
    }));

    updateTaches([...data.taches, ...newTaches]);
    setImportData([]);
    alert(`🎉 ${newTaches.length} tâches importées avec succès !`);
  };

  return (
    <div className="space-y-8 animate-entrance">
      <SectionHeader 
        title="Pont Excel Bidirectionnel" 
        subtitle="Importation massive et exportation structurée de vos données de portefeuille" 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* EXPORT SECTION */}
        <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center group">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">📗</div>
          <h3 className="text-xl font-bold text-white mb-2">Exportation Universelle</h3>
          <p className="text-sm text-slate-400 mb-6 max-w-[280px]">Téléchargez instantanément vos {data.taches.length} tâches dans un format .xlsx compatible Excel, Google Sheets et Numbers.</p>
          <Btn onClick={handleExport} variant="primary" size="lg" className="bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20">Exporter vers Excel (.xlsx)</Btn>
        </div>

        {/* IMPORT SECTION */}
        <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-3xl mb-4">📂</div>
          <h3 className="text-xl font-bold text-white mb-2">Importation Intelligente</h3>
          <p className="text-sm text-slate-400 mb-6 max-w-[280px]">Glissez-déposez votre planning Excel pour peupler automatiquement votre portefeuille de projets.</p>
          <input type="file" id="excel-upload" className="hidden" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />
          <Btn onClick={() => document.getElementById('excel-upload').click()} variant="ghost" size="lg">Sélectionner un fichier</Btn>
        </div>
      </div>

      {/* IMPORT PREVIEW TABLE */}
      {importData.length > 0 && (
        <div className="glass-card rounded-2xl p-8 animate-entrance">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black text-white uppercase tracking-widest">Aperçu du mapping Excel ({importData.length} lignes détectées)</h3>
            <div className="flex gap-3">
              <Btn onClick={() => setImportData([])} variant="ghost">Annuler</Btn>
              <Btn onClick={confirmImport} variant="primary">Valider l'importation massive</Btn>
            </div>
          </div>
          
          <div className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700/50">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/80 uppercase font-bold text-slate-500 border-b border-slate-700/50">
                <tr>
                  <th className="px-4 py-3">Colonnes Détectées</th>
                  <th className="px-4 py-3">Exemple de donnée (Ligne 1)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {Object.keys(importData[0]).map((key, i) => (
                  <tr key={i} className="hover:bg-indigo-500/5 transition-colors">
                    <td className="px-4 py-3 font-mono text-indigo-400">{key}</td>
                    <td className="px-4 py-3 text-slate-200">{String(importData[0][key])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-slate-500 mt-4 italic">
            💡 L'IA de Projet Élite effectue un mapping automatique sur les colonnes "Nom", "Task", "Label", etc.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExcelIntegration;
