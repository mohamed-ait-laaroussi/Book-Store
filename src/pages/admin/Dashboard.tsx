import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Settings, TrendingUp, ShoppingBag, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  // Mock statistics data
  const stats = {
    totalUsers: 1234,
    activeUsers: 892,
    totalBooks: 456,
    totalOrders: 789,
    revenue: 12345.67,
    newUsers: 45
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Overview of your bookstore's performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</h3>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                +{stats.newUsers} new users this week
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Books</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalBooks}</h3>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                Manage inventory
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${stats.revenue.toLocaleString()}
                </h3>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                View detailed reports
              </span>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link
            to="/admin/books"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Manage Books</h3>
                <p className="text-gray-600 dark:text-gray-400">Add, edit, or remove books</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/users"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Manage Users</h3>
                <p className="text-gray-600 dark:text-gray-400">View and manage user accounts</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/settings"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <Settings className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Site Settings</h3>
                <p className="text-gray-600 dark:text-gray-400">Configure website settings</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <UserCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-gray-900 dark:text-white">New user registration</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                <ShoppingBag className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-3">
                <p className="text-gray-900 dark:text-white">New order received</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-3">
                <p className="text-gray-900 dark:text-white">New book added to inventory</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;