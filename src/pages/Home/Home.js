import React from "react";
import './Home.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBarComponent from "../nav-bar/NavBarComponent";
import { PersonAdd } from 'react-bootstrap-icons';
import { Search } from 'react-bootstrap-icons';
import { BuildingGear } from 'react-bootstrap-icons';

export function Home() {

  const navigate = useNavigate();

  const navigateAddNewPatient = () => {
    navigate('/addNewPatient');
  };

  const navigateSearchPatient = () => {
    navigate('/searchPatient');
  };

  return (
    <div>
      <NavBarComponent />
      <header class="py-5">
        <div class="container px-lg-5">
          <div class="p-4 p-lg-5 bg-dark rounded-3 text-center">
            <div class="m-4 m-lg-5">
              <h1 class="display-5 fw-bold text-white">Welcome to Patient Management</h1>
              <p class="fs-4 text-white">You can manage your patients channelling history here</p>
            </div>
          </div>
        </div>
      </header>
      <section class="pt-4">
        <div class="container px-lg-5">
          <div class="row gx-lg-5">
            <div class="col-lg-6 col-xxl-4 mb-5" onClick={navigateAddNewPatient} >
              <div class="card bg-light border-0 h-100">
                <div class="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                  <div class="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4">
                    <PersonAdd size={40} />
                  </div>
                  <h2 class="fs-4 fw-bold">Add New Patient</h2>
                  <p class="mb-0">Click here to add new patients to the system</p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-xxl-4 mb-5" onClick={navigateSearchPatient}>
              <div class="card bg-light border-0 h-100">
                <div class="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                  <div class="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4">
                    <Search size={40} />
                  </div>
                  <h2 class="fs-4 fw-bold">Search Existing Patient</h2>
                  <p class="mb-0">Click here to search exisiting patients and update new visits</p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-xxl-4 mb-5">
              <div class="card bg-light border-0 h-100">
                <div class="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                  <div class="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4">
                  <BuildingGear size={40} />
                  </div>
                  <h2 class="fs-4 fw-bold">Settings</h2>
                  <p class="mb-0">You can update your details here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


export default Home;