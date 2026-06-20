export default function Navbar({ user, setHalaman, handleLogout }) {
  return (
    <nav style={{ padding: "15px", backgroundColor: "#007bff", color: "white", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2 style={{ margin: 0 }}>🚀 SIMKEL</h2>
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {user ? (
          <>
            <span>Halo, <strong>{user.nama}</strong> ({user.role})</span>
            {user.role === "user" && <button onClick={() => setHalaman("user")} style={{ padding: "5px 10px" }}>Form Keluhan</button>}
            {user.role === "admin" && <button onClick={() => setHalaman("admin")} style={{ padding: "5px 10px" }}>Dashboard Admin</button>}
            <button onClick={handleLogout} style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none" }}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => setHalaman("login-user")} style={{ padding: "5px 10px" }}>Login Mahasiswa</button>
            <button onClick={() => setHalaman("login-admin")} style={{ padding: "5px 10px" }}>Login Admin</button>
            <button onClick={() => setHalaman("register")} style={{ padding: "5px 10px" }}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
}