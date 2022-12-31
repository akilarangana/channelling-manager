import React from "react";
import SimpleAccordion from "./accordion-component/SimpleAccordion";
import './PatientSummary.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import NavBarComponent from "../nav-bar/NavBarComponent";
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';

export function PatientSummary() {

    const [isShown, setIsShown] = useState(false);
    const location = useLocation();

    const [symptomsValue, setSymptomsValue] = React.useState(null);
    const [prescriptionsValue, setPrescriptionsValue] = React.useState(null);

    const [visits, setSVisits] = React.useState(null);

    const fetchData = () => {
        return axios.get("http://localhost:8080/patients/getVisit?patientId=" + location.state.row.patientId)
            .then((response) => setSVisits(response.data));
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleSymptomsChange = (e) => {
        const { value } = e.target;
        setSymptomsValue(value);
    }

    const handlePrescriptionChange = (e) => {
        const { value } = e.target;
        setPrescriptionsValue(value);
    }

    const handleClick = event => {
        setIsShown(current => !current);
    };

    const handleSubmit = async (e) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        if(symptomsValue && prescriptionsValue){
            try {
                let res = await fetch("http://localhost:8080/patients/update", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json, text/plain',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify({
                        patientId: location.state.row.patientId,
                        visitDate: today,
                        symptoms: symptomsValue,
                        prescriptions: prescriptionsValue
    
                    })
                });
                let resJson = await res.json();
                if (res.status === 200) {
                    //alert('Visit data updated successfully.');
                    handleSuccess();
                } else {
                    alert('Some error occured.');
                }
            } catch (err) {
                console.log(err);
            }
        }
        else{
            handleError(true);
        }

        
        
    }

    const [open, setOpen] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);

  const handleSuccess = () => {
    setOpen(true);
  };

  const handleError = () => {
    setOpenError(true);
  };

  const handleClose = () => {
    setOpenError(false);
    setOpen(false);
  };

  
    return (
        <div>
            <NavBarComponent />
            <div id="patientSummaryMainDiv" className="formDiv" >
                <div id="patientSummaryHeaderId">
                    <h2>Patient Summary</h2>
                </div>
                <div id="patientSummaryRowDivId" >
                    < div className="patientSummaryCell" >
                        <label><b>Name : </b></label> <label>{location.state.row.patientName}</label>
                    </div >
                    <div className="patientSummaryCell">
                        <label><b>Age : </b></label> <label>{location.state.row.age}</label>
                    </div>
                    <div className="patientSummaryCell">
                        <label><b>Date of Birth : </b></label> <label>{location.state.row.birthDay}</label>
                    </div>
                </div >

                <div id="patientSummaryRowDivId">
                    <div className="patientSummaryCell">
                        <label><b>Gender : </b></label> <label>{location.state.row.gender}</label>
                    </div>
                    <div className="patientSummaryCell">
                        <label><b>Phone Number : </b></label> <label>{location.state.row.phoneNumber}</label>
                    </div>
                    <div className="patientSummaryCell">
                        <label><b>Home Town : </b></label> <label>{location.state.row.homeTown}</label>
                    </div>
                </div>
                <div id="patientSummaryRowDivId">
                    <div className="patientSummaryCell">
                        <label><b>Last Visited : </b></label> <label>{location.state.row.lastVisited}</label>
                    </div>
                    <div className="patientSummaryCell">
                        <label><b>Allergies : </b></label> <label>{location.state.row.allergies}</label>
                    </div>
                </div>

                <div id="patientSummaryRowDivId">
                    <div className="patientHistoryCell">
                        <div className="patientSummaryLabelCell">
                            <label><b>Past Medical History :&nbsp;</b></label>
                        </div>
                        <div className="patientSummaryDataCell">
                            <label>{location.state.row.pastMedicalHistory}</label>
                        </div>
                    </div>
                    <div className="patientHistoryCell">
                        <div className="patientSummaryLabelCell">
                            <label><b>Past Surgical History :&nbsp; </b></label>
                        </div>
                        <div className="patientSummaryDataCell">
                            <label>{location.state.row.pastSurgicalHistory}</label>
                        </div>
                    </div>
                </div>
                <div id="addNewVisitBtnId">
                    <input type="submit" value="Add New Visit" onClick={handleClick} />
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Patient Visit Updated Successfully!
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            Symptoms or Prescriptions not added!
                        </Alert>
                    </Snackbar>
                </div>
                {isShown && (
                    <div id="addNewVisitDivId" className="side-by-side">
                        <div id="addVisitSymptompsId" className="float-left">
                            <p><label htmlFor="symptoms">Symptoms</label></p>
                            <textarea name="symptoms" rows="4" cols="50" onChange={handleSymptomsChange}></textarea>
                        </div>
                        <div id="addVisitPrescriptionsId">
                            <p><label htmlFor="prescriptions">Prescriptions</label></p>
                            <textarea name="prescriptions" rows="4" cols="50" onChange={handlePrescriptionChange}></textarea>
                        </div>
                        <input type="submit" value="Save visit" onClick={handleSubmit} />
                    </div>
                )}


                <div>
                    <SimpleAccordion visits={visits} />
                </div>
            </div >
        </div>
    );


}


export default PatientSummary;