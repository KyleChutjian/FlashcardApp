import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const router = useNavigate();

  const handleToDashboard = () => {
    router("/dashboard");
  }

  const handleToDictionary = () => {
    router("/dictionary");
  }

  // TODO: finish logout route/logic
  const handleLogout = () => {  
    router("/login");
  }

  return (
    <nav className="border-gray-200 bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        {/* To Dashboard */}
        <button onClick={handleToDashboard}>
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white border-0 p-0 hover:text-white hover:text-blue-700">Flashcard App</span>
        </button>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          {/* To Dictionary */}
          <button onClick={handleToDictionary}>
            <span className="block py-2 px-3 rounded border-0 text-white hover:bg-gray-100 hover:text-blue-500 hover:bg-transparent">Dictionary</span>
          </button>

          {/* Logout */}
          <button onClick={handleLogout}>
            <span className="block py-2 px-3 rounded border-0 text-white hover:bg-gray-100 hover:text-blue-500 hover:bg-transparent">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;