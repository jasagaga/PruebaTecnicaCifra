const mysql = require("mysql2/promise");

// Configuración de la conexión
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", 
  database: "CifraPruebaTecnica"
});

module.exports = pool;
