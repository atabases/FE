import React, { useState } from 'react';
import { ArrowLeft, Download, Share2, Settings, Filter, Search, BarChart2, ChevronRight } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { ChartsDropdown } from '../components/ui/ChartsDropdown.jsx';

export const PatientDashboard = ({ study, onBack }) => {
  const [showChartsDropdown, setShowChartsDropdown] = useState(false);
  const [selectedCharts, setSelectedCharts] = useState([
    { id: 'cancer-studies', name: 'Cancer Studies', freq: '100.0%', checked: false, cardTitle: 'Cancer Type Distribution' },
    { id: 'case-lists', name: 'Case Lists', freq: '100.0%', checked: false },
    { id: 'disease-status', name: 'Disease Status', freq: '100.0%', checked: true, cardTitle: 'Cancer Type Distribution' },
    { id: 'gene-panel', name: 'Gene Panel', freq: '100.0%', checked: true, cardTitle: 'Top Mutated Genes' },
    { id: 'genetic-ancestry', name: 'Genetic Ancestry', freq: '100.0%', checked: true },
    { id: 'hla-genotype', name: 'HLA Genotype Available', freq: '100.0%', checked: true },
    { id: 'samples-per-patient', name: 'Number of Samples Per Patient', freq: '100.0%', checked: true, cardTitle: 'Samples Per Patient' },
    { id: 'oncotree', name: 'Oncotree Code', freq: '100.0%', checked: false },
    { id: 'purity', name: 'Purity Estimate from Mutations', freq: '100.0%', checked: false },
    { id: 'coverage', name: 'Sample coverage', freq: '100.0%', checked: false },
    { id: 'sample-type', name: 'Sample Type', freq: '100.0%', checked: true },
    { id: 'somatic-status', name: 'Somatic Status', freq: '100.0%', checked: false },
    { id: 'tmb-score', name: 'TMB Score', freq: '99.9%', checked: true, cardTitle: 'Age at Diagnosis' }, // Mocking TMB to this card
  ]);

  const toggleChart = (id) => {
    setSelectedCharts(prev => prev.map(chart => 
      chart.id === id ? { ...chart, checked: !chart.checked } : chart
    ));
  };

  const selectAll = () => setSelectedCharts(prev => prev.map(c => ({ ...c, checked: true })));
  const deselectAll = () => setSelectedCharts(prev => prev.map(c => ({ ...c, checked: false })));

  const isVisible = (title) => {
    const chart = selectedCharts.find(c => c.cardTitle === title);
    return chart ? chart.checked : true; // Default to true if not mapped
  };
  return (
    <div className="flex-grow p-6 max-w-[1800px] mx-auto w-full flex flex-col animate-fade-in">
      
      {/* Header Section */}
      <div className="mb-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-60"></div>
        
        <button 
          onClick={onBack} 
          className="relative z-10 flex items-center text-xs font-semibold text-brand-600 mb-3 hover:text-brand-800 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5 transform group-hover:-translate-x-1 transition-transform" /> 
          Back to Study Selection
        </button>
        
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {study?.name || "Study Summary Dashboard"}
              </h1>
              <Badge variant="success">Verified Dataset</Badge>
            </div>
            <p className="text-sm text-slate-500 max-w-4xl leading-relaxed">
              This dataset includes somatic mutations, gene-level copy number alterations, structural variants in select genes, genome-wide allele-specific copy number, cancer cell fractions of mutations, and somatic/germline HLA Class I Genotype data.
            </p>
          </div>
          
          <div className="flex gap-3 shrink-0">
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand-500/50 transition-all shadow-sm">
              <Search className="w-4 h-4 text-slate-400 ml-3" />
              <input type="text" placeholder="Query gene symbols..." className="px-3 py-2 text-sm w-56 outline-none bg-transparent" />
              <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 text-sm font-semibold transition-colors">
                Query
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Actions */}
      <div className="flex items-center justify-between mb-6 border-b border-slate-200">
        <div className="flex space-x-1">
          {['Summary', 'Clinical Data', 'CN Segments', 'Analytics Beta'].map((tab, i) => (
            <button 
              key={tab} 
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                i === 0 
                  ? 'border-brand-600 text-brand-700' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-4 mb-2">
          <div className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="text-xs font-semibold text-slate-700">
              Selected: <span className="text-brand-600">48,179</span> patients | <span className="text-brand-600">54,331</span> samples
            </span>
          </div>
          <div className="flex space-x-2 relative">
            <div className="relative">
              <button 
                onClick={() => setShowChartsDropdown(!showChartsDropdown)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all text-sm font-semibold mr-2 shadow-md ${
                  showChartsDropdown 
                    ? 'bg-brand-700 text-white' 
                    : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-200'
                }`}
              >
                <BarChart2 className="w-4 h-4 mr-2" />
                Charts
                <ChevronRight className={`w-3 h-3 ml-2 transition-transform ${showChartsDropdown ? 'rotate-90' : ''}`} />
              </button>
              
              {showChartsDropdown && (
                <ChartsDropdown 
                  onClose={() => setShowChartsDropdown(false)} 
                  selectedItems={selectedCharts}
                  onToggleItem={toggleChart}
                  onSelectAll={selectAll}
                  onDeselectAll={deselectAll}
                />
              )}
            </div>
            {[Download, Share2, Settings].map((Icon, i) => (
              <button key={i} className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:shadow-sm text-slate-600 transition-all">
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-12 gap-6 pb-10">
        
        {/* Cancer Type Breakdown */}
        {isVisible('Cancer Type Distribution') && (
          <Card title="Cancer Type Distribution" action={<Filter className="w-4 h-4 text-slate-400 cursor-pointer hover:text-brand-600" />} className="col-span-12 md:col-span-4 h-80">
            <div className="flex-grow overflow-y-auto pr-2 space-y-3 scrollbar-hide">
              {[
                { label: 'Non-Small Cell Lung Cancer', count: 7867, freq: '14.5%', color: 'bg-brand-500' },
                { label: 'Breast Cancer', count: 6807, freq: '12.5%', color: 'bg-accent-500' },
                { label: 'Colorectal Cancer', count: 5277, freq: '9.7%', color: 'bg-orange-500' },
                { label: 'Prostate Cancer', count: 3324, freq: '6.1%', color: 'bg-green-500' },
                { label: 'Pancreatic Cancer', count: 2851, freq: '5.2%', color: 'bg-purple-500' },
              ].map((item, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">{item.label}</span>
                    <span className="text-slate-500">{item.count.toLocaleString()} ({item.freq})</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transform origin-left transition-transform duration-1000`} style={{ width: item.freq }}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Data Types Checklist */}
        <Card title="Available Data Modalities" className="col-span-12 md:col-span-4 h-80">
          <div className="space-y-4 mt-2">
            {['Mutations', 'Structural Variants', 'Copy Number Alterations'].map((dt, i) => (
              <label key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-brand-200 hover:bg-brand-50/50 cursor-pointer transition-colors">
                <div className="flex items-center">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 mr-3" />
                  <span className="text-sm font-medium text-slate-700">{dt}</span>
                </div>
                <Badge variant="default" className="text-xs">100%</Badge>
              </label>
            ))}
          </div>
        </Card>

        {/* Samples Per Patient (Donut Chart Mock) */}
        {isVisible('Samples Per Patient') && (
          <Card title="Samples Per Patient" className="col-span-12 md:col-span-4 h-80 flex flex-col items-center justify-center relative">
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* SVG Donut Mock */}
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-sm">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="15" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="25" className="transition-all duration-1000 ease-out" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f97316" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="240" className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-800 tracking-tighter">43.1K</span>
                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Patients</span>
              </div>
            </div>
            <div className="mt-6 flex gap-4 text-xs font-medium text-slate-600">
              <span className="flex items-center"><div className="w-3 h-3 rounded-sm bg-brand-500 mr-2 shadow-sm"></div> 1 Sample</span>
              <span className="flex items-center"><div className="w-3 h-3 rounded-sm bg-orange-500 mr-2 shadow-sm"></div> 2+ Samples</span>
            </div>
          </Card>
        )}

        {/* Mutated Genes Table */}
        {isVisible('Top Mutated Genes') && (
          <Card title="Top Mutated Genes" className="col-span-12 md:col-span-6 h-96">
            <div className="overflow-auto scrollbar-hide h-full">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 font-semibold rounded-tl-lg">Gene</th>
                    <th className="px-4 py-3 font-semibold text-right"># Mutations</th>
                    <th className="px-4 py-3 font-semibold text-right rounded-tr-lg">Frequency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { gene: 'TP53', count: 24541, freq: '45.2%', isActionable: true },
                    { gene: 'KRAS', count: 8917, freq: '16.4%', isActionable: true },
                    { gene: 'PIK3CA', count: 7636, freq: '14.1%', isActionable: true },
                    { gene: 'TERT', count: 7409, freq: '13.6%', isActionable: false },
                    { gene: 'APC', count: 6032, freq: '11.1%', isActionable: false },
                    { gene: 'ARID1A', count: 5343, freq: '9.8%', isActionable: false },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-4 py-3 font-medium text-brand-600 flex items-center">
                        <span className="hover:underline cursor-pointer">{row.gene}</span>
                        {row.isActionable && <span title="Actionable Target" className="ml-2 w-1.5 h-1.5 rounded-full bg-accent-500 inline-block"></span>}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-600 tabular-nums">{row.count.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">
                        <Badge variant="default" className="bg-white">{row.freq}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Age at Diagnosis (Bar Chart Mock) */}
        {isVisible('Age at Diagnosis') && (
          <Card title="Age at Diagnosis" className="col-span-12 md:col-span-6 h-96 flex flex-col">
            <div className="flex-grow flex items-end space-x-2 px-2 pt-8 relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pt-8 pb-6 px-2 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="border-b border-slate-100 w-full h-0"></div>
                ))}
              </div>
              
              {/* Bars */}
              {[30, 45, 60, 85, 120, 150, 180, 140, 110, 80, 50, 30].map((h, i) => (
                <div 
                  key={i} 
                  className="w-full bg-brand-500 hover:bg-brand-400 rounded-t-md transition-colors relative group z-10" 
                  style={{ height: `${h / 2}%` }}
                >
                  {/* Tooltip mock */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Count: {h * 100}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-3 font-medium px-2">
              <span>0</span>
              <span>20</span>
              <span>40</span>
              <span>60</span>
              <span>80</span>
              <span>100+</span>
            </div>
          </Card>
        )}

      </div>
    </div>
  );
};
