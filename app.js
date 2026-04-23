require("dotenv").config();
const express = require("express");
const router = require ("./routes/api");
const db = require('./config/databas');
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(router);

app.get("/test-koneksi", (req, res) =>{
    db.query("SELECT 1", (err, result)=>{
        if(err){
            res.json({message: "Koneksi gagal"});
        } else {
            res.json({
                message: "Koneksi Berhasil",
                result: result
            });
        }
    });
});

//pindahkan routing ke routes/api.js
app.listen(process.env.PORT, ()=>{
    console.log(`Server berjalan di port 3000 ${process.env.PORT}`);
});