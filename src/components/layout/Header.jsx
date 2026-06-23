import React from 'react';
import { Database } from 'lucide-react';

export const Header = ({ currentPage, setCurrentPage }) => (
  <header className="glass-panel sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-gray-200/50">
    <div className="flex items-center space-x-8">
      <div 
        className="flex items-center space-x-3 cursor-pointer group" 
        onClick={() => setCurrentPage('home')}
      >
        <div className="w-9 h-9 bg-gradient-to-br from-brand-600 to-brand-800 rounded-lg flex items-center justify-center shadow-soft transform group-hover:scale-105 transition-transform duration-200">
          <span className="text-white font-bold text-lg italic">A</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-800 group-hover:text-brand-700 transition-colors">
          Amrita Databank
        </span>
      </div>

      <nav className="flex space-x-1 font-medium">
        <button 
          onClick={() => setCurrentPage('home')} 
          className={`px-4 py-2 rounded-md flex items-center transition-all duration-200 ${
            currentPage === 'home' 
              ? 'bg-brand-50 text-brand-700 shadow-sm' 
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          <Database className="w-4 h-4 mr-2" />
          Data Sets
        </button>
      </nav>
    </div>
  </header>
);
