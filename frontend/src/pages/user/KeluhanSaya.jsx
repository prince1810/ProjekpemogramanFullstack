import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";
import { ClipboardList, Loader2, AlertCircle } from 'lucide-react';

export const KeluhanSaya = () => {
  const { user } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mengambil data dari API yang sama dengan Dashboard untuk sinkronisasi
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        if (user?.id) {
          const res = await axios.get(`http://localhost:3000/api/user/complaints/${user.id}`);
          setComplaints(res.data);
        }
      } catch (err) {
        console.error("Gagal mengambil data keluhan:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [user]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Keluhan Saya</h2>
      
      {loading ? (
        <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-600" size={32}/></div>
      ) : complaints.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-dashed text-center">
          <AlertCircle className="mx-auto text-gray-400 mb-2" size={32} />
          <p className="text-gray-500">Belum ada keluhan yang diajukan.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {complaints.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-xl shadow-sm border flex justify-between items-center transition hover:shadow-md">
              <div>
                <p className="text-xs text-gray-400">ID: #{item.id}</p>
                <h3 className="font-bold text-gray-800 mt-1">{item.message.substring(0, 50)}...</h3>
                <p className="text-sm text-gray-500">{new Date(item.created_at).toLocaleDateString('id-ID')}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                item.status === 'Selesai' ? 'bg-green-100 text-green-700' : 
                item.status === 'Diproses' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};