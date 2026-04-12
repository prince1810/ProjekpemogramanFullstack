const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Konfigurasi Database
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_keluhan_pelanggan'
};

// ==========================================
// API 1: CREATE KELUHAN
// ==========================================
app.post('/api/complaints', async (req, res) => {
    try {
        const { customer_name, customer_email, category_id, message } = req.body;

        // Validasi Input
        if (!customer_name || !customer_email || !category_id || !message) {
            return res.status(400).json({ status: 'error', message: 'Semua kolom wajib diisi!' });
        }
        if (!customer_email.includes('@')) {
            return res.status(400).json({ status: 'error', message: 'Format email tidak valid!' });
        }

        const db = await mysql.createConnection(dbConfig);
        await db.execute('INSERT INTO complaints (customer_name, customer_email, category_id, message) VALUES (?, ?, ?, ?)', [customer_name, customer_email, category_id, message]);
        await db.end();

        res.status(201).json({ status: 'success', message: 'Keluhan berhasil dikirim' });
    } catch (error) {
        console.error('Error Create Complaint:', error);
        res.status(500).json({ status: 'error', message: 'Terjadi kesalahan pada server.' });
    }
});

// ==========================================
// API 2: LOGIN ADMIN
// ==========================================
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ status: 'error', message: 'Username dan password wajib diisi!' });
        }

        const db = await mysql.createConnection(dbConfig);
        const [rows] = await db.execute('SELECT * FROM admins WHERE username = ? AND password = ?', [username, password]);
        await db.end();

        if (rows.length > 0) {
            res.status(200).json({ status: 'success', message: 'Login berhasil' });
        } else {
            res.status(401).json({ status: 'error', message: 'Username atau password salah!' });
        }
    } catch (error) {
        console.error('Error Login:', error);
        res.status(500).json({ status: 'error', message: 'Terjadi kesalahan pada server.' });
    }
});

// ==========================================
// API 3: READ SEMUA DATA (DASHBOARD)
// ==========================================
app.get('/api/complaints', async (req, res) => {
    try {
        const db = await mysql.createConnection(dbConfig);
        const query = `
            SELECT c.*, cat.category_name 
            FROM complaints c
            LEFT JOIN categories cat ON c.category_id = cat.id
            ORDER BY c.created_at DESC
        `;
        const [rows] = await db.execute(query);
        await db.end();

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error Get Data:', error);
        res.status(500).json({ status: 'error', message: 'Gagal mengambil data dari database.' });
    }
});

// ==========================================
// API 4: UPDATE STATUS
// ==========================================
app.patch('/api/complaints/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatus = ['Menunggu', 'Diproses', 'Selesai'];
        if (!validStatus.includes(status)) {
            return res.status(400).json({ status: 'error', message: 'Status tidak dikenali!' });
        }

        const db = await mysql.createConnection(dbConfig);
        await db.execute('UPDATE complaints SET status = ? WHERE id = ?', [status, id]);
        await db.end();

        res.status(200).json({ status: 'success', message: 'Status berhasil diperbarui' });
    } catch (error) {
        console.error('Error Update Status:', error);
        res.status(500).json({ status: 'error', message: 'Gagal memperbarui status.' });
    }
});

// ==========================================
// API 5: DELETE DATA
// ==========================================
app.delete('/api/complaints/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await mysql.createConnection(dbConfig);
        await db.execute('DELETE FROM complaints WHERE id = ?', [id]);
        await db.end();

        res.status(200).json({ status: 'success', message: 'Data berhasil dihapus' });
    } catch (error) {
        console.error('Error Delete Data:', error);
        res.status(500).json({ status: 'error', message: 'Gagal menghapus data.' });
    }
});

// Jalankan Server
app.listen(port, () => {
    console.log(`🚀 Server Backend SIMKEL berjalan di http://localhost:${port}`);
});