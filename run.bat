@echo off
echo [1/3] Sedang memeriksa dependensi backend...
cd backend
call npm install
echo [2/3] Sedang memeriksa dependensi frontend...
cd ..\frontend
call npm install
echo [3/3] Semua siap! Menjalankan proyek...
cd ..
echo Untuk menjalankan server, jalankan 'npm run dev' di masing-masing folder.
pause