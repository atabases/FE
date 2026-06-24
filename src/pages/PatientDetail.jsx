import React, { useState } from 'react';
import { usePatientData } from '../hooks/usePatientData.js';
import { PatientMutationsTable } from '../components/charts/PatientMutationsTable.jsx';
import { PatientPathways } from '../components/PatientPathways.jsx';
import { User, DownloadCloud, Search } from 'lucide-react';

export const PatientDetail = ({ patientId, onBack }) => {
  const { data, loading, error } = usePatientData(patientId);
  const [activeTab, setActiveTab] = useState('summary');

  if (loading) return <div className="p-10 text-center font-bold text-slate-500">Loading patient data...</div>;
  if (error) return <div className="p-10 text-center font-bold text-red-500">Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="flex-grow p-4 max-w-[1900px] mx-auto w-full flex flex-col bg-white min-h-screen">
      
      {/* Header */}
      <div className="mb-6 border-b border-slate-200 pb-4">
        <button onClick={onBack} className="text-xs font-semibold text-brand-600 mb-4 hover:text-brand-800 transition-colors">
          ← Back to Dashboard
        </button>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-slate-800 text-white rounded-full">
              <User className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center text-sm mb-1 text-slate-700">
                <span className="font-semibold w-20">Patient:</span>
                <span className="text-brand-600 font-semibold mr-1">{data.patientId},</span>
                <span>{data.sex}, {data.diagnosisAge} years old, {data.samples?.[0]?.cancerType} ({data.samples?.[0]?.cancerTypeDetailed})</span>
              </div>
              <div className="flex items-center text-sm text-slate-700">
                <span className="font-semibold w-20">Samples:</span>
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 bg-slate-800 text-white text-xs font-bold flex items-center justify-center rounded-full">
                    {data.samples?.length || 1}
                  </div>
                  <span className="text-brand-600 font-semibold">{data.samples?.[0]?.sampleId || data.patientId}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-sm text-brand-600 text-right">
            {data.samples?.[0]?.cancerTypeDetailed}
          </div>
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
          <PatientPathways />
        )}
        {activeTab === 'clinical' && (
          <div className="bg-white">
            <div className="flex items-center justify-between py-2 border-b border-brand-200 mb-2 mt-4">
              <h3 className="text-lg text-brand-600">Patient</h3>
              <div className="flex gap-2">
                <button className="p-1.5 border border-slate-200 rounded text-slate-600 hover:bg-slate-50"><DownloadCloud className="w-4 h-4"/></button>
                <div className="relative">
                  <input type="text" className="border border-slate-200 rounded pl-2 pr-8 py-1.5 w-48 text-sm focus:outline-none" />
                  <Search className="w-4 h-4 absolute right-2 top-2 text-slate-400" />
                </div>
              </div>
            </div>
            <table className="w-full text-sm text-left mb-8">
              <thead className="bg-slate-50 border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-4 font-bold text-slate-800 w-1/2">Attribute</th>
                  <th className="py-2.5 px-4 font-bold text-slate-800 w-1/2">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50"><td className="py-2 px-4 text-slate-700">Diagnosis</td><td className="py-2 px-4 text-slate-900">{data.diagnosis}</td></tr>
                <tr className="hover:bg-slate-50"><td className="py-2 px-4 text-slate-700">Diagnosis Age</td><td className="py-2 px-4 text-slate-900">{data.diagnosisAge}</td></tr>
                <tr className="hover:bg-slate-50"><td className="py-2 px-4 text-slate-700">Ethnicity Category</td><td className="py-2 px-4 text-slate-900">{data.ethnicityCategory}</td></tr>
                <tr className="hover:bg-slate-50"><td className="py-2 px-4 text-slate-700">Number of Samples Per Patient</td><td className="py-2 px-4 text-slate-900">{data.samples?.length || 1}</td></tr>
                <tr className="hover:bg-slate-50"><td className="py-2 px-4 text-slate-700">Sex</td><td className="py-2 px-4 text-slate-900">{data.sex}</td></tr>
                <tr className="hover:bg-slate-50"><td className="py-2 px-4 text-slate-700">Stage</td><td className="py-2 px-4 text-slate-900">{data.stage}</td></tr>
              </tbody>
            </table>

            <div className="flex items-center justify-between py-2 border-b border-brand-200 mb-2 mt-8">
              <h3 className="text-lg text-brand-600">Samples</h3>
              <div className="flex gap-2">
                <button className="p-1.5 border border-slate-200 rounded text-slate-600 hover:bg-slate-50"><DownloadCloud className="w-4 h-4"/></button>
                <div className="relative">
                  <input type="text" className="border border-slate-200 rounded pl-2 pr-8 py-1.5 w-48 text-sm focus:outline-none" />
                  <Search className="w-4 h-4 absolute right-2 top-2 text-slate-400" />
                </div>
              </div>
            </div>
            <table className="w-full text-sm text-left mb-8">
              <thead className="bg-slate-50 border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-4 font-bold text-slate-800 w-1/2">Attribute</th>
                  <th className="py-2.5 px-4 font-bold text-slate-900 w-1/2">{data.samples?.[0]?.sampleId || data.patientId}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50"><td className="py-2 px-4 text-slate-700">Mutation Count</td><td className="py-2 px-4 text-slate-900">{data.samples?.[0]?.mutationCount}</td></tr>
                <tr className="hover:bg-slate-50"><td className="py-2 px-4 text-slate-700">Cancer Type</td><td className="py-2 px-4 text-slate-900">{data.samples?.[0]?.cancerType}</td></tr>
                <tr className="hover:bg-slate-50"><td className="py-2 px-4 text-slate-700">Cancer Type Detailed</td><td className="py-2 px-4 text-slate-900">{data.samples?.[0]?.cancerTypeDetailed}</td></tr>
                <tr className="hover:bg-slate-50"><td className="py-2 px-4 text-slate-700">Immunohistochemistry</td><td className="py-2 px-4 text-slate-900">{data.samples?.[0]?.immunohistochemistry}</td></tr>
                <tr className="hover:bg-slate-50"><td className="py-2 px-4 text-slate-700">Oncotree Code</td><td className="py-2 px-4 text-slate-900">{data.samples?.[0]?.oncotreeCode}</td></tr>
                <tr className="hover:bg-slate-50"><td className="py-2 px-4 text-slate-700">Somatic Status</td><td className="py-2 px-4 text-slate-900">{data.samples?.[0]?.somaticStatus}</td></tr>
                <tr className="hover:bg-slate-50"><td className="py-2 px-4 text-slate-700">TMB (nonsynonymous)</td><td className="py-2 px-4 text-slate-900">{data.samples?.[0]?.tmb}</td></tr>
              </tbody>
            </table>
            
            <h3 className="text-lg text-brand-600 mb-4 mt-8">Timeline Data</h3>
          </div>
        )}
      </div>

    </div>
  );
};
