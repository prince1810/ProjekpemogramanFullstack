// src/components/layout/DashboardLayout.jsx
import React from 'react';
import Sidebar from './Sidebar'; // Nanti buat file ini
import Navbar from './Navbar';   // Nanti buat file ini

export const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};