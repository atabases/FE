import React from 'react';

export const Card = ({ children, className = '', title, action }) => {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-soft transition-shadow duration-300 flex flex-col overflow-hidden ${className}`}>
      {(title || action) && (
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          {title && <h3 className="font-semibold text-slate-800 tracking-tight">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="flex-grow p-5 flex flex-col min-h-0">
        {children}
      </div>
    </div>
  );
};
