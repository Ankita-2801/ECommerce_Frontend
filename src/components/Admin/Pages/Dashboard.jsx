// src/components/Admin/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { API_BASE_URL,API_ENDPOINTS } from '@/config/api.js';
import Card from '../ReuseNav/Card';
import Chart from '../ReuseNav/Chart';
// Importing icons from Lucide React
import {
    ShoppingCart,
    ClipboardCheck,
    Users,
    DollarSign,
    ArrowRight,
    BarChart2,
    Zap,
    UsersRound,
    DollarSignIcon,
    Package,
    Tag,
} from 'lucide-react';


const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const [metricsRes, chartRes] = await Promise.all([
        fetch(`${API_BASE_URL}/${API_ENDPOINTS.ADMIN_METRICS}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch(`${API_BASE_URL}/${API_ENDPOINTS.SALES_CHART}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
      ]);

if (!metricsRes.ok || !chartRes.ok) {
  throw new Error('Failed to fetch dashboard data');
}

const metrics = await metricsRes.json();
const chartData = await chartRes.json();

      const summary = [
        {
          id: 'products',
          title: 'Total Products',
          value: metrics.totalProducts,
          icon: Package,
          iconColor: 'green',
          change: '+1.56%',
          isPositive: true,
          chartData: metrics.chartData
        },
        {
          id: 'orders',
          title: 'Total Orders',
          value: metrics.totalOrders,
          icon: ShoppingCart,
          iconColor: 'red',
          change: '-0.38%',
          isPositive: false,
          chartData: metrics.chartData
        },
        {
          id: 'users',
          title: 'Total Users',
          value: metrics.totalUsers,
          icon: UsersRound,
          iconColor: 'blue',
          change: '+4.32%',
          isPositive: true,
          chartData: metrics.chartData
        },
        {
          id: 'revenue',
          title: 'Total Revenue',
          value: `₹${metrics.totalRevenue}`,
          icon: DollarSignIcon,
          iconColor: 'gray',
          change: '+2.10%',
          isPositive: true,
          chartData: metrics.chartData
        }
      ];

      setDashboardData({
        summary,
        salesData: chartData
      });
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  fetchDashboardData();
}, []);
if (isLoading || !dashboardData) {
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
  <div className="flex flex-col items-center space-y-4 text-white">
    <svg
      className="animate-spin h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <span className="text-sm sm:text-base md:text-lg font-medium text-center">
      Loading your Dashboard...
    </span>
  </div>
</div>

  );
}

    return (
        // Main dashboard container with a light background to contrast the sidebar and header.
        <div className="space-y-10 py-6 px-4 sm:px-6 lg:px-8">
            {/* Title Section */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-extrabold text-white dark:text-gray-100">
                    Dashboard Overview 📈
                </h1>
            </div>

            {/* Summary Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardData?.summary?.map(item => {
                    const Icon = item.icon;
                    return (
                        <Card
                            key={item.id}
                            title={item.title}
                            value={item.value}
                            // Passing the icon component directly to the Card component
                            icon={<Icon className="h-8 w-8 text-white opacity-90" />}
                            iconColor={item.iconColor}
                            change={item.change}
                            isPositive={item.isPositive}
                            chartData={item.chartData}
                        />
                    );
                })}
            </div>

            {/* Main Content: Charts and Quick Links */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Chart */}
                {/* The chart container is now styled to match the dark theme */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 transition-colors duration-300">
                    <div className="flex items-center space-x-3 mb-6 text-gray-800">
                        <BarChart2 className="h-7 w-7 text-blue-500" />
                        <h2 className="text-xl font-semibold">Sales Performance</h2>
                    </div>
                    {/* The Chart component is now integrated here */}
                    <div className="h-80">
                        <Chart data={dashboardData.salesData} title="" />
                    </div>
                </div>

                {/* Quick Actions */}
                {/* The quick actions section is styled to match the dark theme */}
                <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 transition-colors duration-300">
                    <div className="flex items-center space-x-3 mb-6 text-gray-800">
                        <Zap className="h-7 w-7 text-blue-500" />
                        <h2 className="text-xl font-semibold">Quick Actions</h2>
                    </div>
                    <ul className="space-y-4">
                        <li>
                            <a href="products" className="flex items-center justify-between p-4 rounded-xl bg-amber-900/70 hover:bg-amber-800 transition-all duration-200">
                                <span className="text-white font-medium">Manage Products</span>
                                <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                            </a>
                        </li>
                        <li>
                            <a href="orders" className="flex items-center justify-between p-4 rounded-xl bg-amber-900/70 hover:bg-amber-800 transition-all duration-200">
                                <span className="text-white font-medium">View Orders</span>
                                <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                            </a>
                        </li>
                        <li>
                            <a href="users" className="flex items-center justify-between p-4 rounded-xl bg-amber-900/70 hover:bg-amber-800 transition-all duration-200">
                                <span className="text-white font-medium">Manage Users</span>
                                <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                            </a>
                        </li>
                        <li>
                            <a href="reviews" className="flex items-center justify-between p-4 rounded-xl bg-amber-900/70 hover:bg-amber-800 transition-all duration-200">
                                <span className="text-white font-medium">Reviews</span>
                                <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
