// src/dashboard/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import Topbar from "./components/Topbar";
import DashboardSidebar from "./components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 px-4 py-20 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
