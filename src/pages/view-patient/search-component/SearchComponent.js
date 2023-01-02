import './SearchComponent.css';
import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from "axios";
import { useEffect, useState } from "react";
import configData from "../../../config.json";

export function SearchCompoent({ onQuery }) {

    const [value, setValue] = React.useState(null);
    const [patinetNames, setPatientNames] = React.useState();

    const fetchData = () => {
        return axios.get(configData.SERVER_URL +"/patients/getNames")
            .then((response) => setPatientNames(response.data));
    }

    const fetchPatientList = () => {
        return axios.get(configData.SERVER_URL +"/patients/get?patientName=" + nameValue + "&&birthDay=" + birthDayValue + "&&tpNumber=" + tpNumberyValue)
            .then((response) => {
                console.log(response);
                onQuery(response.data)
            });
    }

    useEffect(() => {
        fetchData();
    }, [])

    const [birthDayValue, setBirthDayValue] = React.useState(null);
    const [nameValue, setNameValue] = React.useState(null);
    const [tpNumberyValue, setTPNumberValue] = React.useState(null);

    const [dateValue, setDateValue] = React.useState();

    const handleNameChange = (event, newInputValue) => {
        setNameValue(newInputValue);
    }

    const handleDoBChange = (e) => {
        const { D, M, Y } = e;

        setBirthDayValue(e.$D + '/' + (e.$M + 1) + '/' + e.$y);
        setValue(e);
    }

    const handleTPChange = (e) => {
        const { value } = e.target;
        setTPNumberValue(value);
    }

    const handleSubmit = async (e) => {
        fetchPatientList();
    }


    return (
        <div>
            <div class="fieldBlock">
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={patinetNames}
                    sx={{ width: 300 }}
                    variant="standard"
                    onInputChange={handleNameChange}
                    renderInput={(params) => <TextField {...params} label="Patient Name" />}
                />
            </div>

            <div class="fieldBlock">
                <TextField id="outlined-basic" label="TP Number" variant="outlined" onChange={handleTPChange} />
            </div>

            <div class="fieldBlock">

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date of Birth"
                        inputFormat="DD/MM/YYYY"
                        outputFormat="DD/MM/YYYY"
                        value={value}
                        onChange={handleDoBChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <div className='submit-button'>
                <input type="submit" value="Search" onClick={handleSubmit} />
            </div>

        </div>
    );
}

export default SearchCompoent;