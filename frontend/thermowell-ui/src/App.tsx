import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PublicLayout from './components/PublicLayout';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import HomePage from './pages/HomePage';
import { LoginPage } from './pages/auth';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Protected pages
import DashboardPage from './pages/DashboardPage';
import AdvisoryPage from './pages/AdvisoryPage';
import HealthScorePage from './pages/HealthScorePage';
import ResourcesPage from './pages/ResourcesPage';
import TipsPage from './pages/TipsPage';
import HelpPage from './pages/HelpPage';
import AlertsPage from './pages/AlertsPage';

// Fallback settings page (for backward compatibility)
import SettingsPage from './pages/SettingsPage';

// Import settings components
import SettingsLayout from './pages/settings/SettingsLayout';
import ProfileSettings from './pages/settings/ProfileSettings';
import NotificationSettings from './pages/settings/NotificationSettings';
import SecuritySettings from './pages/settings/SecuritySettings';

// Import PreferencesSettings component
// @ts-ignore - Force TypeScript to ignore this import if it's not being recognized
import PreferencesSettings from './pages/settings/PreferencesSettings';

// Import auth pages
import { RegisterPage, ForgotPasswordPage, ResetPasswordPage } from './pages/auth';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          }
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <AboutPage />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <ContactPage />
            </PublicLayout>
          }
        />
        <Route
          path="/auth/register"
          element={<RegisterPage />}
        />
        <Route
          path="/auth/forgot-password"
          element={<ForgotPasswordPage />}
        />
        <Route
          path="/auth/reset-password"
          element={<ResetPasswordPage />}
        />
        
        {/* Protected routes with authentication */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/advisories"
          element={
            <ProtectedRoute>
              <Layout>
                <AdvisoryPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/advisories/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <AdvisoryPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/health-score"
          element={
            <ProtectedRoute>
              <Layout>
                <HealthScorePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/resources"
          element={
            <ProtectedRoute>
              <Layout>
                <ResourcesPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tips"
          element={
            <ProtectedRoute>
              <Layout>
                <TipsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <Layout>
                <AlertsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        {/* Settings Routes - Separate Pages Architecture */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <SettingsLayout />
              </Layout>
            </ProtectedRoute>
          }
        >
          <Route index element={<ProfileSettings />} />
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="notifications" element={<NotificationSettings />} />
          <Route path="security" element={<SecuritySettings />} />
          <Route path="preferences" element={<PreferencesSettings />} />
        </Route>
        
        {/* Legacy single-page settings (fallback) */}
        <Route
          path="/settings-old"
          element={
            <ProtectedRoute>
              <Layout>
                <SettingsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/help"
          element={
            <ProtectedRoute>
              <Layout>
                <HelpPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        {/* Catch-all route redirects to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
