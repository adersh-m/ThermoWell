# ThermoWell Application Architecture

This document provides an overview of the complete ThermoWell application architecture, focusing on the separation of public and authenticated experiences.

## Application Structure

```
ThermoWell Application
│
├── Public Area (PublicLayout)
│   ├── Home Page (/)
│   ├── About Page (/about)
│   ├── Contact Page (/contact)
│   └── Login Page (/login)
│
└── Authenticated Area (Layout with Sidebar)
    ├── Dashboard (/dashboard)
    ├── Advisories (/advisories)
    ├── Health Score (/health-score)
    ├── Resources (/resources)
    ├── Tips (/tips)
    ├── Alerts (/alerts)
    ├── Settings (/settings)
    │   ├── Profile (/settings/profile)
    │   ├── Notifications (/settings/notifications)
    │   ├── Security (/settings/security)
    │   └── Preferences (/settings/preferences)
    └── Help (/help)
```

## Authentication Architecture

The authentication architecture consists of these key components:

### 1. Authentication Context

```tsx
// AuthContext.tsx
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  // Authentication methods and state management
  // ...
}
```

### 2. Protected Routes

```tsx
// ProtectedRoute.tsx
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};
```

### 3. Route Organization

```tsx
// App.tsx
<AuthProvider>
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
    <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
    <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
    <Route path="/login" element={<LoginPage />} />
    
    {/* Protected routes */}
    <Route path="/dashboard" element={<ProtectedRoute><Layout><DashboardPage /></Layout></ProtectedRoute>} />
    {/* Additional protected routes... */}
  </Routes>
</AuthProvider>
```

## Layout Components

### 1. Public Layout

The `PublicLayout` component provides navigation for unauthenticated users:

- Logo/branding
- Navigation links to Home, About, Contact
- Login button
- Clean, minimal design without sidebar

### 2. Authenticated Layout

The `Layout` component provides the structure for authenticated users:

- Sidebar with application navigation
- Top bar with user profile and notifications
- Main content area

## Authentication Flow

1. User visits public pages (Home, About, Contact)
2. User clicks Login and enters credentials
3. After successful authentication:
   - JWT token stored in localStorage
   - User redirected to Dashboard
   - All protected routes become accessible
4. On logout:
   - Token removed from localStorage
   - User redirected to public Home
   - Protected routes become inaccessible

## Data Services

Services manage data communication and authentication:

```tsx
// UserService.ts
static async login(email: string, password: string): Promise<boolean> {
  try {
    // In a production environment, this would communicate with a backend API
    // For demo purposes, we simulate successful authentication
    localStorage.setItem('auth_token', 'simulated_jwt_token');
    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
}

static async isAuthenticated(): Promise<boolean> {
  const authToken = localStorage.getItem('auth_token');
  return !!authToken;
}

static logout(): void {
  localStorage.removeItem('auth_token');
}
```

## Component Relationship

This architecture ensures:

1. Clear separation between public and authenticated content
2. Consistent user experience based on authentication state
3. Protected sensitive features and user data
4. Seamless transition between public and authenticated areas
5. Appropriate layouts for different application sections
