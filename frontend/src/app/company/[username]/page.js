"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import CoTable from "../co_thead";
import style from "@/styles/page.module.css";
import { monts } from "@/styles/fonts";
import BackendApiUrl from "@/routes/BackendApiUrl";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import { DoServiceCreate } from "@/logic/service_interactions";

const page = () => {
  const [data, setdata] = useState(undefined);
  const companyName = usePathname().split("/");

  useEffect(() => {
    const fetchCompanyData = async () => {
      console.log(companyName[companyName.length - 1]);
      const res = await fetch(
        BackendApiUrl + `/profile/${companyName[companyName.length - 1]}`,
        {
          method: "GET",
        }
      );
      if (res.status === 404) {
        alert("Profile Not found");
        window.location.assign("/");
      } else {
        let mdata = await res.json();
        console.log(mdata);
        setdata(mdata);
      }
    };

    fetchCompanyData();

    return () => {};
  }, []);

  return data === undefined ? (
    <></>
  ) : (
    <div className={style.profilePage}>
      <div className={`${style.profileBasicInfo} ${monts.className}`}>
        <div className={style.profilerow}>{data.email}</div>
        <div className={style.profilerow}>{data.username} </div>
        <div className={style.profilerow}>{data.FOW}</div>
        {companyName[companyName.length - 1] === Cookies.get("user-name") ? (
          <Button onClick={DoServiceCreate}>Create Service</Button>
        ) : (
          <div></div>
        )}
      </div>
      <div className={style.tableWrapper}>
        <h5 className={monts.className}>Services Offered</h5>
        <CoTable data={data} />
      </div>
    </div>
  );
};

export default page;
