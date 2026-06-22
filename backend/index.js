const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_keluhan_pelanggan'
});

// --- FITUR BARU: Statistik-Friendly ---
app.get('/api/stats', (req, res) => {
    // Query ini menghitung total dan mengelompokkan berdasarkan status
    const sql = `SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'Menunggu' THEN 1 ELSE 0 END) as menunggu,
        SUM(CASE WHEN status = 'Diproses' THEN 1 ELSE 0 END) as diproses,
        SUM(CASE WHEN status = 'Selesai' THEN 1 ELSE 0 END) as selesai
        FROM complaints`;
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error Statistik:", err);
            return res.status(500).json({ message: "Database Error" });
        }
        // Mengembalikan objek ringkasan
        res.json(results[0]);
    });
});

// Endpoint login yang sebelumnya sudah kita buat
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sqlAdmin = "SELECT * FROM admins WHERE username = ? AND password = ?";
    
    db.query(sqlAdmin, [email, password], (err, results) => {
        if (err) return res.status(500).json({ message: "DB Error" });
        
        if (results.length > 0) {
            res.json({ status: "success", role: "admin" });
        } else {
            const sqlUser = "SELECT * FROM users WHERE email = ? AND password = ?";
            db.query(sqlUser, [email, password], (err, results) => {
                if (err) return res.status(500).json({ message: "DB Error" });
                
                if (results.length > 0) {
                    res.json({ status: "success", role: "mahasiswa" });
                } else {
                    res.status(401).json({ message: "NIM/Password salah!" });
                }
            });
        }
    });
});

// Pastikan endpoint lain (seperti /api/complaints) tetap ada di sini
app.get('/api/complaints', (req, res) => {
    db.query("SELECT * FROM complaints", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.listen(3000, () => console.log('Backend jalan di port 3000'));