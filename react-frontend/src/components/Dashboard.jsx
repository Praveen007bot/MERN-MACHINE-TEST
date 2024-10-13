import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-12">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-xl mb-8">Welcome to Admin Panel</p>
        <Link 
          to="/employee/add" 
          className="text-lg bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-all"
        >
          Add Employee
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
