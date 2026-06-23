import React, { useState } from 'react';
import { Search, Target, Circle } from 'lucide-react';

const AnnotationCell = ({ annotation }) => {
  const [showPopover, setShowPopover] = useState(false);

  // Parse annotation
  const text = annotation || "";
  let type = "unknown";
  
  if (text.includes("Oncogenic") || text.includes("Resistance")) {
    type = "oncogenic";
  } else if (text.includes("Likely Neutral")) {
    type = "neutral";
  } else if (text.includes("Inconclusive")) {
    type = "inconclusive";
  } else if (text.includes("OncoKB: NA") || text === "None") {
    type = "vus";
  }

  const renderIcon = () => {
    switch (type) {
      case "oncogenic": return <Target className="w-5 h-5 text-blue-600" />;
      case "neutral": return <Target className="w-5 h-5 text-slate-500" />;
      case "inconclusive": return <Target className="w-5 h-5 text-slate-300" />;
      case "vus": return <Circle className="w-4 h-4 text-slate-600 border-2 rounded-full border-slate-600 bg-transparent" />;
      case "unknown":
      default: return <Circle className="w-4 h-4 text-slate-300 border-2 rounded-full border-slate-300 bg-transparent" />;
    }
  };

  return (
    <div 
      className="relative flex justify-center items-center cursor-pointer"
      onMouseEnter={() => setShowPopover(true)}
      onMouseLeave={() => setShowPopover(false)}
    >
      {renderIcon()}
      
      {showPopover && (
        <div className="absolute z-50 bottom-full mb-2 -ml-32 w-[400px] bg-white rounded shadow-xl border border-slate-200 text-left cursor-default">
          <div className="p-3 text-sm text-slate-700 border-b border-slate-200">
            <strong>OncoKB™</strong> is a precision oncology knowledge base...
          </div>
          <div className="flex border-b border-slate-200 text-sm font-medium">
            <div className="px-4 py-2 border-b-2 border-brand-500 text-brand-600">Oncogenic</div>
            <div className="px-4 py-2 text-slate-500">Therapeutic Levels</div>
          </div>
          <div className="p-2">
            <div className="flex text-xs font-semibold text-slate-500 border-b border-slate-100 pb-1 mb-1">
              <div className="w-16 text-center">Legend</div>
              <div>Description</div>
            </div>
            <div className="flex items-center text-sm py-1.5 hover:bg-slate-50">
              <div className="w-16 flex justify-center"><Target className="w-4 h-4 text-blue-600" /></div>
              <div className="text-slate-700">Oncogenic/Likely Oncogenic/Resistance</div>
            </div>
            <div className="flex items-center text-sm py-1.5 hover:bg-slate-50">
              <div className="w-16 flex justify-center"><Target className="w-4 h-4 text-slate-500" /></div>
              <div className="text-slate-700">Likely Neutral</div>
            </div>
            <div className="flex items-center text-sm py-1.5 hover:bg-slate-50">
              <div className="w-16 flex justify-center"><Target className="w-4 h-4 text-slate-300" /></div>
              <div className="text-slate-700">Inconclusive</div>
            </div>
            <div className="flex items-center text-sm py-1.5 hover:bg-slate-50">
              <div className="w-16 flex justify-center"><Circle className="w-3 h-3 text-slate-600 border-2 rounded-full border-slate-600" /></div>
              <div className="text-slate-700">VUS</div>
            </div>
            <div className="flex items-center text-sm py-1.5 hover:bg-slate-50">
              <div className="w-16 flex justify-center"><Circle className="w-3 h-3 text-slate-300 border-2 rounded-full border-slate-300" /></div>
              <div className="text-slate-700">Unknown</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
                <td className="px-4 py-3">
                  <AnnotationCell annotation={m.annotation} />
                </td>
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
