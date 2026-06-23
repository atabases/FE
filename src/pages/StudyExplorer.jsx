import React, { useState } from 'react';
import { Search, Info, BarChart3, BarChart2, ChevronRight, Database } from 'lucide-react';
import { categories, studies } from '../data/mockData.js';
import { Card } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';

export const StudyExplorer = ({ onStudySelect }) => {
  const [activeTab, setActiveTab] = useState('query');
  const [selectedCategory, setSelectedCategory] = useState('PanCancer');
  const [searchQuery, setSearchQuery] = useState('');

  const currentStudies = studies[selectedCategory] || studies.PanCancer;
  const filteredStudies = currentStudies.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Badge variant="primary" className="px-3 py-1 text-xs">535 total studies</Badge>
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
            <div className="flex-grow flex flex-col bg-slate-50 rounded-xl border border-slate-200/60 overflow-hidden shadow-inner">
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
              </div>

              <div className="overflow-y-auto flex-grow p-5 space-y-3">
                {filteredStudies.map((study) => (
                  <div 
                    key={study.id} 
                    className="group bg-white border border-slate-200 rounded-lg p-4 hover:border-brand-300 hover:shadow-md transition-all duration-300 flex items-center cursor-pointer"
                    onClick={() => onStudySelect(study)}
                  >
                    <div className="flex-grow pr-4">
                      <h3 className="text-sm font-semibold text-slate-800 group-hover:text-brand-700 transition-colors">
                        {study.name}
                      </h3>
                      <div className="flex items-center mt-2 space-x-3">
                        <span className="text-xs text-slate-500 flex items-center">
                          <Database className="w-3.5 h-3.5 mr-1 text-brand-500" />
                          {study.samples.toLocaleString()} samples
                        </span>
                        <div className="flex space-x-1">
                          {study.dataTypes?.map(dt => (
                            <Badge key={dt} variant="default" className="text-[9px] px-1.5">{dt}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 transition-opacity duration-200">
                      <button 
                        className="p-2.5 bg-brand-50 hover:bg-brand-100 rounded-lg text-brand-700 transition-all flex items-center shadow-sm border border-brand-100/50"
                        title="Analyze Study"
                        onClick={(e) => {
                          e.stopPropagation();
                          onStudySelect(study);
                        }}
                      >
                        <BarChart3 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
                {filteredStudies.length === 0 && (
                  <div className="text-center py-12 text-slate-500">
                    <Search className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                    <p>No studies found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Sidebar - Suggested Queries */}
      <div className="w-80 flex flex-col gap-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
        <Card title="Quick Insights" className="shadow-glass border-slate-200/60 bg-gradient-to-b from-white to-slate-50/50">
          <ul className="text-xs space-y-3">
            {[
              "Primary vs. metastatic prostate cancer",
              "RAS/RAF alterations in colorectal cancer",
              "TP53 mutations across pediatric cohorts",
              "Compare survival in BRCA1/2 carriers"
            ].map((query, i) => (
              <li key={i} className="flex items-start group cursor-pointer">
                <ChevronRight className="w-4 h-4 mr-1 text-brand-400 group-hover:text-brand-600 transition-colors shrink-0" />
                <span className="text-slate-600 group-hover:text-brand-700 group-hover:underline leading-relaxed transition-colors">
                  {query}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};
