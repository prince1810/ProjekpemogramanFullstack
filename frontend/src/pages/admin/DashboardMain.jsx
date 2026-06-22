import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid, Legend } from 'recharts';
import { FileText, Clock, RefreshCcw, CheckCircle } from 'lucide-react';

export default function DashboardMain() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/complaints');
      setData(res.data);
    } catch (err) { console.error("Gagal ambil data", err); }
    finally { setLoading(false); }
  };

  if (loading) return <div className="p-10 text-center animate-pulse">Memuat data dashboard...</div>;
  if (!data || data.length === 0) return <div className="p-10 text-center">Belum ada data keluhan yang tersedia.</div>;

  // LOGIKA STATS YANG DIPERBAIKI (Fleksibel)
  const stats = {
    // Menangkap "pending", "menunggu", atau status kosong ""
    menunggu: data.filter(d => {
      const s = (d.status || '').toLowerCase();
      return s === 'pending' || s === 'menunggu' || s === '';
    }).length,

    // Menangkap "diproses" atau "proses"
    diproses: data.filter(d => {
      const s = (d.status || '').toLowerCase();
      return s === 'diproses' || s === 'proses';
    }).length,

    // Menangkap "selesai"
    selesai: data.filter(d => {
      const s = (d.status || '').toLowerCase();
      return s === 'selesai';
    }).length,
  };

  const chartData = [{ name: 'Status', ...stats }];
  const pieData = Object.entries(stats).map(([k, v]) => ({ name: k, value: v }));
  const COLORS = ['#ea580c', '#9333ea', '#16a34a'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Admin</h2>
      
      {/* Kartu Statistik */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Menunggu" count={stats.menunggu} icon={<Clock size={20}/>} color="bg-orange-600" />
        <StatCard title="Diproses" count={stats.diproses} icon={<RefreshCcw size={20}/>} color="bg-purple-600" />
        <StatCard title="Selesai" count={stats.selesai} icon={<CheckCircle size={20}/>} color="bg-green-600" />
        <StatCard title="Total" count={data.length} icon={<FileText size={20}/>} color="bg-blue-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik Tren */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm h-[350px]">
          <h4 className="font-bold mb-4">Tren Status</h4>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="menunggu" stroke="#ea580c" strokeWidth={4} dot={{r: 6}} />
              <Line type="monotone" dataKey="diproses" stroke="#9333ea" strokeWidth={4} dot={{r: 6}} />
              <Line type="monotone" dataKey="selesai" stroke="#16a34a" strokeWidth={4} dot={{r: 6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Grafik Distribusi */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm h-[350px]">
          <h4 className="font-bold mb-4">Distribusi Status</h4>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie data={pieData} innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                {pieData.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ title, count, icon, color }) => (
  <div className="bg-white p-4 rounded-xl border flex items-center gap-3">
    <div className={`p-2 rounded-lg ${color} text-white`}>{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{title}</p>
      <h3 className="text-lg font-bold">{count}</h3>
    </div>
  </div>
);