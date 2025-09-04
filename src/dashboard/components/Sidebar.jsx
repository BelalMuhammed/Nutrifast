"use client";
import "./sidebar.css";
import {
  Sidebar,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import {
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
  return (
    <div className="flex sidebarDashboard fixed h-full z-[50] ">
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full z-50 transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <Sidebar
          aria-label="Sidebar with multi-level dropdown example"
          className="w-64 relative"
        >
          <div className="flex items-center border-gray-200 px-4 absolute top-0 w-full md:relative">
            {/* Close button only on mobile */}
            <button
              onClick={onClose}
              className="md:hidden ml-auto p-2 mt-3 bg-gray-100 rounded-md shadow me-2"
            >
              <HiX size={20} />
            </button>
          </div>

          {/* Sidebar items */}
          <SidebarItems className="mt-10 md:mt-0">
            <SidebarItemGroup>
              {/* Dashboard */}
              <SidebarItem
                as={NavLink}
                to="/dashboard"
                end
                icon={HiChartPie}
                className={({ isActive }) =>
                  isActive ? "bg-green-100 text-green-700" : ""
                }
              >
                Dashboard
              </SidebarItem>

              {/* E-commerce collapse */}
              <SidebarCollapse icon={HiShoppingBag} label="E-commerce">
                <SidebarItem
                  as={NavLink}
                  to="products"
                  className={({ isActive }) =>
                    isActive ? "bg-green-100 text-green-700" : ""
                  }
                >
                  Products
                </SidebarItem>

                <SidebarItem
                  as={NavLink}
                  to="productsFilters"
                  className={({ isActive }) =>
                    isActive ? "bg-green-100 text-app-primary" : ""
                  }
                >
                  Product Filters
                </SidebarItem>
              </SidebarCollapse>

              {/* Vendors collapse */}
              <SidebarCollapse icon={HiUser} label="Vendors">
                <SidebarItem
                  as={NavLink}
                  to="vendorApplications"
                  className={({ isActive }) =>
                    isActive ? "bg-green-100 text-green-700" : ""
                  }
                >
                  Vendors Applications
                </SidebarItem>

                <SidebarItem
                  as={NavLink}
                  to="vendorList"
                  className={({ isActive }) =>
                    isActive ? "bg-green-100 text-green-700" : ""
                  }
                >
                  Vendors List
                </SidebarItem>
              </SidebarCollapse>

              {/* Users */}
              <SidebarItem
                as={NavLink}
                to="users"
                icon={HiUser}
                className={({ isActive }) =>
                  isActive ? "bg-green-100 text-green-700" : ""
                }
              >
                Users
              </SidebarItem>

              {/* Orders */}
              <SidebarItem
                as={NavLink}
                to="orders"
                icon={HiTable}
                className={({ isActive }) =>
                  isActive ? "bg-green-100 text-green-700" : ""
                }
              >
                Orders
              </SidebarItem>

              {/* Messages */}
              <SidebarItem
                as={NavLink}
                to="messages"
                icon={HiInbox}
                className={({ isActive }) =>
                  isActive ? "bg-green-100 text-green-700" : ""
                }
              >
                Messages
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>

      </div>

      {/* Mobile toggle */}
      {!isOpen && (
        <button
          onClick={onClose}
          className="md:hidden fixed left-1 z-50 p-3 bg-black text-white rounded-full shadow-lg border border-gray-800 hover:bg-gray-900 transition-all duration-200"
          style={{ top: "4.2rem" }}
          aria-label="Open sidebar"
        >
          <HiMenu size={20} />
        </button>
      )}
    </div>
  );
}
