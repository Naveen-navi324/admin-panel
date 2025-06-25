import React from 'react';
import { FaUsers, FaChartLine, FaShoppingCart, FaDollarSign } from 'react-icons/fa';

function Dashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      change: '+12%',
      icon: FaUsers,
      color: 'bg-blue-500'
    },
    {
      title: 'Revenue',
      value: '$45,210',
      change: '+23%',
      icon: FaDollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Orders',
      value: '1,234',
      change: '+8%',
      icon: FaShoppingCart,
      color: 'bg-orange-500'
    },
    {
      title: 'Growth',
      value: '18.5%',
      change: '+5%',
      icon: FaChartLine,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">{stat.change} from last month</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white text-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New user registered', time: '2 minutes ago', color: 'bg-green-100 text-green-800' },
              { action: 'Order #1234 completed', time: '15 minutes ago', color: 'bg-blue-100 text-blue-800' },
              { action: 'Payment received', time: '1 hour ago', color: 'bg-purple-100 text-purple-800' },
              { action: 'New product added', time: '2 hours ago', color: 'bg-yellow-100 text-yellow-800' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${activity.color.split(' ')[0]}`}></div>
                  <span className="text-sm text-gray-900 dark:text-white">{activity.action}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'Add User', icon: FaUsers, color: 'bg-blue-500 hover:bg-blue-600' },
              { title: 'New Order', icon: FaShoppingCart, color: 'bg-green-500 hover:bg-green-600' },
              { title: 'View Reports', icon: FaChartLine, color: 'bg-purple-500 hover:bg-purple-600' },
              { title: 'Settings', icon: FaDollarSign, color: 'bg-orange-500 hover:bg-orange-600' }
            ].map((action, index) => (
              <button
                key={index}
                className={`${action.color} text-white p-4 rounded-lg transition-colors duration-200 flex flex-col items-center space-y-2`}
              >
                <action.icon className="text-xl" />
                <span className="text-sm font-medium">{action.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;