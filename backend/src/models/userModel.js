const pool = require("../config/db");

// Busca un usuario por su correo
async function findByEmail(correo) {
  const [rows] = await pool.query("SELECT * FROM usuarios WHERE Correo = ?", [correo]);
  return rows[0];
}

// Crea un nuevo usuario
async function create({ nombre, apellido, correo, contraseña, telefono, idRol }) {
    const [result] = await pool.query(
        `INSERT INTO usuarios (Nombre, Apellido, Correo, \`Contraseña\`, Telefono, IdRol) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [nombre, apellido, correo, contraseña, telefono, idRol]
    );
    return { id: result.insertId, nombre, apellido, correo, telefono, idRol };
}

module.exports = { findByEmail, create };
