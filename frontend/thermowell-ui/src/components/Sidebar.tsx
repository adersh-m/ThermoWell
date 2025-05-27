import { NavLink } from "react-router-dom";
import DashboardIcon from "../assets/icons/dashboard.png";
import AdvisoryIcon from "../assets/icons/advisories.png";
import TipsIcon from "../assets/icons/tips.png";
import ResourcesIcon from "../assets/icons/resources.png";
import HelpIcon from "../assets/icons/help.png";
import SettingsIcon from "../assets/icons/settings.png";

const Sidebar = () => {
  return (
    <div className="w-60 h-screen bg-gray-100 shadow-md p-4 fixed ml-3">
      <h1 className="text-xl font-bold mb-6">🌡️ ThermoWell</h1>
      <nav className="flex flex-col gap-4">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
          <img src={DashboardIcon} alt="Dashboard" className="inline-block w-5 h-5 mr-2" />
          Dashboard
        </NavLink>
        <NavLink to="/advisories" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
          <img src={AdvisoryIcon} alt="Dashboard" className="inline-block w-5 h-5 mr-2" />
          Advisories
        </NavLink>
        <NavLink to="/tips" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
          <img src={TipsIcon} alt="Dashboard" className="inline-block w-5 h-5 mr-2" />
          Tips
        </NavLink>
        <NavLink to="/resources" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
          <img src={ResourcesIcon} alt="Dashboard" className="inline-block w-5 h-5 mr-2" />
          Resources
        </NavLink>
         <NavLink to="/health-score" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
          <img src={ResourcesIcon} alt="HealthScore" className="inline-block w-5 h-5 mr-2" />
          Health Score
        </NavLink>
      </nav>
      <h2 className="text-md font-bold my-6">Support</h2>
      <nav className="flex flex-col gap-4">
        <NavLink to="/help" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
          <img src={HelpIcon} alt="Help" className="inline-block w-5 h-5 mr-2" />
          Help
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
          <img src={SettingsIcon} alt="Settings" className="inline-block w-5 h-5 mr-2" />
          Settings
        </NavLink>
        
      </nav>
    </div>
  );
};

export default Sidebar;
