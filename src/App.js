
import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddNewPatientForm from "./pages/add-new/AddNewPatientForm";
import Home from "./pages/Home/Home";
import { SearchCompoent } from "./pages/view-patient/search-component/SearchComponent";
import { ViewPatient } from "./pages/view-patient/ViewPatient";
import PatientSummary from "./pages/patient-summary/PatientSummary";
import DrugDoseComponent from "./components/drug-dose-component/DrugDoseComponent";
import InventoryManagement from "./pages/inventory/InventoryManagement";

function App() { 
  const [user, setUser] = useState([]);

  /*const fetchData = () => {
    return axios.get("http://localhost:8080/students")
          .then((response) => setUser(response.data));
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
    <main>
      <h1>User List</h1>
      <ul>
        {user && user.length > 0 && user.map((userObj, index) => (
            <li key={userObj.studentId}>{userObj.studentName}  {userObj.age}</li>
          ))}
      </ul>
    </main>
  );*/
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addNewPatient" element={<AddNewPatientForm />} />
          <Route path="/searchPatient" element={<ViewPatient />} />
          <Route path="/patientSummary" element={<PatientSummary />} />
          <Route path="/inventory" element={<InventoryManagement />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;