"use client";

import Cookies from "js-cookie";

import React, { useState, useEffect } from "react";

import "./globals.css";
import MostRequested from "@/components/most_requested";
import { monts } from "@/styles/fonts";
import NewestFirst from "@/components/recent_created";
import { Button } from "@mui/material";
import AllCompanies from "@/components/all_companies";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // TODO - Rename this variable
  const [onmreq, setonmreq] = useState(0);

  const handleSorting = () => {
    if (onmreq === 2) {
      setonmreq(0);
      return;
    }
    setonmreq(onmreq + 1);
  };

  useEffect(() => {
    const loggedInCookie = Cookies.get("logged-in");
    setIsLoggedIn(!!loggedInCookie); // Check and set login state
  }, []);

  return (
    <>
      <div className="indexTalk">
        <div className={`${monts.className}`}>NETFIX</div>
      </div>

      {isLoggedIn ? (
        <>
          <div className="sortContainer">
            <Button onClick={handleSorting}>Switch Sorting</Button>
          </div>
          {onmreq === 0 ? (
            <NewestFirst />
          ) : onmreq === 1 ? (
            <MostRequested />
          ) : (
            <AllCompanies />
          )}
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Home;
