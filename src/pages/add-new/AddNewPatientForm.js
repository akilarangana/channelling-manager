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
            formErrors: {}
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

    handleSubmit = async (e) => {
        e.preventDefault();
        if (this.handleFormValidation()) {

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
            try {
                let res = await fetch(configData.SERVER_URL +"/patients/create", {
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
                            prescriptions: this.state.prescriptions
                        }
                    })
                });
                let resJson = await res.json();
                if (res.status === 200) {
                    this.setState(this.initialState);
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
                                            variant="outlined" onChange={this.handleChange} fullWidth value={this.state.patientName}/>
                                        {nameErr &&
                                            <div style={{ color: "red", paddingBottom: 10 }}>{nameErr}</div>
                                        }


                                    </div>
                                    <div className="form-side-by-side">


                                        <TextField id="outlined-basic" name="age" label="Patient Age"
                                            variant="outlined" onChange={this.handleChange} fullWidth value={this.state.age}/>
                                        {ageErr &&
                                            <div style={{ color: "red", paddingBottom: 10 }}>{ageErr}</div>
                                        }

                                    </div>
                                </div>

                                <div className="full-width">
                                    <div className="form-side-by-side">
                                        <TextField id="outlined-basic" name="birthDay" label="Birth Day (DD/MM/YYYY)"
                                            variant="outlined" onChange={this.handleChange} fullWidth value={this.state.birthDay}/>
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
                                        <p><label htmlFor="symptoms">Symptoms</label></p>
                                        <textarea name="symptoms" rows="4" onChange={this.handleChange} value={this.state.symptoms}></textarea>
                                    </div>

                                    <div className="form-side-by-side">
                                        <p><label htmlFor="prescriptions">Prescriptions</label></p>
                                        <textarea name="prescriptions" rows="4" onChange={this.handleChange} value={this.state.prescriptions}></textarea>
                                    </div>
                                </div>

                            </div>

                            <input type="submit" value="Submit" />
                            <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                                <Alert onClose={this.handleClose} severity="success" sx={{ width: '100%' }}>
                                    Patient Added successfully!
                                </Alert>
                            </Snackbar>
                        </form>
                    </div>
                </div >
            </div>
        )
    }
}

export default AddNewPatientForm;