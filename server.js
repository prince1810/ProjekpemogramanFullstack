const express = require("express");
const app = express();

const complaintRoutes = require("./routes/complaintRoutes");

app.use(express.json());

app.use("/api", complaintRoutes);

app.get("/", (req, res) => {
    res.send("Sistem Manajemen Informasi Keluhan Pelanggan ");
});

app.listen(3000, () => {
    console.log("Server berjalan di port 3000");
});