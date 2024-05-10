"use client";

import React, { useEffect } from "react";

import style from "@/styles/page.module.css";
import { monts } from "@/styles/fonts";
import CuTable from "./cu_thead";
import Cookies from "js-cookie";

const page = () => {
  let data = {
    email: Cookies.get("email"),
    username: Cookies.get("user-name"),
    DOB: Cookies.get("DOB"),
  };

  useEffect(() => {
    if (Cookies.get("user-type") === "CO") {
      window.location.assign(`/company/${data.username}`);
    }
  }, []);

  return (
    <div className={style.profilePage}>
      <div className={`${style.profileBasicInfo} ${monts.className}`}>
        <div className={style.profilerow}>{data.email}</div>
        <div className={style.profilerow}>{data.username} </div>
        <div className={style.profilerow}>{data.DOB}</div>
      </div>
      <div className={style.tableWrapper}>
        <h5 className={monts.className}>Previously Requested Services</h5>
        <CuTable />
      </div>
    </div>
  );
};

export default page;
