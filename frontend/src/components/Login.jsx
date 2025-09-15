import { useState } from "react";
import { login } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/global.css";

// Componente de Login
function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(correo, contraseña);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("rol", response.data.usuario.rol);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error en login:", error.response?.data || error.message);
      alert("Error al iniciar sesión: " + (error.response?.data?.error || "Intenta de nuevo"));
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Iniciar Sesión</h2>
      <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
      <br />
      <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)}/>
      <br />
      <button onClick={handleLogin}>Login</button>
      <br />
      <p> ¿No tienes cuenta?{" "} <Link to="/register">Regístrate aquí</Link></p>
    </div>
  );
}

export default Login;
