"use client";

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

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full z-50 transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <Sidebar
          aria-label="Sidebar with multi-level dropdown example "
          className="w-64 relative"
        >
          {/* Logo at the top, left-aligned */}
          <div className="flex items-center h-20  border-gray-200 px-4 absolute top-0 w-full md:relative">
            <h1 className="text-xl font-bold text-green-600">Nutrifast</h1>
            {/* Close button only visible on mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden ml-auto p-2 bg-gray-100 rounded-md shadow me-2"
            >
              <HiX size={20} />
            </button>
          </div>

          {/* Sidebar items */}
          <SidebarItems className="mt-20 md:mt-0">
            <SidebarItemGroup>
              <SidebarItem href="#" icon={HiChartPie}>
                Dashboard
              </SidebarItem>
              <SidebarCollapse icon={HiShoppingBag} label="E-commerce">
                <SidebarItem href="#">Products</SidebarItem>
                <SidebarItem href="#">Sales</SidebarItem>
                <SidebarItem href="#">Refunds</SidebarItem>
                <SidebarItem href="#">Shipping</SidebarItem>
              </SidebarCollapse>
              <SidebarItem href="#" icon={HiInbox}>
                Inbox
              </SidebarItem>
              <SidebarItem href="#" icon={HiUser}>
                Users
              </SidebarItem>
              <SidebarItem href="#" icon={HiShoppingBag}>
                Products
              </SidebarItem>
              <SidebarItem href="#" icon={HiArrowSmRight}>
                Sign In
              </SidebarItem>
              <SidebarItem href="#" icon={HiTable}>
                Sign Up
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
      </div>

      {/* Open button only visible on mobile when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-100 rounded-md shadow"
        >
          <HiMenu size={20} />
        </button>
      )}
    </div>
  );
}
