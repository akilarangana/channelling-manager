import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useNavigate} from 'react-router-dom';
function createData(id, name, age, DoB, lastVisit, gender,tpNumber, isConnected) {
  return { id,name, age, DoB, lastVisit, gender, tpNumber, isConnected };
}

const data = [
  createData(1, "Saman Perera", 35, "12/12/1987", "12/3/2022", "Male","0711443774", true),
  createData(2, "Sachini Samaranayake", 23, "12/5/1999", "12/3/2022", "Female","0711443774", false),
  createData(3, "R M PunchiNona", 78, "12/2/1945", "12/3/2022", "Female","0711443774", false),
  createData(4, "W M chandrarathna", 55, "12/1/1967", "12/3/2022", "Male","0711443774", false)
];

export default function BasicTable(query) {

  const navigate = useNavigate();
  const handleChangeConnect = (row) => {
    navigate('/patientSummary',{state:{row}});
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Patient Name</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Date of Birth</TableCell>
            <TableCell align="center">Last Visited Date</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Phone Number</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        {(query.query != null && query.query.length > 0 )  && 
        <TableBody>
          {query.query.map((row) => (
            <TableRow
              key={row.patientId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.patientName}
              </TableCell>
              <TableCell align="center">{row.age}</TableCell>
              <TableCell align="center">{row.birthDay}</TableCell>
              <TableCell align="center">{row.lastVisited}</TableCell>
              <TableCell align="center">{row.gender}</TableCell>
              <TableCell align="center">{row.phoneNumber}</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color={"secondary"}
                  onClick={() => {
                    handleChangeConnect(row);
                  }}
                >
                  {"View"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        }
      </Table>
    </TableContainer>
  );
}
