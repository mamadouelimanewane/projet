import React, { useState } from "react";
import { toast, dialog } from '../ui';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import { SectionHeader, Btn } from "../ui";

const ExportRapports = ({ data }) => {
  const [exporting, setExporting] = useState(false);
  const [exportType, setExportType] = useState(null);
  const [progress, setProgress] = useState(0);

  // Exécute une tâche lourde de manière non-bloquante via scheduler
  // (requestIdleCallback / setTimeout 0 — évite de geler l'UI le temps du rendu PDF)
  const runAsync = (fn) => new Promise(resolve => {
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(() => resolve(fn()), { timeout: 500 });
    } else {
      setTimeout(() => resolve(fn()), 0);
    }
  });

  // Export PDF - Rapport Complet Projet
  const exportPDF = async () => {
    setExporting(true);
    setProgress(10);
    setExportType("PDF");
    
    try {
      setProgress(20);
      await runAsync(() => {}); // yield to browser before heavy work
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();

      // Header
      doc.setFillColor(99, 102, 241);
      doc.rect(0, 0, pageWidth, 40, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.text("RAPPORT PROJET ÉLITE", pageWidth / 2, 20, { align: "center" });
      doc.setFontSize(12);
      doc.text(`Généré le ${new Date().toLocaleDateString("fr-FR")}`, pageWidth / 2, 30, { align: "center" });

      // Section 1: Résumé Exécutif
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(16);
      doc.text("1. RÉSUMÉ EXÉCUTIF", 14, 55);
      doc.setFontSize(10);
      
      const resumeData = [
        ["Total Projets", data.projets.length.toString()],
        ["Projets Actifs", data.projets.filter(p => p.statut === "En cours").length.toString()],
        ["Tâches Totales", data.taches.length.toString()],
        ["Tâches Terminées", data.taches.filter(t => t.statut === "Fait").length.toString()],
        ["Budget Total", `${(data.projets.reduce((s, p) => s + p.budget, 0) / 1000000).toFixed(2)}M FCFA`],
        ["Risques Actifs", data.risques.filter(r => r.statut === "Actif").length.toString()],
        ["Problèmes Ouverts", data.problemes.filter(p => p.statut !== "Résolu").length.toString()],
      ];

      autoTable(doc, {
        startY: 60,
        head: [["Indicateur", "Valeur"]],
        body: resumeData,
        theme: "grid",
        headStyles: { fillColor: [99, 102, 241], textColor: 255, fontStyle: "bold" },
        alternateRowStyles: { fillColor: [245, 247, 250] },
        margin: { left: 14, right: 14 },
      });

      // Section 2: Liste des Projets
      let yPos = doc.lastAutoTable.finalY + 15;
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(16);
      doc.text("2. PORTFEUILLE PROJETS", 14, yPos);
      
      const projetsData = data.projets.map(p => [
        p.nom,
        p.chef,
        `${p.avancement}%`,
        `${(p.budget / 1000000).toFixed(1)}M`,
        p.statut,
      ]);

      autoTable(doc, {
        startY: yPos + 5,
        head: [["Projet", "Chef", "Avancement", "Budget", "Statut"]],
        body: projetsData,
        theme: "grid",
        headStyles: { fillColor: [99, 102, 241], textColor: 255, fontStyle: "bold" },
        alternateRowStyles: { fillColor: [245, 247, 250] },
        margin: { left: 14, right: 14 },
      });

      // Section 3: Tâches
      yPos = doc.lastAutoTable.finalY + 15;
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(16);
      doc.text("3. TÂCHES", 14, yPos);
      
      const tachesData = data.taches.map(t => [
        t.tache,
        t.projet,
        t.responsable,
        t.statut,
        `${t.progression}%`,
      ]);

      autoTable(doc, {
        startY: yPos + 5,
        head: [["Tâche", "Projet", "Responsable", "Statut", "Progression"]],
        body: tachesData.slice(0, 20), // Limite à 20 pour lisibilité
        theme: "grid",
        headStyles: { fillColor: [99, 102, 241], textColor: 255, fontStyle: "bold" },
        alternateRowStyles: { fillColor: [245, 247, 250] },
        margin: { left: 14, right: 14 },
      });

      // Section 4: Budget
      yPos = doc.lastAutoTable.finalY + 15;
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(16);
      doc.text("4. BUDGET", 14, yPos);
      
      const budgetData = data.budget.map(b => [
        b.categorie,
        `${(b.planifie / 1000000).toFixed(2)}M`,
        `${(b.reel / 1000000).toFixed(2)}M`,
        b.statut,
      ]);

      autoTable(doc, {
        startY: yPos + 5,
        head: [["Catégorie", "Planifié", "Réel", "Statut"]],
        body: budgetData,
        theme: "grid",
        headStyles: { fillColor: [99, 102, 241], textColor: 255, fontStyle: "bold" },
        alternateRowStyles: { fillColor: [245, 247, 250] },
        margin: { left: 14, right: 14 },
      });

      // Section 5: Risques
      yPos = doc.lastAutoTable.finalY + 15;
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(16);
      doc.text("5. RISQUES", 14, yPos);
      
      const risquesData = data.risques.map(r => [
        r.risque,
        r.gravite.toString(),
        r.probabilite.toString(),
        (r.gravite * r.probabilite).toString(),
        r.statut,
      ]);

      autoTable(doc, {
        startY: yPos + 5,
        head: [["Risque", "Gravité", "Proba", "Score", "Statut"]],
        body: risquesData,
        theme: "grid",
        headStyles: { fillColor: [99, 102, 241], textColor: 255, fontStyle: "bold" },
        alternateRowStyles: { fillColor: [245, 247, 250] },
        margin: { left: 14, right: 14 },
      });

      // Section 6: Jalons
      yPos = doc.lastAutoTable.finalY + 15;
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(16);
      doc.text("6. JALONS", 14, yPos);
      
      const jalonsData = data.jalons.map(j => [
        j.jalon,
        j.date,
        j.responsable,
        j.statut,
      ]);

      autoTable(doc, {
        startY: yPos + 5,
        head: [["Jalon", "Date", "Responsable", "Statut"]],
        body: jalonsData,
        theme: "grid",
        headStyles: { fillColor: [99, 102, 241], textColor: 255, fontStyle: "bold" },
        alternateRowStyles: { fillColor: [245, 247, 250] },
        margin: { left: 14, right: 14 },
      });

      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(
          `Projet Élite - Rapport généré automatiquement - Page ${i}/${pageCount}`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: "center" }
        );
      }

      setProgress(90);
      await runAsync(() => {}); // yield before save triggers download
      doc.save(`Rapport_Projet_Elite_${new Date().toISOString().split("T")[0]}.pdf`);
      setProgress(100);
    } catch (error) {
      console.error("Erreur export PDF:", error);
      toast.error("Erreur lors de l'export PDF");
    } finally {
      setExporting(false);
      setExportType(null);
    }
  };

  // Export Excel
  const exportExcel = () => {
    setExporting(true);
    setExportType("Excel");
    
    try {
      const wb = XLSX.utils.book_new();

      // Sheet 1: Projets
      const wsProjets = XLSX.utils.json_to_sheet(data.projets.map(p => ({
        "Nom": p.nom,
        "Chef": p.chef,
        "Début": p.debut,
        "Fin": p.fin,
        "Avancement (%)": p.avancement,
        "Statut": p.statut,
        "Budget Prévu (FCFA)": p.budget,
        "Budget Réel (FCFA)": p.budgetReel,
      })));
      XLSX.utils.book_append_sheet(wb, wsProjets, "Projets");

      // Sheet 2: Tâches
      const wsTaches = XLSX.utils.json_to_sheet(data.taches.map(t => ({
        "Tâche": t.tache,
        "Projet": t.projet,
        "Responsable": t.responsable,
        "Début": t.debut,
        "Fin": t.fin,
        "Statut": t.statut,
        "Priorité": t.priorite,
        "Progression (%)": t.progression,
      })));
      XLSX.utils.book_append_sheet(wb, wsTaches, "Tâches");

      // Sheet 3: Budget
      const wsBudget = XLSX.utils.json_to_sheet(data.budget.map(b => ({
        "Catégorie": b.categorie,
        "Planifié (FCFA)": b.planifie,
        "Réel (FCFA)": b.reel,
        "Statut": b.statut,
      })));
      XLSX.utils.book_append_sheet(wb, wsBudget, "Budget");

      // Sheet 4: Risques
      const wsRisques = XLSX.utils.json_to_sheet(data.risques.map(r => ({
        "Risque": r.risque,
        "Gravité (1-5)": r.gravite,
        "Probabilité (1-5)": r.probabilite,
        "Score": r.gravite * r.probabilite,
        "Atténuation": r.attenuation,
        "Statut": r.statut,
      })));
      XLSX.utils.book_append_sheet(wb, wsRisques, "Risques");

      // Sheet 5: Jalons
      const wsJalons = XLSX.utils.json_to_sheet(data.jalons.map(j => ({
        "Jalon": j.jalon,
        "Date": j.date,
        "Responsable": j.responsable,
        "Statut": j.statut,
        "Notes": j.notes,
      })));
      XLSX.utils.book_append_sheet(wb, wsJalons, "Jalons");

      // Sheet 6: Problèmes
      const wsProblemes = XLSX.utils.json_to_sheet(data.problemes.map(p => ({
        "Description": p.description,
        "Priorité": p.priorite,
        "Statut": p.statut,
        "Responsable": p.responsable,
        "Date Signalement": p.dateSignalement,
        "Résolution": p.resolution,
      })));
      XLSX.utils.book_append_sheet(wb, wsProblemes, "Problèmes");

      // Sheet 7: KPIs
      const wsKPIs = XLSX.utils.json_to_sheet(data.kpis.map(k => ({
        "KPI": k.nom,
        "Valeur": k.valeur,
        "Cible": k.cible,
        "Unité": k.unite,
        "Tendance": k.tendance,
        "Catégorie": k.categorie,
      })));
      XLSX.utils.book_append_sheet(wb, wsKPIs, "KPIs");

      XLSX.writeFile(wb, `Rapport_Projet_Elite_${new Date().toISOString().split("T")[0]}.xlsx`);
    } catch (error) {
      console.error("Erreur export Excel:", error);
      toast.error("Erreur lors de l'export Excel");
    } finally {
      setExporting(false);
      setExportType(null);
    }
  };

  // Export CSV simple
  const exportCSV = (dataType) => {
    const dataMap = {
      projets: data.projets,
      taches: data.taches,
      budget: data.budget,
      risques: data.risques,
    };

    const selectedData = dataMap[dataType];
    if (!selectedData || selectedData.length === 0) {
      toast.info("Aucune donnée à exporter");
      return;
    }

    const headers = Object.keys(selectedData[0]);
    const csvContent = [
      headers.join(","),
      ...selectedData.map(row => 
        headers.map(h => `"${row[h]}"`).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${dataType}_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Export Rapports" 
        subtitle="Exporter vos données en PDF, Excel ou CSV"
      />

      {/* Export Principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PDF */}
        <div className="glass-card rounded-2xl p-8 border-2 border-transparent hover:border-red-500/30 transition-all">
          <div className="text-center">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-bold text-white mb-2">Rapport PDF Complet</h3>
            <p className="text-sm text-slate-400 mb-6">
              Rapport professionnel avec tous les indicateurs, graphiques et tableaux
            </p>
            <ul className="text-left text-xs text-slate-500 space-y-2 mb-6">
              <li>✅ Résumé exécutif</li>
              <li>✅ Portefeuille projets</li>
              <li>✅ Tâches et avancement</li>
              <li>✅ Budget détaillé</li>
              <li>✅ Risques et jalons</li>
              <li>✅ Mise en page professionnelle</li>
            </ul>
            <Btn 
              onClick={exportPDF} 
              disabled={exporting}
              className="w-full"
              size="lg"
            >
              {exporting && exportType === "PDF" ? `⏳ Génération... ${progress}%` : "📄 Exporter PDF"}
            </Btn>
            {exporting && exportType === "PDF" && (
              <div style={{height:4,background:'#1e293b',borderRadius:2,marginTop:8,overflow:'hidden'}}>
                <div style={{height:'100%',width:`${progress}%`,background:'#6366f1',transition:'width 0.3s ease',borderRadius:2}}/>
              </div>
            )}
          </div>
        </div>

        {/* Excel */}
        <div className="glass-card rounded-2xl p-8 border-2 border-transparent hover:border-emerald-500/30 transition-all">
          <div className="text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-2">Rapport Excel Complet</h3>
            <p className="text-sm text-slate-400 mb-6">
              Fichier Excel multi-feuilles avec toutes les données structurées
            </p>
            <ul className="text-left text-xs text-slate-500 space-y-2 mb-6">
              <li>✅ 7 feuilles (Projets, Tâches, Budget...)</li>
              <li>✅ Données brutes exploitables</li>
              <li>✅ Formules et calculs prêts</li>
              <li>✅ Compatible Excel/Google Sheets</li>
              <li>✅ Formats préservés</li>
              <li>✅ Filtres automatiques</li>
            </ul>
            <Btn 
              onClick={exportExcel} 
              disabled={exporting}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              size="lg"
            >
              {exporting && exportType === "Excel" ? "⏳ Génération..." : "📊 Exporter Excel"}
            </Btn>
          </div>
        </div>
      </div>

      {/* Exports Rapides CSV */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-sm font-bold text-slate-300 mb-4">⚡ Exports Rapides CSV</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Btn onClick={() => exportCSV("projets")} variant="ghost" size="sm">
            📁 Projets
          </Btn>
          <Btn onClick={() => exportCSV("taches")} variant="ghost" size="sm">
            ✅ Tâches
          </Btn>
          <Btn onClick={() => exportCSV("budget")} variant="ghost" size="sm">
            💰 Budget
          </Btn>
          <Btn onClick={() => exportCSV("risques")} variant="ghost" size="sm">
            ⚠️ Risques
          </Btn>
        </div>
      </div>

      {/* Historique des Exports */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-sm font-bold text-slate-300 mb-4">📋 Conseils d'Utilisation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-400">
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <div className="font-bold text-white mb-2">📄 PDF</div>
            <p>Idéal pour les rapports officiels, présentations comité, archivage documentaire</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <div className="font-bold text-white mb-2">📊 Excel</div>
            <p>Parfait pour analyses approfondies, graphiques personnalisés, calculs avancés</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <div className="font-bold text-white mb-2">📁 CSV</div>
            <p>Export rapide pour imports dans d'autres systèmes, bases de données, CRM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportRapports;
