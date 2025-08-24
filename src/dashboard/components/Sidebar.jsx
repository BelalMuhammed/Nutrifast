"use client";
import "./sidebar.css";
import { useState } from "react";
import {
  Sidebar,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiMenu,
  HiX,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";

export default function DashboardSidebar({ isOpen, onClose }) {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex sidebarDashboard fixed h-full z-[50]">
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full z-50 transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <Sidebar
          aria-label="Sidebar with multi-level dropdown example "
          className="w-64 relative"
        >
          {/* Logo */}
          <div className="flex items-center h-20  border-gray-200 px-4 absolute top-0 w-full md:relative">
            <h1 className="text-xl font-bold text-green-600">Nutrifast</h1>
            {/* Close button only on mobile */}
            <button
              onClick={onClose}
              className="md:hidden ml-auto p-2 bg-gray-100 rounded-md shadow me-2"
            >
              <HiX size={20} />
            </button>
          </div>

          {/* Sidebar items */}
          <SidebarItems className="mt-20 md:mt-0">
            <SidebarItemGroup>
              {/* Dashboard */}
              <NavLink to="/dashboard" end>
                {({ isActive }) => (
                  <SidebarItem className={isActive ? "bg-green-100 text-green-700" : ""}>
                    Dashboard
                  </SidebarItem>
                )}
              </NavLink>

              {/* E-commerce collapse */}
              <SidebarCollapse icon={HiShoppingBag} label="E-commerce">
                <NavLink to="products">
                  {({ isActive }) => (
                    <SidebarItem className={isActive ? "bg-green-100 text-green-700" : ""}>
                      Products
                    </SidebarItem>
                  )}
                </NavLink>

                {/* <NavLink to="addProducts">
                  {({ isActive }) => (
                    <SidebarItem className={isActive ? "bg-green-100 text-green-700" : ""}>
                      Add Products
                    </SidebarItem>
                  )}
                </NavLink> */}


                <NavLink to="productsFilters">
                  {({ isActive }) => (
                    <SidebarItem className={isActive ? "bg-green-100 text-app-primary" : ""}>
                      Product Filters
                    </SidebarItem>
                  )}
                </NavLink>
              </SidebarCollapse>

              {/* Vendors collapse */}
              <SidebarCollapse icon={HiUser} label="Vendors">
                <NavLink to="vendorApplications">
                  {({ isActive }) => (
                    <SidebarItem className={isActive ? "bg-green-100 text-green-700" : ""}>
                      Vendors Applications
                    </SidebarItem>
                  )}
                </NavLink>

                <NavLink to="vendorList">
                  {({ isActive }) => (
                    <SidebarItem className={isActive ? "bg-green-100 text-green-700" : ""}>
                      Vendors List
                    </SidebarItem>
                  )}
                </NavLink>
              </SidebarCollapse>

              {/* Users */}
              <NavLink to="users">
                {({ isActive }) => (
                  <SidebarItem icon={HiUser} className={isActive ? "bg-green-100 text-green-700" : ""}>
                    Users
                  </SidebarItem>
                )}
              </NavLink>

              {/* Orders */}
              <NavLink to="orders">
                {({ isActive }) => (
                  <SidebarItem icon={HiTable} className={isActive ? "bg-green-100 text-green-700" : ""}>
                    Orders
                  </SidebarItem>
                )}
              </NavLink>

              {/* Messages */}
              <NavLink to="messages">
                {({ isActive }) => (
                  <SidebarItem icon={HiInbox} className={isActive ? "bg-green-100 text-green-700" : ""}>
                    Messages
                  </SidebarItem>
                )}
              </NavLink>

              {/* Example static item */}



            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
      </div>

      {/* Mobile toggle */}
      {!isOpen && (
        <button
          onClick={onClose}
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-100 rounded-md shadow"
        >
          <HiMenu size={20} />
        </button>
      )}
    </div>
  );
}
