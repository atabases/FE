import React, { useState, useRef } from 'react';
import { UploadCloud, X, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const UploadModal = ({ onClose, onSuccess }) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [studyId, setStudyId] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles) => {
    // Only accept .txt or .tsv files
    const validFiles = newFiles.filter(f => f.name.endsWith('.txt') || f.name.endsWith('.tsv') || f.name.endsWith('.csv'));
    
    // Check if we have the required files
    setFiles(prev => {
      const merged = [...prev, ...validFiles];
      // Keep unique by name
      const unique = Array.from(new Map(merged.map(item => [item.name, item])).values());
      return unique;
    });
    
    // Auto-fill study ID if not set
    if (!studyId && validFiles.length > 0) {
      setStudyId('custom_study_' + Math.floor(Math.random() * 1000));
    }
  };

  const removeFile = (name) => {
    setFiles(files.filter(f => f.name !== name));
  };

  const handleUpload = async () => {
    if (!studyId) {
      setError("Please provide a Study ID.");
      return;
    }
    if (files.length === 0) {
      setError("Please select files to upload.");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('study_id', studyId);
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const res = await fetch('http://localhost:8000/api/upload-study', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.detail || 'Upload failed');
      }

      onSuccess();
    } catch (err) {
      setError(err.message);
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <UploadCloud className="text-brand-600" />
            Upload Study Data
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Study ID</label>
            <input 
              type="text" 
              value={studyId}
              onChange={e => setStudyId(e.target.value)}
              placeholder="e.g. my_custom_study_2026"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
            />
            <p className="text-xs text-slate-500 mt-1">A unique identifier for this dataset (no spaces).</p>
          </div>

          <div 
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              dragActive ? 'border-brand-500 bg-brand-50' : 'border-slate-300 hover:border-brand-400 hover:bg-slate-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              webkitdirectory=""
              directory=""
              onChange={handleChange}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-2">
                <UploadCloud className="w-7 h-7" />
              </div>
              <p className="text-slate-700 font-medium text-lg">Drag & drop files or folders here</p>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Required files: <code className="bg-slate-100 px-1 py-0.5 rounded text-brand-700">data_clinical_patient.txt</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-brand-700">data_clinical_sample.txt</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-brand-700">data_mutations.txt</code>
              </p>
              <button 
                onClick={() => inputRef.current?.click()}
                className="mt-4 px-6 py-2 bg-white border border-slate-300 shadow-sm rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Browse Files
              </button>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Selected Files ({files.length})</h4>
              <ul className="space-y-2">
                {files.map((f, i) => (
                  <li key={i} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileText className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      <span className="text-sm font-medium text-slate-700 truncate">{f.name}</span>
                      <span className="text-xs text-slate-500 flex-shrink-0">{(f.size / 1024).toFixed(1)} KB</span>
                    </div>
                    <button onClick={() => removeFile(f.name)} className="text-slate-400 hover:text-red-500 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-700 break-words">{error}</div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
          <button 
            onClick={onClose}
            disabled={uploading}
            className="px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleUpload}
            disabled={uploading || files.length === 0}
            className="px-6 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors shadow-soft disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Start Upload
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
