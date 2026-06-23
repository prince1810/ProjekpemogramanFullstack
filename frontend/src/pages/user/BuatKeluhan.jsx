import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Send, Tag, MessageSquare, ChevronDown } from "lucide-react";

export const BuatKeluhan = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    category_id: "",
    message: "",
  });

  useEffect(() => {
    const nama = localStorage.getItem("userName") || localStorage.getItem("nama") || "";
    const email = localStorage.getItem("userEmail") || "";
    setForm((prev) => ({ ...prev, customer_name: nama, customer_email: email }));
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Gagal ambil kategori:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category_id) {
      Swal.fire("Oops!", "Pilih kategori keluhan terlebih dahulu.", "warning");
      return;
    }
    if (form.message.trim().length < 10) {
      Swal.fire("Oops!", "Pesan keluhan minimal 10 karakter.", "warning");
      return;
    }
    try {
      setLoading(true);
      await axios.post("http://localhost:3000/api/complaints", form);
      Swal.fire({
        icon: "success",
        title: "Keluhan Terkirim!",
        text: "Keluhan kamu sudah kami terima dan akan segera diproses.",
        confirmButtonColor: "#1d4ed8",
      });
      setForm((prev) => ({ ...prev, category_id: "", message: "" }));
    } catch (err) {
      Swal.fire("Gagal", "Terjadi kesalahan, coba lagi.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Buat Keluhan</h1>
        <p className="text-sm text-gray-400 mt-1">Sampaikan keluhan atau aspirasimu dengan jelas dan detail.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] uppercase font-bold text-gray-400 tracking-wide">Nama</label>
            <input
              className="w-full mt-1 p-3 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-500 cursor-not-allowed"
              value={form.customer_name}
              readOnly
              placeholder="Nama otomatis dari akun"
            />
          </div>
          <div>
            <label className="text-[11px] uppercase font-bold text-gray-400 tracking-wide">Email</label>
            <input
              className="w-full mt-1 p-3 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-500 cursor-not-allowed"
              value={form.customer_email}
              readOnly
              placeholder="Email otomatis dari akun"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] uppercase font-bold text-gray-400 tracking-wide flex items-center gap-1">
            <Tag size={12} /> Kategori Keluhan
          </label>
          <div className="relative mt-1">
            <select
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-300 pr-10"
              value={form.category_id}
              onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="text-[11px] uppercase font-bold text-gray-400 tracking-wide flex items-center gap-1">
            <MessageSquare size={12} /> Isi Keluhan
          </label>
          <textarea
            className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            rows={6}
            placeholder="Ceritakan keluhanmu secara detail di sini..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <p className="text-xs text-gray-400 mt-1 text-right">{form.message.length} karakter</p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-3 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Mengirim...
            </>
          ) : (
            <>
              <Send size={16} /> Kirim Keluhan
            </>
          )}
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
        <p className="text-xs text-blue-600 font-semibold mb-1">ℹ️ Informasi</p>
        <p className="text-xs text-blue-500">Keluhan yang masuk akan diproses oleh admin dan kamu bisa memantau statusnya di menu <strong>Keluhan Saya</strong>.</p>
      </div>
    </div>
  );
};