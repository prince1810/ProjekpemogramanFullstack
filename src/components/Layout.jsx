import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
// Import Global Context
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  // 💡 Gunakan useContext langsung di sini (Bebas Prop Drilling)
  const { user, logoutGlobal } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logoutGlobal();
    navigate("/");
  };

  return (
    <nav style={{ padding: "15px", backgroundColor: "#007bff", color: "white", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2 style={{ margin: 0 }}>🚀 SIMKEL - Sistem Informasi Keluhan</h2>
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {user ? (
          <>
            <span>Halo, <strong>{user.nama}</strong> ({user.role})</span>
            {user.role === "user" && <Link to="/keluhan" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>Form Keluhan</Link>}
            {user.role === "admin" && <Link to="/admin" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>Dashboard Admin</Link>}
            <button onClick={handleLogoutClick} style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", cursor: "pointer" }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>Login Mahasiswa</Link>
            <Link to="/login-admin" style={{ color: "white", textDecoration: "none" }}>Login Admin</Link>
            <Link to="/register" style={{ color: "white", textDecoration: "none" }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function Container({ children }) {
  return <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", flex: 1, width: "100%", boxSizing: "border-box" }}>{children}</div>;
}

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Container>{children}</Container>
      <footer style={{ marginTop: "40px", padding: "20px", textAlign: "center", borderTop: "1px solid var(--border)" }}>
        <p>© 2026 SIMKEL - Sistem Informasi Keluhan. All Rights Reserved.</p>
      </footer>
    </div>
  );
}