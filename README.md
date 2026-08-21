# ✂️ Turnos Peluquería

Aplicación web **Full Stack para la gestión de turnos de peluquerías y barberías**.

El proyecto permite gestionar negocios, sucursales, servicios, usuarios y turnos mediante una arquitectura separada entre frontend y backend.

Actualmente se encuentra **en desarrollo** y forma parte de un proyecto académico y de formación en desarrollo de software.

## 🚀 Tecnologías

### Frontend

* React 19
* Vite
* JavaScript
* Tailwind CSS
* React Router
* Lucide React

### Backend

* Java 21
* Spring Boot 4
* Spring Data JPA
* Spring Security
* JWT
* Maven
* Lombok

### Base de datos

* PostgreSQL
* Flyway

### Servicios y herramientas

* Cloudinary
* Spring Mail
* Git
* GitHub

## ✨ Funcionalidades

El sistema contempla diferentes funcionalidades para la gestión de una peluquería o barbería:

* Gestión de negocios.
* Gestión de sucursales.
* Gestión de servicios.
* Gestión de usuarios.
* Gestión de turnos.
* Estados de los turnos.
* Sistema de autenticación.
* Control de acceso mediante Spring Security.
* Autenticación basada en JWT.
* Gestión de información de los negocios.
* Gestión de imágenes mediante Cloudinary.
* Envío de correos mediante Spring Mail.
* Persistencia de información en PostgreSQL.
* Migraciones de base de datos mediante Flyway.

## 🏗️ Arquitectura

El proyecto está dividido en dos aplicaciones principales:

```text
turnos-peluqueria-app/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/turnos_peluqueria/app_peluqueria/
│   │   │   │       ├── config/
│   │   │   │       ├── controller/
│   │   │   │       ├── dto/
│   │   │   │       ├── entity/
│   │   │   │       ├── repository/
│   │   │   │       └── service/
│   │   │   │
│   │   │   └── resources/
│   │   │       └── db/migration/
│   │   │
│   │   └── pom.xml
│   │
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── utils/
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🗄️ Base de datos

La aplicación utiliza **PostgreSQL** como sistema gestor de base de datos.

Las modificaciones del esquema se gestionan mediante **Flyway**, utilizando migraciones versionadas.

Actualmente el proyecto cuenta con migraciones para:

* Creación de las tablas iniciales.
* Categorías de servicios.
* Dirección de los negocios.
* Imágenes de los negocios.
* Sucursales.
* Datos iniciales.

## 🔐 Seguridad

El backend utiliza **Spring Security** para la protección de los recursos de la aplicación.

La autenticación utiliza **JWT (JSON Web Tokens)** para gestionar el acceso de los usuarios.

Las credenciales y configuraciones sensibles deben mantenerse fuera del código fuente mediante variables de entorno o configuración local.

## 🖼️ Gestión de imágenes

El proyecto utiliza **Cloudinary** para la gestión y almacenamiento de imágenes asociadas a los negocios.

## 📧 Envío de correos

El backend incorpora **Spring Mail** para funcionalidades relacionadas con el envío de correos electrónicos.

## ⚙️ Requisitos

Para ejecutar el proyecto localmente se necesitan:

* Java 21
* Node.js
* npm
* PostgreSQL
* Git

## 📥 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Ticran/turnos-peluqueria-app.git
cd turnos-peluqueria-app
```

### 2. Configurar PostgreSQL

Crear una base de datos PostgreSQL para el proyecto y configurar las credenciales correspondientes en la configuración del backend.

Las migraciones de Flyway se ejecutarán al iniciar la aplicación.

> Las credenciales, claves JWT, configuración de correo y credenciales de Cloudinary no deben publicarse en el repositorio.

### 3. Ejecutar el Backend

Ingresar a la carpeta:

```bash
cd backend
```

Ejecutar:

```bash
./mvnw spring-boot:run
```

En Windows:

```bash
mvnw.cmd spring-boot:run
```

### 4. Ejecutar el Frontend

Desde otra terminal:

```bash
cd frontend
```

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

También están disponibles los comandos:

```bash
npm run build
npm run lint
npm run preview
```

## 📌 Estado del proyecto

🚧 **En desarrollo**

El proyecto continúa evolucionando con nuevas funcionalidades, correcciones y mejoras tanto en el frontend como en el backend.

## 📚 Objetivos del proyecto

Este proyecto permite aplicar conocimientos relacionados con:

* Desarrollo Full Stack.
* Desarrollo frontend con React.
* Desarrollo backend con Java y Spring Boot.
* Diseño de APIs y controladores.
* Arquitectura por capas.
* Programación Orientada a Objetos.
* Persistencia de datos.
* Bases de datos relacionales.
* Migraciones de bases de datos.
* Autenticación y autorización.
* JSON Web Tokens.
* Gestión de archivos e imágenes.
* Control de versiones con Git y GitHub.
* Organización de proyectos web.

## 👥 Proyecto

Proyecto desarrollado como parte de la formación académica y práctica en desarrollo de software.

## 🔗 Repositorio

[GitHub - turnos-peluqueria-app](https://github.com/Ticran/turnos-peluqueria-app)
