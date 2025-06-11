import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdvisoriesPage from './pages/AdvisoriesPage';
import AlertsPage from './pages/AlertsPage';
import TipsPage from './pages/TipsPage';
import TipDetailPage from './pages/TipDetailPage';
import ResourcesPage from './pages/ResourcesPage';
import SettingsPage from './pages/SettingsPage';
import DashboardPage from './pages/DashboardPage';
import HealthScorePage from './pages/HealthScorePage';
import HelpPage from './pages/HelpPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import AdminLayout from './components/layout/AdminLayout';
import AuthLayout from './components/layout/AuthLayout';
import PublicLayout from './components/layout/PublicLayout';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProtectedRoute from './routes/ProtectedRoute';
// import other pages as you build them...

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/advisories" element={<AdvisoriesPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/tips" element={<TipsPage />} />
        <Route path="/tips/:tipId" element={<TipDetailPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* other public routes */}


        <Route path="settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="health-score" element={<ProtectedRoute><HealthScorePage /></ProtectedRoute>} />
      </Route>

      {/* Auth */}
      <Route path="/auth" element={<AuthLayout />}>
        {/* Register, ForgotPassword, etc */}
        <Route index element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot" element={<ForgotPasswordPage />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminPage />} />
        {/* nested admin tabs later */}
      </Route>
      <Route path="*" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
