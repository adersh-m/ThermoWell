import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PublicLayout from './components/PublicLayout';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

// Public pages
import HomePage from './pages/HomePage';
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage } from './pages/auth';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdvisoryPage from './pages/AdvisoryPage';
import HealthScorePage from './pages/HealthScorePage';
import ResourcesPage from './pages/ResourcesPage';
import TipsPage from './pages/TipsPage';
import HelpPage from './pages/HelpPage';
import AlertsPage from './pages/AlertsPage';
import TipDetailPage from './pages/TipDetailPage';

// Protected pages
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import SettingsPage from './pages/SettingsPage';
import SettingsLayout from './pages/settings/SettingsLayout';
import ProfileSettings from './pages/settings/ProfileSettings';
import NotificationSettings from './pages/settings/NotificationSettings';
import SecuritySettings from './pages/settings/SecuritySettings';
import PreferencesSettings from './pages/settings/PreferencesSettings';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Default route to HomePage */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

        {/* Public pages with Layout */}
        <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
        <Route path="/advisories" element={<Layout><AdvisoryPage /></Layout>} />
        <Route path="/advisories/:id" element={<Layout><AdvisoryPage /></Layout>} />
        <Route path="/health-score" element={<Layout><HealthScorePage /></Layout>} />
        <Route path="/resources" element={<Layout><ResourcesPage /></Layout>} />
        <Route path="/tips" element={<Layout><TipsPage /></Layout>} />
        <Route path="/alerts" element={<Layout><AlertsPage /></Layout>} />
        <Route path="/help" element={<Layout><HelpPage /></Layout>} />
        <Route path="/tips/:id" element={<Layout><TipDetailPage /></Layout>} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Layout><DashboardPage /></Layout></ProtectedRoute>} />

        {/* Settings Routes - Protected */}
        <Route path="/settings" element={<ProtectedRoute><Layout><SettingsLayout /></Layout></ProtectedRoute>}>
          <Route index element={<ProfileSettings />} />
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="notifications" element={<NotificationSettings />} />
          <Route path="security" element={<SecuritySettings />} />
          <Route path="preferences" element={<PreferencesSettings />} />
        </Route>

        {/* Legacy settings page - Protected */}
        <Route path="/settings-old" element={<ProtectedRoute><Layout><SettingsPage /></Layout></ProtectedRoute>} />

        {/* Admin page - Protected */}
        <Route path="/admin" element={<ProtectedRoute><Layout><AdminPage /></Layout></ProtectedRoute>} />

        {/* Catch-all route redirects to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
