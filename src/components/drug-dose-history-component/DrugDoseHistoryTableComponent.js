import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function DrugDoseHistoryTableComponent(rows) {
    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Drug Name</TableCell>
                <TableCell align="center">Times</TableCell>
                <TableCell align="center">Qty</TableCell>
                <TableCell align="center">Number of Days</TableCell>
              </TableRow>
            </TableHead>
            
            {(rows.rows != null && rows.rows.length > 0 )  && 
            <TableBody>
              {rows.rows.map((row) => (
                <TableRow
                  key={row.prescription_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.drug.drugName} - {row.drug.shortCode} - {row.drug.weightPerTablet}
                  </TableCell>
                  <TableCell align="center">{row.times}</TableCell>
                  <TableCell align="center">{row.qty}</TableCell>
                  <TableCell align="center">{row.numOfDays}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            }
          </Table>
        </TableContainer>
      );
}