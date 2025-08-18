import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../Footer/Footer";
import ScrollToTop from "../shared/ScrollToTop/ScrollToTop";
import ScrollToTopOnRouteChange from "../shared/ScrollToTopOnRouteChange/ScrollToTopOnRouteChange";

export default function Layout() {
  const { pathname } = useLocation();

  // Hide navbar on dashboard and adminDashboard
  const noNavbarRoutes = ["/dashboard"];
  const hideNavbar = noNavbarRoutes.some((route) => pathname.startsWith(route));

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Auto scroll to top when route changes */}
      <ScrollToTopOnRouteChange />

      {!hideNavbar && <Navbar />}
      <main className='flex-1 mt-16'>
        <Outlet />
      </main>
      <Footer />

      {/* Global Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
