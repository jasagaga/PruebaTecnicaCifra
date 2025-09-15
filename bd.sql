-- Creacion de base de datos CifraPruebaTecnica;
CREATE DATABASE CifraPruebaTecnica;

-- Usar base de datos
USE CifraPruebaTecnica;

-- Crear de tabla para los roles
CREATE TABLE rol (
  IdRol int not null auto_increment primary key,
  NombreRol varchar(45) null,
  Descripcion varchar(45) null
);

-- Creacion de tabla para los usuarios 
CREATE TABLE usuarios (
	IdUsuario int not null auto_increment primary key,
	Nombre varchar(45) null,
	Apellido varchar(45) null,
	Correo varchar(45) null,
	Contraseña varchar(400) null,
	Telefono varchar(45) null,
	IdRol int null,
	constraint fk_usuarios_roles
		foreign key(IdRol)
		references rol (IdRol)
);

-- Creacion de tabla para los solicitudes
CREATE TABLE solicitudes (
    IdSolicitud int not null auto_increment primary key,
    IdCliente int not null,
    IdSoporte int(45) null,
    Descripcion varchar(500) not null,
    IdEstado enum('Abierta', 'En proceso', 'Cerrada') not null,
    constraint fk_solicitudesCliente
        foreign key (IdCliente)
        references usuarios (IdUsuario),
    constraint fk_solicitudesSoporte
        foreign key (IdSoporte)
        references usuarios (IdUsuario)
);

CREATE TABLE HistorialSolicitud (
	IdHistorialSolicitudes int not null auto_increment primary key,
    IdSolicitud int not null,
    IdUsuarioModificador int not null,
	Descripcion varchar(500) not null,
	FechaActualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    constraint fk_historial_solicitud
        foreign key (IdSolicitud)
        references solicitudes (IdSolicitud),
	constraint fk_historial_usuario
        foreign key (IdUsuarioModificador)
        references usuarios (IdUsuario)
);