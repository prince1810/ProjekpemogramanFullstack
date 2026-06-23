import React, { useState } from 'react';
import { Bell, CheckCircle, Clock, AlertCircle, Trash2, Check } from 'lucide-react';

const Notifikasi = () => {
    // Data dummy dengan status
    const [notifications, setNotifications] = useState([
        { id: 1, title: "Keluhan Selesai", desc: "Keluhan mengenai 'AC Rusak' telah diperbaiki.", time: "2 jam lalu", status: "selesai", read: false },
        { id: 2, title: "Status Diproses", desc: "Keluhan 'Lampu Koridor Mati' sedang ditindaklanjuti.", time: "1 hari lalu", status: "diproses", read: false },
        { id: 3, title: "Keluhan Ditolak", desc: "Keluhan tidak sesuai kategori.", time: "2 hari lalu", status: "ditolak", read: true },
    ]);

    const getStatusStyle = (status) => {
        switch(status) {
            case 'selesai': return { border: 'border-l-green-500', bg: 'bg-green-50', icon: <CheckCircle size={20} className="text-green-600" /> };
            case 'diproses': return { border: 'border-l-yellow-500', bg: 'bg-yellow-50', icon: <Clock size={20} className="text-yellow-600" /> };
            case 'ditolak': return { border: 'border-l-red-500', bg: 'bg-red-50', icon: <AlertCircle size={20} className="text-red-600" /> };
            default: return { border: 'border-l-blue-500', bg: 'bg-blue-50', icon: <Bell size={20} className="text-blue-600" /> };
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-blue-950">Pusat Notifikasi</h1>
                    <p className="text-gray-500">Pantau pembaruan status keluhan Anda</p>
                </div>
                <button className="text-sm text-blue-600 font-medium hover:underline">Tandai semua dibaca</button>
            </div>
            
            {/* List */}
            <div className="space-y-4">
                {notifications.map((item) => {
                    const style = getStatusStyle(item.status);
                    return (
                        <div 
                            key={item.id} 
                            className={`group relative bg-white p-5 rounded-2xl shadow-sm border-l-4 ${style.border} flex items-start gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${!item.read ? 'bg-blue-50/30' : ''}`}
                        >
                            {/* Icon Background */}
                            <div className={`p-3 rounded-xl ${style.bg}`}>
                                {style.icon}
                            </div>
                            
                            {/* Text Content */}
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h3 className="font-bold text-gray-800 text-lg">{item.title}</h3>
                                    <span className="text-xs font-medium text-gray-400">{item.time}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.desc}</p>
                            </div>

                            {/* Action Buttons (Muncul saat hover) */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                    <Trash2 size={18} />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                    <Check size={18} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Notifikasi;