const express = require("express");
const pool = require("./src/config/db");
const data = require("./src/config/data")
const authRoutes = require("./src/routers/authRoutes");
const solicitudRoutes = require("./src/routers/solicitudRoutes");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());


// Probar conexión con MySQL y cargar datos iniciales
async function testConnection() {
    try {
        await pool.query("SELECT 1");
        console.log("Conexión exitosa a la base de datos");
        await data();
    } catch (error) {
        console.error("Error de conexion:", error.message);
    }
}

// Configurar CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Rutas y middlewares
app.use("/api/auth", authRoutes);
app.use("/api/solicitudes", solicitudRoutes);


// arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  testConnection();
});