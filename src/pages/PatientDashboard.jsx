import React, { useState } from 'react';
import { ArrowLeft, Download, Share2, Settings, Filter, Search, BarChart2, ChevronRight } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { BarChart } from '../components/charts/BarChart.jsx';
import { PieChart } from '../components/charts/PieChart.jsx';
import { DashboardTable } from '../components/charts/DashboardTable.jsx';
import { useDashboardData } from '../hooks/useDashboardData.js';

// Helper to bin raw numeric arrays
function binData(rawData, bins, underLabel, overLabel) {
  if (!rawData) return [];
  const result = bins.map(b => ({ label: String(b), value: 0 }));
  const under = { label: underLabel, value: 0 };
  const over = { label: overLabel, value: 0 };
  
  rawData.forEach(val => {
    if (val <= bins[0]) under.value++;
    else if (val > bins[bins.length - 1]) over.value++;
    else {
      for (let i = 1; i < bins.length; i++) {
        if (val <= bins[i]) {
          result[i].value++;
          break;
        }
      }
    }
  });
  return [under, ...result, over];
}

export const PatientDashboard = ({ study, onBack }) => {
  const { data, loading, error } = useDashboardData();

  if (loading) return <div className="p-10 text-center font-bold text-slate-500">Loading dataset...</div>;
  if (error) return <div className="p-10 text-center font-bold text-red-500">Error: {error}</div>;
  if (!data) return null;

  // Pre-process Bar Chart Data
  const ageData = binData(data.bar.diagnosis_age, [30, 35, 40, 45, 50, 55, 60, 65, 70, 75], '≤30', '>75');
  const tmbData = binData(data.bar.tmb_nonsynonymous, [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7], '≤0.5', '>7');
  const mutCountData = binData(data.bar.mutation_count, [20, 40, 60, 80, 100, 120, 140, 160, 180, 200], '≤20', '>200');

  return (
    <div className="flex-grow p-4 max-w-[1900px] mx-auto w-full flex flex-col bg-slate-50 min-h-screen">
      
      {/* Header Section */}
      <div className="mb-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden flex justify-between items-center">
        <div>
          <button onClick={onBack} className="text-xs font-semibold text-brand-600 mb-1 hover:text-brand-800 transition-colors">
            ← Back to Study Selection
          </button>
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">paac_jhu_2014</h1>
            <Badge variant="success">Verified Dataset</Badge>
          </div>
        </div>
        <div className="text-sm font-semibold text-slate-700 bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
          Selected: <span className="text-brand-600">{data.summary.patients}</span> patients | <span className="text-brand-600">{data.summary.samples}</span> samples
        </div>
      </div>

      {/* Grid Layout matching reference */}
      <div className="grid grid-cols-12 gap-3 pb-10 auto-rows-[220px]">
        
        {/* ROW 1 */}
        <Card title="Data Types" className="col-span-12 md:col-span-3">
          <DashboardTable columns={["Data Types", "#", "Freq"]} data={data.tables.data_types} />
        </Card>
        <Card title={`Mutated Genes (${data.summary.samples} profiled samples)`} className="col-span-12 md:col-span-4">
          <DashboardTable columns={["Gene", "# Mut", "Freq"]} data={data.tables.mutated_genes} nameKey="gene" countKey="count" freqKey="freq" />
        </Card>
        <Card title="Mutation Count" className="col-span-12 md:col-span-3">
          <BarChart data={mutCountData} />
        </Card>
        <Card title="Cancer Studies" className="col-span-12 md:col-span-2">
          <PieChart data={data.pie.cancer_studies} />
        </Card>

        {/* ROW 2 */}
        <Card title="Cancer Type" className="col-span-12 md:col-span-3">
          <PieChart data={data.pie.cancer_type} />
        </Card>
        <Card title="Cancer Type Detailed" className="col-span-12 md:col-span-5">
          <PieChart data={data.pie.cancer_type_detailed} />
        </Card>
        <Card title="Diagnosis" className="col-span-12 md:col-span-4">
          <PieChart data={data.pie.diagnosis} />
        </Card>

        {/* ROW 3 */}
        <Card title="Case Lists" className="col-span-12 md:col-span-4">
          <DashboardTable columns={["Name", "#", "Freq"]} data={data.tables.case_lists} />
        </Card>
        <Card title="Diagnosis Age" className="col-span-12 md:col-span-3">
          <BarChart data={ageData} />
        </Card>
        <Card title="Ethnicity Category" className="col-span-12 md:col-span-2">
          <PieChart data={data.pie.ethnicity} />
        </Card>
        <Card title="Immunohistochemistry" className="col-span-12 md:col-span-2">
          <PieChart data={data.pie.immunohistochemistry} />
        </Card>
        <Card title="Number of Samples Per Patient" className="col-span-12 md:col-span-1">
          <PieChart data={data.pie.number_of_samples_per_patient} />
        </Card>

        {/* ROW 4 */}
        <Card title="Oncotree Code" className="col-span-12 md:col-span-3">
          <PieChart data={data.pie.oncotree_code} />
        </Card>
        <Card title="Sex" className="col-span-12 md:col-span-3">
          <PieChart data={data.pie.sex} />
        </Card>
        <Card title="Somatic Status" className="col-span-12 md:col-span-3">
          <PieChart data={data.pie.somatic_status} />
        </Card>
        <Card title="Stage" className="col-span-12 md:col-span-3">
          <PieChart data={data.pie.stage} />
        </Card>

        {/* ROW 5 */}
        <Card title="TMB (nonsynonymous)" className="col-span-12 md:col-span-4">
          <BarChart data={tmbData} />
        </Card>
      </div>
    </div>
  );
};
