import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AdvisoryPage from './pages/AdvisoryPage';
import HealthScorePage from './pages/HealthScorePage';
import ResourcesPage from './pages/ResourcesPage';
import TipsPage from './pages/TipsPage';
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/advisories" element={<AdvisoryPage />} />
      <Route path="/advisories/:id" element={<AdvisoryPage />} />
      <Route path="/health-score" element={<HealthScorePage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/tips" element={<TipsPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default App;
