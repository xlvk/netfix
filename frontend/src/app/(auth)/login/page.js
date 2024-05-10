"use client";

import { useState } from "react";
import Link from "next/link";

import style from "@/styles/page.module.css";
import BackendAuthUrl from "@/routes/BackendAuthUrl";
import { SetCookies } from "@/logic/cookies";
import { Mono, Sans } from "@/styles/fonts";

const page = () => {
  const [cred, setcred] = useState("");
  const [pass, setPass] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "cred") {
      setcred(value);
    } else if (name === "password") {
      setPass(value);
    }
  };

  const handleLogin = async () => {
    const response = await fetch(BackendAuthUrl + "/login", {
      method: "POST",
      body: JSON.stringify({
        credential: cred,
        password: pass,
      }),
    });

    if (response.ok) {
      SetCookies(await response.json());
      window.location.assign("/");
    } else if (response.status === 401) {
      alert("Incorrect Credentials, Please Try Again");
      return;
    }
  };

  return (
    <div className={style.form}>
      <input
        type="text"
        name="cred"
        id="cred"
        value={cred}
        placeholder="Username/Email"
        className={style.tinput}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
        className={style.tinput}
        onChange={handleInputChange}
      />
      <button
        type={"button"}
        className={`${style.sbtn} ${Mono.className}`}
        onClick={() => handleLogin()}
      >
        Log In
      </button>
      <div>
        <Link href={"/signup"} className={`${style.route} ${Sans.className}`}>
          Or Sign Up Instead
        </Link>
      </div>
    </div>
  );
};

export default page;
