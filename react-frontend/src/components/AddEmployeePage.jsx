import React, { useState } from "react";
import Navbar from "./Navbar";
import { Dropdown } from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";

const AddEmployeePage = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
  });
  const [designation, setDesignation] = useState("Select Designation");

  const handleSelectDesignation = (value) => {
    setDesignation(value);
    setEmployee({ ...employee, designation: value });
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const courses = employee.course.includes(value)
        ? employee.course.filter((course) => course !== value)
        : [...employee.course, value];
      setEmployee({ ...employee, course: courses });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/employee",
        employee,
        { withCredentials: true }
      );
      console.log(res.data);

      if (res.data.success) {
        toast.success(res.data.message);
        setEmployee({
          name: "",
          email: "",
          mobile: "",
          designation: "",
          gender: "",
          course: [],
        });
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
        <h1 className="text-3xl font-bold mb-8">Create Employee</h1>
        <form
          onSubmit={handlesubmit}
          className="bg-gray-800 shadow-lg p-8 rounded-lg w-full max-w-md"
        >
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={employee.name}
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
              value={employee.email}
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
              value={employee.mobile}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-lg p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <Dropdown label={designation} dismissOnClick={false}>
              <Dropdown.Item onClick={() => handleSelectDesignation("HR")}>
                HR
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelectDesignation("Manager")}>
                Manager
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelectDesignation("Sales")}>
                Sales
              </Dropdown.Item>
            </Dropdown>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Gender</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={employee.gender === "Male"}
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
                  checked={employee.gender === "Female"}
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
                  checked={employee.course.includes("MCA")}
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
                  checked={employee.course.includes("BCA")}
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
                  checked={employee.course.includes("BSC")}
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeePage;
