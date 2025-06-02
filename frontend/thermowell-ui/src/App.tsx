import { Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AdvisoryPage from './pages/AdvisoryPage';
import HealthScorePage from './pages/HealthScorePage';
import ResourcesPage from './pages/ResourcesPage';
import TipsPage from './pages/TipsPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import AlertsPage from './pages/AlertsPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/advisories" element={<AdvisoryPage />} />
        <Route path="/advisories/:id" element={<AdvisoryPage />} />
        <Route path="/health-score" element={<HealthScorePage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/tips" element={<TipsPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
