import axios from "axios";

// 💡 MATERI REFACTOR API (Slide Hal 41): Mengelompokkan Base URL dalam satu instance
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default api;