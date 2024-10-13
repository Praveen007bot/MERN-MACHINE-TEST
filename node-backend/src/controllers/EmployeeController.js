import { Employee } from "../models/Employee.js";

export const addEmployee = async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;
    if (!(name && email && mobile && designation && gender && course)) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    if (name.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "Name is required", success: false });
    }
    if (!isEmailValid(email)) {
      return res
        .status(401)
        .json({ message: "Enter a valid email", success: false });
    }

    if (!validateIndianPhoneNumber(mobile)) {
      return res
        .status(402)
        .json({ message: "Enter a valid mobile number", success: false });
    }

    if (designation.trim().length === 0) {
      return res
        .status(403)
        .json({ message: "Designation is required", success: false });
    }

    if (!["Male", "Female", "Other"].includes(gender)) {
      return res
        .status(404)
        .json({ message: "Invalid gender", success: false });
    }

    

    const isEmployeeExist = await Employee.findOne({ email });

    if (isEmployeeExist) {
      return res
        .status(403)
        .json({ message: "Email Already Exist", success: false });
    }

    const newEmployee = await Employee.create({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
    });

    return res
      .status(200)
      .json({ message: "Employee successfully added", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await Employee.find({});

    return res.status(200).json({
      message: "Fetched all employees",
      success: true,
      employees: allEmployees,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const { name, email, mobile, designation, gender, course } = req.body;

    if (!name || name.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "Name is required", success: false });
    }

    if (!isEmailValid(email)) {
      return res
        .status(401)
        .json({ message: "Enter a valid email", success: false });
    }

    if (!validateIndianPhoneNumber(mobile)) {
      return res
        .status(402)
        .json({ message: "Enter a valid mobile number", success: false });
    }

    if (!designation || designation.trim().length === 0) {
      return res
        .status(403)
        .json({ message: "Designation is required", success: false });
    }

    if (
      !gender ||
      (gender !== "Male" && gender !== "Female" && gender !== "Other")
    ) {
      return res
        .status(404)
        .json({ message: "Invalid gender", success: false });
    }

    
    if (!employeeId) {
      return res
        .status(400)
        .json({ message: "Employee ID not found", success: false });
    }

    const editEmployee = await Employee.findById(employeeId);
    if (!editEmployee) {
      return res
        .status(404)
        .json({ message: "Employee doesn't exist", success: false });
    }

    editEmployee.name = name;
    editEmployee.email = email;
    editEmployee.mobile = mobile;
    editEmployee.designation = designation;
    editEmployee.gender = gender;
    editEmployee.course = course;

    await editEmployee.save();

    return res.status(200).json({
      message: "Employee updated successfully",
      success: true,
      employee: editEmployee,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    if (!employeeId) {
      return res
        .status(400)
        .json({ message: "Employee ID not found", success: false });
    }
    const editEmployee = await Employee.findById(employeeId);
    if (!editEmployee) {
      return res
        .status(404)
        .json({ message: "Employee doesn't exist", success: false });
    }
    await Employee.findByIdAndDelete(employeeId);
    return res
      .status(200)
      .json({ message: "Employee deleted successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const indianPhoneRegex = /^[789]\d{9}$/;

function isEmailValid(email) {
  if (!email) return false;

  if (email.length > 254) return false;

  var valid = emailRegex.test(email);
  if (!valid) return false;

  var parts = email.split("@");
  if (parts[0].length > 64) return false;

  var domainParts = parts[1].split(".");
  if (
    domainParts.some(function (part) {
      return part.length > 63;
    })
  )
    return false;

  return true;
}

function validateIndianPhoneNumber(phoneNumber) {
  return indianPhoneRegex.test(phoneNumber);
}
