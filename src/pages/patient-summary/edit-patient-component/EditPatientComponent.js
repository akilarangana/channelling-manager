import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import configData from "../../../config.json";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";

export function EditPatientComponent(patient) {


    const [patientName, setPatientName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [dateOfBirth, setDateOfBirth] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [homeTown, setHomeTown] = React.useState('');
    const [allergies, setAllergies] = React.useState('');
    const [pastMedicalHistory, setPastMedicalHistory] = React.useState('');
    const [pastSurgicalHistory, setPastSurgicalHistory] = React.useState('');
    const [patientId, setPatientId] = React.useState('');
    const [lastVisited, setLastVisited] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleFormValidation = () => {
        let formIsValid = true;
        return formIsValid;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
       // setState({ [name]: value });
    }

    const handleBirthdayChane = (e) => {
        
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleFormValidation()) {

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
            try {
                let res = await fetch(configData.SERVER_URL + "/patients/updatePatient", {
                    method: "PUT",
                    headers: {
                        'Accept': 'application/json, text/plain',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify({
                        patientId : patient.patient.patientId,
                        patientName: patientName ? patientName : patient.patient.patientName,
                        age: age ? age : patient.patient.age,
                        birthDay: dateOfBirth ? dateOfBirth : patient.patient.birthDay,
                        gender: gender ? gender : patient.patient.gender,
                        phoneNumber: phoneNumber ? phoneNumber : patient.patient.phoneNumber,
                        homeTown: homeTown ? homeTown : patient.patient.homeTown,
                        pastMedicalHistory: pastMedicalHistory ? pastMedicalHistory : patient.patient.pastMedicalHistory,
                        pastSurgicalHistory: pastSurgicalHistory ? pastSurgicalHistory : patient.patient.pastSurgicalHistory,
                        allergies: allergies ? allergies : patient.patient.allergies,
                        lastVisited: patient.patient.lastVisited
                    })
                });
                let resJson = await res.json();
                if (res.status === 200) {
                    handleSuccess(true);
                } else {
                    alert('Some error occured.');
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleSuccess = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

        return (
            <div>
                <div className="formDiv">
                <h3 style={{ textAlign: "center" }} >Edit Patient</ h3>
                    <div className="innerForm">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="full-width">
                                    <div className="form-side-by-side">

                                        <TextField id="outlined-basic" name="patientName" label="Name of the Patient"
                                            variant="outlined" onChange={e => setPatientName(e.target.value)} fullWidth defaultValue={patient.patient.patientName} />
                                    </div>
                                    <div className="form-side-by-side">


                                        <TextField id="outlined-basic" name="age" label="Patient Age"
                                            variant="outlined" onChange={e => setAge(e.target.value)} fullWidth defaultValue={patient.patient.age} />
                                    </div>
                                </div>

                                <div className="full-width">
                                    <div className="form-side-by-side">
                                        <TextField id="outlined-basic" name="birthDay" label="Birth Day (YYYY/MM/DD)"
                                            variant="outlined" onChange={e => setDateOfBirth(e.target.value)} fullWidth defaultValue={patient.patient.birthDay} />
                                    </div>


                                    <div className="form-side-by-side">
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                                <Select
                                                    name="gender"
                                                    defaultValue={patient.patient.gender}
                                                    label="Gender"
                                                    onChange={e => setGender(e.target.value)}>
                                                    <MenuItem value="male">Male</MenuItem>
                                                    <MenuItem value="female">Female</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </div>
                                </div>

                                <div className="full-width">
                                    <div className="form-side-by-side">
                                        <TextField id="outlined-basic" name="phoneNumber" label="Phone Number"
                                            variant="outlined" onChange={e => setPhoneNumber(e.target.value)} fullWidth defaultValue={patient.patient.phoneNumber} />

                                    </div>
                                    <div className="form-side-by-side">
                                        <TextField id="outlined-basic" name="homeTown" label="Home Town"
                                            variant="outlined" onChange={e => setHomeTown(e.target.value)} fullWidth defaultValue={patient.patient.homeTown} />

                                    </div>
                                </div>
                                <div className="form-text-full">
                                    <TextField id="outlined-basic" name="pastMedicalHistory" label="Past Medical History"
                                        variant="outlined" onChange={e => setPastMedicalHistory(e.target.value)} fullWidth defaultValue={patient.patient.pastMedicalHistory} />
                                </div>
                                <div className="form-text-full">
                                    <TextField id="outlined-basic" name="pastSurgicalHistory" label="Past Surgical History"
                                        variant="outlined" onChange={e => setPastSurgicalHistory(e.target.value)} fullWidth defaultValue={patient.patient.pastSurgicalHistory} />

                                </div>
                                <div className="form-text-full">
                                    <TextField id="outlined-basic" name="allergies" label="Allergies"
                                        variant="outlined" onChange={e => setAllergies(e.target.value)} fullWidth defaultValue={patient.patient.allergies} />
                                </div>
                            </div>

                            <input type="submit" value="Submit" />

                            <Dialog open={open}>
                                <DialogTitle id="alert-dialog-title">
                                    {"Success"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Patient Update successfully!
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Ok</Button>
                                </DialogActions>
                            </Dialog>
                        </form>
                    </div>
                </div >
            </div>
        )
}

export default EditPatientComponent;