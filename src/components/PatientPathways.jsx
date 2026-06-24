import React, { useState } from 'react';
import { Download, Maximize2, Info, Search as SearchIcon, FileImage } from 'lucide-react';

const PATHWAYS_DATA = [
  { id: 'WNT', name: 'WNT', altered: 'Yes', genes: 'DKK2' },
  { id: 'RTK-RAS', name: 'RTK-RAS', altered: 'Yes', genes: 'BRAF' },
  { id: 'PI3K', name: 'PI3K', altered: 'No', genes: '' },
  { id: 'NRF2', name: 'NRF2', altered: 'No', genes: '' },
  { id: 'NOTCH', name: 'NOTCH', altered: 'No', genes: '' },
  { id: 'MYC', name: 'MYC', altered: 'No', genes: '' },
  { id: 'HIPPO', name: 'HIPPO', altered: 'No', genes: '' },
  { id: 'Cell Cycle', name: 'Cell Cycle', altered: 'No', genes: '' },
  { id: 'TGF-Beta', name: 'TGF-Beta', altered: 'No', genes: '' },
  { id: 'TP53', name: 'TP53', altered: 'No', genes: '' },
];

export const PatientPathways = () => {
  const [selectedPathway, setSelectedPathway] = useState('WNT');
  const [showTcgaOnly, setShowTcgaOnly] = useState(true);

  return (
    <div className="flex flex-col h-full mt-4">
      
      {/* Top Toolbar */}
      <div className="flex justify-between items-center mb-4 px-2">
        <div className="flex gap-3 text-slate-700">
          <button className="hover:text-brand-600 transition-colors" title="Download PNG"><FileImage className="w-5 h-5" /></button>
          <button className="hover:text-brand-600 transition-colors font-bold text-sm tracking-tighter" title="Download SVG">SVG</button>
          <button className="hover:text-brand-600 transition-colors" title="Full Screen"><Maximize2 className="w-5 h-5" /></button>
          <button className="hover:text-brand-600 transition-colors" title="Information"><Info className="w-5 h-5" /></button>
        </div>
        <div className="font-bold text-slate-800 text-lg mr-6">
          {selectedPathway}
        </div>
      </div>

      <div className="flex gap-4 border border-brand-200 rounded-sm overflow-hidden h-[700px]">
        
        {/* Left: SVG Diagram */}
        <div className="w-3/4 relative bg-white border-r border-brand-200 flex items-center justify-center p-4 overflow-auto">
          {selectedPathway === 'WNT' ? (
            <img 
              src="/new-pathway.svg" 
              alt="WNT Pathway" 
              className="max-w-none max-h-none"
            />
          ) : (
            <div className="text-slate-400 font-medium">Pathway diagram not available for {selectedPathway}</div>
          )}
          
          {/* Zoom Controls Overlay */}
          <div className="absolute top-4 right-4 flex flex-col gap-1">
            <button className="w-8 h-8 bg-white border border-slate-300 rounded shadow-sm flex items-center justify-center hover:bg-slate-50">
              <span className="text-lg leading-none">+</span>
            </button>
            <button className="w-8 h-8 bg-white border border-slate-300 rounded shadow-sm flex items-center justify-center hover:bg-slate-50">
              <span className="text-lg leading-none">-</span>
            </button>
          </div>
        </div>

        {/* Right: Pathways List */}
        <div className="w-1/4 bg-white flex flex-col">
          {/* Toolbar */}
          <div className="flex items-center gap-2 p-3 border-b border-brand-100">
            <button className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 text-slate-600"><FileImage className="w-4 h-4" /></button>
            <button className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 text-slate-600"><Download className="w-4 h-4" /></button>
            <div className="relative flex-grow">
              <input type="text" className="w-full border border-slate-200 rounded pl-2 pr-8 py-1.5 text-sm focus:outline-none" />
              <SearchIcon className="w-4 h-4 absolute right-2 top-2 text-slate-400" />
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 px-3 py-2 border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 text-left">
            <div className="col-span-6">Pathway name</div>
            <div className="col-span-3">Pathway altered</div>
            <div className="col-span-3">Genes matched</div>
          </div>

          {/* Table Body */}
          <div className="overflow-y-auto flex-grow text-sm">
            {PATHWAYS_DATA.map((pw) => (
              <label 
                key={pw.id} 
                className={`grid grid-cols-12 gap-2 px-3 py-2 cursor-pointer border-b border-slate-100 hover:bg-slate-50 ${selectedPathway === pw.id ? 'bg-blue-50/50' : ''}`}
              >
                <div className="col-span-6 flex items-center gap-2 text-slate-800">
                  <input 
                    type="radio" 
                    name="pathway" 
                    checked={selectedPathway === pw.id}
                    onChange={() => setSelectedPathway(pw.id)}
                    className="mt-0.5 text-brand-600 focus:ring-brand-500"
                  />
                  <span className={selectedPathway === pw.id ? 'font-bold' : ''}>{pw.name}</span>
                </div>
                <div className="col-span-3 flex items-center text-slate-700">
                  {pw.altered}
                </div>
                <div className="col-span-3 flex items-center text-slate-500 text-xs">
                  {pw.genes}
                </div>
              </label>
            ))}
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-col items-center gap-2 text-sm text-slate-600">
            <div>Showing 1-10 of 10</div>
            <label className="flex items-center gap-2 cursor-pointer font-medium text-brand-700">
              <input 
                type="checkbox" 
                checked={showTcgaOnly}
                onChange={(e) => setShowTcgaOnly(e.target.checked)}
                className="rounded text-brand-600 focus:ring-brand-500"
              />
              Show TCGA PanCancer Atlas pathways only
            </label>
          </div>
        </div>

      </div>
    </div>
  );
};
