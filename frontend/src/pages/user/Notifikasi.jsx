import React, { useState, useEffect, useContext } from 'react';
import { Bell, CheckCircle, Clock, AlertCircle, Trash2, Check } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext'; // ⚠️ Sesuaikan path

const Notifikasi = () => {
    const { user } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/notifications/${user?.id}`);
            const data = await res.json();
            if (data.success) {
                setNotifications(data.data);
            }
        } catch (error) {
            console.error("Gagal fetch notifikasi:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.id) {
            fetchNotifications();
            const interval = setInterval(fetchNotifications, 30000);
            return () => clearInterval(interval);
        }
    }, [user]);

    const handleMarkRead = async (id) => {
        try {
            await fetch(`http://localhost:3000/api/notifications/${id}/read`, { method: 'PUT' });
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: 1 } : n));
        } catch (error) {
            console.error("Gagal tandai dibaca:", error);
        }
    };

    const handleMarkAllRead = async () => {
        try {
            await fetch(`http://localhost:3000/api/notifications/readall/${user?.id}`, { method: 'PUT' });
            setNotifications(prev => prev.map(n => ({ ...n, is_read: 1 })));
        } catch (error) {
            console.error("Gagal tandai semua dibaca:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/api/notifications/${id}`, { method: 'DELETE' });
            setNotifications(prev => prev.filter(n => n.id !== id));
        } catch (error) {
            console.error("Gagal hapus notifikasi:", error);
        }
    };

    const formatTime = (dateStr) => {
        const now = new Date();
        const date = new Date(dateStr);
        const diff = Math.floor((now - date) / 1000);

        if (diff < 60) return 'Baru saja';
        if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
        return `${Math.floor(diff / 86400)} hari lalu`;
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'selesai': return { border: 'border-l-green-500', bg: 'bg-green-50', icon: <CheckCircle size={20} className="text-green-600" /> };
            case 'diproses': return { border: 'border-l-yellow-500', bg: 'bg-yellow-50', icon: <Clock size={20} className="text-yellow-600" /> };
            case 'ditolak': return { border: 'border-l-red-500', bg: 'bg-red-50', icon: <AlertCircle size={20} className="text-red-600" /> };
            default: return { border: 'border-l-blue-500', bg: 'bg-blue-50', icon: <Bell size={20} className="text-blue-600" /> };
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-blue-950">Pusat Notifikasi</h1>
                    <p className="text-gray-500">Pantau pembaruan status keluhan Anda</p>
                </div>
                {notifications.length > 0 && (
                    <button onClick={handleMarkAllRead} className="text-sm text-blue-600 font-medium hover:underline">
                        Tandai semua dibaca
                    </button>
                )}
            </div>

            {loading ? (
                <div className="text-center py-16 text-gray-400">
                    <p>Memuat notifikasi...</p>
                </div>
            ) : notifications.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    <Bell size={48} className="mx-auto mb-3 opacity-30" />
                    <p className="text-lg font-medium">Belum ada notifikasi</p>
                    <p className="text-sm mt-1">Notifikasi akan muncul saat admin memperbarui status keluhan kamu</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {notifications.map((item) => {
                        const style = getStatusStyle(item.status);
                        return (
                            <div
                                key={item.id}
                                className={`group relative p-5 rounded-2xl shadow-sm border-l-4 ${style.border} flex items-start gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${!item.is_read ? 'bg-blue-50/30' : 'bg-white'}`}
                            >
                                <div className={`p-3 rounded-xl ${style.bg} flex-shrink-0`}>
                                    {style.icon}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-bold text-gray-800 text-lg leading-tight">
                                            {item.title}
                                            {!item.is_read && (
                                                <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full align-middle" />
                                            )}
                                        </h3>
                                        <span className="text-xs font-medium text-gray-400 flex-shrink-0">
                                            {formatTime(item.created_at)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.message}</p>
                                </div>

                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2 flex-shrink-0">
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Hapus"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    {!item.is_read && (
                                        <button
                                            onClick={() => handleMarkRead(item.id)}
                                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                            title="Tandai dibaca"
                                        >
                                            <Check size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Notifikasi;