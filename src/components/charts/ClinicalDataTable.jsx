import React, { useState, useMemo } from 'react';
import { DownloadCloud, Search } from 'lucide-react';

export const ClinicalDataTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lower = searchTerm.toLowerCase();
    return data.filter(row => 
      Object.values(row).some(val => 
        String(val).toLowerCase().includes(lower)
      )
    );
  }, [data, searchTerm]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-200px)]">
      {/* Table Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-slate-200 bg-slate-50">
        <div className="text-sm font-semibold text-slate-700">
          {filteredData.length} results
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 bg-white transition-colors text-slate-600">
            <DownloadCloud className="w-4 h-4" />
          </button>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
          </div>
        </div>
      </div>

      {/* Table Data */}
      <div className="overflow-auto flex-grow">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-white sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-900 border-b border-slate-200">Patient ID</th>
              <th className="px-4 py-3 font-semibold text-slate-900 border-b border-slate-200">Sample ID</th>
              <th className="px-4 py-3 font-semibold text-slate-900 border-b border-slate-200">Mutation Count</th>
              <th className="px-4 py-3 font-semibold text-slate-900 border-b border-slate-200">Diagnosis Age</th>
              <th className="px-4 py-3 font-semibold text-slate-900 border-b border-slate-200">Sex</th>
              <th className="px-4 py-3 font-semibold text-slate-900 border-b border-slate-200">Ethnicity Category</th>
              <th className="px-4 py-3 font-semibold text-slate-900 border-b border-slate-200">Diagnosis</th>
              <th className="px-4 py-3 font-semibold text-slate-900 border-b border-slate-200">Immunohistochemistry</th>
              <th className="px-4 py-3 font-semibold text-slate-900 border-b border-slate-200">Stage</th>
              <th className="px-4 py-3 font-semibold text-slate-900 border-b border-slate-200">TMB (nonsynonymous)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 text-brand-600 font-medium cursor-pointer hover:underline">{row.patientId}</td>
                <td className="px-4 py-2.5 text-brand-600 cursor-pointer hover:underline">{row.sampleId}</td>
                <td className="px-4 py-2.5 text-slate-700">{row.mutationCount}</td>
                <td className="px-4 py-2.5 text-slate-700">{row.diagnosisAge ?? ''}</td>
                <td className="px-4 py-2.5 text-slate-700">{row.sex ?? ''}</td>
                <td className="px-4 py-2.5 text-slate-700">{row.ethnicityCategory ?? ''}</td>
                <td className="px-4 py-2.5 text-slate-700">{row.diagnosis ?? ''}</td>
                <td className="px-4 py-2.5 text-slate-700">{row.immunohistochemistry ?? ''}</td>
                <td className="px-4 py-2.5 text-slate-700">{row.stage ?? ''}</td>
                <td className="px-4 py-2.5 text-slate-700">{row.tmb !== null ? row.tmb : ''}</td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="10" className="px-4 py-8 text-center text-slate-500">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
