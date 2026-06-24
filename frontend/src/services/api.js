import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Ubah di sini saja jika pindah server
});

// Otomatis inject token jika lu pakai autentikasi nanti
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;