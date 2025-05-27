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
        to="/advisory"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
            : "text-gray-600 hover:text-blue-600"
        }
      >
        Advisory
      </NavLink>
    </nav>
  );
};

export default NavBar;
