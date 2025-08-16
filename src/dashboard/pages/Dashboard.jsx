// src/dashboard/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import {
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineCurrencyDollar,
  HiOutlineCube,
  HiOutlineChartBar,
  HiOutlineUsers,
  HiArrowTrendingUp,
  HiArrowTrendingDown,
} from "react-icons/hi2";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
} from "recharts";

const API_BASE = "https://nutrifast-data.up.railway.app";

export default function DashboardPage() {
  const [stats, setStats] = useState([]);
  const [salesData, setSalesData] = useState([
    { name: "Jan", sales: 150 },
    { name: "Feb", sales: 380 },
    { name: "Mar", sales: 190 },
    { name: "Apr", sales: 290 },
    { name: "May", sales: 170 },
    { name: "Jun", sales: 180 },
    { name: "Jul", sales: 280 },
    { name: "Aug", sales: 100 },
    { name: "Sep", sales: 210 },
    { name: "Oct", sales: 370 },
    { name: "Nov", sales: 260 },
    { name: "Dec", sales: 120 },
  ]);

  const [targetData] = useState([
    { name: "Progress", value: 75.55, fill: "#6366f1" },
  ]);

  useEffect(() => {
    async function fetchData() {
      const [orders, customers, products] = await Promise.all([
        fetch(`${API_BASE}/orders`).then((res) => res.json()),
        fetch(`${API_BASE}/users`).then((res) => res.json()),
        fetch(`${API_BASE}/products`).then((res) => res.json()),
      ]);

      const fetchedStats = [
        {
          name: "Total Orders",
          value: orders.length,
          icon: HiOutlineShoppingBag,
          change: "+5%",
          changeType: "increase",
        },
        {
          name: "Total Sales (per Month)",
          value: 120, // Replace with API when available
          icon: HiOutlineChartBar,
          change: "-2%",
          changeType: "decrease",
        },
        {
          name: "Total Customers",
          value: customers.length,
          icon: HiOutlineUsers,
          change: "+10%",
          changeType: "increase",
        },
        {
          name: "Total Sellers",
          value: 10, // Replace with API
          icon: HiOutlineUser,
          change: "+3%",
          changeType: "increase",
        },
        {
          name: "Total Products",
          value: products.length,
          icon: HiOutlineCube,
          change: "+7%",
          changeType: "increase",
        },
        {
          name: "Total Revenue",
          value: "$5000", // Replace with API
          icon: HiOutlineCurrencyDollar,
          change: "+12%",
          changeType: "increase",
        },
      ];

      setStats(fetchedStats);
    }

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item) => (
          <div
            key={item.name}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col"
          >
            {/* Icon */}
            <div className="mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100">
                <item.icon className="w-6 h-6 text-gray-500" />
              </div>
            </div>

            {/* Label */}
            <p className="text-sm text-gray-500 mb-3">{item.name}</p>

            {/* Number + Change */}
            <div className="flex items-center justify-between space-x-2">
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              {item.changeType === "increase" ? (
                <span className="inline-flex items-center text-sm text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  <HiArrowTrendingUp className="w-4 h-4 mr-1" />
                  {item.change}
                </span>
              ) : (
                <span className="inline-flex items-center text-sm text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                  <HiArrowTrendingDown className="w-4 h-4 mr-1" />
                  {item.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Sales */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={salesData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
              barCategoryGap="50%" // controls spacing between bars
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="sales"
                fill="#6366f1"
                radius={[6, 6, 0, 0]}
                barSize={20} // makes the bars thinner
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Target */}
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-2">Monthly Target</h2>
          <p className="text-gray-500 text-sm mb-4">
            Target you’ve set for each month
          </p>

          <ResponsiveContainer width="100%" height={220}>
            <RadialBarChart
              innerRadius="80%"
              outerRadius="100%"
              startAngle={180}
              endAngle={0}
              data={[{ name: "Progress", value: 75 }]}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={10}
                clockWise
                minAngle={0}
                background={{ fill: "#e5e7eb" }}
                fill="#6366f1"
              />
            </RadialBarChart>
          </ResponsiveContainer>

          {/* Percentage inside */}
          <p className="text-3xl font-bold -mt-10">75.55%</p>
          <p className="text-green-600 text-sm bg-green-50 px-2 py-0.5 rounded-full mt-2">
            +10%
          </p>
          <p className="text-gray-500 text-sm mt-2 text-center">
            You earn $3287 today, it’s higher than last month.
            <br />
            Keep up your good work!
          </p>

          {/* Bottom summary row */}
          <div className="grid grid-cols-3 gap-4 w-full mt-6 text-center">
            <div>
              <p className="text-gray-500 text-sm">Target</p>
              <p className="font-semibold">
                $20K <span className="text-red-500">↓</span>
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Revenue</p>
              <p className="font-semibold">
                $20K <span className="text-green-500">↑</span>
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Today</p>
              <p className="font-semibold">
                $20K <span className="text-green-500">↑</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
