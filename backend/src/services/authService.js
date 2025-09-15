const { hashPassword, comparePasswords } = require("../utils/hash");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "clave_super_secreta";

// Registro de un nuevo usuario
async function register(userData) {
    const { nombre, apellido, correo, contraseña, telefono, idRol } = userData;

    if (!contraseña) throw new Error("La contraseña es obligatoria");

    const hashedPassword = await hashPassword(contraseña);

    const nuevoUsuario = await userModel.create({
        nombre,
        apellido,
        correo,
        contraseña: hashedPassword,
        telefono,
        idRol
    });

    return { mensaje: "Usuario registrado correctamente", usuario: nuevoUsuario };
}


// Login de usuario
async function login(correo, contraseña) {
    const usuario = await userModel.findByEmail(correo);
    if (!usuario) throw new Error("Usuario no encontrado");

    const isMatch = await comparePasswords(contraseña, usuario["Contraseña"]);
    if (!isMatch) throw new Error("Contraseña incorrecta");

    const token = jwt.sign(
        { id: usuario.IdUsuario, rol: usuario.IdRol },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    return { 
        mensaje: "Login exitoso", 
        token,
        usuario: {
            id: usuario.IdUsuario,
            nombre: usuario.Nombre,
            rol: usuario.IdRol
        }
    };
}

module.exports = { register, login };
