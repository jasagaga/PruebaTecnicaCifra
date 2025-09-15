const jwt = require("jsonwebtoken");

const JWT_SECRET = "clave_super_secreta";

// Verifica si el usuario está autenticado
function authenticate(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: "Token inválido o expirado" });
    }
}

// Middleware para autorizar solo a clientes (rol 3)
function authorizeCliente(req, res, next) {
    if (req.user.rol !== 3) {
        return res.status(403).json({ error: "Acceso denegado: solo clientes pueden realizar esta acción" });
    }
    next();
}

module.exports = { authenticate, authorizeCliente };
