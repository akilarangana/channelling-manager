import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import './drugComponent.css';
import configData from "../../config.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { Co2Sharp } from '@mui/icons-material';

export function DrugDoseComponent( {parentCallback} ) {

    const [value, setValue] = React.useState(null);
    const [drugNames, setDrugNames] = React.useState();

    const [qty, setQty] = React.useState(null);
    const [times, setTimes] = React.useState(null);
    const [numOfDays, setNumOfDays] = React.useState(null);
    const [drugName, setDrugName] = React.useState(null);

    const [rows, setRows] = React.useState([]);

    const fetchData = () => {
        return axios.get(configData.SERVER_URL +"/drugs/getNames")
            .then((response) => {
                setDrugNames(response.data)
                console.log(response.data)
            });
    }

    useEffect(() => {
        fetchData();
    }, [])

    function createData(drug, times, qty, numOfDays, isConnected) {
        return { drug, times, qty, numOfDays, isConnected };
    }

    const handleNameChange = (event, newInputValue) => {
        setDrugName(newInputValue);
    }

    const handleTimesChange = (e) => {
        const { value } = e.target;
        setTimes(value);
    }

    const handleQtyChange = (e) => {
        const { value } = e.target;
        setQty(value);
    }

    const handleNumOfDaysChange = (e) => {
        const { value } = e.target;
        setNumOfDays(value);
    }

    const handleDrugAdd = (e) => {

        rows.push(createData(drugName, times, qty, numOfDays, true));
        console.log('rows', rows);
        parentCallback({rows});
        setDrugName('');
        setTimes('');
        setQty('');
        setNumOfDays('');
    }

    const handleDeleteRow = (row) => {
        var filtered = rows.filter(e => e !== row)
        setRows(filtered)
        parentCallback(filtered);
    }

    return (
        <div>

            <div>
                <div class="fieldBlock">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={drugNames}
                        sx={{ width: 250 }}
                        variant="standard"
                        onChange={handleNameChange}
                        value={drugName}
                        renderInput={(params) => <TextField {...params} label="Drug" />}
                    />
                </div>

                <div class="fieldBlock">
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Times</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={times}
                                label="Times"
                                onChange={handleTimesChange}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                </div>

                <div class="fieldBlock">
                    <Box sx={{ minWidth: 100 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Qty</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={qty}
                                label="Qty"
                                onChange={handleQtyChange}
                            >
                                <MenuItem value={1 / 2}>1/2</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                </div>

                <div class="fieldBlock">
                    <Box sx={{ minWidth: 150 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Num of Days</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={numOfDays}
                                label="Num of Days"
                                onChange={handleNumOfDaysChange}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div >
                <Button variant="contained" onClick={handleDrugAdd} id="drug-add-button">Add</Button>
                </div>
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Drug</TableCell>
                                <TableCell align="center">Times</TableCell>
                                <TableCell align="center">Qty</TableCell>
                                <TableCell align="center">Num of Days</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        {(rows != null && rows.length > 0) &&
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.drug.drugId}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.drug.drugName}
                                        </TableCell>
                                        <TableCell align="center">{row.times}</TableCell>
                                        <TableCell align="center">{row.qty}</TableCell>
                                        <TableCell align="center">{row.numOfDays}</TableCell>
                                        <TableCell align="center">
                                            <IconButton aria-label="delete" onClick={() => {
                                                    handleDeleteRow(row);
                                                }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        }
                    </Table>
                </TableContainer>
            </div>

        </div>);
}

export default DrugDoseComponent;