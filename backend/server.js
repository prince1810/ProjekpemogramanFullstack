const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_keluhan_pelanggan'
};

// ==========================================
// API 1: REGISTER USER BARU
// ==========================================
app.post('/api/register', async (req, res) => {
    try {
        const { nama, email, password } = req.body;
        const db = await mysql.createConnection(dbConfig);
        
        // Cek email duplikat
        const [exist] = await db.execute('SELECT email FROM users WHERE email = ?', [email]);
        if (exist.length > 0) {
            await db.end();
            return res.status(400).json({ status: 'error', message: 'Email sudah terdaftar!' });
        }

        await db.execute('INSERT INTO users (nama, email, password) VALUES (?, ?, ?)', [nama, email, password]);
        await db.end();
        res.status(201).json({ status: 'success', message: 'Registrasi Berhasil!' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Gagal Register' });
    }
});

// ==========================================
// API 2: LOGIN (BISA ADMIN / USER)
// ==========================================
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const db = await mysql.createConnection(dbConfig);

        // Cek ke tabel Admin dulu
        const [admin] = await db.execute('SELECT * FROM admins WHERE username = ? AND password = ?', [username, password]);
        if (admin.length > 0) {
            await db.end();
            return res.status(200).json({ status: 'success', role: 'admin', message: 'Welcome Admin' });
        }

        // Kalau bukan admin, cek ke tabel Users
        const [user] = await db.execute('SELECT * FROM users WHERE email = ? AND password = ?', [username, password]);
        if (user.length > 0) {
            await db.end();
            return res.status(200).json({ 
                status: 'success', 
                role: 'user', 
                nama: user[0].nama,
                message: 'Login Berhasil' 
            });
        }

        await db.end();
        res.status(401).json({ status: 'error', message: 'Akun tidak ditemukan!' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
});

// ... (Kodingan API complaints, update, delete lu yang lama tetap taruh di bawah sini) ...

app.listen(port, () => {
    console.log(`🚀 Server jalan di http://localhost:${port}`);
});