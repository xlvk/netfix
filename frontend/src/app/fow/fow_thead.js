"use client";

import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";

const FowTable = ({ data }) => {
  console.log(data);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Data Table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Service Name</TableCell>
              <TableCell align="center">Company Name</TableCell>
              <TableCell align="center">Price ($/hr)</TableCell>
              <TableCell align="center">Number Of Requests</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.ma.map((elem) => (
              <TableRow key={elem.service_id}>
                <TableCell align="center">{elem.service_name}</TableCell>
                <TableCell align="center">{elem.company_name}</TableCell>
                <TableCell align="center">{elem.service_price}</TableCell>
                <TableCell align="center">{elem.service_reqnum}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default FowTable;
