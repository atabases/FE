import React, { useState } from 'react';
import { PageLayout } from './components/layout/PageLayout.jsx';
import { Header } from './components/layout/Header.jsx';
import { StudyExplorer } from './pages/StudyExplorer.jsx';
import { PatientDashboard } from './pages/PatientDashboard.jsx';
import { PatientDetail } from './pages/PatientDetail.jsx';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

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
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {currentPage === 'home' ? (
        <StudyExplorer onStudySelect={handleStudySelect} />
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
    </PageLayout>
  );
};

export default App;