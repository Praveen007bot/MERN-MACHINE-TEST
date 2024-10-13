import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [authUsername, setAuthUsername] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("authUsername");
    if (username) {
      setAuthUsername(username);
    }
  }, []);

  return (
    <div className="bg-gray-800 p-4 flex justify-between items-center shadow-lg">
      <div className="text-white text-lg font-semibold flex">
        <Link to={'/home'} className="cursor-pointer hover:text-blue-400 transition-colors">
          Home
        </Link>
        <Link to={'/employee'} className="ml-4 cursor-pointer hover:text-blue-400 transition-colors">
          Employee List
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <p className="text-white">{authUsername}</p>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded-lg transition-all">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
