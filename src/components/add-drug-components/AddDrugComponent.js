import * as React from 'react';
import TextField from '@mui/material/TextField';
import './add-drug-component.css';
import configData from "../../config.json";
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import axios from "axios";

export function AddDNewDrugComponent() {


    const [open, setOpen] = React.useState(false);
    const [drugName, setDrugName] = React.useState();
    const [shortCode, setShortCode] = React.useState();
    const [weightPerTablet, setWeightPerTablet] = React.useState();

    const handleNameChange = (e) => {
        const { value } = e.target;
        setDrugName(value);
    }
    const handleCodeChange = (e) => {
        const { value } = e.target;
        setShortCode(value);
    }
    const handleWeightChange = (e) => {
        const { value } = e.target;
        setWeightPerTablet(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        try {
            let res = await fetch(configData.SERVER_URL + "/drugs/create", {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    drugName: drugName,
                    shortCode: shortCode,
                    weightPerTablet: weightPerTablet,

                })
            });
            let resJson = await res.json();
            if (res.status === 200) {
                handleSuccess();
                setDrugName('');
                setShortCode('');
                setWeightPerTablet('');
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
            <h3 style={{ textAlign: "center" }} >Add New Drug</ h3>
            <div className="innerFormAddDrug">
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="full-width">

                            <TextField id="outlined-basic" name="drugName" label="Name of the Drug"
                                variant="outlined" onChange={handleNameChange} fullWidth required value={drugName} />

                        </div>
                        <div className="full-width">
                            <TextField id="outlined-basic" name="shortCode" label="Short Code"
                                variant="outlined" onChange={handleCodeChange} fullWidth required value={shortCode} />
                        </div>
                        <div className="full-width">
                            <TextField id="outlined-basic" name="weightPerTablet" label="Weight per Tablet"
                                variant="outlined" onChange={handleWeightChange} fullWidth required value={weightPerTablet} />
                        </div>
                        <input type="submit" value="Submit" />
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                Drug Entry Added Successfully!
                            </Alert>
                        </Snackbar>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddDNewDrugComponent;