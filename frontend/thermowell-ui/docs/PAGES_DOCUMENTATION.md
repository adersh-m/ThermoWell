# ThermoWell Application - Pages Documentation

## Overview
ThermoWell is a comprehensive heatwave safety and monitoring application designed to protect users during extreme heat conditions. The application provides real-time alerts, health advisories, safety resources, and personalized recommendations to help users stay safe during heatwaves.

---

## 🏠 **Home Page** (`/`)

### Purpose
The landing page that provides a welcoming overview of the application and quick access to key features.

### Key Features
• **Personalized Welcome**: Displays user greeting with dynamic name fetching from UserService  
• **Onboarding Modal**: First-time user guidance with feature highlights and safety tips  
• **Latest Advisories Preview**: Shows the 3 most recent health advisories from AdvisoryService  
• **Quick Actions**: Direct navigation buttons to health assessment and advisories  
• **Feature Highlights**: Cards showcasing main application capabilities (advisories, health score, emergency help)  
• **Call-to-Action Buttons**: Prominent links to dashboard and key features  

---

## 📊 **Dashboard Page** (`/dashboard`)

### Purpose
Centralized hub displaying real-time heatwave status, regional alerts, and personalized safety information.

### Key Features
• **Current Heat Status**: Real-time temperature and heat index display with severity indicators  
• **Regional Alerts**: Interactive map showing heat levels across different geographic areas  
• **Vulnerable Groups Protection**: Targeted advice for children, elderly, and outdoor workers  
• **Health Status Cards**: Temperature, humidity, and heat index monitoring with color-coded alerts  
• **Emergency Resources**: Quick access to cooling centers, medical units, and water stations  
• **Interactive Map**: HeatwaveMap component with clickable regions and real-time data  
• **Personalized Recommendations**: Location-based safety advice and action items

---

## ⚠️ **Advisory Page** (`/advisories`)

### Purpose
Displays official heat-related health advisories, warnings, and safety guidelines from health authorities.

### Key Features
• **Current Advisories**: Latest official warnings and health advisories  
• **Urgent Alerts**: Critical notifications requiring immediate attention  
• **Group-Specific Advisories**: Targeted guidance for vulnerable populations  
• **Advisory Categories**: Organized by severity levels (low, medium, high, critical)  
• **Advisory Details**: Comprehensive information including source, timestamp, and action requirements  
• **Historical Archive**: Access to past advisories and trends  

---

## 🏥 **Health Score Page** (`/health-score`)

### Purpose
Interactive health assessment tool to evaluate personal risk and provide customized safety recommendations.

### Key Features
• **Health Assessment Form**: Comprehensive questionnaire covering age, health conditions, and risk factors  
• **Risk Score Calculation**: Personalized heat vulnerability assessment with scoring algorithm  
• **Recommendations Engine**: Tailored safety advice based on individual risk profile  
• **Progress Tracking**: Monitor health score changes over time  
• **Risk Categories**: Clear categorization (Low, Moderate, High, Critical) with explanations  
• **Action Plans**: Specific steps users can take to reduce their heat-related risks

---

## 📚 **Resources Page** (`/resources`)

### Purpose
Comprehensive library of safety guides, checklists, external links, and educational materials for heatwave preparedness.

### Key Features
• **Section Filtering**: Organized tabs for "All Resources", "Heatwave Info", and "General Safety"  
• **Search Functionality**: Quick search across all resources and materials  
• **Downloadable Guides**: PDF guides including Heat Safety Handbook and Emergency Kit Lists  
• **Interactive Checklists**: Step-by-step preparation checklists for different scenarios  
• **External Links**: Curated links to official weather services, health departments, and emergency resources  
• **Video Tutorials**: Educational content on heat safety and emergency preparedness  
• **Printable Materials**: Resources optimized for offline use and distribution

---

## 💡 **Tips Page** (`/tips`)

### Purpose
Practical safety tips and preventive measures categorized by audience and situation types.

### Key Features
• **Category Filtering**: Tips organized by General, Children, Elderly, Outdoor Workers, and Emergency situations  
• **Actionable Advice**: Specific, practical steps users can implement immediately  
• **Visual Guidelines**: Icon-supported tips for better comprehension and retention  
• **Seasonal Recommendations**: Tips adapted to current weather conditions and forecasts  
• **Interactive Elements**: Ability to mark tips as favorites or completed  
• **Quick Reference**: Essential tips prominently displayed for emergency situations

---

## 🔔 **Alerts & Notifications Page** (`/alerts`)

### Purpose
Centralized notification management system for all alerts, warnings, and system notifications.

### Key Features
• **Notification Dashboard**: Overview of all notifications with unread counts and statistics  
• **Advanced Filtering**: Filter by notification type (heatwave, health, emergency, system, reminder)  
• **Sorting Options**: Sort by newest, oldest, or priority level  
• **Notification Management**: Mark as read, delete, or mark all as read functionality  
• **Real-time Updates**: Live notification feed with instant updates across the application  
• **Action-Required Indicators**: Special flags for notifications requiring user action

---

## ⚙️ **Settings Page** (`/settings`)

### Purpose
User preferences, account management, and application configuration options.

### Key Features
• **Profile Management**: Update personal information, location preferences, and contact details  
• **Notification Preferences**: Customize alert types, delivery methods (email, SMS, push), and frequency  
• **Privacy Controls**: Data sharing preferences and account privacy settings  
• **Security Options**: Password management, two-factor authentication setup, and login preferences  
• **App Customization**: Theme selection, language preferences, and display options  
• **Emergency Contacts**: Manage personal emergency contact list and family member information  

---

## 🆘 **Help Page** (`/help`)

### Purpose
Support center with FAQs, contact information, and user assistance resources.

### Key Features
• **Comprehensive FAQ**: Expandable questions covering heat safety, app usage, and emergency procedures  
• **Contact Methods**: Multiple ways to reach support including phone, email, and live chat options  
• **Emergency Information**: Quick access to emergency services and heat-related medical guidance  
• **User Guides**: Step-by-step tutorials for using application features  
• **Troubleshooting**: Common issues and solutions for technical problems  
• **Feedback System**: User feedback collection for continuous app improvement

---

## 🗂️ **Layout & Navigation Components**

### TopBar Component
• **Language Selection**: Multi-language support with flag icons (English, Hindi, Chinese)  
• **Notification Bell**: Real-time notification count with dropdown preview  
• **User Profile**: Quick access to user account and profile settings  
• **Modern Dropdowns**: Animated dropdowns with click-outside  functionality

### Sidebar Component
• **Main Navigation**: Quick access to all primary pages with active state highlighting  
• **Icon-Based Menu**: Intuitive icons for each section with text labels  
• **Mobile Responsive**: Collapsible sidebar for mobile devices  
• **Route Management**: React Router integration with proper navigation state  

---

## 🔧 **Technical Architecture**

### Service Layer
• **NotificationService**: Centralized notification management with real-time updates  
• **AdvisoryService**: Advisory data fetching and management  
• **UserService**: User data and preferences management  
• **DashboardService**: Dashboard-specific data aggregation  

### Data Flow
• **Centralized State**: All pages use service classes for data fetching  
• **Real-time Sync**: Notifications and alerts update across components instantly  
• **Type Safety**: Full TypeScript integration with proper interfaces and type checking  
• **Error Handling**: Graceful error states and loading indicators

---

## 🎯 **Key Application Benefits**

### For End Users
• **Comprehensive Safety**: All-in-one platform for heatwave protection and emergency preparedness  
• **Personalized Experience**: Tailored recommendations based on individual risk factors and location  
• **Real-time Awareness**: Instant alerts and updates about changing heat conditions  
• **Easy Access**: Intuitive navigation and mobile-friendly design for quick information access  
• **Offline Resources**: Downloadable materials for use when internet is unavailable

### For Communities
• **Public Health Support**: Evidence-based health advisories from official sources  
• **Vulnerable Population Protection**: Specialized guidance for at-risk groups  
• **Emergency Coordination**: Centralized resource information for emergency response  
• **Education Platform**: Comprehensive educational materials for heat safety awareness  
• **Data-Driven Insights**: Analytics and reporting capabilities for public health planning

This documentation serves as a comprehensive guide to understanding the functionality and purpose of each page within the ThermoWell application, demonstrating its value as a critical tool for heatwave safety and public health protection.
