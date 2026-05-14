import React, { useState } from "react";
import { toast, dialog } from '../ui';
import * as XLSX from "xlsx";
import useStore from "../../store/useStore";
import { Badge, SectionHeader, Btn, Card } from "../ui";
import { FileSpreadsheet, Download, Upload, CheckCircle2, AlertCircle } from "lucide-react";

const ExcelIntegration = () => {
  const [importLevel, setImportLevel] = useState("taches"); // taches, budget, risques
  const { data, updateTaches, updateData } = useStore();
  const [importData, setImportData] = useState([]);
  const [loading, setLoading] = useState(false);

  // EXPORT LOGIC
  const handleExport = () => {
    let exportSet = data.taches;
    let sheetName = "Tâches";
    
    if (importLevel === "budget") { exportSet = data.budget; sheetName = "Budget"; }
    if (importLevel === "risques") { exportSet = data.risques; sheetName = "Risques"; }

    const worksheet = XLSX.utils.json_to_sheet(exportSet);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `Projet_Elite_${sheetName}_${new Date().getTime()}.xlsx`);
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
    let message = "";
    
    if (importLevel === "taches") {
      const newTaches = importData.map((row, index) => ({
        id: (data.taches?.length || 0) + index + 1,
        projet: row.Projet || row.Project || "Star Academy",
        titre: row.Titre || row.Task || row.Label || "Nouvelle tâche",
        responsable: row.Responsable || row.Owner || "Admin",
        statut: row.Statut || row.Status || "À faire",
        priorite: row.Priorite || row.Priority || "Moyenne",
      }));
      updateTaches([...(data.taches || []), ...newTaches]);
      message = `${newTaches.length} tâches importées.`;
    } 
    else if (importLevel === "budget") {
      const newBudget = importData.map((row) => ({
        categorie: row.Categorie || row.Category || "Inconnu",
        planifie: parseFloat(row.Planifie || row.Planned || 0),
        reel: parseFloat(row.Reel || row.Actual || 0),
      }));
      updateData("budget", [...(data.budget || []), ...newBudget]);
      message = `${newBudget.length} lignes budgétaires importées.`;
    }
    else if (importLevel === "risques") {
      const newRisques = importData.map((row, index) => ({
        id: (data.risques?.length || 0) + index + 1,
        projet: row.Projet || "Star Academy",
        risque: row.Risque || row.Risk || "Nouveau Risque",
        gravite: parseInt(row.Gravite || 3),
        probabilite: parseInt(row.Probabilite || 3),
        statut: "Actif"
      }));
      updateData("risques", [...(data.risques || []), ...newRisques]);
      message = `${newRisques.length} risques importés.`;
    }

    setImportData([]);
    toast.success(`🎉 Importation réussie : ${message}`);
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Pont Excel Multidimensionnel" 
        subtitle="Intégration profonde des plannings, budgets et risques via Excel" 
      />

      <div className="flex gap-4 mb-8">
        {[
          { id: "taches", label: "Planning (Tâches)", color: "indigo" },
          { id: "budget", label: "Finances (Budget)", color: "emerald" },
          { id: "risques", label: "Sécurité (Risques)", color: "red" }
        ].map(level => (
          <button 
            key={level.id}
            onClick={() => { setImportLevel(level.id); setImportData([]); }}
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${importLevel === level.id ? 'bg-white text-slate-900 border-white' : 'bg-slate-900 text-slate-500 border-slate-800 hover:border-slate-700'}`}
          >
            {level.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-8 glass-card rounded-2xl flex flex-col items-center text-center">
           <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 flex items-center justify-center mb-4">
              <Download className="w-8 h-8 text-indigo-400" />
           </div>
           <h3 className="text-xl font-bold text-white mb-2">Exporter le Template</h3>
           <p className="text-sm text-slate-500 mb-6">Téléchargez la structure actuelle de vos {importLevel} pour modification externe.</p>
           <Btn variant="indigo" onClick={handleExport} className="w-full">Générer .xlsx</Btn>
        </Card>

        <Card className="p-8 glass-card rounded-2xl flex flex-col items-center text-center">
           <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-emerald-400" />
           </div>
           <h3 className="text-xl font-bold text-white mb-2">Importer des Données</h3>
           <p className="text-sm text-slate-500 mb-6">Importation massive dans le module {importLevel}.</p>
           <input type="file" id="excel-upload" className="hidden" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />
           <Btn variant="success" onClick={() => document.getElementById('excel-upload').click()} className="w-full">Parcourir les fichiers</Btn>
        </Card>
      </div>

      {importData.length > 0 && (
        <Card className="p-8 glass-card rounded-2xl animate-entrance border-2 border-indigo-500/30">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
               <CheckCircle2 className="w-6 h-6 text-emerald-400" />
               <h3 className="text-lg font-bold text-white">Analyse des données ({importData.length} lignes)</h3>
            </div>
            <div className="flex gap-2">
               <Btn variant="ghost" onClick={() => setImportData([])}>Annuler</Btn>
               <Btn variant="indigo" onClick={confirmImport}>Confirmer l'Importation</Btn>
            </div>
          </div>
          
          <div className="bg-slate-950/50 rounded-xl overflow-hidden border border-slate-800">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Champ Détecté</th>
                  <th className="px-6 py-4">Aperçu Valeur</th>
                  <th className="px-6 py-4">Statut Mapping</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {Object.keys(importData[0]).map((key, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 font-mono text-xs text-indigo-400">{key}</td>
                    <td className="px-6 py-4 text-xs text-slate-300">{String(importData[0][key])}</td>
                    <td className="px-6 py-4">
                       <Badge variant="success">Auto-Mappé</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ExcelIntegration;
