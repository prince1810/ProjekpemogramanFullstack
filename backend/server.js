const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const { OAuth2Client } = require('google-auth-library');

const app = express();
const port = 3000;
const client = new OAuth2Client("PASTE_CLIENT_ID_KAMU_DISINI.apps.googleusercontent.com"); // GANTI INI

// Konfigurasi Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(morgan("dev"));

// Konfigurasi Database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_keluhan_pelanggan",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper: Log Aktivitas
async function logActivity(action, tableName, recordId) {
  try {
    await pool.execute("INSERT INTO audit_logs (action, table_name, record_id) VALUES (?, ?, ?)", [action, tableName, recordId]);
  } catch (err) {
    console.error("Gagal mencatat log:", err);
  }
}

// ==========================================
// AUTHENTICATION
// ==========================================
app.post("/api/auth-login", async (req, res) => {
  try {
    const { user, pass } = req.body;
    const [adminRows] = await pool.execute(`SELECT * FROM admins WHERE username = ? AND password = ?`, [user, pass]);
    if (adminRows.length > 0) return res.status(200).json({ role: 'admin', message: "Login Admin berhasil" });

    const [userRows] = await pool.execute(`SELECT * FROM users WHERE (email = ? OR nim = ?) AND password = ?`, [user, user, pass]);
    if (userRows.length > 0) return res.status(200).json({ role: 'mahasiswa', id: userRows[0].id, nama: userRows[0].nama, email: userRows[0].email });
    
    res.status(401).json({ message: "NIM/Email atau Password salah!" });
  } catch (error) { res.status(500).json({ message: "Database error." }); }
});

app.post("/api/auth-google", async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({ idToken: token, audience: "PASTE_CLIENT_ID_KAMU_DISINI.apps.googleusercontent.com" });
    const payload = ticket.getPayload();
    const { email, name } = payload;
    const [userRows] = await pool.execute(`SELECT * FROM users WHERE email = ?`, [email]);
    if (userRows.length > 0) return res.status(200).json({ role: 'mahasiswa', id: userRows[0].id, nama: userRows[0].nama, email: userRows[0].email });
    const [result] = await pool.execute(`INSERT INTO users (nama, email, password, role, is_active) VALUES (?, ?, 'google_login', 'mahasiswa', 1)`, [name, email]);
    res.status(200).json({ role: 'mahasiswa', id: result.insertId, nama: name, email: email });
  } catch (error) { res.status(401).json({ message: "Login Google Gagal!" }); }
});

app.post('/api/auth-register', async (req, res) => {
  try {
    const { nama, email, nim, password, role } = req.body;
    await pool.execute(`INSERT INTO users (nama, email, nim, password, role, created_at, is_active) VALUES (?, ?, ?, ?, ?, NOW(), 1)`,
      [nama, email, nim, password, role || 'mahasiswa']);
    res.status(201).json({ message: "Pendaftaran berhasil!" });
  } catch (err) { res.status(400).json({ message: "Email atau NIM sudah terdaftar!" }); }
});

// ==========================================
// KELUHAN & STATISTIK
// ==========================================
app.get('/api/stats', async (req, res) => {
  try {
    const [results] = await pool.query(`SELECT COUNT(*) as total, SUM(CASE WHEN status = 'Menunggu' THEN 1 ELSE 0 END) as menunggu, SUM(CASE WHEN status = 'Diproses' THEN 1 ELSE 0 END) as diproses, SUM(CASE WHEN status = 'Selesai' THEN 1 ELSE 0 END) as selesai FROM complaints`);
    res.json(results[0]);
  } catch (err) { res.status(500).json({ message: "Database Error" }); }
});

app.get("/api/complaints", async (req, res) => {
  try {
    const [rows] = await pool.execute(`SELECT c.*, cat.category_name FROM complaints c LEFT JOIN categories cat ON c.category_id = cat.id ORDER BY c.created_at DESC`);
    res.status(200).json(rows);
  } catch (error) { res.status(500).json({ message: "Gagal ambil data" }); }
});

// ==========================================
// RUTE USER (PROFIL & RIWAYAT) - DENGAN VALIDASI ID
// ==========================================
app.get("/api/user/profile/:id", async (req, res) => {
  const id = req.params.id;
  // Validasi agar ID 0 atau undefined tidak diproses
  if (!id || id === '0' || id === 'undefined') return res.status(400).json({ message: "ID tidak valid" });
  
  try {
    const [rows] = await pool.execute("SELECT id, nama, email, nim, jurusan, avatar FROM users WHERE id = ?", [id]);
    if (rows.length > 0) res.status(200).json(rows[0]);
    else res.status(404).json({ message: "User tidak ditemukan" });
  } catch (error) { res.status(500).json({ message: "Gagal mengambil profil" }); }
});

app.put("/api/user/profile/:id", async (req, res) => {
  const id = req.params.id;
  if (!id || id === '0' || id === 'undefined') return res.status(400).json({ message: "ID tidak valid" });

  try {
    const { nama, email, nim, jurusan, avatar } = req.body;
    await pool.execute("UPDATE users SET nama = ?, email = ?, nim = ?, jurusan = ?, avatar = ? WHERE id = ?", [nama, email, nim, jurusan, avatar, id]);
    res.status(200).json({ message: "Profil diperbarui" });
  } catch (error) { res.status(500).json({ message: "Gagal update profil" }); }
});

app.put("/api/user/password/:id", async (req, res) => {
  const id = req.params.id;
  if (!id || id === '0' || id === 'undefined') return res.status(400).json({ message: "ID tidak valid" });

  try {
    const { oldPassword, newPassword } = req.body;
    const [user] = await pool.execute("SELECT password FROM users WHERE id = ?", [id]);
    if (user.length === 0 || user[0].password !== oldPassword) return res.status(400).json({ message: "Password lama salah" });
    await pool.execute("UPDATE users SET password = ? WHERE id = ?", [newPassword, id]);
    res.status(200).json({ message: "Password berhasil diubah" });
  } catch (error) { res.status(500).json({ message: "Gagal update password" }); }
});

app.get("/api/user/complaints/:id", async (req, res) => {
  const id = req.params.id;
  // Validasi ID agar tidak crash
  if (!id || id === '0' || id === 'undefined') return res.status(400).json([]);

  try {
    const [rows] = await pool.execute(`
        SELECT c.*, cat.category_name 
        FROM complaints c
        LEFT JOIN categories cat ON c.category_id = cat.id
        WHERE c.customer_email = (SELECT email FROM users WHERE id = ?)
        ORDER BY c.created_at DESC`, [id]);
    res.status(200).json(rows);
  } catch (error) { res.status(500).json({ message: "Gagal ambil riwayat" }); }
});

// ==========================================
// LAIN-LAIN (KATEGORI & USER LIST)
// ==========================================
app.get("/api/categories", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM categories ORDER BY id DESC");
    res.status(200).json(rows);
  } catch (error) { res.status(500).json({ message: "Gagal mengambil kategori" }); }
});

app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT id, nama, email, role, is_active FROM users");
    res.status(200).json(rows);
  } catch (error) { res.status(500).json({ message: "Gagal ambil data user" }); }
});

app.listen(port, () => console.log(`🚀 Server berjalan di http://localhost:${port}`));