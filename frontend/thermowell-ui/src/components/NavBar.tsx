// src/components/NavBar.tsx
import React from "react";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-white shadow p-4 flex justify-center space-x-6">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
            : "text-gray-600 hover:text-blue-600"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/advisories"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
            : "text-gray-600 hover:text-blue-600"
        }
      >
        Advisories
      </NavLink>
      <NavLink
        to="/tips"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
            : "text-gray-600 hover:text-blue-600"
        }
      >
        Tips
      </NavLink>
      <NavLink
        to="/resources"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
            : "text-gray-600 hover:text-blue-600"
        }
      >
        Resources
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          `btn btn-primary px-5 py-2 text-white font-medium rounded-full ${
            isActive ? "border-b-2 border-blue-600" : "hover:text-blue-600"
          }`
        }
      >
        Login
      </NavLink>
    </nav>
  );
};

export default NavBar;
