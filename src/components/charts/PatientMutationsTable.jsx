import React, { useState } from 'react';
import { Search } from 'lucide-react';

export const PatientMutationsTable = ({ mutations }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMutations = mutations?.filter(m => 
    m.gene.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between py-4">
        <h3 className="text-lg font-semibold text-slate-800">
          {filteredMutations.length} Mutations
        </h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 border border-slate-200 rounded text-sm w-64 focus:outline-none focus:border-brand-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto border border-slate-200 rounded-t-lg">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-900">Gene</th>
              <th className="px-4 py-3 font-semibold text-slate-900">Protein Change</th>
              <th className="px-4 py-3 font-semibold text-slate-900 text-center">Annotation</th>
              <th className="px-4 py-3 font-semibold text-slate-900">Mutation Type</th>
              <th className="px-4 py-3 font-semibold text-slate-900">Cohort</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredMutations.map((m, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-slate-700">{m.gene}</td>
                <td className="px-4 py-3 text-slate-700 font-medium italic">{m.proteinChange}</td>
                <td className="px-4 py-3 text-center text-slate-400">{m.annotation}</td>
                <td className="px-4 py-3 text-brand-600 font-medium">{m.mutationType}</td>
                <td className="px-4 py-3 text-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-2 bg-slate-200 rounded overflow-hidden">
                      <div className="h-full bg-green-500" style={{width: '20%'}}></div>
                    </div>
                    {m.cohort}
                  </div>
                </td>
              </tr>
            ))}
            {filteredMutations.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-slate-500">
                  No mutations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
