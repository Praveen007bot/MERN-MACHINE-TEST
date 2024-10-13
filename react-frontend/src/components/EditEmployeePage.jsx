import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const EditEmployeePage = () => {
  const location = useLocation();
  const employee = location.state?.employee;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        mobile: employee.mobile,
        designation: employee.designation,
        gender: employee.gender,
        course: employee.course,
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const courses = formData.course.includes(value)
        ? formData.course.filter((course) => course !== value)
        : [...formData.course, value];
      setFormData({ ...formData, course: courses });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8080/api/v1/employee/${employee._id}`,
        formData,
        { withCredentials: true }
      );
      console.log(res.data);

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="flex flex-col items-center mt-12">
        <h1 className="text-3xl font-bold mb-8">Edit Employee</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 shadow-lg p-8 rounded-lg w-full max-w-md"
        >
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-lg p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-lg p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="mobile">
              Mobile Number
            </label>
            <input
              type="number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-lg p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Designation</label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-lg p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Gender</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2 text-gray-300">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2 text-gray-300">Female</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Course</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="course"
                  value="MCA"
                  checked={formData.course.includes("MCA")}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span className="ml-2 text-gray-300">MCA</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="course"
                  value="BCA"
                  checked={formData.course.includes("BCA")}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span className="ml-2 text-gray-300">BCA</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="course"
                  value="BSC"
                  checked={formData.course.includes("BSC")}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span className="ml-2 text-gray-300">BSC</span>
              </label>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeePage;
