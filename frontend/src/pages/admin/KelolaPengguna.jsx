import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Trash2, UserPlus, ShieldUser } from 'lucide-react';

export default function KelolaPengguna() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/users');
      setUsers(res.data);
    } catch (err) { console.error("Gagal ambil user:", err); }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Hapus pengguna ini?',
      text: "Data akan hilang permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/users/${id}`);
        fetchUsers();
        Swal.fire('Terhapus!', 'Pengguna berhasil dihapus.', 'success');
      } catch (err) {
        Swal.fire('Error', 'Gagal menghapus pengguna', 'error');
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Kelola Pengguna</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700">
          <UserPlus size={18} /> Tambah Pengguna
        </button>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr className="text-gray-500 text-sm">
              <th className="p-4">Nama</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-medium">{user.nama}</td>
                <td className="p-4 text-gray-600">{user.email}</td>
                <td className="p-4">
                  <span className="flex items-center gap-1 text-sm font-semibold text-blue-600">
                    <ShieldUser size={16} /> {user.role.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700 p-2">
                    <Trash2 size={18} />
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