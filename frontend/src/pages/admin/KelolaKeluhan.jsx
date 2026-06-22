import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Trash2, Edit2 } from 'lucide-react';

export default function KelolaKeluhan() {
  const [keluhan, setKeluhan] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/complaints');
      setKeluhan(res.data);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Hapus keluhan?',
      text: "Data tidak bisa dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/complaints/${id}`);
        fetchData();
        Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
      } catch (err) {
        Swal.fire('Error', 'Gagal menghapus data', 'error');
      }
    }
  };

  // 2. LOGIKA UPDATE STATUS (Ditingkatkan dengan case-insensitive)
  const handleUpdate = async (id, currentStatus) => {
    // Normalisasi ke huruf kecil agar perbandingan lebih stabil
    const status = currentStatus ? currentStatus.toLowerCase() : '';
    
    let newStatus = 'Diproses'; // Default jika saat ini kosong/pending
    if (status === 'diproses') newStatus = 'Selesai';
    else if (status === 'selesai') newStatus = 'Pending';
    else newStatus = 'Diproses'; // Default jika status tidak dikenal

    try {
      await axios.patch(`http://localhost:3000/api/complaints/${id}`, { status: newStatus });
      fetchData();
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: `Status jadi: ${newStatus}`, showConfirmButton: false, timer: 1500 });
    } catch (err) {
      Swal.fire('Error', 'Gagal memperbarui status', 'error');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Kelola Keluhan</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500 text-sm">
              <th className="p-3">Nama</th>
              <th className="p-3">Pesan</th>
              <th className="p-3">Status (Debug)</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {keluhan.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-3 font-medium">{item.customer_name}</td>
                <td className="p-3 text-gray-600 truncate max-w-xs">{item.message}</td>
                
                {/* 3. DEBUGGING & STATUS RENDER */}
                <td className="p-3">
                  <div className="text-[10px] text-gray-400 mb-1">DB Val: {item.status}</div>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    (item.status || '').toLowerCase() === 'pending' ? 'bg-orange-100 text-orange-600' : 
                    (item.status || '').toLowerCase() === 'diproses' ? 'bg-blue-100 text-blue-600' : 
                    (item.status || '').toLowerCase() === 'selesai' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {item.status || 'No Status'}
                  </span>
                </td>

                <td className="p-3 flex justify-center gap-2">
                  <button onClick={() => handleUpdate(item.id, item.status)} className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}