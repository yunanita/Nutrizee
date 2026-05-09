import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Insights } from './pages/Insights';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { LanguageProvider } from './contexts/LanguageContext';

import { NutritionData } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedResult, setSelectedResult] = useState<NutritionData | null>(null);

  const handleViewHistory = (data: NutritionData) => {
    setSelectedResult(data);
    setActiveTab('home');
  };

  return (
    <LanguageProvider>
      <Layout activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab);
        if (tab !== 'home') setSelectedResult(null);
      }}>
        {activeTab === 'home' && <Home initialResult={selectedResult} />}
        {activeTab === 'insights' && <Insights onViewHistory={handleViewHistory} />}
        {activeTab === 'about' && <About />}
        {activeTab === 'contact' && <Contact />}
        {activeTab === 'privacy' && <Privacy />}
        {activeTab === 'terms' && <Terms />}
      </Layout>
    </LanguageProvider>
  );
}
