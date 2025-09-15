📋 Sistema de Gestión de Solicitudes – Prueba Técnica Backend
Este proyecto es una solución para la prueba técnica de desarrollo backend, cuyo objetivo es construir una API REST segura y escalable para gestionar solicitudes de soporte, usuarios y roles. Incluye una interfaz frontend para facilitar la interacción con el sistema.

🚀 Tecnologías Utilizadas
Backend
Node.js con Express

MySQL como base de datos relacional

JWT para autenticación

bcrypt para encriptación de contraseñas

CORS, rate limiting y sanitización para seguridad

Estructura modular con repositorios, servicios y controladores

Frontend
React con Vite

React Router DOM para navegación

Axios para consumo de la API

CSS para estilos

🛠️ Instalación
Requisitos previos
Node.js y npm

MySQL

(Opcional) nodemon para desarrollo

Backend
bash
git clone https://github.com/tuusuario/pruebatecnica.git
cd pruebatecnica/backend
npm install
Configura tu archivo .env con las credenciales de la base de datos y la clave JWT:

env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_clave
DB_NAME=solicitudes_db
JWT_SECRET=tu_clave_secreta
Luego, inicia el servidor:

bash
npm run dev
Frontend
bash
cd ../frontend
npm install
npm run dev
🧪 Cómo Probar la Aplicación
Registra usuarios con diferentes roles: cliente, soporte, administrador.

Inicia sesión con /auth/login para obtener el token JWT.

Usa el token para acceder a los endpoints protegidos:

POST /solicitudes – crear solicitud (cliente)

GET /solicitudes – listar solicitudes según rol

PUT /solicitudes/{id} – actualizar estado/respuesta (soporte/admin)

GET /reportes/solicitudes – resumen por estado

Puedes usar herramientas como Postman o la interfaz React para interactuar con la API.

✅ Funcionalidades Implementadas
Autenticación con JWT

Gestión de roles: cliente, soporte, administrador

CRUD de solicitudes con control de acceso

Historial de cambios por solicitud

Reporte de solicitudes por estado

Seguridad:

Rate limiting

Protección contra SQL Injection

CORS

Validaciones y sanitización de inputs

Estructura limpia y modular

Documentación básica de endpoints

🧩 Funcionalidades Pendientes / Futuras Mejoras
Notificaciones por correo al crear o actualizar solicitudes

Endpoint con IA o reglas básicas para sugerir respuestas automáticas

Tests automatizados (unitarios/integración)

Mejoras en la UI para visualización de reportes

📁 Estructura del Proyecto
Código
backend/
├── controllers/
├── services/
├── repositories/
├── routes/
├── models/
├── middleware/
└── index.js

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.jsx
└── vite.config.js
