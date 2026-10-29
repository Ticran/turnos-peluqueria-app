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

* Plataforma multi-negocio: cada local tiene su propia URL (`/mi-local`), equipo, servicios, sucursales y agenda, con los datos aislados entre locales.
* Reserva online sin cuenta: el cliente elige sucursal, servicio, profesional, día y un horario realmente libre.
* Horarios por profesional (franjas por día), bloqueos (vacaciones, descansos) y feriados o días cerrados del local.
* Agenda semanal, gestión de turnos con filtros, y confirmación o cancelación de turnos.
* Emails al cliente (solicitud recibida, confirmado, cancelado, recordatorio 24 hs antes) y aviso al local cuando un cliente cancela.
* Link para que el cliente vea o cancele su turno.
* Aviso por WhatsApp con el mensaje ya armado.
* Fotos de los profesionales y portada del local (Cloudinary o disco local).
* Roles: dueño de la plataforma (alta y suspensión de locales), administrador del local y empleado.
* Autenticación con JWT y permisos por rol en el backend.

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

### 2. Configurar PostgreSQL y secretos

Crear la base `turnosapp_db` en PostgreSQL. Las migraciones de Flyway se ejecutan al iniciar la aplicación.

Copiar `backend/application-local.properties.example` como `backend/application-local.properties` y completar la contraseña de PostgreSQL y `jwt.secret` (obligatorio, mínimo 32 caracteres: sin eso el backend no arranca). Ese archivo no se sube a git. El ejemplo trae `app.demo-data=true` para tener el local y los usuarios de prueba. Ahí también se configuran, de forma opcional:
* `spring.mail.*`: SMTP para los emails de confirmación, cancelación y recordatorio. Sin esto, los emails solo se registran en el log.
* `cloudinary.url`: fotos en Cloudinary. Sin esto, se guardan en `backend/uploads`.

Lo mismo se puede definir con variables de entorno (`DB_PASSWORD`, `JWT_SECRET`, `FRONTEND_URL`, etc.).

#### Producción

| Variable | Para qué |
| --- | --- |
| `JWT_SECRET` | Obligatoria. Clave aleatoria de 32+ caracteres |
| `CORS_ORIGINS` | URL del frontend, ej. `https://turnos.midominio.com` (varias separadas por coma) |
| `FRONTEND_URL` / `PUBLIC_URL` | Links de los emails y fotos en disco |
| `PLATFORM_OWNER_EMAIL` / `PLATFORM_OWNER_PASSWORD` | Crea el SUPER_ADMIN en el primer arranque (contraseña de 12+ caracteres) |
| `APP_TIMEZONE` | Opcional. Por defecto `America/Argentina/Buenos_Aires` |

En producción **no** se define `app.demo-data`: la migración `V9` borra el local y los usuarios de demo, cuyas contraseñas son públicas.

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

### Modo demo (sin backend)

Para mostrar la app sin servidor ni base de datos: el frontend trae un backend falso que corre en el navegador, con datos de ejemplo guardados en cada dispositivo.

* Local: `npm run dev:demo`
* Vercel: importar el repo con **Root Directory = `frontend`**. `vercel.json` ya usa `npm run build:demo`.

En `/login` aparecen botones para entrar como administrador, profesional o dueño (contraseña `demo1234`). El botón **Reiniciar** abajo a la izquierda vuelve a los datos de ejemplo. Para la versión real, sacar `buildCommand` de `vercel.json`.

### Probar desde el celular

Vite escucha en la red local y le pasa `/api` y `/uploads` al backend, así que alcanza con abrir el frontend desde la IP de la PC.

1. Levantar backend y frontend como arriba. `npm run dev` muestra la dirección `Network: http://192.168.x.x:5173`.
2. Con el celular **en el mismo Wi-Fi**, abrir esa dirección.
3. Si no carga, Windows está bloqueando la conexión: aceptar el aviso del firewall para Node.js la primera vez, o marcar la red como **Privada** (Configuración → Red e Internet → Propiedades).

Desde **otra red** (un amigo en su casa) se puede usar un túnel temporal. Con [cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/) instalado:

```bash
cloudflared tunnel --url http://localhost:5173
```

Te da una URL `https://algo.trycloudflare.com` para compartir mientras el comando esté corriendo.

### 5. Rutas y usuarios de prueba

| Ruta | Para quién |
| --- | --- |
| `/` | Directorio público de locales |
| `/{slug}` (ej. `/mi-peluqueria-ideal`) | Página de reservas de un local |
| `/turno/{token}` | El cliente ve o cancela su turno (link que recibe al reservar) |
| `/login` | Acceso del equipo y del dueño de la plataforma |
| `/dashboard` | Panel del local (ADMIN y EMPLOYEE) |
| `/plataforma` | Panel del dueño de la plataforma (SUPER_ADMIN) |

Usuarios de demo (solo con `app.demo-data=true`, creados por las migraciones `V7` y `V8`):

| Rol | Email | Contraseña |
| --- | --- | --- |
| Dueño de la plataforma | `owner@plataforma.com` | `plataforma123` |
| Administrador del local | `admin@lumen.com` | `admin123` |
| Empleado | `mateo@lumen.com` | `empleado123` |

En producción estos usuarios no existen.

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
