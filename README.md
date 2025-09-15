# 📋 Sistema de Gestión de Solicitudes – Prueba Técnica Backend

Este proyecto es una solución para la **prueba técnica de desarrollo backend**, cuyo objetivo es construir una **API REST segura y escalable** para gestionar solicitudes de soporte, usuarios y roles. Incluye además una **interfaz frontend** para facilitar la interacción con el sistema y un **manual de usuario** que guía en el uso de la aplicación.

---[Manual De Usuario.pdf](https://github.com/user-attachments/files/22336438/Manual.De.Usuario.pdf)


## 🚀 Tecnologías Utilizadas

### Backend

* **Node.js** con **Express**
* **MySQL** como base de datos relacional
* **JWT** para autenticación
* **bcrypt** para encriptación de contraseñas
* Seguridad:

  * **CORS**
  * **Rate limiting**
  * Sanitización de datos
* Arquitectura **modular**: controladores, servicios y repositorios

### Frontend

* **React** con **Vite**
* **React Router DOM** para navegación
* **Axios** para consumo de la API
* **CSS** para estilos

---

## 🛠️ Instalación

### Requisitos Previos

* Node.js y npm
* MySQL
* (Opcional) **nodemon** para desarrollo

### Configuración de la Base de Datos

1. Dentro del repositorio encontrarás un archivo `db.sql`.
2. Ábrelo en tu gestor de MySQL y ejecútalo.
3. Esto cargará la estructura predeterminada del proyecto.

### Configuración del Backend

```bash
git clone https://github.com/jasagaga/PruebaTecnicaCifra.git
cd PruebaTecnicaCifra/backend
npm install
```

* Configura tu conexión a MySQL en `backend/src/config/db.js`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_clave
DB_NAME=CifraPruebaTecnica
```

* Inicia el servidor:

```bash
npm run dev
```

### Configuración del Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🧪 Cómo Probar la Aplicación

1. Registra usuarios con diferentes roles: **cliente**, **soporte**, **administrador**.
2. Inicia sesión usando el endpoint `/auth/login` para obtener un **token JWT**.
3. Usa el token para acceder a los endpoints protegidos:

| Método | Endpoint              | Descripción                       | Roles         |
| ------ | --------------------- | --------------------------------- | ------------- |
| POST   | /solicitudes          | Crear solicitud                   | Cliente       |
| GET    | /solicitudes          | Listar solicitudes según rol      | Todos         |
| PUT    | /solicitudes/{id}     | Actualizar estado/respuesta       | Soporte/Admin |
| GET    | /reportes/solicitudes | Resumen de solicitudes por estado | Admin         |

* Puedes usar **Postman** o la **interfaz React** para interactuar con la API.

---

## ✅ Funcionalidades Implementadas

* Autenticación con JWT
* Gestión de roles: **cliente**, **soporte**, **administrador**
* CRUD de solicitudes con control de acceso
* Historial de cambios por solicitud
* Reporte de solicitudes por estado
* Seguridad básica: CORS y sanitización
* Arquitectura modular y organizada
* Documentación básica de endpoints

---

## 🧩 Funcionalidades Pendientes / Futuras Mejoras

* Notificaciones por correo al crear o actualizar solicitudes
* Endpoint con IA o reglas básicas para sugerir respuestas automáticas
* Tests automatizados (unitarios e integración)
* Mejoras en la interfaz de usuario para visualización de reportes

---

## 📁 Estructura del Proyecto

### Backend

```
backend/
├── controllers/
├── services/
├── utils/
├── config/
├── routers/
├── models/
├── middleware/
└── index.js
```

### Frontend

```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── App.jsx
│   └── Main.jsx
└── vite.config.js
```

---

## 🧩 Fotos del aplicativo

### Login
<img width="1919" height="921" alt="image" src="https://github.com/user-attachments/assets/980eb080-97a6-407b-b604-bf452283d9cc" />

### Registro
<img width="1917" height="917" alt="image" src="https://github.com/user-attachments/assets/56d3991a-7a2b-47a3-acef-ed44b8854904" />

### DashBoard
<img width="1917" height="921" alt="image" src="https://github.com/user-attachments/assets/49239d16-c692-4743-8000-a8754720e907" />


---

💡 **Notas adicionales**

* Asegúrate de tener MySQL corriendo antes de iniciar el backend.
* El token JWT debe incluirse en el header `Authorization: Bearer <token>` para acceder a rutas protegidas.
