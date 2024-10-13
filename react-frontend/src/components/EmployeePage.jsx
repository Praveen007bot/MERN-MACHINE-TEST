import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);

  const getAllEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/employee");
      setEmployees(res.data.employees);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/v1/employee/${id}`
      );
      console.log(res);
      getAllEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Employee List</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-gray-800 text-white rounded-lg">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Mobile No</th>
                <th className="px-4 py-2 text-left">Designation</th>
                <th className="px-4 py-2 text-left">Gender</th>
                <th className="px-4 py-2 text-left">Course</th>
                <th className="px-4 py-2 text-left">Create Date</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => {
                console.log(employee);

                return (
                  <tr key={employee._id} className="border-b border-gray-700">
                    <td className="px-4 py-2">{employee.name}</td>
                    <td className="px-4 py-2">{employee.email}</td>
                    <td className="px-4 py-2">{employee.mobile}</td>
                    <td className="px-4 py-2">{employee.designation}</td>
                    <td className="px-4 py-2">{employee.gender}</td>
                    <td className="px-4 py-2">{employee.course.join(", ")}</td>
                    <td className="px-4 py-2">
                      {new Date(employee.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <Link
                        to={{
                          pathname: "/employee/edit",
                        }}
                        state={{employee}}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(employee._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
