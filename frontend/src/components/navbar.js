"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { Menu, MenuItem } from "@mui/material";

import { Mono, Sans } from "@/styles/fonts";
import style from "@/styles/page.module.css";
import BackendApiUrl from "@/routes/BackendApiUrl";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fows, setfows] = useState([]);
  const is_company = Cookies.get("user-type") === "CO";
  const uname = Cookies.get("user-name");

  const [anchorEl, setAnchorEl] = useState(null);
  const fowopen = Boolean(anchorEl);
  const handleFOWopen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFOWClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const loggedInCookie = Cookies.get("logged-in");
    setIsLoggedIn(!!loggedInCookie);

    const getFows = async () => {
      try {
        const response = await fetch(BackendApiUrl + "/field-of-work/");
        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();
        let arr = [];
        data.map((element) => {
          if (element.code !== "AIO") {
            arr.push({
              displayName: element.name,
              ucode: element.code,
            });
          }
        });
        console.log(arr);
        setfows(arr);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getFows();

    return () => {};
  }, []);

  return (
    <div className={style.nav}>
      <div className={`${style.logo} ${Mono.className}`}>NETFIX</div>
      <div className={`${style.navoptions} ${Sans.className}`}>
        <div className={style.navoption}>
          {isLoggedIn ? (
            <Link
              href={is_company ? `/company/${uname}` : "/profile"}
              className={`${style.unavroute}`}
            >
              PROFILE
            </Link>
          ) : (
            <div>
              <Link href={"/login"} className={`${style.unavroute}`}>
                PROFILE
              </Link>
            </div>
          )}
        </div>
        <div className={style.navoption}>
          <div onClick={handleFOWopen}>SERVICES</div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={fowopen}
            onClick={handleFOWClose}
            onClose={handleFOWClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {fows.map((elem) => (
              <MenuItem key={elem.ucode}>
                <Link href={`/fow/${elem.ucode}`} className={style.fowoption}>
                  {elem.displayName}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </div>
        <div className={style.navoption}>
          <Link href={"/"} className={`${style.unavroute}`}>
            HOME
          </Link>
        </div>
      </div>

      <div className={`${style.profile}`}>
        {isLoggedIn ? (
          <Link
            href={"/logout"}
            className={`${style.navroute} ${Sans.className}`}
          >
            Log Out
          </Link>
        ) : (
          <Link
            href={"/login"}
            className={`${style.navroute} ${Sans.className}`}
          >
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
