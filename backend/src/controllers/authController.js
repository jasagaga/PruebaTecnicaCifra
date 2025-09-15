const authService = require("../services/authService");

// Controlador para el login
async function login(req, res) {
    const { correo, contraseña } = req.body;

    try {
        const data = await authService.login(correo, contraseña);
        res.json(data);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

// Controlador para el registro
async function register(req, res) {
    const { nombre, apellido, correo, contraseña, telefono, idRol } = req.body;

    try {
        const data = await authService.register({
            nombre,apellido,correo,contraseña,telefono,idRol
        });
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = { login, register };
