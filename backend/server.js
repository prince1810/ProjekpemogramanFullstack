const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const app = express();
const port = 3000;

// Konfigurasi limit untuk menangani upload foto/data besar
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cors());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "../frontend")));

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_keluhan_pelanggan",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ==========================================
// FUNGSI PEMBANTU: LOG AKTIVITAS
// ==========================================
async function logActivity(action, tableName, recordId) {
  try {
    await pool.execute(
      "INSERT INTO audit_logs (action, table_name, record_id) VALUES (?, ?, ?)",
      [action, tableName, recordId]
    );
  } catch (err) {
    console.error("Gagal mencatat log:", err);
  }
}

// ==========================================
// API AUTHENTICATION (Satu Form Login untuk User & Admin)
// ==========================================
app.post("/api/auth-login", async (req, res) => {
  try {
    // Menggunakan 'email' dan 'password' yang dikirim dari frontend
    const { email, password } = req.body; 
    
    // 1. Cek di tabel users (Mahasiswa) terlebih dahulu
    const [userRows] = await pool.execute(
      `SELECT * FROM users WHERE email = ? AND BINARY password = ?`, 
      [email, password]
    );
    
    if (userRows.length > 0) {
      const userData = userRows[0];
      return res.status(200).json({ 
        success: true,
        user: { 
          id: userData.id, 
          nama: userData.nama, 
          email: userData.email, 
          role: 'user', 
          nim: userData.nim,
          jurusan: userData.jurusan,
          avatar: userData.avatar
        },
        message: "Login User berhasil" 
      });
    }

    // 2. Jika tidak ketemu di users, cek di tabel admins
    const [adminRows] = await pool.execute(
      `SELECT * FROM admins WHERE email = ? AND BINARY password = ?`, 
      [email, password]
    );
    
    if (adminRows.length > 0) {
      const adminData = adminRows[0];
      return res.status(200).json({ 
        success: true,
        user: { 
          id: adminData.id, 
          nama: adminData.nama_lengkap, 
          email: adminData.email, 
          role: 'admin', 
          avatar: adminData.avatar
        },
        message: "Login Admin berhasil" 
      });
    }
    
    // 3. Jika email tidak terdaftar di kedua tabel atau password salah
    res.status(401).json({ success: false, message: "Email atau Password salah!" });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Database error." });
  }
});

// ==========================================
// API STATISTIK LANDING PAGE (FITUR BARU)
// ==========================================
app.get('/api/statistics', async (req, res) => {
  try {
    // Menghitung status berdasarkan tabel complaints
    const query = `
      SELECT 
        COUNT(*) AS total,
        SUM(CASE WHEN status = 'Selesai' THEN 1 ELSE 0 END) AS selesai,
        SUM(CASE WHEN status IN ('Diproses', 'Pending') THEN 1 ELSE 0 END) AS diproses,
        SUM(CASE WHEN status = 'Ditolak' THEN 1 ELSE 0 END) AS ditolak
      FROM complaints
    `;
    const [rows] = await pool.execute(query);
    
    // Kirim data ke frontend
    res.json({
      total: rows[0].total || 0,
      selesai: rows[0].selesai || 0,
      diproses: rows[0].diproses || 0,
      ditolak: rows[0].ditolak || 0
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// ==========================================
// API KELUHAN (CRUD)
// ==========================================
app.post("/api/complaints", async (req, res) => {
  try {
    const { customer_name, customer_email, category_id, message } = req.body;
    await pool.execute(`INSERT INTO complaints (customer_name, customer_email, category_id, message, status) VALUES (?, ?, ?, ?, 'Pending')`,
      [customer_name, customer_email, category_id, message]);
    res.status(201).json({ message: "Keluhan terkirim" });
  } catch (error) {
    res.status(500).json({ message: "Database error." });
  }
});

app.get("/api/complaints", async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT c.*, cat.category_name 
      FROM complaints c
      LEFT JOIN categories cat ON c.category_id = cat.id
      ORDER BY c.created_at DESC`);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Gagal ambil data" });
  }
});

app.delete("/api/complaints/:id", async (req, res) => {
  try {
    await logActivity("DELETE_COMPLAINT", "complaints", req.params.id);
    await pool.execute("DELETE FROM complaints WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "Keluhan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus data" });
  }
});

// [PENAMBAHAN ROUTE UPDATE]: Ini yang tadi menyebabkan 404
// Ganti app.put menjadi app.patch agar sinkron dengan axios.patch di frontend lu
app.patch("/api/complaints/:id", async (req, res) => {
  try {
    const { status } = req.body;
    await pool.execute("UPDATE complaints SET status = ? WHERE id = ?", [status, req.params.id]);
    await logActivity("UPDATE_COMPLAINT_STATUS", "complaints", req.params.id);
    res.status(200).json({ message: "Status keluhan berhasil diperbarui" });
  } catch (error) {
    console.error("🔴 Gagal update status:", error.message);
    res.status(500).json({ message: "Gagal memperbarui status" });
  }
});

// ==========================================
// API MANAJEMEN PENGGUNA (USERS)
// ==========================================
app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT id, nama, email, role, is_active FROM users");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data pengguna" });
  }
});

app.get("/api/audit-logs/:tableName/:recordId", async (req, res) => {
  try {
    const { tableName, recordId } = req.params;
    const [rows] = await pool.execute(
      "SELECT action, created_at FROM audit_logs WHERE table_name = ? AND record_id = ? ORDER BY created_at DESC",
      [tableName, recordId]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil log" });
  }
});

app.patch("/api/users/:id/status", async (req, res) => {
  try {
    const { is_active } = req.body;
    await pool.execute("UPDATE users SET is_active = ? WHERE id = ?", [is_active, req.params.id]);
    await logActivity(is_active ? "ACTIVATE_USER" : "DEACTIVATE_USER", "users", req.params.id);
    res.status(200).json({ message: "Status berhasil diubah" });
  } catch (error) {
    res.status(500).json({ message: "Gagal update status" });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    await logActivity("DELETE_USER", "users", req.params.id);
    await pool.execute("DELETE FROM users WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "Pengguna berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus pengguna" });
  }
});

// ==========================================
// API KATEGORI KELUHAN
// ==========================================
app.get("/api/categories", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM categories ORDER BY id DESC");
    res.status(200).json(rows);
  } catch (error) {
    console.error("🔴 ERROR AMBIL DATA KATEGORI:", error.message);
    res.status(500).json({ message: "Gagal mengambil kategori" });
  }
});

app.post("/api/categories", async (req, res) => {
  try {
    const { category_name, division, priority } = req.body;
    const [result] = await pool.execute(
      "INSERT INTO categories (category_name, division, priority) VALUES (?, ?, ?)",
      [category_name, division, priority]
    );
    await logActivity("CREATE_CATEGORY", "categories", result.insertId);
    res.status(201).json({ message: "Kategori berhasil ditambahkan" });
  } catch (error) {
    console.error("🔴 ERROR DATABASE TAMBAH KATEGORI:", error.message);
    res.status(500).json({ message: "Gagal menambah kategori" });
  }
});

app.put("/api/categories/:id", async (req, res) => {
  try {
    const { category_name, division, priority } = req.body;
    await pool.execute(
      "UPDATE categories SET category_name = ?, division = ?, priority = ? WHERE id = ?",
      [category_name, division, priority, req.params.id]
    );
    await logActivity("UPDATE_CATEGORY", "categories", req.params.id);
    res.status(200).json({ message: "Kategori berhasil diperbarui" });
  } catch (error) {
    console.error("🔴 ERROR DATABASE UPDATE KATEGORI:", error.message);
    res.status(500).json({ message: "Gagal update kategori" });
  }
});

app.delete("/api/categories/:id", async (req, res) => {
  try {
    await logActivity("DELETE_CATEGORY", "categories", req.params.id);
    await pool.execute("DELETE FROM categories WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "Kategori berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus kategori. Pastikan tidak ada keluhan yang memakai kategori ini." });
  }
});

// ==========================================
// API PENGUMUMAN (BROADCAST)
// ==========================================
app.get("/api/announcements", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM announcements ORDER BY created_at DESC");
    res.status(200).json(rows);
  } catch (error) {
    console.error("🔴 ERROR AMBIL PENGUMUMAN:", error.message);
    res.status(500).json({ message: "Gagal mengambil pengumuman" });
  }
});

app.post("/api/announcements", async (req, res) => {
  try {
    const { title, content, target_audience, attachment_link, valid_until } = req.body;
    const finalDate = valid_until && valid_until !== "" ? valid_until : null;

    const [result] = await pool.execute(
      "INSERT INTO announcements (title, content, target_audience, attachment_link, valid_until, status) VALUES (?, ?, ?, ?, ?, 'Aktif')",
      [title, content, target_audience, attachment_link, finalDate]
    );
    await logActivity("CREATE_ANNOUNCEMENT", "announcements", result.insertId);
    res.status(201).json({ message: "Pengumuman berhasil disiarkan" });
  } catch (error) {
    console.error("🔴 ERROR BUAT PENGUMUMAN:", error.message);
    res.status(500).json({ message: "Gagal membuat pengumuman" });
  }
});

app.patch("/api/announcements/:id/archive", async (req, res) => {
  try {
    await pool.execute("UPDATE announcements SET status = 'Arsip' WHERE id = ?", [req.params.id]);
    await logActivity("ARCHIVE_ANNOUNCEMENT", "announcements", req.params.id);
    res.status(200).json({ message: "Pengumuman diarsipkan" });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengarsipkan" });
  }
});

app.delete("/api/announcements/:id", async (req, res) => {
  try {
    await logActivity("DELETE_ANNOUNCEMENT", "announcements", req.params.id);
    await pool.execute("DELETE FROM announcements WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "Pengumuman dihapus permanen" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus pengumuman" });
  }
});

// ==========================================
// API PROFIL ADMIN
// ==========================================
app.get("/api/admin/profile", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT id, username, nama_lengkap, email, role, is_2fa_active, avatar FROM admins LIMIT 1");
    if (rows.length > 0) res.status(200).json(rows[0]);
    else res.status(404).json({ message: "Admin tidak ditemukan" });
  } catch (error) {
    console.error("🔴 ERROR GET PROFILE:", error.message);
    res.status(500).json({ message: "Gagal mengambil profil" });
  }
});

app.put("/api/admin/profile", async (req, res) => {
  try {
    const { nama_lengkap, email, avatar } = req.body;
    await pool.execute(
      "UPDATE admins SET nama_lengkap = ?, email = ?, avatar = ? WHERE id = 1",
      [nama_lengkap, email, avatar]
    );
    await logActivity("UPDATE_ADMIN_PROFILE", "admins", 1);
    res.status(200).json({ message: "Profil berhasil diperbarui" });
  } catch (error) {
    console.error("🔴 ERROR UPDATE PROFILE:", error.message);
    res.status(500).json({ message: "Gagal update profil" });
  }
});

app.put("/api/admin/password", async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const [admin] = await pool.execute("SELECT password FROM admins WHERE id = 1");
    if (admin.length === 0 || admin[0].password !== oldPassword) {
      return res.status(400).json({ message: "Kata sandi saat ini salah!" });
    }
    await pool.execute("UPDATE admins SET password = ? WHERE id = 1", [newPassword]);
    await logActivity("UPDATE_ADMIN_PASSWORD", "admins", 1);
    res.status(200).json({ message: "Kata sandi diperbarui" });
  } catch (error) {
    console.error("🔴 ERROR UPDATE PASSWORD:", error.message);
    res.status(500).json({ message: "Gagal update kata sandi" });
  }
});

app.patch("/api/admin/2fa", async (req, res) => {
  try {
    const { is_2fa_active } = req.body;
    await pool.execute("UPDATE admins SET is_2fa_active = ? WHERE id = 1", [is_2fa_active]);
    await logActivity(is_2fa_active ? "ENABLE_2FA" : "DISABLE_2FA", "admins", 1);
    res.status(200).json({ message: "Status 2FA diperbarui" });
  } catch (error) {
    console.error("🔴 ERROR UPDATE 2FA:", error.message);
    res.status(500).json({ message: "Gagal ubah 2FA" });
  }
});

// ==========================================
// API PROFIL MAHASISWA
// ==========================================
app.get("/api/user/profile/:id", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT id, nama, email, nim, jurusan, avatar FROM users WHERE id = ?",
      [req.params.id]
    );
    if (rows.length > 0) res.status(200).json(rows[0]);
    else res.status(404).json({ message: "Data mahasiswa tidak ditemukan" });
  } catch (error) {
    console.error("🔴 ERROR GET USER PROFILE:", error.message);
    res.status(500).json({ message: "Gagal mengambil data profil" });
  }
});

app.put("/api/user/profile/:id", async (req, res) => {
  try {
    const { nama, email, nim, jurusan, avatar } = req.body;
    await pool.execute(
      "UPDATE users SET nama = ?, email = ?, nim = ?, jurusan = ?, avatar = ? WHERE id = ?",
      [nama, email, nim, jurusan, avatar, req.params.id]
    );
    await logActivity("UPDATE_USER_PROFILE", "users", req.params.id);
    res.status(200).json({ message: "Profil berhasil diperbarui permanen" });
  } catch (error) {
    console.error("🔴 ERROR UPDATE USER PROFILE:", error.message);
    res.status(500).json({ message: "Gagal memperbarui profil" });
  }
});

app.get("/api/user/complaints/:id", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT c.*, cat.category_name 
       FROM complaints c
       LEFT JOIN categories cat ON c.category_id = cat.id
       WHERE c.customer_email = (SELECT email FROM users WHERE id = ?)
       ORDER BY c.created_at DESC`,
      [req.params.id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("🔴 ERROR GET USER COMPLAINTS:", error.message);
    res.status(500).json({ message: "Gagal mengambil riwayat keluhan" });
  }
});

app.put("/api/user/password/:id", async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const [user] = await pool.execute("SELECT password FROM users WHERE id = ?", [req.params.id]);
    if (user.length === 0 || user[0].password !== oldPassword) {
      return res.status(400).json({ message: "Kata sandi lama salah!" });
    }
    await pool.execute("UPDATE users SET password = ? WHERE id = ?", [newPassword, req.params.id]);
    await logActivity("UPDATE_USER_PASSWORD", "users", req.params.id);
    res.status(200).json({ message: "Kata sandi berhasil diperbarui" });
  } catch (error) {
    console.error("🔴 ERROR UPDATE PASSWORD USER:", error.message);
    res.status(500).json({ message: "Gagal update kata sandi" });
  }
});

// ==========================================
// SERVER LISTENER
// ==========================================
app.listen(port, () => {
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
});