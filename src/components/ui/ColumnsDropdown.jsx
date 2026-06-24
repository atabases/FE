import React from 'react';
import { Check } from 'lucide-react';

export const ColumnsDropdown = ({ columns, onToggle, onSelectAll, onClose }) => {
  return (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-slate-200 shadow-xl rounded-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="p-2 border-b border-slate-100 flex justify-between bg-slate-50">
        <button 
          onClick={(e) => { e.preventDefault(); onSelectAll(true); }}
          className="text-xs font-semibold text-brand-600 hover:text-brand-700 hover:bg-brand-50 px-2 py-1 rounded transition-colors"
        >
          Select All
        </button>
        <button 
          onClick={(e) => { e.preventDefault(); onSelectAll(false); }}
          className="text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200 px-2 py-1 rounded transition-colors"
        >
          Deselect All
        </button>
      </div>
      <div className="max-h-[300px] overflow-y-auto py-1">
        {columns.map((col) => (
          <label 
            key={col.id} 
            className="flex items-center px-4 py-2 hover:bg-slate-50 cursor-pointer transition-colors group"
          >
            <div 
              onClick={(e) => {
                e.preventDefault();
                onToggle(col.id);
              }}
              className={`w-4 h-4 rounded border flex items-center justify-center mr-3 transition-colors ${
                col.checked 
                  ? 'bg-brand-500 border-brand-500 text-white' 
                  : 'bg-white border-slate-300 group-hover:border-slate-400'
              }`}
            >
              {col.checked && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span className={`text-sm ${col.checked ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
              {col.name}
            </span>
          </label>
        ))}
      </div>
      <div className="p-2 bg-slate-50 border-t border-slate-100 flex justify-end">
        <button 
          onClick={onClose}
          className="px-3 py-1.5 text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white rounded transition-colors shadow-sm w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};
