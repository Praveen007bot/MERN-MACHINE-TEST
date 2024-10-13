import express from "express";
import {
  addEmployee,
  deleteEmployee,
  editEmployee,
  getAllEmployees,
} from "../controllers/EmployeeController.js";

const route = express.Router();

route.post("/", addEmployee);
route.get("/", getAllEmployees);
route.put("/:id", editEmployee);
route.delete("/:id", deleteEmployee);

export default route;
