import React, { useState, useMemo } from 'react';
import {
  Search,
  Info,
  ChevronRight,
  Database,
  BarChart3,
  ExternalLink,
  BookOpen,
  Mail,
  MapPin,
  Globe,
  LayoutGrid,
  ArrowLeft,
  Download,
  Settings,
  Filter,
  Share2
} from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [activeTab, setActiveTab] = useState('query');
  const [selectedCategory, setSelectedCategory] = useState('PanCancer');

  const categories = [
    { id: 'PanCancer', label: 'PanCancer Studies', count: 12 },
    { id: 'Pediatric', label: 'Pediatric Cancer Studies', count: 17 },
    { id: 'Immunogenomic', label: 'Immunogenomic Studies', count: 17 },
    { id: 'CellLines', label: 'Cell lines', count: 5 },
    { id: 'Healthy', label: 'PreCancerous/Healthy Studies', count: 5 },
    { id: 'Adrenal', label: 'Adrenal Gland', count: 3 },
    { id: 'Biliary', label: 'Biliary Tract', count: 16 },
    { id: 'Bladder', label: 'Bladder/Urinary Tract', count: 27 },
    { id: 'Bone', label: 'Bone', count: 1 },
    { id: 'Breast', label: 'Breast', count: 36 },
  ];

  const studies = {
    PanCancer: [
      { id: 1, name: "MSK-IMPACT 50K Clinical Sequencing Cohort (MSK, Cancer Cell 2024)", samples: 54331 },
      { id: 2, name: "MSK-CHORD (MSK, Nature 2024)", samples: 25040 },
      { id: 3, name: "MSK-IMPACT Clinical Sequencing Cohort (MSK, Nat Med 2017)", samples: 10945 },
      { id: 4, name: "Metastatic Solid Cancers (UMich, Nature 2017)", samples: 500 },
      { id: 5, name: "MSS Mixed Solid Tumors (Broad/Dana-Farber, Nat Genet 2018)", samples: 249 }
    ],
    Pediatric: [
      { id: 10, name: "Pediatric Preclinical Testing Consortium (CHOP, Cell Rep 2019)", samples: 261 },
      { id: 11, name: "Pediatric Acute Lymphoid Leukemia - Phase II (TARGET, 2018)", samples: 1978 },
      { id: 12, name: "Pediatric Rhabdoid Tumor (TARGET, 2018)", samples: 72 }
    ]
  };

  const handleStudyClick = (study) => {
    setSelectedStudy(study);
    setCurrentPage('details');
  };

  // --- SUB-COMPONENTS ---

  const Header = () => (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="w-8 h-8 bg-red-700 rounded flex items-center justify-center text-white font-bold italic">A</div>
          <span className="text-xl font-bold tracking-tight text-gray-900">Amrita Databank</span>
        </div>

        <nav className="flex space-x-6 text-sm font-medium">
          <button onClick={() => setCurrentPage('home')} className={`pb-3 mt-3 flex items-center ${currentPage === 'home' ? 'text-red-700 border-b-2 border-red-700' : 'text-gray-500'}`}>
            <Database className="w-4 h-4 mr-1.5" />
            Data Sets
          </button>
          <button className="text-gray-500 hover:text-red-700 pb-3 mt-3 flex items-center transition-colors">
            <BarChart3 className="w-4 h-4 mr-1.5" />
            Visualizations
          </button>
        </nav>
      </div>
      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded text-sm font-medium transition-colors">Login</button>
    </header>
  );

  const HomeView = () => (
    <main className="flex-grow flex p-6 max-w-[1600px] mx-auto w-full gap-6">
      <div className="flex-grow bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col overflow-hidden">
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button onClick={() => setActiveTab('query')} className={`px-6 py-3 text-sm font-medium ${activeTab === 'query' ? 'bg-white border-t-2 border-t-red-700 border-x border-x-gray-200 -mb-[1px]' : 'text-gray-500'}`}>Query</button>
          <button onClick={() => setActiveTab('quick')} className={`px-6 py-3 text-sm font-medium ${activeTab === 'quick' ? 'bg-white border-t-2 border-t-red-700 border-x border-x-gray-200 -mb-[1px]' : 'text-gray-500'}`}>Quick Search</button>
        </div>

        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-700">Select Studies for Visualization & Analysis</h2>
            <span className="text-sm text-red-700 font-medium bg-red-50 px-3 py-1 rounded-full">535 studies available</span>
          </div>

          <div className="flex gap-6 flex-grow min-h-0">
            <div className="w-64 border border-gray-200 rounded overflow-y-auto bg-gray-50">
              {categories.map((cat) => (
                <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-xs text-left border-b border-gray-200 transition-colors ${selectedCategory === cat.id ? 'bg-red-700 text-white' : 'hover:bg-gray-100 text-gray-600'}`}>
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${selectedCategory === cat.id ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{cat.count}</span>
                </button>
              ))}
            </div>

            <div className="flex-grow flex flex-col border border-gray-200 rounded bg-white">
              <div className="p-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between gap-4">
                <div className="flex-grow max-w-xs relative">
                  <input type="text" placeholder="Search studies..." className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded" />
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-gray-400" />
                </div>
              </div>

              <div className="overflow-y-auto flex-grow p-4">
                <h3 className="text-sm font-bold text-gray-800 mb-4">{selectedCategory} Studies</h3>
                <div className="space-y-2">
                  {(studies[selectedCategory] || studies.PanCancer).map((study) => (
                    <div key={study.id} className="flex items-center group p-1.5 hover:bg-red-50 rounded transition-colors border border-transparent">
                      <input type="checkbox" className="w-4 h-4 text-red-700 rounded border-gray-300" />
                      <label className="ml-3 text-xs text-gray-700 cursor-pointer flex-grow font-medium">{study.name}</label>
                      <span className="text-[10px] text-gray-500 mr-4 tabular-nums">{study.samples.toLocaleString()} samples</span>
                      <div className="flex space-x-2">
                        <button
                          title="View clinical and genomic data"
                          onClick={() => handleStudyClick(study)}
                          className="p-1 hover:bg-red-200 rounded text-red-700 transition-colors"
                        >
                          <BarChart3 className="w-4 h-4" />
                        </button>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar (simplified for brevity) */}
      <div className="w-72 flex flex-col gap-4">
        <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
          <h3 className="font-bold text-sm mb-3">Example Queries</h3>
          <ul className="text-[11px] space-y-2 text-blue-600">
            <li className="cursor-pointer hover:underline">• Primary vs. metastatic prostate cancer</li>
            <li className="cursor-pointer hover:underline">• RAS/RAF alterations in colorectal cancer</li>
          </ul>
        </div>
      </div>
    </main>
  );

  const DetailView = () => (
    <main className="flex-grow p-4 max-w-[1800px] mx-auto w-full bg-white">
      {/* Study Header Information */}
      <div className="mb-4">
        <button onClick={() => setCurrentPage('home')} className="flex items-center text-xs text-blue-600 mb-2 hover:underline">
          <ArrowLeft className="w-3 h-3 mr-1" /> Back to Study Selection
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-blue-900">{selectedStudy?.name || "Study Summary Dashboard"}</h1>
            <p className="text-[11px] text-gray-600 max-w-4xl mt-1 leading-relaxed">
              This dataset includes somatic mutations, gene-level copy number alterations, structural variants in select genes, genome-wide allele-specific copy number, cancer cell fractions of mutations, and somatic/germline HLA Class I Genotype data.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden text-[11px]">
              <input type="text" placeholder="Enter gene symbols..." className="px-3 py-1.5 w-48 outline-none" />
              <button className="bg-blue-600 text-white px-3 py-1.5 font-bold">Query</button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail View Tabs */}
      <div className="flex border-b border-gray-200 mb-4 text-xs font-medium">
        {['Summary', 'Clinical Data', 'CN Segments', 'Plots Beta!'].map((tab, i) => (
          <button key={tab} className={`px-4 py-2 border-b-2 ${i === 0 ? 'border-red-700 text-red-700' : 'border-transparent text-gray-500'}`}>
            {tab}
          </button>
        ))}
        <div className="ml-auto flex items-center space-x-3 text-[11px] text-gray-500">
          <span className="font-bold text-gray-800">Selected: 48,179 patients | 54,331 samples</span>
          <div className="flex space-x-1">
            <button className="p-1 border border-gray-200 rounded hover:bg-gray-50"><Download className="w-3.5 h-3.5" /></button>
            <button className="p-1 border border-gray-200 rounded hover:bg-gray-50"><Share2 className="w-3.5 h-3.5" /></button>
            <button className="p-1 border border-gray-200 rounded hover:bg-gray-50"><Settings className="w-3.5 h-3.5" /></button>
          </div>
          <button className="bg-blue-600 text-white px-3 py-1 rounded">Charts</button>
        </div>
      </div>

      {/* Dashboard Grid - Replicating Image 386771 */}
      <div className="grid grid-cols-12 gap-4">

        {/* Row 1: Cancer Type and Data Types */}
        <div className="col-span-3 border border-gray-200 rounded p-3 h-64 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-[11px] font-bold">Cancer Type</h4>
            <Filter className="w-3 h-3 text-gray-400" />
          </div>
          <div className="flex-grow overflow-y-auto space-y-1">
            {[
              { label: 'Non-Small Cell Lung Cancer', count: 7867, freq: '14.5%' },
              { label: 'Breast Cancer', count: 6807, freq: '12.5%' },
              { label: 'Colorectal Cancer', count: 5277, freq: '9.7%' },
              { label: 'Prostate Cancer', count: 3324, freq: '6.1%' },
              { label: 'Pancreatic Cancer', count: 2851, freq: '5.2%' },
            ].map((item, i) => (
              <div key={i} className="flex items-center text-[10px] py-0.5 border-b border-gray-50 last:border-0">
                <div className={`w-2 h-2 rounded-full mr-2 ${['bg-blue-500', 'bg-red-500', 'bg-orange-500', 'bg-green-500', 'bg-purple-500'][i]}`}></div>
                <span className="flex-grow truncate">{item.label}</span>
                <span className="text-gray-400 w-12 text-right">{item.count.toLocaleString()}</span>
                <span className="text-gray-400 w-12 text-right">{item.freq}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-3 border border-gray-200 rounded p-3 h-64">
          <h4 className="text-[11px] font-bold mb-2">Data Types</h4>
          <div className="space-y-1.5">
            {['Mutations', 'Structural Variants', 'Copy Number Alterations'].map((dt, i) => (
              <div key={i} className="flex items-center text-[10px] justify-between">
                <div className="flex items-center">
                  <input type="checkbox" checked readOnly className="mr-2" />
                  <span>{dt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>54,331</span>
                  <span className="text-gray-400">100%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-3 border border-gray-200 rounded p-3 h-64 flex flex-col items-center">
          <h4 className="text-[11px] font-bold w-full text-left mb-2">Number of Samples Per Patient</h4>
          <div className="flex-grow flex items-center justify-center relative w-full">
            <div className="w-32 h-32 rounded-full border-[15px] border-blue-500 relative flex items-center justify-center">
              <div className="absolute top-0 right-0 w-8 h-8 bg-orange-400 rounded-full border-2 border-white -mr-2"></div>
              <span className="text-xs font-bold">43.1K</span>
            </div>
          </div>
        </div>

        <div className="col-span-3 border border-gray-200 rounded p-3 h-64">
          <h4 className="text-[11px] font-bold mb-2">Mutation Count vs Fraction Altered</h4>
          <div className="w-full h-44 bg-gray-50 border border-gray-100 relative rounded">
            {/* Mock Scatter Plot */}
            {[...Array(50)].map((_, i) => (
              <div key={i}
                className="absolute rounded-full bg-purple-700 opacity-60"
                style={{
                  width: '3px', height: '3px',
                  left: `${Math.random() * 90}%`,
                  bottom: `${Math.random() * 90}%`
                }}
              />
            ))}
            <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gray-300"></div>
            <div className="absolute left-0 top-0 h-full w-[1px] bg-gray-300"></div>
          </div>
          <p className="text-[9px] mt-2 text-center text-gray-400">Fraction Genome Altered</p>
        </div>

        {/* Row 2: Genes and Bar Charts */}
        <div className="col-span-3 border border-gray-200 rounded p-3 h-80 flex flex-col">
          <h4 className="text-[11px] font-bold mb-2">Mutated Genes</h4>
          <div className="flex-grow overflow-y-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-1 font-semibold">Gene</th>
                  <th className="text-right py-1"># Mut</th>
                  <th className="text-right py-1">Freq</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { gene: 'TP53', count: 24541, freq: '45.2%' },
                  { gene: 'KRAS', count: 8917, freq: '16.4%' },
                  { gene: 'PIK3CA', count: 7636, freq: '14.1%' },
                  { gene: 'TERT', count: 7409, freq: '13.6%' },
                  { gene: 'APC', count: 6032, freq: '11.1%' },
                  { gene: 'ARID1A', count: 5343, freq: '9.8%' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-1 text-blue-600 font-medium">{row.gene}</td>
                    <td className="py-1 text-right">{row.count.toLocaleString()}</td>
                    <td className="py-1 text-right">{row.freq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-3 border border-gray-200 rounded p-3 h-80">
          <h4 className="text-[11px] font-bold mb-2">Age at Diagnosis</h4>
          <div className="flex items-end space-x-1 h-48 border-b border-gray-200 px-2 pt-4">
            {[30, 45, 60, 85, 120, 150, 180, 140, 110, 80, 50, 30].map((h, i) => (
              <div key={i} className="bg-blue-600 w-full rounded-t" style={{ height: `${h / 2}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between text-[9px] text-gray-400 mt-1">
            <span>0</span><span>40</span><span>80</span><span>100+</span>
          </div>
        </div>

        <div className="col-span-3 border border-gray-200 rounded p-3 h-80 flex flex-col items-center">
          <h4 className="text-[11px] font-bold mb-2 w-full">Sex</h4>
          <div className="flex-grow flex items-center justify-center w-full relative">
            <div className="w-32 h-32 rounded-full border-[20px] border-blue-500 relative">
              <div className="absolute inset-0 rounded-full border-[20px] border-pink-400" style={{ clipPath: 'inset(0 50% 0 0)' }}></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
              <div className="flex flex-col items-center">
                <span className="text-blue-600">21.7K</span>
                <span className="text-pink-600">26.2K</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-2 text-[10px]">
            <span className="flex items-center"><div className="w-2 h-2 bg-blue-500 mr-1"></div> Male</span>
            <span className="flex items-center"><div className="w-2 h-2 bg-pink-400 mr-1"></div> Female</span>
          </div>
        </div>

        <div className="col-span-3 border border-gray-200 rounded p-3 h-80">
          <h4 className="text-[11px] font-bold mb-2">Mutation Count</h4>
          <div className="flex items-end space-x-1 h-48 border-b border-gray-200 px-2 pt-4">
            {[10, 20, 35, 70, 120, 180, 150, 100, 80, 60, 40, 20].map((h, i) => (
              <div key={i} className="bg-blue-500 w-full rounded-t" style={{ height: `${h / 2}%` }}></div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
      <Header />
      {currentPage === 'home' ? <HomeView /> : <DetailView />}

      <footer className="bg-gray-100 border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto text-[11px] text-gray-500">
          <div className="flex space-x-6">
            <span className="flex items-center"><BookOpen className="w-3.5 h-3.5 mr-1" /> Documentation</span>
            <span className="flex items-center"><Mail className="w-3.5 h-3.5 mr-1" /> Support</span>
          </div>
          <div className="bg-white border border-gray-200 px-3 py-1 rounded text-gray-600 font-medium">
            Amrita Databank - Cancer Genomics Research Portal
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;