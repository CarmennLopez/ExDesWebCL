const express = require("express");
const cors = require("cors");
const { getConnection } = require("./db");

const app = express();

// Configuración de CORS
app.use(cors({
  origin: "*" // Permite cualquier origen. Cambiar si quieres restringir.
}));

app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor de mensajes funcionando ✅");
});

// Ruta para obtener los mensajes cronológicamente
app.get("/mensajes", async (req, res) => {
  try {
    const resp = await fetch("https://desarrollowebfinal.onrender.com/api/mensajes-chat");
    const data = await resp.json();
    res.json(data); // Devuelve los datos a tu frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener mensajes" });
  }
});
// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
