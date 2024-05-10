"use client";

import { ClearCookies } from "@/logic/cookies";
import Cookies from "js-cookie";

const page = () => {
  if (Cookies.get("logged-in")) {
    ClearCookies();
    alert("Successful Logout");
  } else {
    window.location.assign("/");
  }
};

export default page;
