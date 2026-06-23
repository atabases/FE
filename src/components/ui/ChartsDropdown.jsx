import React, { useState } from 'react';
import { Search, X, Check, Minus } from 'lucide-react';

export const ChartsDropdown = ({ onClose, selectedItems, onToggleItem, onSelectAll, onDeselectAll }) => {
  const [activeTab, setActiveTab] = useState('Clinical');
  const [searchQuery, setSearchQuery] = useState('');
  
  const tabs = [
    'Clinical', 'Genomic', 'Gene Specific', 'Custom Data', 
    'X vs Y Beta!', 'Arm-level CNA', 'Loh Hla', 'Mutational Signature'
  ];

  const filteredItems = selectedItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="absolute top-full right-0 mt-2 w-[600px] bg-white border border-slate-200 shadow-2xl rounded-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Tabs */}
      <div className="flex bg-slate-50 border-b border-slate-200 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab 
                ? 'bg-white border-brand-500 text-brand-700' 
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <button 
            onClick={onSelectAll}
            className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 rounded border border-slate-200 transition-colors"
          >
            Select all ({selectedItems.length})
          </button>
          <button 
            onClick={onDeselectAll}
            className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 rounded border border-slate-200 transition-colors"
          >
            Deselect all
          </button>
        </div>
        
        <div className="relative flex-grow max-w-xs">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all"
          />
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
        </div>
      </div>

      {/* List Header */}
      <div className="px-4 py-2 bg-slate-50/50 border-b border-slate-100 flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        <span>Name</span>
        <span>Freq</span>
      </div>

      {/* Items List */}
      <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
        {filteredItems.map((item) => (
          <label 
            key={item.id} 
            className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0 transition-colors group"
          >
            <div className="flex items-center">
              <div 
                onClick={(e) => {
                  e.preventDefault();
                  onToggleItem(item.id);
                }}
                className={`w-4 h-4 rounded border flex items-center justify-center mr-3 transition-colors ${
                  item.checked 
                    ? 'bg-brand-500 border-brand-500 text-white' 
                    : 'bg-white border-slate-300 group-hover:border-slate-400'
                }`}
              >
                {item.checked && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className={`text-sm ${item.checked ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                {item.name}
              </span>
            </div>
            <span className="text-xs text-slate-400 tabular-nums">{item.freq}</span>
          </label>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
        <button 
          onClick={onClose}
          className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={onClose}
          className="px-4 py-1.5 text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white rounded transition-colors shadow-sm"
        >
          Apply Selection
        </button>
      </div>
    </div>
  );
};

