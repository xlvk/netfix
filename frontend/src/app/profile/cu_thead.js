"use client";

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import BackendApiUrl from "@/routes/BackendApiUrl";

const CuTable = () => {
  const [data, setdata] = useState(undefined);
  useEffect(() => {
    const getData = async () => {
      let uid = Cookies.get("u-id");

      const res = await fetch(BackendApiUrl + "/services/requests/" + uid);

      if (res.ok) {
        let mdata = await res.json();
        setdata(mdata);
      } else {
        alert("ERROR FETCHING PROFILE");
        window.location.assign("/");
      }
    }

    getData()

    return () => {}
  }, []);

  return data === undefined ? (
    <></>
  ) : (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Data Table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Service Name</TableCell>
              <TableCell align="center">FOW</TableCell>
              <TableCell align="center">Date Of Request</TableCell>
              <TableCell align="center">Service Cost ($)</TableCell>
              <TableCell align="center">Service Provider</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.request_history.map((elem) => (
              <TableRow key={elem.service_id}>
                <TableCell align="center">{elem.service_name}</TableCell>
                <TableCell align="center">{elem.service_field}</TableCell>
                <TableCell align="center">{elem.date_of_request}</TableCell>
                <TableCell align="center">
                  {elem.calculated_service_cost}
                </TableCell>
                <TableCell align="center">{elem.company}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CuTable;
