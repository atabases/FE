import React from 'react';
import { BookOpen, Mail } from 'lucide-react';

export const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      {/* We'll pass the Header in from App.jsx so it can control routing, or handle routing here later */}
      <div className="flex-grow flex flex-col">
        {children}
      </div>

      <footer className="bg-white border-t border-slate-200 px-6 py-5">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto text-xs text-slate-500">
          <div className="flex space-x-6">
            <a href="#" className="flex items-center hover:text-brand-600 transition-colors">
              <BookOpen className="w-4 h-4 mr-1.5" /> 
              Documentation
            </a>
            <a href="#" className="flex items-center hover:text-brand-600 transition-colors">
              <Mail className="w-4 h-4 mr-1.5" /> 
              Support
            </a>
          </div>
          <div className="bg-slate-100 px-4 py-1.5 rounded-full text-slate-600 font-medium border border-slate-200 shadow-sm">
            Amrita Databank - Next-Gen Cancer Genomics Portal
          </div>
        </div>
      </footer>
    </div>
  );
};
