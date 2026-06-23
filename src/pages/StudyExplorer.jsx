import React, { useState } from 'react';
import { Search, Info, BarChart3, BarChart2, ChevronRight, Database, ChevronDown } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { ColumnsDropdown } from '../components/ui/ColumnsDropdown.jsx';

const categories = [
  { id: 'Leukemia', label: 'Leukemia', count: 9 },
  { id: 'Pancreas', label: 'Pancreas', count: 1 },
  { id: 'Melanoma', label: 'Melanoma', count: 1 }
];

const studies = {
  Pancreas: [
    {
      id: 'paac_jhu_2014',
      name: 'Pancreatic Adenocarcinoma (JHU, 2014)',
      reference: 'Jiao et al. J Pathol 2014',
      samples: 24,
      all: 24,
      mutations: 24,
      cna: 0,
      rnaseq: 0,
      sv: 0,
      mrna: 0,
      mirna: 0,
      meth: 0,
      rppa: 0,
      protein: 0,
      complete: 0,
      treatment: 0
    }
  ],
  Melanoma: [
    {
      id: 'mel_tsam_liang_2017',
      name: 'Acral Melanoma (TGEN, Genome Res 2017)',
      reference: 'Liang et al. Genome Res 2017',
      samples: 34,
      all: 34,
      mutations: 34,
      cna: 34,
      rnaseq: 34,
      sv: 0,
      mrna: 0,
      mirna: 0,
      meth: 0,
      rppa: 0,
      protein: 0,
      complete: 0,
      treatment: 0
    }
  ],
  Leukemia: [
    {
      id: 'alal_target_gdc',
      name: 'Acute Leukemias of Ambiguous Lineage (TARGET GDC, 2025)',
      reference: 'Unknown',
      samples: 191,
      all: 191,
      mutations: 191,
      cna: 0,
      rnaseq: 191,
      sv: 0,
      mrna: 0,
      mirna: 0,
      meth: 0,
      rppa: 0,
      protein: 0,
      complete: 0,
      treatment: 0
    },
    {
      id: 'all_stjude_2015',
      name: 'Acute Lymphoblastic Leukemia (St Jude, Nat Genet 2015)',
      reference: 'Andersson et al. Nat Genet 2015',
      samples: 85,
      all: 85,
      mutations: 85,
      cna: 0,
      rnaseq: 0,
      sv: 0,
      mrna: 0,
      mirna: 0,
      meth: 0,
      rppa: 0,
      protein: 0,
      complete: 0,
      treatment: 0
    },
    {
      id: 'all_stjude_2016',
      name: 'Acute Lymphoblastic Leukemia (St Jude, Nat Genet 2016)',
      reference: 'Zhang et al. Nat Genet 2016',
      samples: 69,
      all: 69,
      mutations: 69,
      cna: 0,
      rnaseq: 0,
      sv: 0,
      mrna: 0,
      mirna: 0,
      meth: 0,
      rppa: 0,
      protein: 0,
      complete: 0,
      treatment: 0
    },
    {
      id: 'aml_ohsu_2018',
      name: 'Acute Myeloid Leukemia (OHSU, Nature 2018)',
      reference: 'Tyner et al. Nature 2018',
      samples: 562,
      all: 562,
      mutations: 562,
      cna: 0,
      rnaseq: 562,
      sv: 0,
      mrna: 0,
      mirna: 0,
      meth: 0,
      rppa: 0,
      protein: 0,
      complete: 0,
      treatment: 0
    },
    {
      id: 'aml_ohsu_2022',
      name: 'Acute Myeloid Leukemia (OHSU, Cancer Cell 2022)',
      reference: 'Bottomly et al. Cancer Cell 2022',
      samples: 805,
      all: 805,
      mutations: 805,
      cna: 0,
      rnaseq: 805,
      sv: 0,
      mrna: 0,
      mirna: 0,
      meth: 0,
      rppa: 0,
      protein: 0,
      complete: 0,
      treatment: 0
    },
    {
      id: 'aml_target_gdc',
      name: 'Acute Myeloid Leukemia (TARGET GDC, 2025)',
      reference: 'Unknown',
      samples: 2490,
      all: 2490,
      mutations: 2490,
      cna: 2490,
      rnaseq: 2490,
      sv: 0,
      mrna: 0,
      mirna: 0,
      meth: 0,
      rppa: 0,
      protein: 0,
      complete: 0,
      treatment: 0
    },
    {
      id: 'aml_tcga_gdc',
      name: 'Acute Myeloid Leukemia (TCGA GDC, 2025)',
      reference: 'Unknown',
      samples: 200,
      all: 200,
      mutations: 200,
      cna: 200,
      rnaseq: 200,
      sv: 0,
      mrna: 0,
      mirna: 0,
      meth: 0,
      rppa: 0,
      protein: 0,
      complete: 0,
      treatment: 0
    },
    {
      id: 'laml_tcga',
      name: 'Acute Myeloid Leukemia (TCGA, Firehose Legacy)',
      reference: 'Unknown',
      samples: 201,
      all: 201,
      mutations: 201,
      cna: 201,
      rnaseq: 201,
      sv: 0,
      mrna: 0,
      mirna: 0,
      meth: 0,
      rppa: 0,
      protein: 0,
      complete: 0,
      treatment: 0
    },
    {
      id: 'laml_tcga_pub',
      name: 'Acute Myeloid Leukemia (TCGA, NEJM 2013)',
      reference: 'TCGA, NEJM 2013',
      samples: 200,
      all: 200,
      mutations: 200,
      cna: 200,
      rnaseq: 200,
      sv: 0,
      mrna: 0,
      mirna: 0,
      meth: 0,
      rppa: 0,
      protein: 0,
      complete: 0,
      treatment: 0
    }
  ]
};

export const StudyExplorer = ({ onStudySelect }) => {
  const [activeTab, setActiveTab] = useState('query');
  const [selectedCategory, setSelectedCategory] = useState('Pancreas');
  const [searchQuery, setSearchQuery] = useState('');
  const [showColumnsDropdown, setShowColumnsDropdown] = useState(false);
  const [columns, setColumns] = useState([
    { id: 'name', name: 'Name', checked: true },
    { id: 'reference', name: 'Reference', checked: true },
    { id: 'all', name: 'All', checked: true },
    { id: 'mutations', name: 'Mutations', checked: true },
    { id: 'cna', name: 'CNA', checked: true },
    { id: 'rnaseq', name: 'RNA-Seq', checked: true },
    { id: 'sv', name: 'Structural Variants', checked: false },
    { id: 'mrna', name: 'Tumor mRNA (microarray)', checked: false },
    { id: 'mirna', name: 'Tumor miRNA', checked: false },
    { id: 'meth', name: 'Methylation (HM27)', checked: false },
    { id: 'rppa', name: 'RPPA', checked: false },
    { id: 'protein', name: 'Protein Mass Spectrometry', checked: false },
    { id: 'complete', name: 'Complete', checked: false },
    { id: 'treatment', name: 'Treatment Count', checked: false },
  ]);

  const toggleColumn = (id) => {
    setColumns(prev => prev.map(col => col.id === id ? { ...col, checked: !col.checked } : col));
  };

  const currentStudies = studies[selectedCategory] || studies.Pancreas;
  const filteredStudies = currentStudies.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeColumns = columns.filter(c => c.checked);

  return (
    <div className="flex-grow flex p-6 max-w-[1600px] mx-auto w-full gap-6">
      <div className="flex-grow flex flex-col overflow-hidden animate-fade-in">
        
        {/* Top Navigation Tabs */}
        <div className="flex mb-4">
          <button 
            onClick={() => setActiveTab('query')} 
            className={`px-6 py-2.5 text-sm font-semibold rounded-t-lg transition-colors ${
              activeTab === 'query' 
                ? 'bg-white text-brand-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] border-t-2 border-brand-500' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            Study Query
          </button>
          <button 
            onClick={() => setActiveTab('quick')} 
            className={`px-6 py-2.5 text-sm font-semibold rounded-t-lg transition-colors ml-1 ${
              activeTab === 'quick' 
                ? 'bg-white text-brand-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] border-t-2 border-brand-500' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            Quick Search
          </button>
        </div>

        <Card className="flex-grow shadow-glass border-slate-200/60 rounded-tl-none">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Select Studies for Analysis</h2>
              <p className="text-sm text-slate-500 mt-1">Browse and filter available genomic and clinical datasets.</p>
            </div>
            <Badge variant="primary" className="px-3 py-1 text-xs">
              {Object.values(studies).flat().length} total studies
            </Badge>
          </div>

          <div className="flex gap-6 flex-grow min-h-0">
            {/* Sidebar Categories */}
            <div className="w-72 flex flex-col gap-2 overflow-y-auto pr-2 scrollbar-hide">
              {categories.map((cat) => (
                <button 
                  key={cat.id} 
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                    selectedCategory === cat.id 
                      ? 'bg-brand-600 text-white shadow-md transform scale-[1.02]' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'
                  }`}
                >
                  <span className="font-medium">{cat.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    selectedCategory === cat.id 
                      ? 'bg-brand-500/50 text-white' 
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Main Study List */}
            <div className="flex-grow flex flex-col bg-slate-50 rounded-xl border border-slate-200/60 overflow-hidden shadow-inner relative">
              <div className="p-4 border-b border-slate-200/60 bg-white flex items-center justify-between gap-4">
                <div className="flex-grow max-w-md relative group">
                  <input 
                    type="text" 
                    placeholder="Search studies by name or author..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all" 
                  />
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                </div>
                
                <div className="relative">
                  <button 
                    onClick={() => setShowColumnsDropdown(!showColumnsDropdown)}
                    className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    Columns
                    <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showColumnsDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {showColumnsDropdown && (
                    <ColumnsDropdown 
                      columns={columns} 
                      onToggle={toggleColumn} 
                      onClose={() => setShowColumnsDropdown(false)} 
                    />
                  )}
                </div>
              </div>

              <div className="overflow-x-auto overflow-y-auto flex-grow bg-white">
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-slate-100/80 text-slate-700 sticky top-0 border-b border-slate-200 z-10 shadow-sm">
                    <tr>
                      {activeColumns.map((col) => (
                        <th key={col.id} className="px-2 py-2 font-semibold text-xs uppercase tracking-wide leading-tight">
                          {col.name}
                        </th>
                      ))}
                      <th className="px-2 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudies.map((study) => (
                      <tr 
                        key={study.id} 
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group"
                        onClick={() => onStudySelect(study)}
                      >
                        {activeColumns.map((col) => (
                          <td key={col.id} className="px-2 py-2 align-top">
                            {col.id === 'name' ? (
                              <span className="text-brand-600 font-medium group-hover:underline block max-w-[200px] break-words">
                                {study[col.id]}
                              </span>
                            ) : col.id === 'reference' ? (
                              <span className="text-slate-600 flex items-start">
                                <span className="text-brand-500 mr-1 text-lg leading-none mt-[-2px]">↓</span> 
                                <span className="max-w-[120px] break-words block">{study[col.id]}</span>
                              </span>
                            ) : (
                              <span className="text-slate-600 tabular-nums">{study[col.id]}</span>
                            )}
                          </td>
                        ))}
                        <td className="px-2 py-2 text-right align-top">
                          <button 
                            className="p-1 bg-brand-50 hover:bg-brand-100 rounded text-brand-700 transition-all shadow-sm border border-brand-100/50"
                            title="Analyze Study"
                            onClick={(e) => {
                              e.stopPropagation();
                              onStudySelect(study);
                            }}
                          >
                            <BarChart3 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredStudies.length === 0 && (
                      <tr>
                        <td colSpan={activeColumns.length + 1} className="text-center py-12 text-slate-500">
                          <Search className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                          <p>No studies found matching "{searchQuery}"</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
};
