import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  const { pathname } = useLocation();

  // Hide navbar on dashboard and adminDashboard
  const noNavbarRoutes = ["/dashboard"];
  const hideNavbar = noNavbarRoutes.some((route) => pathname.startsWith(route));

  // // Hide footer om dachboard 

  // const hideFooter = noNavbarRoutes.some((route) => pathname.startsWith(route));

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideNavbar && <Footer />}

    </div>
  );
}
