import React, { Component } from "react";
import NavBarComponent from "../nav-bar/NavBarComponent";
import './AddNewPatient.css';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import configData from "../../config.json";
import DrugDoseComponent from "../../components/drug-dose-component/DrugDoseComponent";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

class AddNewPatientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientName: '',
            age: '',
            birthDay: '',
            gender: '',
            phoneNumber: '',
            homeTown: '',
            pastMedicalHistory: '',
            pastSurgicalHistory: '',
            allergies: '',
            symptoms: '',
            prescriptions: '',
            open: false,
            formErrors: {},
            prescriptionList: {},
            patientId: '',
            notes: ''
        };
        this.initialState = this.state;
    }



    handleFormValidation() {
        const { patientName, age } = this.state;
        let formErrors = {};
        let formIsValid = true;

        //Student name     
        if (!patientName) {
            formIsValid = false;
            formErrors["nameErr"] = "Name is required.";
        }

        //Age    
        if (!age) {
            formIsValid = false;
            formErrors["ageErr"] = "Age is required.";
        }

        this.setState({ formErrors: formErrors });
        return formIsValid;
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleBirthdayChane = (e) => {
        const { name, value } = e.target;
        var res = value.split("/");
        if (res.length == 1 && value.length == 4) {
            this.setState({ [name]: value + "/" });
        }
        else if (res.length == 2 && value.length == 7) {
            this.setState({ [name]: value + "/" });
        }
        else {
            this.setState({ [name]: value });
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state.prescriptionList);
        if (this.handleFormValidation()) {

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
            try {
                let res = await fetch(configData.SERVER_URL + "/patients/create", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json, text/plain',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify({
                        patientName: this.state.patientName,
                        age: this.state.age,
                        birthDay: this.state.birthDay,
                        gender: this.state.gender,
                        phoneNumber: this.state.phoneNumber,
                        homeTown: this.state.homeTown,
                        pastMedicalHistory: this.state.pastMedicalHistory,
                        pastSurgicalHistory: this.state.pastSurgicalHistory,
                        allergies: this.state.allergies,
                        lastVisited: today,
                        visitData: {
                            visitDate: today,
                            symptoms: this.state.symptoms,
                            prescriptions: this.state.prescriptions,
                            prescriptionList: this.state.prescriptionList.rows,
                            notes: this.state.notes,
                        }

                    })
                });
                let resJson = await res.json();
                if (res.status === 200) {
                    this.setState(this.initialState);
                    this.setState({ patientId: resJson });
                    this.handleSuccess(true);
                } else {
                    alert('Some error occured.');
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    handleSuccess = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    callbackFunction = (childData) => {
        this.setState({ prescriptionList: childData })
    }

    render() {

        const { nameErr, ageErr } = this.state.formErrors;

        return (
            <div>
                <NavBarComponent />
                <div className="formDiv">
                    <h3 style={{ textAlign: "center" }} >Register New Patient</ h3>
                    <div className="innerForm">
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <div className="full-width">
                                    <div className="form-side-by-side">

                                        <TextField id="outlined-basic" name="patientName" label="Name of the Patient"
                                            variant="outlined" onChange={this.handleChange} fullWidth value={this.state.patientName} />
                                        {nameErr &&
                                            <div style={{ color: "red", paddingBottom: 10 }}>{nameErr}</div>
                                        }


                                    </div>
                                    <div className="form-side-by-side">


                                        <TextField id="outlined-basic" name="age" label="Patient Age"
                                            variant="outlined" onChange={this.handleChange} fullWidth value={this.state.age} />
                                        {ageErr &&
                                            <div style={{ color: "red", paddingBottom: 10 }}>{ageErr}</div>
                                        }

                                    </div>
                                </div>

                                <div className="full-width">
                                    <div className="form-side-by-side">
                                        <TextField id="outlined-basic" name="birthDay" label="Birth Day (YYYY/MM/DD)"
                                            variant="outlined" onChange={this.handleBirthdayChane} fullWidth value={this.state.birthDay} />
                                    </div>


                                    <div className="form-side-by-side">
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                                <Select
                                                    name="gender"
                                                    value={this.state.gender}
                                                    label="Gender"
                                                    onChange={this.handleChange}>
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
                                            variant="outlined" onChange={this.handleChange} fullWidth value={this.state.phoneNumber} />

                                    </div>
                                    <div className="form-side-by-side">
                                        <TextField id="outlined-basic" name="homeTown" label="Home Town"
                                            variant="outlined" onChange={this.handleChange} fullWidth value={this.state.homeTown} />

                                    </div>
                                </div>
                                <div className="form-text-full">
                                    <TextField id="outlined-basic" name="pastMedicalHistory" label="Past Medical History"
                                        variant="outlined" onChange={this.handleChange} fullWidth value={this.state.pastMedicalHistory} />
                                </div>
                                <div className="form-text-full">
                                    <TextField id="outlined-basic" name="pastSurgicalHistory" label="Past Surgical History"
                                        variant="outlined" onChange={this.handleChange} fullWidth value={this.state.pastSurgicalHistory} />

                                </div>
                                <div className="form-text-full">
                                    <TextField id="outlined-basic" name="allergies" label="Allergies"
                                        variant="outlined" onChange={this.handleChange} fullWidth value={this.state.allergies} />
                                </div>
                                <div className="full-width">
                                    <div className="form-side-by-side">
                                        <div>
                                            <p><label htmlFor="symptoms">Symptoms</label></p>
                                            <textarea name="symptoms" rows="4" onChange={this.handleChange} value={this.state.symptoms}></textarea>
                                        </div>

                                    </div>
                                    <div className="form-side-by-side">
                                        <div>
                                            <p><label htmlFor="notes">Notes</label></p>
                                            <textarea name="notes" rows="4" onChange={this.handleChange} value={this.state.notes}></textarea>
                                        </div>

                                    </div>
                                </div>
                                <div className="form-text-full">
                                    <p><label htmlFor="prescriptions">Prescriptions</label></p>
                                    <DrugDoseComponent parentCallback={this.callbackFunction} />
                                </div>
                            </div>

                            <input type="submit" value="Submit" />

                            <Dialog open={this.state.open}>
                                <DialogTitle id="alert-dialog-title">
                                    {"Success"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Patient Added successfully! Patient ID is {this.state.patientId}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose}>Ok</Button>
                                </DialogActions>
                            </Dialog>
                        </form>
                    </div>
                </div >
            </div>
        )
    }
}

export default AddNewPatientForm;