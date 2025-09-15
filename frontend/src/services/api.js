import axios from "axios";

const API_URL = "http://localhost:3000/api";

// Login
export async function login(correo, contraseña) {
  return axios.post(`${API_URL}/auth/login`, { correo, contraseña });
}

// Register
export async function register(userData) {
  const { data } = await axios.post(`${API_URL}/auth/register`, userData);
  return data;
}

// Solicitudes
export async function getSolicitudes(token) {
  const { data } = await axios.get(`${API_URL}/solicitudes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

// Crear nueva solicitud
export async function crearSolicitud(token, descripcion) {
  const { data } = await axios.post(
    `${API_URL}/solicitudes`,
    { descripcion },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
}

// Actualizar solicitud (estado y agregar al historial)
export async function actualizarSolicitud(token, id, estado, descripcionHist) {
  const { data } = await axios.put(
    `${API_URL}/solicitudes/${id}`,
    { estado, descripcionHist },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
}

// Obtener reporte de solicitudes por estado
export async function getReporteSolicitudes(token) {
  const { data } = await axios.get(`${API_URL}/solicitudes/reporte`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

// Cerrar sesión
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("rol");
  localStorage.removeItem("nombre");
}

// Obtener historial de una solicitud
export async function getHistorial(token, idSolicitud) {
  const { data } = await axios.get(`${API_URL}/solicitudes/${idSolicitud}/historial`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

