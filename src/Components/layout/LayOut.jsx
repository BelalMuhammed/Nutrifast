import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../Footer/Footer";

export default function LayOut() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-4 py-6 bg-gray-50">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
