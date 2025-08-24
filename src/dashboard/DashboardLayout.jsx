// src/dashboard/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import Topbar from "./components/Topbar";
import DashboardSidebar from "./components/Sidebar";
import { useState } from "react";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);
  return (

    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/5">
        <DashboardSidebar isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Main Section */}
      <div className="w-full md:w-4/5 flex flex-col">
        {/* Topbar */}
        <Topbar onMenuClick={() => setIsOpen(ture)} />

        {/* Page Content */}
        <main className="flex-1 px-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>

  );
}
