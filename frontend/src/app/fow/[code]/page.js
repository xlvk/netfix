"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import style from "@/styles/page.module.css";
import { monts } from "@/styles/fonts";
import BackendApiUrl from "@/routes/BackendApiUrl";
import FowTable from "../fow_thead";

const page = () => {
  const [data, setdata] = useState(undefined);
  const fow = usePathname().split("/");

  useEffect(() => {
    const fetchFOW = async () => {
      console.log(fow[fow.length - 1]);
      const res = await fetch(
        BackendApiUrl + `/field-of-work/${fow[fow.length - 1]}/services`,
        {
          method: "GET",
        }
      );
      if (res.status === 404) {
        console.error("fow data Not found");
      } else {
        let mdata = await res.json();
        console.log(mdata);
        setdata(mdata);
      }
    };

    fetchFOW();

    return () => {};
  }, []);

  return data === undefined ? (
    <></>
  ) : (
    <div className={style.profilePage}>
      <div className={style.tableWrapper}>
        <h5 className={monts.className}>
          Field Of Work Code: {fow[fow.length - 1]}
        </h5>
        <FowTable data={data} />
      </div>
    </div>
  );
};

export default page;
