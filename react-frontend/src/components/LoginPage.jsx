import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/admin/login",
        user,
        { withCredentials: true }
      );
      if (res.data.success) {
        localStorage.setItem("authUsername", res.data.username);
        toast.success(res.data.message);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <h1 className="text-3xl font-bold text-white mb-6">Login Page</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col w-80"
      >
        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2">
            User name
          </label>
          <input
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-white text-sm font-semibold mb-2">
            Password
          </label>
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
