# ThermoWell - Comprehensive Heatwave Safety Application

ThermoWell is a heatwave safety and monitoring application designed to protect users during extreme heat conditions by providing real-time alerts, health advisories, safety resources, and personalized recommendations.

## Table of Contents

- [Application Overview](#application-overview)
- [Pages and Features](#pages-and-features)
- [Authentication Architecture](#authentication-architecture)
- [Settings Architecture](#settings-architecture)
- [UI Standardization](#ui-standardization)
- [Visual Design](#visual-design)
- [User Journey Documentation](#user-journey-documentation)
- [Additional Documentation](#additional-documentation)
- [Deployment](#deployment)
- [Technical Setup](#technical-setup)

## Application Overview

ThermoWell provides a comprehensive platform for heatwave protection with these core advantages:

### For End Users
- **Comprehensive Safety**: All-in-one platform for heatwave protection and emergency preparedness
- **Personalized Experience**: Tailored recommendations based on individual risk factors and location
- **Real-time Awareness**: Instant alerts and updates about changing heat conditions
- **Easy Access**: Intuitive navigation and mobile-friendly design for quick information access
- **Offline Resources**: Downloadable materials for use when internet is unavailable

### For Communities
- **Public Health Support**: Evidence-based health advisories from official sources
- **Vulnerable Population Protection**: Specialized guidance for at-risk groups
- **Emergency Coordination**: Centralized resource information for emergency response
- **Education Platform**: Comprehensive educational materials for heat safety awareness
- **Data-Driven Insights**: Analytics and reporting capabilities for public health planning
## Pages and Features

### Public Pages

### 🏠 Home Page (`/`)
- **Feature Overview**: Introduction to ThermoWell's capabilities
- **Benefits Highlights**: Showcasing how the app helps during heat events
- **Call-to-Action**: Sign-up and login buttons
- **Public Information**: Heat safety basics accessible without login

### ℹ️ About Page (`/about`)
- **Mission Statement**: ThermoWell's purpose and commitment to heat safety
- **Team Information**: About the people behind ThermoWell
- **Partner Organizations**: Collaborators and supporting entities
- **Vision and Goals**: Long-term objectives for the platform

### 📞 Contact Page (`/contact`)
- **Contact Form**: Direct communication channel for inquiries
- **Contact Information**: Email, phone, and other contact options
- **Support Resources**: Additional help options
- **Office Location**: Physical address if applicable

### 🔐 Login Page (`/login`)
- **Authentication Form**: Email and password fields
- **Remember Me**: Option to stay logged in
- **Password Recovery**: Forgot password functionality
- **Registration Link**: Option for new users to create an account

### Authenticated Pages
- **Dashboard** (`/dashboard`): User-specific data and alerts
- **Advisories** (`/advisories`): Detailed health advisories
- **Health Score** (`/health-score`): Personal health risk assessment
- **Resources** (`/resources`): Safety resources and guides
- **Tips** (`/tips`): Heat safety tips and recommendations
- **Alerts** (`/alerts`): Notifications and alerts management
- **Settings** (`/settings`): User account and app settings
- **Help** (`/help`): Support and FAQ

### 🏥 Health Score Page (`/health-score`)
- **Health Assessment Form**: Questionnaire covering age, health conditions, and risk factors
- **Risk Score Calculation**: Personalized heat vulnerability assessment
- **Recommendations Engine**: Tailored safety advice based on individual risk profile
- **Action Plans**: Specific steps to reduce heat-related risks

### 📚 Resources Page (`/resources`)
- **Section Filtering**: Organized tabs for different resource types
- **Downloadable Guides**: PDF guides for heat safety
- **Interactive Checklists**: Step-by-step preparation checklists
- **External Links**: Curated links to official services

### 💡 Tips Page (`/tips`)
- **Category Filtering**: Tips organized by audience and situation
- **Actionable Advice**: Specific, practical steps
- **Visual Guidelines**: Icon-supported tips for better comprehension
- **Interactive Elements**: Mark tips as favorites or completed

### 🔔 Alerts & Notifications Page (`/alerts`)
- **Notification Dashboard**: Overview of all notifications with unread counts
- **Advanced Filtering**: Filter by notification type
- **Notification Management**: Mark as read, delete, or mark all as read
- **Action-Required Indicators**: Special flags for notifications requiring action

### ⚙️ Settings Page (`/settings`)
- **Profile Management**: Update personal information and preferences
- **Notification Preferences**: Customize alert types and delivery methods
- **Privacy Controls**: Data sharing preferences and account privacy
- **Security Options**: Password management and login preferences
- **App Customization**: Theme and language preferences

### 🆘 Help Page (`/help`)
- **Comprehensive FAQ**: Expandable questions covering key topics
- **Contact Methods**: Multiple ways to reach support
- **Emergency Information**: Quick access to emergency services
- **User Guides**: Step-by-step tutorials

## Authentication Architecture

ThermoWell implements a clear separation between public and authenticated routes.

### Authentication Components

1. **AuthContext**: Manages authentication state across the application
2. **ProtectedRoute**: Checks for authentication before rendering protected pages
3. **PublicLayout**: Layout for public pages without sidebar navigation
4. **LoginPage**: Handles user authentication and redirects
5. **UserService Authentication**: Methods for login, logout, and auth status

### Route Structure

**Public Routes**:
- **Home** (`/`): Landing page with basic information
- **Login** (`/login`): Authentication page

**Protected Routes**:
- Dashboard, Advisories, Health Score, Resources, Tips, Alerts, Settings, Help

### Authentication Flow

1. **Initial Load**:
   - `AuthProvider` checks for auth token in localStorage
   - User profile is loaded for authenticated users

2. **Login Process**:
   - User submits credentials on the login page
   - On success, auth token is saved and user is redirected

3. **Protected Route Access**:
   - `ProtectedRoute` component checks auth status
   - Unauthenticated users are redirected to login
   - Original destination is preserved for post-login redirect

4. **Logout Process**:
   - User logs out via TopBar profile dropdown
   - Auth token is cleared and user is redirected to login

### Security Considerations

- **Token Storage**: Auth tokens in localStorage (would be improved in production)
- **Route Protection**: All sensitive routes wrapped in ProtectedRoute
- **API Security**: Auth token included in API call headers
- **Simulated Authentication**: Currently using simulated auth (would integrate with backend)

## Settings Architecture

ThermoWell implements a multi-page settings structure for better organization and user experience.

### Multi-Page Settings with Sidebar Navigation

```
/settings/ (SettingsLayout.tsx with sidebar)
  ├─ /profile (ProfileSettings.tsx)
  ├─ /notifications (NotificationSettings.tsx) 
  ├─ /security (SecuritySettings.tsx)
  └─ /preferences (PreferencesSettings.tsx)
```

### Benefits

1. **Improved Performance**
   - Lazy-loading reduces initial bundle size
   - Only loads content needed for current view
   
2. **Better Maintainability**
   - Each settings area is a focused component
   - Clear separation of concerns
   
3. **Enhanced User Experience**
   - Direct URL access to specific settings sections
   - Deep-linkable URLs for sharing/bookmarking
   - Clean browser history navigation
   
4. **Future Scalability**
   - Easy to add new settings sections
   - Can implement role-based access

## UI Standardization

### Button Standardization

All buttons across ThermoWell follow consistent design patterns and color schemes:

#### Button Classes

1. **Primary Buttons (`btn-primary`)**
   - Blue color scheme (`#2563eb` / `#1d4ed8` on hover)
   - Used for main action buttons and CTAs

2. **Secondary Buttons (`btn-secondary`)**
   - Gray color scheme (`#f3f4f6` / `#e5e7eb` on hover)
   - Used for secondary actions like "Share"

3. **Tertiary Buttons (`btn-tertiary`)**
   - Blue outline with transparent background
   - Used for alternative actions

#### Benefits
- **Visual Consistency**: All buttons share the same visual language
- **Brand Alignment**: Consistent blue color scheme throughout
- **Accessibility**: Proper focus states and contrast ratios
- **Maintainability**: Centralized button styles in CSS classes

### Layout Components

#### TopBar Component
- Language Selection with multi-language support
- Notification Bell with real-time counts
- User Profile menu with account access
- Modern animated dropdowns

#### Sidebar Component
- Icon-based navigation menu
- Active state highlighting
- Mobile responsive design
- React Router integration

## Visual Design

The visual design of ThermoWell is centered around clarity, accessibility, and user engagement. Key elements include:

- **Color Palette**: A consistent and limited color palette to enhance recognition and reduce cognitive load.
- **Typography**: Clear and legible fonts, with a hierarchy that guides the user through the content.
- **Iconography**: Intuitive icons that support text labels and enhance understanding.
- **Spacing and Layout**: Generous spacing and a grid-based layout that adapts to different screen sizes.
- **Data Visualizations**: Intuitive and interactive visualizations for heat data and weather information.

### Design Tokens

Design tokens are used to maintain consistency in design across the application. They include:

- **Color Tokens**: Named colors for primary, secondary, and background colors, as well as semantic colors for heat levels.
- **Spacing Tokens**: Standardized spacing units for margins and paddings.
- **Typography Tokens**: Font sizes, weights, and line heights for consistent text styling.

### Dashboard Visualizations

The dashboard features specialized visualizations to help users understand heat-related data:

- **Temperature Gauge**: Visual representation of current and "feels like" temperatures using color-coded scales.
- **Heat Index Visualizer**: Translates heat index values into risk levels with corresponding recommendations.
- **Interactive Map**: Geographic visualization of heat conditions across regions with color-coded overlays.

For more details, see the [Dashboard Visualizations documentation](./DASHBOARD_VISUALIZATIONS.md).

### Accessibility Considerations

The design adheres to accessibility standards to ensure it is usable by people with a wide range of abilities. This includes:

- Sufficient color contrast between text and background
- Text alternatives for non-text content
- Keyboard navigability and focus management
- Consistent and predictable navigation

## User Journey Documentation

ThermoWell provides a clear separation between public and authenticated user experiences, with a seamless journey between them.

### Available Documentation

- **[USER_JOURNEY.md](./USER_JOURNEY.md)**: Complete overview of the user journey through both public and authenticated sections
- **[DEMO_SCRIPT.md](./DEMO_SCRIPT.md)**: Step-by-step demonstration script for showcasing the application
- **[APP_FLOW.md](./APP_FLOW.md)**: Visual diagram of application navigation flow
- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: Comprehensive application architecture documentation

### User Journey Summary

1. **Public Journey**:
   - Home Page: Introduction to ThermoWell
   - About Page: Mission, team, and partners
   - Contact Page: Communication channels and support
   - Login: Authentication gateway

2. **Authenticated Journey**:
   - Dashboard: Central hub with key information
   - Feature Pages: Advisories, Health Score, Resources, Tips, Alerts
   - Settings: User preferences and profile management
   - Help: Support resources and FAQs

The application is designed to provide value even before authentication while reserving personalized and detailed features for authenticated users.

## Additional Documentation

For more in-depth information about specific aspects of the ThermoWell application, please refer to the following documents:

- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)**: Detailed documentation of the API endpoints and data structures used in ThermoWell.
- **[DESIGN_DOCUMENTATION.md](./DESIGN_DOCUMENTATION.md)**: Overview of the design principles, color schemes, and typography used in the application.
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**: Instructions for deploying the ThermoWell application, including environment setup and configuration.

The following additional documentation files are available in the project root:

- **[PAGES_DOCUMENTATION.md](./PAGES_DOCUMENTATION.md)**: Detailed documentation for each page component
- **[BUTTON_STANDARDIZATION.md](./BUTTON_STANDARDIZATION.md)**: Comprehensive button styling guidelines
- **[ROADMAP.md](./ROADMAP.md)**: Future development plans and feature roadmap
- **[TODO.md](./TODO.md)**: Current tasks and development priorities

## Deployment

ThermoWell is deployed and accessible online:

- **Production URL**: [https://thermowell.vercel.app](https://thermowell.vercel.app)
- **Deployment Platform**: Vercel
- **Deployment Date**: June 2, 2025

### Deployment Features

- **Continuous Deployment**: Automatic deployments from the main branch
- **Preview Deployments**: Every pull request gets a unique preview URL
- **Edge Network**: Global CDN for fast access worldwide
- **Client-Side Routing**: Proper handling of React Router paths
- **Secure HTTPS**: Automatic SSL certificates

For detailed deployment instructions and configuration, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Technical Setup

This project is built with React, TypeScript, and Vite. Here's how to get started:

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Type check
npm run type-check

# Build
npm run build

# Preview production build
npm run preview
```

### Available Scripts

- `dev`: Start development server
- `build`: Build for production
- `preview`: Preview production build
- `type-check`: Run TypeScript compiler
- `lint`: Lint code with ESLint

### Project Structure

```
/src
  /assets        # Static assets like images and icons
  /components    # Reusable UI components
  /contexts      # React contexts (AuthContext, etc.)
  /data          # Mock data and type definitions
  /pages         # Application pages
  /services      # Service classes for data fetching/manipulation
  /wireframes    # Design mockups and prototypes
```

## Future Enhancements

1. **Authentication Improvements**:
   - Remember Me functionality
   - Password Reset flow
   - Multi-factor Authentication
   - Session Timeout

2. **Settings Enhancements**:
   - Mobile-responsive settings navigation
   - Settings search functionality
   - User preferences API integration

3. **Dashboard Improvements**:
   - Real-time data integration
   - Interactive heatwave map
   - Personalized action items
