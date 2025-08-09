import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-4 py-6 ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
