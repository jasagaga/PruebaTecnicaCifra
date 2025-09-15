const express = require("express");
const { listarSolicitudes, crearSolicitud, reporteSolicitudes, actualizarSolicitud, getHistorialBySolicitud } = require("../controllers/solicitudController");
const { authenticate, authorizeCliente } = require("../middleware/authMiddleware");
const router = express.Router();

// Listar solicitudes según rol
router.get("/", authenticate, listarSolicitudes);

// Reporte de solicitudes por estado
router.get("/reporte", authenticate, reporteSolicitudes);

// Crear solicitud (solo cliente)
router.post("/", authenticate, authorizeCliente, crearSolicitud);

// Actualizar solicitud (soporte/admin)
router.put("/:id", authenticate, actualizarSolicitud);

// Historial de una solicitud
router.get("/:idSolicitud/historial", getHistorialBySolicitud);

module.exports = router;
