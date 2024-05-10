"use client";

import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";

import { DoServiceRequest } from "@/logic/service_interactions";

const CoTable = ({ data }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Data Table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Service Name</TableCell>
              <TableCell align="center">Service description</TableCell>
              <TableCell align="center">FOW</TableCell>
              <TableCell align="center">Price ($/hr)</TableCell>
              <TableCell align="center">Number Of Requests</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.co_details.company_services.map((elem) => (
              <>
                <TableRow
                  key={elem.service_id}
                  onClick={() => DoServiceRequest(elem.company_id, elem.id)}
                >
                  <TableCell align="center">{elem.service_name}</TableCell>
                  <TableCell align="center">{elem.service_desc}</TableCell>
                  <TableCell align="center">{elem.service_FOW}</TableCell>
                  <TableCell align="center">{elem.service_price}</TableCell>
                  <TableCell align="center">
                    {elem.service_requestNum}
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CoTable;
