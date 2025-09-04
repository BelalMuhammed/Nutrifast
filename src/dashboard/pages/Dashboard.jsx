import LoaderSpinner from "@/Components/shared/Loaders/Loader";
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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import CountUp from "react-countup";

const API_BASE = "https://nutrifast-data.up.railway.app";

export default function DashboardPage() {
  const [stats, setStats] = useState([]);
  const [ordersByMonth, setOrdersByMonth] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [orders, customers, products] = await Promise.all([
        fetch(`${API_BASE}/orders`).then((res) => res.json()),
        fetch(`${API_BASE}/users`).then((res) => res.json()),
        fetch(`${API_BASE}/products`).then((res) => res.json()),
      ]);

      // Group orders by month
      const ordersByMonthMap = {};
      orders.forEach((order) => {
        let date;
        if (order.createdAt) {
          date = new Date(order.createdAt);
        } else if (order.date) {
          date = new Date(order.date);
        } else {
          return;
        }

        if (!isNaN(date)) {
          const month = date.toLocaleString("default", { month: "short" });
          ordersByMonthMap[month] = (ordersByMonthMap[month] || 0) + 1;
        }
      });

      const allMonths = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      setOrdersByMonth(
        allMonths.map((m) => ({
          month: m,
          orders: ordersByMonthMap[m] || 0,
        }))
      );

      // Group products by category
      const productsByCategoryMap = {};
      products.forEach((p) => {
        productsByCategoryMap[p.category] =
          (productsByCategoryMap[p.category] || 0) + 1;
      });
      setProductsByCategory(
        Object.entries(productsByCategoryMap).map(([category, count]) => ({
          category,
          count,
        }))
      );

      // Total revenue
      const totalRevenue = orders.reduce(
        (acc, order) => acc + (order.totalPrice || 0),
        0
      );

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
          value: ordersByMonth.length,
          icon: HiOutlineChartBar,
          change: "0%",
          changeType: "decrease",
        },
        {
          name: "Total Customers",
          value: customers.length,
          icon: HiOutlineUsers,
          change: "+1%",
          changeType: "increase",
        },
        {
          name: "Total Sellers",
          value: 35,
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
          value: totalRevenue,
          icon: HiOutlineCurrencyDollar,
          change: "0%",
          changeType: "increase",
        },
      ];

      setStats(fetchedStats);
    }

    fetchData();
  }, []);
  if (!stats.length || !ordersByMonth.length || !productsByCategory.length) {
    return <LoaderSpinner />;
  }
  return (
    <div className="p-4 space-y-6">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="bg-white shadow-md rounded-xl px-4 py-6 flex flex-col"
          >
            {/* Icon */}
            <div className="mb-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100">
                <item.icon className="w-6 h-6 text-app-primary" />
              </div>
            </div>

            {/* Label */}
            <p className="text-sm text-gray-500 mb-1">{item.name}</p>

            {/* Number + Change */}
            <div className="flex items-center justify-between space-x-2">
              <p className="text-xl font-semibold text-gray-900">
                <CountUp
                  end={Number(item.value) || 0}
                  duration={3}
                  separator=","
                  prefix={item.name === "Total Revenue" ? "$" : ""}
                />
              </p>
              {item.changeType === "increase" ? (
                <span className="inline-flex items-center text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  <HiArrowTrendingUp className="w-3 h-3 mr-1" />
                  {item.change}
                </span>
              ) : (
                <span className="inline-flex items-center text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                  <HiArrowTrendingDown className="w-3 h-3 mr-1" />
                  {item.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders Growth */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-base font-semibold mb-3">
            Orders Growth (by Month)
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={ordersByMonth}
              margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#388e3c"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Customers vs Sellers */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-base font-semibold mb-3">Users Distribution</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={[
                  {
                    name: "Customers",
                    value:
                      stats.find((s) => s.name === "Total Customers")?.value ||
                      0,
                  },
                  {
                    name: "Sellers",
                    value:
                      stats.find((s) => s.name === "Total Sellers")?.value || 0,
                  },
                ]}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={70}
                fill="#388e3c"
                label
              >
                <Cell fill="#388e3c" />
                <Cell fill="#4caf50" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Products by Category */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-base font-semibold mb-3">Products by Category</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={productsByCategory}
              margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#388e3c" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
