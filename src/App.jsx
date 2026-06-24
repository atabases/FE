import React, { useState } from 'react';
import { PageLayout } from './components/layout/PageLayout.jsx';
import { Header } from './components/layout/Header.jsx';
import { StudyExplorer } from './pages/StudyExplorer.jsx';
import { PatientDashboard } from './pages/PatientDashboard.jsx';
import { PatientDetail } from './pages/PatientDetail.jsx';
import { UploadModal } from './components/UploadModal.jsx';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const handleStudySelect = (study) => {
    setSelectedStudy(study);
    setCurrentPage('details');
  };

  const handlePatientSelect = (patientId) => {
    setSelectedPatient(patientId);
    setCurrentPage('patient');
  };

  const handleBackToHome = () => {
    setSelectedStudy(null);
    setCurrentPage('home');
  };

  return (
    <PageLayout>
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        onUploadClick={() => setIsUploadModalOpen(true)}
      />
      
      {currentPage === 'home' ? (
        <StudyExplorer onStudySelect={handleStudySelect} refreshTrigger={refreshCounter} />
      ) : currentPage === 'patient' ? (
        <PatientDetail 
          patientId={selectedPatient} 
          onBack={() => setCurrentPage('details')} 
        />
      ) : (
        <PatientDashboard 
          study={selectedStudy} 
          onBack={handleBackToHome}
          onPatientSelect={handlePatientSelect}
        />
      )}

      {isUploadModalOpen && (
        <UploadModal 
          onClose={() => setIsUploadModalOpen(false)} 
          onSuccess={() => {
            setIsUploadModalOpen(false);
            setRefreshCounter(c => c + 1);
            setCurrentPage('home');
          }} 
        />
      )}
    </PageLayout>
  );
};

export default App;