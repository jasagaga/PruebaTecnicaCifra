import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSolicitudes,
  crearSolicitud,
  actualizarSolicitud,
  getReporteSolicitudes,
  logout,
} from "../services/api";
import axios from "axios";
import "../styles/global.css";

function Dashboard() {
  const navigate = useNavigate();
  const [rol, setRol] = useState("");
  const [solicitudes, setSolicitudes] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [reporte, setReporte] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const token = localStorage.getItem("token");

  // Verificar login y obtener rol
  useEffect(() => {
    const storedRol = localStorage.getItem("rol");
    if (!storedRol) {
      navigate("/login");
    } else {
      setRol(parseInt(storedRol));
      fetchSolicitudes();
      fetchReporte();
    }
  }, [navigate]);

  // Cargar solicitudes
  const fetchSolicitudes = async () => {
    try {
      const data = await getSolicitudes(token);
      setSolicitudes(data);
    } catch (error) {
      console.error("Error al cargar solicitudes", error);
    }
  };

  const fetchReporte = async () => {
    try {
      const data = await getReporteSolicitudes(token);
      setReporte(data);
    } catch (error) {
      console.error("Error al cargar reporte", error);
    }
  };

  // Crear solicitud (solo clientes)
  const handleCrear = async () => {
    try {
      await crearSolicitud(token, descripcion);
      setDescripcion("");
      fetchSolicitudes();
    } catch (error) {
      console.error("Error al crear solicitud", error);
    }
  };

  // Actualizar solicitud (soporte/admin)
  const handleActualizar = async (id, estado) => {
  try {
    await actualizarSolicitud(token, id, estado, ""); 
    alert(`Se ha modificado el estado a ${estado}`);
    fetchSolicitudes();
  } catch (error) {
    console.error("Error al actualizar solicitud", error);
  }
};


  // Obtener historial de una solicitud
  const handleVerHistorial = async (idSolicitud) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/solicitudes/${idSolicitud}/historial`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHistorial(data);
      setSolicitudSeleccionada(idSolicitud);
      setMostrarModal(true);
    } catch (error) {
      console.error("Error al cargar historial", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>CIFRA IT</h2>
      <button onClick={handleLogout} style={{ float: "right" }}>
        Cerrar sesión
      </button>

      {rol === 1 && <p>Eres administrador</p>}
      {rol === 2 && <p>Eres soporte</p>}
      {rol === 3 && (
        <div>
          <p>Eres cliente</p>
          <div>
            <input
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Nueva solicitud"
            />
            <button onClick={handleCrear}>Crear solicitud</button>
          </div>
        </div>
      )}

      {/* Tabla de solicitudes */}
      <table border="1" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Cliente</th>
            <th>Nombre Soporte</th>
            <th>Descripción</th>
            <th>Estado</th>
            {rol !== 3 && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((s) => (
            <tr key={s.IdSolicitud}>
              <td>{s.IdSolicitud}</td>
              <td>{s.ClienteNombre}</td>
              <td>{s.SoporteNombre}</td>
              <td>{s.Descripcion}</td>
              <td>{s.IdEstado}</td>
              {rol !== 3 && (
                <td>
                  <button
                    onClick={() => handleActualizar(s.IdSolicitud, "En proceso")}
                  >
                    En proceso
                  </button>
                  <button
                    onClick={() => handleActualizar(s.IdSolicitud, "Cerrada")}
                  >
                    Cerrar
                  </button>
                  <button onClick={() => handleVerHistorial(s.IdSolicitud)}>
                    Más información
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Reporte de solicitudes */}
      {(rol === 1 || rol === 2) && (
        <div style={{ marginTop: "20px" }}>
          <h3>Reporte de Solicitudes</h3>
          <table border="1" style={{ width: "50%" }}>
            <thead>
              <tr>
                <th>Estado</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {reporte.map((r, index) => (
                <tr key={index}>
                  <td>{r.estado}</td>
                  <td>{r.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal para historial */}
      {mostrarModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Historial de la solicitud #{solicitudSeleccionada}</h3>
            {historial.length > 0 ? (
              <ul>
                {historial.map((h) => (
                  <li key={h.IdHistorialSolicitudes}>
                    <strong>{h.NombreUsuario}</strong> - {h.Descripcion}
                    <br />
                    <small>
                      {new Date(h.FechaActualizacion).toLocaleString()}
                    </small>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay historial para esta solicitud.</p>
            )}
            <button onClick={() => setMostrarModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
