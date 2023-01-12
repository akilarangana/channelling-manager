import * as React from 'react';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import axios from "axios";
import DrugDoseComponent from '../../../components/drug-dose-component/DrugDoseComponent';
import './AddVisitDataStyle.css';
import configData from "../../../config.json";

export function AddVisitPrescriptionComponent(patientId) {


    const [symptomsValue, setSymptomsValue] = React.useState(null);
    const [prescriptions, setPrescriptions] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);

    const callbackFunction = (childData) => {
        setPrescriptions(childData)
    }

    const handleSymptomsChange = (e) => {
        const { value } = e.target;
        setSymptomsValue(value);
    }

    const handleSubmit = async (e) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        console.log('Prescription from : ' + prescriptions.rows);
        if (symptomsValue && prescriptions) {
            try {
                let res = await fetch(configData.SERVER_URL + "/patients/update", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json, text/plain',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify({
                        patientId: patientId.patientId,
                        visitDate: today,
                        symptoms: symptomsValue,
                        prescriptionList: prescriptions.rows

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
        else {
            handleError(true);
        }
    }

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
        <div className="drawerFormvisitDataDiv">
            <h3 style={{ textAlign: "center" }} >Add Visit Data</ h3>
            <div className="innerFormAddVisitData">
                <div className="form-text-full">
                    <div>
                        <p><label htmlFor="symptoms">Symptoms</label></p>
                        <textarea name="symptoms" rows="4" cols="50" onChange={handleSymptomsChange} ></textarea>
                    </div>


                </div>
                <div className="form-text-full">
                    <p><label htmlFor="prescriptions">Prescriptions</label></p>
                    <DrugDoseComponent parentCallback={callbackFunction} />
                </div>
                <input type="submit" value="Save visit" onClick={handleSubmit} />

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
        </div>
    );
}

export default AddVisitPrescriptionComponent;