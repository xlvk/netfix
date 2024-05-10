import React from "react";
import "./globals.css";

import Navbar from "@/components/navbar";

export const metadata = {
  title: "netfix",
  description: "akhaled and emahfood",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body>
          <Navbar />
          <div className="content">{children}</div>
        </body>
      </html>
    </>
  );
}
