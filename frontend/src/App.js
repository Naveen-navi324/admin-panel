import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Sample pages for demonstration
const Profile = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <p className="text-gray-600 dark:text-gray-400">User profile content goes here...</p>
    </div>
  </div>
);

const Users = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Users</h1>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <p className="text-gray-600 dark:text-gray-400">User management content goes here...</p>
    </div>
  </div>
);

const Settings = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <p className="text-gray-600 dark:text-gray-400">Settings content goes here...</p>
    </div>
  </div>
);

const NotFound = () => (
  <div className="space-y-6 text-center">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Page Not Found</h1>
    <p className="text-gray-600 dark:text-gray-400">The page you're looking for doesn't exist.</p>
  </div>
);

function App() {
  const helloWorldApi = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log(response.data.message);
    } catch (e) {
      console.error(e, `errored out requesting / api`);
    }
  };

  useEffect(() => {
    helloWorldApi();
    // Set default role for demo purposes
    if (!localStorage.getItem('role')) {
      localStorage.setItem('role', 'admin');
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="users" element={<Users />} />
            <Route path="users/roles" element={<Users />} />
            <Route path="analytics/reports" element={<Dashboard />} />
            <Route path="analytics/statistics" element={<Dashboard />} />
            <Route path="settings/general" element={<Settings />} />
            <Route path="settings/security" element={<Settings />} />
            <Route path="orders" element={<Dashboard />} />
            <Route path="documents" element={<Dashboard />} />
            <Route path="messages" element={<Dashboard />} />
            <Route path="calendar" element={<Dashboard />} />
            <Route path="notifications" element={<Dashboard />} />
            <Route path="help" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;