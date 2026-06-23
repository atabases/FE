import React, { useState } from 'react';
import { usePatientData } from '../hooks/usePatientData.js';
import { PatientMutationsTable } from '../components/charts/PatientMutationsTable.jsx';

export const PatientDetail = ({ patientId, onBack }) => {
  const { data, loading, error } = usePatientData(patientId);
  const [activeTab, setActiveTab] = useState('summary');

  if (loading) return <div className="p-10 text-center font-bold text-slate-500">Loading patient data...</div>;
  if (error) return <div className="p-10 text-center font-bold text-red-500">Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="flex-grow p-4 max-w-[1900px] mx-auto w-full flex flex-col bg-white min-h-screen">
      
      {/* Header */}
      <div className="mb-6 flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <button onClick={onBack} className="text-xs font-semibold text-brand-600 mb-2 hover:text-brand-800 transition-colors">
            ← Back to Dashboard
          </button>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{data.patientId}</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">{data.diagnosis}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('summary')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'summary'
                ? 'border-brand-500 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Summary
          </button>
          <button
            onClick={() => setActiveTab('pathways')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'pathways'
                ? 'border-brand-500 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Pathways
          </button>
          <button
            onClick={() => setActiveTab('clinical')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'clinical'
                ? 'border-brand-500 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Clinical Data
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-grow">
        {activeTab === 'summary' && (
          <PatientMutationsTable mutations={data.mutations} />
        )}
        {activeTab === 'pathways' && (
          <div className="p-8 text-center text-slate-500 border border-dashed border-slate-300 rounded-lg">
            Pathways view not implemented.
          </div>
        )}
        {activeTab === 'clinical' && (
          <div className="p-8 text-center text-slate-500 border border-dashed border-slate-300 rounded-lg">
            Clinical Data view not implemented.
          </div>
        )}
      </div>

    </div>
  );
};
