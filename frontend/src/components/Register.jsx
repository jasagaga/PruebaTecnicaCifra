import { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/global.css";

// Componente de Registro
function Register() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [telefono, setTelefono] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await register({
                nombre,
                apellido,
                correo,
                contraseña,
                telefono,
                idRol: 3
            });
            alert("Registro exitoso, ahora inicia sesión");
            navigate("/login");
        } catch (error) {
            console.error("Error al registrarse:", error.response?.data || error.message);
            alert("Error al registrarse");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
        <h2>Registro</h2>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
        <br />
        <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)}/>
        <br />
        <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)}/>
        <br />
        <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)}/>
        <br />
        <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
        <br />
        <button onClick={handleRegister}>Registrarse</button>
        <br />
        <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
        </div>
    );
}

export default Register;
