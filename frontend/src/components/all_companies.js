"use client";

import BackendApiUrl from "@/routes/BackendApiUrl";
import CompanyCard from "./company_card";
import style from "@/styles/page.module.css";
import { montsBold } from "@/styles/fonts";
import React, { useEffect, useState } from "react";

const AllCompanies = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(BackendApiUrl + "/services/all", {
        method: "GET",
      });

      if (res.ok) {
        let mdata = await res.json();
        console.log(mdata);
        setdata(mdata.ma);
      } else {
        alert("ERROR FETCHING MOST REQUESTED");
        console.error(res.status, res.statusText);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return (
    <>
      <div className={`${style.mostRequestedWrapper}`}>
        <div>
          <h1 className={`${style.mreqtitle} ${montsBold.className}`}>
            All Per Company
          </h1>
        </div>
        <div className={style.mreqgrid}>
          {data.map((elem) => (
            <div className={style.mreqwrap} key={elem.id}>
              <CompanyCard data={elem} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllCompanies;
