import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import EmployeePage from "./components/EmployeePage";
import AddEmployeePage from "./components/AddEmployeePage";
import EditEmployeePage from "./components/EditEmployeePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/employee/add" element={<AddEmployeePage />} />
        <Route path="/employee/edit" element={<EditEmployeePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
