import React, { useState } from 'react';
import { PageLayout } from './components/layout/PageLayout.jsx';
import { Header } from './components/layout/Header.jsx';
import { StudyExplorer } from './pages/StudyExplorer.jsx';
import { PatientDashboard } from './pages/PatientDashboard.jsx';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedStudy, setSelectedStudy] = useState(null);

  const handleStudySelect = (study) => {
    setSelectedStudy(study);
    setCurrentPage('details');
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
      ) : (
        <PatientDashboard study={selectedStudy} onBack={handleBackToHome} />
      )}
    </PageLayout>
  );
};

export default App;