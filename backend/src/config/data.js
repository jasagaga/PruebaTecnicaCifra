const bcrypt = require("bcrypt");
const pool = require("./db");

async function seedDatabase() {

    try {
        const hashedPassword = await bcrypt.hash("1234", 10);
        // INgresar datos a los roles
        await pool.query(`
            INSERT INTO rol (NombreRol, Descripcion) VALUES
                ('Administrador', 'Rol administrador con todos los permisos'),
                ('Soporte', 'Rol soporte con permisos limitados'),
                ('Cliente', 'Rol cliente con permisos de vista solamente')`);

        // Ingresar datos a los usuarios
        await pool.query(`
            INSERT INTO usuarios (Nombre, Apellido, Correo, Contraseña, Telefono, IdRol) VALUES
                ('Ana', 'Hernandez', 'admin@cifra.com', '${hashedPassword}', '1111111111', 1),
                ('Pedro', 'Garcia', 'soporte@cifra.com', '${hashedPassword}', '2222222222', 2),
                ('Laura', 'Garzon', 'cliente@cifra.com', '${hashedPassword}', '3333333333', 3)
            `);

        // Ingresar datos a la solicitud de cliente
        await pool.query(`
            INSERT INTO solicitudes (IdCliente, IdSoporte, Descripcion, IdEstado) VALUES
                (3, 2, 'Problema con el sistema', 'Abierta')
            `);

        console.log("Base de datos y datos iniciales creados");
    }catch (error) {
        console.error("Error en la carga de datos:", error.message);
        throw error;
    }
}

module.exports = seedDatabase;
