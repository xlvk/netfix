"use client";

import React, { useEffect, useState } from "react";

import style from "@/styles/page.module.css";
import { montsBold } from "@/styles/fonts";
import CompanyCard from "./company_card";
import BackendApiUrl from "@/routes/BackendApiUrl";

const MostRequested = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(BackendApiUrl + "/services/sorted_by_requests", {
        method: "GET",
      });

      if (res.ok) {
        let mdata = await res.json();
        console.log(mdata);
        setdata(mdata.most_req);
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
            Most Requested
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

export default MostRequested;
