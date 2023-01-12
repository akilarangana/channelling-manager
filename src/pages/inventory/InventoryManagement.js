import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Paper from "@mui/material/Paper";
import './inventory-management.css';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import DrugDoseComponent from "../../components/drug-dose-component/DrugDoseComponent";
import AddDNewDrugComponent from "../../components/add-drug-components/AddDrugComponent";
import AddDDrugToInventoryComponent from "../../components/add-drug-components/AddDrugToInventoryComponent";
import NavBarComponent from "../nav-bar/NavBarComponent";
import configData from "../../config.json";

export function InventoryManagement() {

    const [drugNames, setDrugNames] = React.useState();
    const [drugName, setDrugName] = React.useState();
    const [rows, setRows] = React.useState([]);
    const [openAddDrugDrawer, setOpenAddDrugDrawer] = React.useState(false);
    const [openAddDrugToInventoryDrawer, setOpenAddDrugToInventoryDrawer] = React.useState(false);

    const fetchData = () => {
        return axios.get(configData.SERVER_URL +"/drugs/getNames")
            .then((response) => setDrugNames(response.data));
    }
    
    const fetcInventory = () => {
        return axios.get(configData.SERVER_URL +"/inventory/getAll")
            .then((response) => setRows(response.data));
    }
    useEffect(() => {
        fetchData();
        fetcInventory()
    }, [])

    const handleNameChange = (event, newInputValue) => {
        setDrugName(newInputValue);
    }

    const handleDrugSearch = async (e) => {

    }

    const toggleAddNewDrugDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenAddDrugDrawer(open);
    };
    const toggleAddDrugToInventoryDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenAddDrugToInventoryDrawer(open);
    };

    const addNewDrugComp = () => (
        <Box
            sx={{ width: 500 }}
            role="presentation"
        >
            <AddDNewDrugComponent />
        </Box>
    );

    const addNDrugToInventoryComp = () => (
        <Box
            sx={{ width: 500 }}
            role="presentation"
        >
            <AddDDrugToInventoryComponent />
        </Box>
    );

    return (
        <div>
            <NavBarComponent />
            <div className="main-div">
                <div className="add-drug-div">
                    <Button variant="contained" onClick={toggleAddNewDrugDrawer(true)} id="add-drug-button">Add New Drug</Button>
                    <Button variant="contained" onClick={toggleAddDrugToInventoryDrawer(true)} >Add Drug to Inventory</Button>


                </div>
                <div>
                    <Drawer
                        anchor="right"
                        open={openAddDrugDrawer}
                        onClose={toggleAddNewDrugDrawer(false)}
                    >
                        {addNewDrugComp()}
                    </Drawer>
                    <Drawer
                        anchor="right"
                        open={openAddDrugToInventoryDrawer}
                        onClose={toggleAddDrugToInventoryDrawer(false)}
                    >
                        {addNDrugToInventoryComp()}
                    </Drawer>
                </div>
                <div>
                    <div class="fieldBlock">
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={drugNames}
                            sx={{ width: 250 }}
                            variant="standard"
                            onInputChange={handleNameChange}
                            renderInput={(params) => <TextField {...params} label="Drug Name" />}
                        />
                    </div>
                    <div >
                        <Button variant="contained" onClick={handleDrugSearch} id="drug-add-button">Search</Button>
                    </div>
                </div>
                <div className="table-div">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Drug Name</TableCell>
                                    <TableCell align="center">Short Code</TableCell>
                                    <TableCell align="center">Initial Qty</TableCell>
                                    <TableCell align="center">Available Qty</TableCell>
                                    <TableCell align="center">Expiry Date</TableCell>
                                    <TableCell align="center">Weight per Tablet</TableCell>
                                    <TableCell align="center">Ordered Date</TableCell>
                                </TableRow>
                            </TableHead>
                            {(rows != null && rows.length > 0) &&
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.drugId}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.drug.drugName}
                                            </TableCell>
                                            <TableCell align="center">{row.drug.shortCode}</TableCell>
                                            <TableCell align="center">{row.qty}</TableCell>
                                            <TableCell align="center">{row.availableQty}</TableCell>
                                            <TableCell align="center">{row.expiryDate}</TableCell>
                                            <TableCell align="center">{row.drug.weightPerTablet}</TableCell>
                                            <TableCell align="center">{row.orderedDate}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            }
                        </Table>
                    </TableContainer>
                </div>

            </div>
        </div>

    );
}


export default InventoryManagement;