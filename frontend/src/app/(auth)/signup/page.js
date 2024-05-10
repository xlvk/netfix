"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Mono, Sans } from "@/styles/fonts";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

import style from "@/styles/page.module.css";
import BackendAuthUrl from "@/routes/BackendAuthUrl";
import BackendApiUrl from "@/routes/BackendApiUrl";
import { isBeforeToday } from "@/logic/dob";

const page = () => {
  const [checked, setChecked] = useState(false);
  const [DOB, setDOB] = useState(new Date());
  const [FOW, setFOW] = useState("");
  const [FOW_ARR, setFOW_ARR] = useState([]);
  const [uname, setuname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [cpass, setcpass] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "uname") {
      setuname(value);
    } else if (name === "password") {
      setpass(value);
    } else if (name === "email") {
      setemail(value);
    } else if (name === "cpass") {
      setcpass(value);
    } else if (name === "DOB") {
      setDOB(value);
    } else if (name === "FOW") {
      console.log(value);
      setFOW(value);
    }
  };

  const revUserType = () => {
    setChecked(!checked);
  };

  const handleSignup = async () => {
    if (pass !== cpass) {
      alert("Your passwords do not match, try again");
    } else if (!isBeforeToday(DOB) && !checked) {
      alert("Invalid Date Of Birth")
    } else {
      const rbody = {
        username: uname,
        email: email,
        password: pass,
      };
      ///NOTE - checked === user is a company
      if (checked) {
        rbody["user_type"] = "CO";
        if (!FOW) {
          alert("FOW IS REQUIRED")
          return
        }
        rbody["field_of_work"] = FOW;
      } else {
        rbody["user_type"] = "CU";
        rbody["DOB"] = DOB;
      }
      // POST Request to Backend Auth
      const response = await fetch(BackendAuthUrl + "/signup", {
        method: "POST",
        body: JSON.stringify(rbody),
      });

      if (response.status === 201) {
        window.location.assign("/login");
      } else {
        let message = await response.json();
        let errormsgArray = message.message;
        errormsgArray.forEach((element) => {
          alert(element);
        });
      }
    }
  };

  // Define the async function outside useEffect

  useEffect(() => {
    try {
      const GetAllValidFOW = async () => {
        try {
          const response = await fetch(BackendApiUrl + "/field-of-work/");
          if (!response.ok) {
            if (response.status === 409) {
              alert("Username / email is already used, try something else");
            } else if (response.status === 400) {
              let errdata = await response.json();
              alert("ERROR:", errdata.message);
            }
            throw new Error("API request failed");
          }

          const data = await response.json();
          const validFOWs = data.map((element) => ({
            displayName: element.name,
            ucode: element.code,
          }));
          console.log(validFOWs);
          setFOW_ARR(validFOWs);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      GetAllValidFOW();
      return () => {};
    } catch (error) {
      console.error("Error inside useEffect:", error);
    }
  }, []);

  return (
    <div className={style.form}>
      <div className={style.uchoice}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Switch color="primary" onClick={() => revUserType()} />
        </ThemeProvider>
        <h6>Company?</h6>
      </div>
      <div className={style.tgroup}>
        <input
          type="text"
          name="uname"
          id="uname"
          value={uname}
          placeholder="Username"
          className={style.tinput}
          onChange={handleInputChange}
          required={true}
        />
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="email"
          className={style.tinput}
          onChange={handleInputChange}
          required={true}
        />
      </div>
      <div className={style.tgroup}>
        <input
          type="password"
          name="password"
          value={pass}
          id="password"
          placeholder="password"
          light
          className={style.tinput}
          onChange={handleInputChange}
          required={true}
        />
        <input
          type="password"
          name="cpass"
          id="cpass"
          value={cpass}
          placeholder="Confirm Password"
          className={style.tinput}
          onChange={handleInputChange}
          required={true}
        />
      </div>

      {!checked ? (
        <input
          type="date"
          name="DOB"
          id="DOB"
          value={DOB}
          className={`${style.tinput} ${style.dpicker}`}
          onChange={handleInputChange}
          required={true}
        />
      ) : (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <FormControl sx={{ minWidth: 220 }} required={true}>
            <InputLabel>Field Of Work</InputLabel>
            <Select
              value={FOW}
              label="Field Of Work"
              name="FOW"
              required={true}
              onChange={handleInputChange}
              renderValue={(selected) => {
                return <em>{selected}</em>;
              }}
            >
              {FOW_ARR.map((fow) => (
                <MenuItem key={fow.ucode} value={fow.ucode}>
                  {fow.displayName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ThemeProvider>
      )}

      <button
        type={"button"}
        className={`${style.sbtn} ${Mono.className}`}
        onClick={() => handleSignup()}
      >
        Sign Up
      </button>
      <div>
        <Link href={"/login"} className={`${style.route} ${Sans.className}`}>
          Or Log In Instead
        </Link>
      </div>
    </div>
  );
};

export default page;
