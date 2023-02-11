import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import { useEffect, useState } from "react";
import './add-drug-component.css';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import configData from "../../config.json";

export function AddDDrugToInventoryComponent() {

    const [open, setOpen] = React.useState(false);
    const [drugNames, setDrugNames] = React.useState();

    const [drug, setDrug] = React.useState(null);
    const [qty, setQty] = React.useState();
    const [expiryDate, setExpiryDate] = React.useState();

    const fetchData = () => {
        return axios.get(configData.SERVER_URL + "/drugs/getnames")
            .then((response) => setDrugNames(response.data));
    }

    useEffect(() => {
        fetchData();
    }, [])

    const [state, setState] = React.useState({
        qty: '',
        expiryDate: ''
    });

    const handleQtyChange = (e) => {
        const { name, value } = e.target;
        setQty(value)
    }

    const handleExpiriyDateChange = (e) => {
        const { name, value } = e.target;
        setExpiryDate(value)
    }

    const handleNameChange = (event, newInputValue) => {
        setDrug(newInputValue)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(state)
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        try {
            let res = await fetch(configData.SERVER_URL + "/inventory/create", {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    expiryDate: expiryDate,
                    qty: qty,
                    orderedDate: today,
                    availableQty: 0,
                    drug: drug
                })
            });
            let resJson = await res.json();
            if (res.status === 200) {
                handleSuccess();
            } else {
                alert('Some error occured.');
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleSuccess = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="drawerFormDiv">
            <h3 style={{ textAlign: "center" }} >Add Drugs Inventory</ h3>
            <div className="innerFormAddDrug">
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="full-width">
                            

                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={drugNames}
                                fullWidth
                                required
                                variant="standard"
                                onChange={handleNameChange}
                                value={drug}
                                renderInput={(params) => <TextField {...params} label="Drug" />}
                            />
                        </div>
                        <div className="full-width">
                            <TextField id="outlined-basic" name="qty" label="Quantity"
                                variant="outlined" onChange={handleQtyChange} fullWidth required />
                        </div>
                        <div className="full-width">
                            <TextField id="outlined-basic" name="expiryDate" label="Expiry Date (DD/MM/YYYY)"
                                variant="outlined" onChange={handleExpiriyDateChange} fullWidth required />
                        </div>
                        <input type="submit" value="Submit" />
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                Drug Inventory Added Successfully!
                            </Alert>
                        </Snackbar>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddDDrugToInventoryComponent;