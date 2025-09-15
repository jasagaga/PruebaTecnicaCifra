const pool = require("../config/db");

// Lista solicitudes según el rol del usuario
async function listarSolicitudes(req, res) {
  try {
    const { id, rol } = req.user;
    let solicitudes;

    if (rol === 1) {
      // Administrador
      const [rows] = await pool.query(`
            SELECT s.*, u.Nombre AS ClienteNombre, u.Correo AS ClienteCorreo, r.Nombre AS SoporteNombre
            FROM solicitudes s
            JOIN usuarios u ON s.IdCliente = u.IdUsuario
            JOIN usuarios r ON s.IdSoporte = r.IdUsuario
        `);
      solicitudes = rows;
    } else if (rol === 2) {
      // Soporte para sus solicitudes asignadas
      const [rows] = await pool.query(
        `
        SELECT s.*, u.Nombre AS ClienteNombre, u.Correo AS ClienteCorreo, r.Nombre AS SoporteNombre
        FROM solicitudes s
        JOIN usuarios u ON s.IdCliente = u.IdUsuario
        JOIN usuarios r ON s.IdSoporte = r.IdUsuario
        WHERE s.IdSoporte = ?
      `,
        [id]
      );
      solicitudes = rows;
    } else if (rol === 3) {
      // Cliente solo sus propias solicitudes
      const [rows] = await pool.query(
        `
        SELECT s.*, u.Nombre AS ClienteNombre, u.Correo AS ClienteCorreo, r.Nombre AS SoporteNombre
        FROM solicitudes s
        JOIN usuarios u ON s.IdCliente = u.IdUsuario
        JOIN usuarios r ON s.IdSoporte = r.IdUsuario
        WHERE s.IdCliente = ?
      `,
        [id]
      );
      solicitudes = rows;
    } else {
      return res.status(403).json({ error: "Rol no autorizado" });
    }

    res.json(solicitudes);
  } catch (error) {
    console.error("Error al listar solicitudes:", error.message);
    res.status(500).json({ error: "Error al listar las solicitudes" });
  }
}

// Crea una nueva solicitud asignándola a un soporte por defecto (id 2)
async function crearSolicitud(req, res) {
  try {
    const { descripcion } = req.body;

    const idCliente = req.user.id;

    const idSoporte = 2;

    await pool.query(
      `INSERT INTO solicitudes (IdCliente, IdSoporte, Descripcion, IdEstado) 
            VALUES (?, ?, ?, ?)`,
      [idCliente, idSoporte, descripcion, "Abierta"]
    );

    res.json({ mensaje: "Solicitud creada exitosamente" });
  } catch (error) {
    console.error("Error al crear solicitud:", error.message);
    res.status(500).json({ error: "Error al crear la solicitud" });
  }
}

//agrupa las solicitudes según su estado
async function reporteSolicitudes(req, res) {
  try {
    const [reporte] = await pool.query(`
      SELECT IdEstado AS estado, COUNT(*) AS total
      FROM solicitudes
      GROUP BY IdEstado
    `);

    res.json(reporte);
  } catch (error) {
    console.error("Error al generar reporte:", error.message);
    res.status(500).json({ error: "Error al generar reporte" });
  }
}


// Actualiza el estado de una solicitud y registra el cambio en el historial
async function actualizarSolicitud(req, res) {
  try {
    const { id } = req.params; 
    const { estado, descripcion } = req.body;
    const { id: idUsuario, rol } = req.user;

    // Solo soporte (2) o admin (1)
    if (![1, 2].includes(rol)) {
      return res.status(403).json({ error: "No tienes permisos para actualizar la solicitud" });
    }

    // Actualizar estado de la solicitud
    const [result] = await pool.query(
      `UPDATE solicitudes 
       SET IdEstado = ?
       WHERE IdSolicitud = ?`,
      [estado, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Solicitud no encontrada" });
    }

    let descripcionFinal = `Cambio estado ${estado}`;
    if (descripcion && descripcion.trim() !== "") {
      descripcionFinal += ` - ${descripcion}`;
    }


    // Insertar registro en historial
    await pool.query(
      `INSERT INTO HistorialSolicitud (IdSolicitud, IdUsuarioModificador, Descripcion)
      VALUES (?, ?, ?)`,
      [id, idUsuario, descripcionFinal]
    );

    res.json({ mensaje: "Solicitud actualizada y registrada en historial" });

  } catch (error) {
    console.error("Error al actualizar solicitud:", error.message);
    res.status(500).json({ error: "Error al actualizar la solicitud" });
  }
}

// Obtener historial de una solicitud
async function getHistorialBySolicitud(req, res) {
  const { idSolicitud } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT h.IdHistorialSolicitudes, h.IdSolicitud, h.IdUsuarioModificador,
              h.Descripcion, h.FechaActualizacion,
              u.Nombre AS NombreUsuario
        FROM HistorialSolicitud h
        INNER JOIN usuarios u ON u.IdUsuario = h.IdUsuarioModificador
        WHERE h.IdSolicitud = ? 
        ORDER BY h.FechaActualizacion DESC`,
      [idSolicitud]
    );

    res.json(rows);
  } catch (error) {
    console.error("❌ Error al obtener historial:", error);
    res.status(500).json({ error: "Error al obtener historial" });
  }
}

module.exports = { listarSolicitudes, crearSolicitud, reporteSolicitudes, actualizarSolicitud, getHistorialBySolicitud  };



