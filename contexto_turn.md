# AI_CONTEXT.md

===============================================================================
PROYECTO
===============================================================================

Nombre del proyecto:
Sistema SaaS de Gestión de Reservas y Turnos

El proyecto consiste en una plataforma SaaS multi-negocio orientada a la
gestión profesional de turnos, reservas y administración de negocios que
trabajan con agendas y servicios.

Inicialmente está pensado para:

- peluquerías
- barberías
- estudios de tatuajes
- piercers
- estética
- uñas
- masajes
- negocios similares

La idea NO es crear un sistema exclusivo para peluquerías, sino una
plataforma genérica de reservas adaptable a múltiples tipos de negocios.

El sistema debe permitir que múltiples negocios utilicen la plataforma
mediante suscripción mensual.

Cada negocio tendrá:

- sus empleados
- sus servicios
- sus turnos
- su configuración
- su panel administrativo
- su agenda

Toda la información debe mantenerse completamente separada entre negocios.

===============================================================================
OBJETIVO PRINCIPAL
===============================================================================

Crear una plataforma moderna y profesional que permita:

- gestionar turnos
- administrar empleados
- administrar servicios
- controlar disponibilidad
- visualizar agendas
- confirmar o cancelar reservas
- manejar ingresos
- ofrecer reservas online

El sistema debe sentirse:

- premium
- rápido
- elegante
- moderno
- humano
- minimalista
- profesional

NO debe sentirse:

- genérico
- antiguo
- sobrecargado
- futurista exagerado
- complejo visualmente

===============================================================================
MODELO SaaS
===============================================================================

La plataforma funcionará como SaaS (Software as a Service).

Cada negocio pagará una suscripción mensual para utilizar el sistema.

Inicialmente NO se implementará:

- sistema de pagos
- suscripciones automáticas
- pruebas gratuitas
- facturación

Eso será agregado en futuras etapas.

===============================================================================
ARQUITECTURA GENERAL
===============================================================================

El proyecto estará dividido en:

- Frontend
- Backend
- Base de datos

===============================================================================
FRONTEND
===============================================================================

Tecnologías:

- React
- JavaScript
- TailwindCSS
- Vite

Arquitectura:

- modular
- basada en componentes reutilizables
- escalable
- limpia

Objetivos del frontend:

- experiencia premium
- navegación fluida
- diseño moderno
- interfaz elegante
- alta usabilidad

La UI debe inspirarse en:

- Stripe
- Notion
- Calendly
- dashboards SaaS modernos

===============================================================================
FRONTEND ACTUAL
===============================================================================

El frontend ya posee una arquitectura modular profesional.

Tecnologías utilizadas:

- React
- Vite
- TailwindCSS
- React Router DOM

===============================================================================
RUTAS PRINCIPALES
===============================================================================

"/"
→ Home pública del negocio

"/login"
→ Login administrativo

"/dashboard"
→ Panel administrativo principal

===============================================================================
ESTRUCTURA FRONTEND
===============================================================================

La arquitectura frontend está separada en:

- pages
- layouts
- components
- hooks
- data
- utils

El objetivo es mantener:

- escalabilidad
- separación de responsabilidades
- reutilización
- mantenibilidad

===============================================================================
PAGES
===============================================================================

pages/

---

## Home.jsx

Landing principal del negocio.

Objetivos:

- presentación visual
- branding
- mostrar servicios
- mostrar profesionales
- reserva de turnos
- generar confianza

Debe sentirse:

- moderna
- elegante
- premium
- humana

---

## Login.jsx

Pantalla de inicio de sesión.

Actualmente:

- solo visual
- todavía no conectada al backend

Objetivos:

- login moderno
- diseño limpio
- experiencia premium

---

## Dashboard.jsx

Panel administrativo principal.

Actualmente incluye:

- resumen general
- KPIs
- agenda semanal
- métricas visuales
- actividad reciente

Es el núcleo administrativo del sistema.

===============================================================================
LAYOUTS
===============================================================================

layouts/

---

## MainLayout.jsx

Layout principal de páginas públicas.

Incluye:

- Navbar
- Footer
- contenido central

Usado para:

- Home
- futuras páginas públicas

---

## DashboardLayout.jsx

Layout administrativo principal.

Incluye:

- Sidebar
- Header
- contenido dashboard

Debe mantener:

- consistencia visual
- navegación clara
- diseño moderno
- estructura SaaS

===============================================================================
COMPONENTES DASHBOARD
===============================================================================

components/dashboard/

---

## CalendarTable.jsx

Agenda semanal principal.

Responsabilidades:

- mostrar horarios
- mostrar turnos
- mostrar disponibilidad
- estructura visual tipo calendario

Inspiración:

- Google Calendar
- Calendly

---

## CalendarCell.jsx

Celda individual del calendario.

Representa:

- horario
- turno
- disponibilidad
- estado

---

## AppointmentCard.jsx

Tarjeta visual reutilizable de turno.

Puede mostrar:

- cliente
- servicio
- empleado
- horario
- estado

---

## Header.jsx

Barra superior del dashboard.

Puede incluir:

- perfil
- búsqueda
- notificaciones
- acciones rápidas

---

## Sidebar.jsx

Menú lateral principal.

Debe sentirse:

- moderno
- minimalista
- premium

Responsabilidades:

- navegación principal
- acceso rápido
- experiencia responsive

---

## StatsGrid.jsx

Grid principal de estadísticas.

Organiza:

- KPIs
- métricas
- resúmenes visuales

---

## KPICard.jsx

Tarjeta reutilizable de KPI.

Ejemplos:

- turnos del día
- ingresos
- pendientes
- confirmados

---

## SideWidget.jsx

Panel lateral dinámico.

Puede mostrar:

- próximos turnos
- actividad reciente
- recordatorios
- widgets secundarios

---

## Overlay.jsx

Overlay reutilizable para:

- mobile sidebar
- modales
- fondos oscuros
- efectos visuales

===============================================================================
COMPONENTES HOME
===============================================================================

components/home/

---

## HeroSection

Sección principal visual.

Debe evitar:

- hero gigante saturado
- demasiado texto

Debe priorizar:

- elegancia
- branding
- experiencia premium

---

## BookingSection

Vista resumida del sistema de reservas.

Conecta con:

- reserva principal
- selección de turnos

---

## AboutSection

Sección de presentación del negocio.

Explica:

- filosofía
- estilo
- experiencia
- identidad visual

---

## InfoSection

Información importante:

- horarios
- contacto
- ubicación
- redes sociales

---

## Navbar

Barra de navegación principal.

Debe ser:

- limpia
- moderna
- elegante

---

## Footer

Footer general del sitio.

===============================================================================
HOOKS
===============================================================================

hooks/

---

## useBooking.js

Hook principal del sistema de reservas.

Centraliza:

- servicio seleccionado
- profesional seleccionado
- fecha
- horario
- pasos del booking
- lógica de disponibilidad

Objetivo:

- evitar lógica pesada en componentes
- centralizar comportamiento

===============================================================================
DATA
===============================================================================

data/

Actualmente contiene datos mockeados para desarrollo frontend.

Archivos:

- appointments.js
- services.js
- barbers.js
- dates.js
- categories.js
- timeSlots.js

Objetivo:

- simular backend
- acelerar desarrollo UI
- probar flujos visuales

===============================================================================
UTILS
===============================================================================

utils/

Funciones auxiliares reutilizables del sistema.

---

## calendar.js

Helpers relacionados al calendario.

---

## booking.js

Helpers relacionados a reservas.

---

## currency.js

Helpers de precios y monedas.

---

## date.js

Helpers de fechas y horarios.

---

## appointmentHelpers.js

Funciones auxiliares relacionadas a:

- turnos
- disponibilidad
- estados
- formateos

===============================================================================
GESTIÓN DE TURNOS (PENDIENTE)
===============================================================================

Los siguientes archivos existen pero todavía están vacíos y preparados para
la futura gestión CRUD avanzada de turnos:

- AppointmentTable.jsx
- AppointmentModal.jsx
- AppointmentFilters.jsx
- AppointmentToolbar.jsx

Estos componentes formarán parte del módulo profesional de:

- gestión de turnos
- filtros
- edición
- búsqueda
- administración avanzada

===============================================================================
CONFIGURACIÓN IMPORTANTE FRONTEND
===============================================================================

El proyecto utiliza imports con alias:

@/

Para que funcione correctamente, vite.config.js debe incluir:

import path from "path"

resolve: {
alias: {
"@": path.resolve(\_\_dirname, "./src"),
},
}

===============================================================================
ESTADO ACTUAL FRONTEND
===============================================================================

Actualmente:

- el frontend está avanzado visualmente
- el login todavía no tiene backend
- el sistema todavía trabaja con mocks
- el backend aún no está conectado al frontend

La prioridad futura es:

- conectar backend
- autenticación real
- CRUD de turnos
- lógica real de disponibilidad
- persistencia de datos

===============================================================================
BACKEND
===============================================================================

Tecnologías:

- Spring Boot
- PostgreSQL
- Flyway

El backend será responsable de:

- autenticación
- lógica de negocio
- validaciones
- reservas
- disponibilidad
- seguridad
- separación multi-negocio
- manejo de datos

===============================================================================
DEPENDENCIAS ACTUALES DEL BACKEND
===============================================================================

Dependencias ya integradas:

- Spring Data JPA
- Flyway
- PostgreSQL
- Lombok
- Spring Mail
- Spring Web MVC

Java:

- Java 21

Build tool:

- Maven

===============================================================================
BASE DE DATOS
===============================================================================

Motor:

- PostgreSQL

Migraciones:

- Flyway

La base de datos debe estar preparada para:

- escalabilidad
- multi-negocio
- crecimiento futuro
- integridad relacional
- performance

NO se utilizará:

- una base de datos por negocio

Se utilizará:

- una sola base de datos compartida

Cada entidad importante deberá pertenecer a un negocio mediante:

- business_id

===============================================================================
MULTI-TENANT
===============================================================================

El sistema será multi-tenant.

Cada negocio tendrá:

- empleados propios
- servicios propios
- turnos propios
- configuración propia

Toda consulta debe respetar:

- business_id

Nunca deben mezclarse datos entre negocios.

===============================================================================
ROLES DEL SISTEMA
===============================================================================

Solo existirán dos roles:

ADMIN

- acceso completo
- puede administrar empleados
- puede administrar servicios
- puede administrar turnos
- puede visualizar ingresos
- puede modificar configuraciones
- puede ver toda la agenda

EMPLOYEE

- puede administrar sus turnos
- puede gestionar sus horarios
- puede visualizar su agenda
- puede modificar disponibilidad
- puede bloquear horarios

No existirán más roles inicialmente.

===============================================================================
CLIENTES
===============================================================================

Los clientes NO tendrán cuenta.

Los clientes podrán:

- reservar turnos
- ingresar nombre
- ingresar teléfono
- ingresar email opcional

No habrá:

- login de cliente
- panel de cliente
- autenticación de cliente

Esto simplifica:

- UX
- flujo de reserva
- desarrollo inicial

===============================================================================
SERVICIOS
===============================================================================

Cada negocio podrá crear servicios.

Ejemplos:

- corte
- barba
- tatuaje
- piercing
- coloración

Cada servicio tendrá:

- nombre
- descripción
- duración
- precio
- estado activo/inactivo

La duración del servicio es obligatoria.

Ejemplo:

- Corte → 30 minutos
- Tatuaje → 2 horas

La duración será utilizada para:

- disponibilidad
- cálculo automático
- prevención de solapamientos

===============================================================================
HORARIOS Y DISPONIBILIDAD
===============================================================================

Cada empleado administrará su propia disponibilidad.

No habrá horarios globales fijos para todo el negocio.

Cada empleado podrá:

- definir horarios disponibles
- modificar horarios
- bloquear horarios manualmente

Ejemplos:

- vacaciones
- descanso
- eventos
- médico

La disponibilidad debe ser flexible y dinámica.

===============================================================================
TURNOS
===============================================================================

Los turnos representan reservas realizadas por clientes.

Cada turno debe contener:

- negocio
- empleado
- servicio
- cliente
- fecha
- horario
- duración
- estado
- observaciones

===============================================================================
ESTADOS DE TURNOS
===============================================================================

Los turnos tendrán estados.

Estados iniciales:

- PENDING
- CONFIRMED
- CANCELLED
- COMPLETED
- NO_SHOW

===============================================================================
CONFIRMACIÓN DE TURNOS
===============================================================================

La confirmación NO será automática.

Flujo esperado:

Cliente reserva
↓
Turno pendiente
↓
Empleado/Admin confirma manualmente

Esto permite:

- evitar reservas falsas
- controlar agenda
- validar disponibilidad real

===============================================================================
NOTIFICACIONES
===============================================================================

Inicialmente se implementarán:

- recordatorios por email

No se implementará inicialmente:

- WhatsApp
- SMS
- notificaciones push

===============================================================================
ESTADÍSTICAS
===============================================================================

Las estadísticas serán simples inicialmente.

Prioridad:

- ingresos
- dinero generado
- resumen financiero básico

NO se priorizará inicialmente:

- clientes frecuentes
- analytics avanzados
- comportamiento de usuarios

===============================================================================
ESTÉTICA Y DISEÑO
===============================================================================

El diseño es una prioridad importante del proyecto.

La experiencia debe sentirse:

- elegante
- cálida
- premium
- moderna
- humana

===============================================================================
PALETA VISUAL
===============================================================================

Colores principales:

- bordó
- azul marino

Tipografía:

- Poppins

===============================================================================
REGLAS DE DISEÑO
===============================================================================

Evitar:

- dashboards saturados
- colores exagerados
- efectos innecesarios
- diseño genérico
- estilos viejos

Buscar:

- espacios limpios
- jerarquía visual clara
- animaciones suaves
- microinteracciones modernas
- buena experiencia visual

===============================================================================
ARQUITECTURA BACKEND
===============================================================================

El backend debe seguir arquitectura por capas.

Capas principales:

- Controller
- Service
- Repository
- Entity
- DTO

Objetivos:

- código limpio
- separación de responsabilidades
- escalabilidad
- mantenibilidad

===============================================================================
MIGRACIONES
===============================================================================

Flyway será utilizado para:

- versionar la base de datos
- crear tablas
- modificar estructuras
- mantener control de cambios

Las migraciones deben:

- ser ordenadas
- incrementales
- mantenibles

===============================================================================
OBJETIVO DEL MVP
===============================================================================

La primera versión debe incluir:

- autenticación
- dashboard
- gestión de empleados
- gestión de servicios
- gestión de turnos
- calendario
- disponibilidad
- reservas online
- estadísticas básicas
- emails básicos

===============================================================================
FILOSOFÍA DEL PROYECTO
===============================================================================

El proyecto debe priorizar:

- escalabilidad
- buena arquitectura
- experiencia premium
- simplicidad para el usuario
- diseño profesional
- código limpio

La prioridad NO es agregar muchas funciones rápidamente.

La prioridad es:

- construir una base sólida
- construir una experiencia seria
- # crear un SaaS profesional y mantenible
  # ESTADO DE DESARROLLO ACTUAL

Actualmente el frontend ya posee una implementación visual avanzada del
módulo de gestión de turnos.

La arquitectura implementada sigue:

- separación de responsabilidades
- componentes reutilizables
- diseño modular
- escalabilidad
- estética SaaS moderna

El backend todavía NO está conectado al frontend.

===============================================================================
MÓDULO DE GESTIÓN DE TURNOS (UI COMPLETADA)
===============================================================================

El módulo de gestión de turnos ya fue desarrollado visualmente y estructurado
siguiendo una arquitectura profesional y mantenible.

===============================================================================
ARQUITECTURA Y NAVEGACIÓN DEL MÓDULO
===============================================================================

Se actualizó:

- Dashboard.jsx

para integrar renderizado condicional del módulo de turnos utilizando:

- activeMenu === "turnos"

Esto permite:

- mantener separada la vista del resumen general
- desacoplar módulos
- facilitar escalabilidad futura
- mantener navegación limpia

===============================================================================
ESTRUCTURA DEL MÓDULO
===============================================================================

Se creó una estructura dedicada para el módulo:

src/components/dashboard/appointments/

Objetivos:

- encapsular lógica
- separar responsabilidades
- mantener escalabilidad
- evitar componentes gigantes
- facilitar mantenimiento futuro

===============================================================================
CAPA DE DATOS MOCKEADA
===============================================================================

Se expandió:

- src/data/appointments.js

La estructura actual simula la futura respuesta del backend mediante DTOs.

Cada turno mockeado contiene:

- id
- client
- email
- phone
- service
- barber
- barberId
- date
- time
- day
- status
- paymentMethod

Objetivos:

- simular backend real
- probar flujos visuales
- desacoplar frontend del backend temporalmente
- acelerar desarrollo UI

===============================================================================
COMPONENTES IMPLEMENTADOS DEL MÓDULO
===============================================================================

---

## AppointmentManagement.jsx

Componente principal del módulo de turnos.

Responsabilidades:

- orquestar estado global
- manejar búsqueda
- manejar filtros
- controlar modales
- coordinar subcomponentes

Actúa como:

- contenedor principal
- componente cerebro del módulo

---

## AppointmentToolbar.jsx

Toolbar superior de gestión.

Incluye:

- buscador interactivo
- botón “Nuevo Turno”
- acciones rápidas

Objetivos:

- acceso rápido
- navegación limpia
- experiencia moderna

---

## AppointmentFilters.jsx

Sistema de filtros inteligentes.

Permite filtrar por:

- estado
- profesional

Estados disponibles:

- Pendiente
- Confirmado
- Cancelado
- Completado
- No Show

Objetivos:

- filtrado rápido
- mejor UX
- navegación eficiente

---

## AppointmentTable.jsx

Tabla principal de turnos.

Características:

- diseño minimalista
- hover moderno
- acciones contextuales
- estructura premium
- visual limpia

El hover revela acciones como:

- Ver detalle

Objetivos:

- evitar saturación visual
- mejorar legibilidad
- mantener estética elegante

---

## AppointmentStatusBadge.jsx

Componente visual reutilizable para estados de turnos.

Utiliza colores suaves/pastel:

- Amber
- Emerald
- Rose
- Blue

Objetivos:

- feedback visual elegante
- mantener consistencia premium
- evitar colores agresivos

---

## AppointmentModal.jsx

Modal principal de detalle de turnos.

Muestra:

- información del cliente
- servicio
- profesional
- estado
- observaciones
- acciones disponibles

Incluye:

- Overlay
- acciones condicionales según rol

Ejemplo:

- botón “Confirmar” solo visible para ADMIN

Objetivos:

- experiencia limpia
- edición rápida
- gestión visual elegante

---

## NewAppointmentModal.jsx

Formulario de creación de nuevos turnos.

Incluye:

- cliente
- servicio
- profesional
- fecha
- horario

Características:

- validaciones básicas de UI
- selects dinámicos
- estructura preparada para backend

Objetivos:

- flujo rápido de creación
- experiencia intuitiva
- minimizar fricción

===============================================================================
FUNCIONALIDADES IMPLEMENTADAS
===============================================================================

Actualmente el frontend ya posee soporte visual para:

- visualización centralizada de agenda
- búsqueda rápida de clientes
- filtrado dinámico
- estados visuales premium
- visualización de detalle
- creación de nuevos turnos
- interacción mediante modales
- renderizado condicional según rol

===============================================================================
OBJETIVOS UX/UI IMPLEMENTADOS
===============================================================================

El módulo fue diseñado priorizando:

- claridad visual
- estética premium
- minimalismo
- navegación fluida
- separación visual limpia
- microinteracciones modernas
- feedback visual elegante

La interfaz evita:

- tablas saturadas
- bordes agresivos
- colores exagerados
- dashboards antiguos
- estilos genéricos

===============================================================================
MÓDULO: GESTIÓN DE PROFESIONALES (EQUIPO)
===============================================================================

El sistema ya cuenta con un módulo visual completo para la gestión de
profesionales/equipo dentro del dashboard administrativo.

El objetivo de este módulo es:

- administrar empleados
- visualizar profesionales
- editar perfiles
- gestionar integrantes del negocio
- mantener separación de permisos según roles

La implementación sigue:

- arquitectura modular
- componentes reutilizables
- diseño SaaS premium
- separación clara de responsabilidades

===============================================================================
ARQUITECTURA Y ESTRUCTURA
===============================================================================

Se creó una carpeta dedicada para encapsular el módulo:

src/components/dashboard/professionals/

Objetivos:

- centralizar lógica del equipo
- desacoplar funcionalidades
- facilitar escalabilidad
- mantener orden arquitectónico

El módulo fue integrado en:

- Dashboard.jsx

mediante renderizado condicional utilizando:

- activeMenu === "profesionales"

Esto permite:

- navegación desacoplada
- renderizado dinámico
- modularidad
- mejor mantenibilidad

===============================================================================
INTEGRACIÓN DE NAVEGACIÓN
===============================================================================

Se actualizó:

- src/data/menu.js

para agregar la sección:

- Profesionales

La navegación utiliza:

- icono Users de lucide-react

También se sincronizaron:

- IDs del Sidebar
- activeMenu
- renderizado principal del Dashboard

Objetivo:

- mantener navegación consistente
- evitar estados desincronizados
- facilitar expansión futura

===============================================================================
COMPONENTES IMPLEMENTADOS
===============================================================================

---

## ProfessionalManagement.jsx

Componente contenedor principal del módulo.

Responsabilidades:

- orquestar estado global
- controlar apertura/cierre de modales
- manejar lógica de creación/edición
- administrar profesional seleccionado
- mapear datos provenientes de:
  - src/data/barbers.js

Manejo de estados:

- selectedPro → determina edición o creación

Control de acceso:

- botón “Agregar Profesional” visible solo para ADMIN

Objetivos:

- centralizar lógica
- desacoplar subcomponentes
- mantener componentes pequeños

---

## ProfessionalModal.jsx

Modal reutilizable para:

- crear profesionales
- editar perfiles

Características:

- comportamiento dinámico según props
- manejo condicional:
  - creación
  - edición

El modal detecta:

- professional === null → crear
- professional con datos → editar

Campos actuales:

- nombre
- especialidad

Incluye:

- validaciones básicas de UI
- diseño consistente con el dashboard
- estética premium

Diseño implementado:

- TailwindCSS
- rounded-2xl
- palette slate
- rose-900
- sombras suaves
- inputs minimalistas

Objetivos:

- experiencia moderna
- flujo intuitivo
- reutilización total

---

## ProfessionalList / Tarjetas de Perfil

Sistema visual de tarjetas responsive para profesionales.

Características:

- grid responsive
- 1, 2 o 3 columnas según pantalla
- adaptación fluida

Cada tarjeta muestra:

- nombre
- rol
- rating
- cantidad de reseñas
- imagen del profesional

La información se obtiene desde:

- src/data/barbers.js

Objetivos:

- visual premium
- rápida lectura
- experiencia moderna
- estética humana

===============================================================================
ESTÁNDARES UX/UI IMPLEMENTADOS
===============================================================================

El módulo respeta completamente las reglas visuales del sistema.

Características implementadas:

- diseño minimalista
- alta legibilidad
- jerarquía visual clara
- microinteracciones modernas
- animaciones suaves
- hover states elegantes

Animaciones utilizadas:

- animate-in
- fade-in

Se mantuvo consistencia con:

- paleta visual general
- rounded-2xl
- tipografía Poppins/sans
- sistema de spacing
- componentes reutilizables

===============================================================================
CONTROL DE ROLES
===============================================================================

El módulo ya implementa separación visual según roles.

ADMIN:

- puede agregar profesionales
- puede editar perfiles
- acceso completo

EMPLOYEE:

- acceso restringido
- sin permisos administrativos globales

Objetivos:

- seguridad visual
- experiencia coherente
- separación clara de permisos

===============================================================================
ESTADO ACTUAL DEL MÓDULO
===============================================================================

Actualmente el módulo:

- está implementado visualmente
- utiliza datos mockeados
- todavía no posee backend conectado
- ya tiene arquitectura preparada para integración real

===============================================================================
MÓDULO: GESTIÓN DE SERVICIOS (CATÁLOGO)
===============================================================================

El sistema ya cuenta con un módulo visual completo para la gestión de
servicios dentro del dashboard administrativo.

El objetivo de este módulo es:

- administrar el catálogo de servicios
- visualizar prestaciones del negocio
- editar servicios
- gestionar precios y duración
- mantener separación de permisos según roles

La implementación sigue:

- arquitectura modular
- componentes reutilizables
- diseño SaaS premium
- separación clara de responsabilidades

===============================================================================
ARQUITECTURA Y ESTRUCTURA
===============================================================================

Se creó una carpeta dedicada para encapsular el módulo:

src/components/dashboard/services/

Objetivos:

- centralizar lógica de servicios
- desacoplar funcionalidades
- facilitar escalabilidad
- mantener orden arquitectónico

El módulo fue integrado en:

- Dashboard.jsx

mediante renderizado condicional utilizando:

- activeMenu === "servicios"

La información mockeada del catálogo se centraliza en:

- src/data/services.js

Esto permite:

- mantenimiento más simple
- futura conexión con API REST
- reutilización de datos
- arquitectura escalable

===============================================================================
INTEGRACIÓN DE NAVEGACIÓN
===============================================================================

El módulo se encuentra conectado al sistema de navegación principal del
dashboard mediante:

- activeMenu
- Sidebar
- Dashboard principal

Objetivos:

- navegación consistente
- renderizado dinámico
- experiencia fluida
- estructura desacoplada

===============================================================================
COMPONENTES IMPLEMENTADOS
===============================================================================

---

## ServiceManagement.jsx

Componente contenedor principal del módulo.

Responsabilidades:

- orquestar estado global
- controlar modales
- manejar flujo crear/editar
- renderizar catálogo de servicios
- administrar permisos visuales

Características:

- visualización en formato Grid de Tarjetas
- renderizado dinámico desde services.js
- estructura desacoplada

Cada tarjeta muestra:

- nombre del servicio
- duración
- precio formateado
- descripción breve

Control de acceso:

- botón “Agregar Servicio” solo visible para ADMIN
- acciones de edición restringidas a ADMIN

Objetivos:

- experiencia limpia
- administración rápida
- visual premium
- reutilización de componentes

---

## ServiceModal.jsx

Modal reutilizable para:

- crear servicios
- editar servicios

Comportamiento dinámico:

- modo creación
- modo edición

El modal detecta:

- datos vacíos → crear
- datos existentes → editar

Campos implementados:

- nombre
- precio
- duración
- descripción

Características:

- textarea para descripciones
- diseño responsive
- inputs modernos
- integración visual completa con el sistema SaaS

Diseño aplicado:

- TailwindCSS
- rounded-2xl
- sombras suaves
- paleta slate
- estilo minimalista premium

Objetivos:

- experiencia moderna
- flujo intuitivo
- consistencia visual
- reutilización total

===============================================================================
INTEGRACIÓN DE DATOS MOCK
===============================================================================

La estructura mockeada se encuentra en:

- src/data/services.js

Cada servicio contiene:

- id
- nombre
- categoría
- precio
- duración
- descripción

Datos iniciales implementados:

- Corte de Autor
- Perfilado de Barba
- Combo Lumen
- Exfoliación

Objetivos:

- simular backend real
- acelerar desarrollo frontend
- validar flujos UI/UX
- preparar integración REST futura

===============================================================================
ESTÁNDARES UX/UI IMPLEMENTADOS
===============================================================================

El módulo respeta completamente las reglas visuales del sistema.

Características implementadas:

- diseño minimalista
- alta legibilidad
- jerarquía visual clara
- microinteracciones modernas
- animaciones suaves
- hover states elegantes

Diseño visual:

- rounded-2xl
- sombras suaves
- paleta slate
- etiquetas pastel
- estructura limpia

Etiquetas visuales:

- duración destacada con:
  - rose-50
  - #800020

Animaciones utilizadas:

- animate-in
- fade-in

Objetivos:

- experiencia premium
- estética humana
- interfaz moderna
- navegación fluida

===============================================================================
CONTROL DE ROLES
===============================================================================

El módulo implementa separación visual según permisos.

ADMIN:

- puede crear servicios
- puede editar servicios
- acceso completo al catálogo

EMPLOYEE:

- visualización limitada
- sin acceso a acciones administrativas

La lógica de permisos se aplica directamente en la interfaz mediante:

- ocultamiento condicional de botones
- renderizado basado en role

Objetivos:

- seguridad visual
- experiencia coherente
- separación clara de permisos

===============================================================================
ESTADO ACTUAL DEL MÓDULO
===============================================================================

Actualmente el módulo:

- está implementado visualmente
- funciona correctamente en desarrollo
- utiliza datos mockeados
- todavía no posee backend conectado
- ya tiene arquitectura preparada para CRUD real

===============================================================================
MÓDULO: CONFIGURACIÓN GENERAL (ADMIN)
===============================================================================

El sistema ya cuenta con un módulo visual completo para la configuración
general del negocio dentro del dashboard administrativo.

El objetivo de este módulo es:

- administrar parámetros globales del negocio
- gestionar identidad visual y operativa
- centralizar configuraciones principales
- mantener seguridad basada en roles
- preparar integración futura con backend

La implementación sigue:

- arquitectura modular
- componentes reutilizables
- diseño SaaS premium
- separación clara de responsabilidades

===============================================================================
ARQUITECTURA Y ESTRUCTURA
===============================================================================

Se creó una carpeta dedicada para encapsular el módulo:

src/components/dashboard/settings/

Objetivos:

- centralizar lógica administrativa
- desacoplar configuraciones globales
- facilitar escalabilidad
- mantener orden arquitectónico

El módulo fue integrado en:

- Dashboard.jsx

mediante renderizado condicional utilizando:

- activeMenu === "configuracion"

La configuración mockeada se centraliza en:

- src/data/settings.js

Esto permite:

- mantenimiento más simple
- futura conexión con API REST
- reutilización de configuraciones
- arquitectura escalable

===============================================================================
INTEGRACIÓN DE NAVEGACIÓN
===============================================================================

El módulo se encuentra conectado al sistema principal del dashboard mediante:

- Sidebar
- activeMenu
- Dashboard principal

Objetivos:

- navegación consistente
- renderizado dinámico
- experiencia fluida
- estructura desacoplada

===============================================================================
COMPONENTES IMPLEMENTADOS
===============================================================================

---

## SettingsManagement.jsx

Componente contenedor principal del módulo.

Responsabilidades:

- administrar configuración global
- centralizar estado del negocio
- manejar edición de parámetros
- controlar acceso por roles
- renderizar formularios de configuración

Características:

- estado centralizado mediante objeto único
- estructura desacoplada
- control RBAC integrado
- arquitectura preparada para backend

El componente administra:

- identidad del negocio
- datos de contacto
- horarios operativos
- parámetros generales

Control de acceso:

- acceso restringido únicamente a ADMIN
- validación directa mediante prop role
- bloqueo completo de interacción para usuarios no autorizados

Objetivos:

- administración centralizada
- seguridad visual
- experiencia premium
- mantenibilidad

---

## SettingsForm

Formulario principal de configuración general.

Objetivos:

- editar parámetros globales
- mantener experiencia limpia
- evitar saturación visual
- centralizar configuración

Secciones implementadas:

IDENTIDAD

- nombre del local
- descripción

CONTACTO

- email
- teléfono

OPERACIÓN

- horario de apertura
- horario de cierre

Características:

- inputs modernos
- diseño responsive
- inputs tipo time para horarios
- estructura clara y minimalista

Diseño aplicado:

- TailwindCSS
- rounded-2xl
- sombras suaves
- paleta slate
- tipografía Poppins
- espaciado premium

Objetivos:

- experiencia intuitiva
- edición rápida
- visual moderna
- coherencia visual

===============================================================================
ESTRUCTURA DE DATOS MOCK
===============================================================================

La configuración mockeada se encuentra en:

- src/data/settings.js

Objeto principal:

- initialSettings

Campos implementados:

- businessName
- description
- email
- phone
- openingTime
- closingTime
- currency
- timeZone
- isActive

Objetivos:

- simular backend real
- acelerar desarrollo frontend
- validar flujos UI/UX
- preparar persistencia futura

La estructura fue diseñada para:

- escalabilidad
- extensibilidad
- nuevos parámetros futuros
- crecimiento del sistema SaaS

===============================================================================
ESTÁNDARES UX/UI IMPLEMENTADOS
===============================================================================

El módulo respeta completamente las reglas visuales del sistema.

Características implementadas:

- diseño minimalista
- alta legibilidad
- jerarquía visual clara
- microinteracciones modernas
- formularios limpios
- transiciones suaves

Diseño visual:

- rounded-2xl
- sombras suaves
- paleta slate
- layout centrado
- tipografía Poppins
- estructura premium

Objetivos:

- experiencia elegante
- administración cómoda
- visual profesional
- interfaz moderna

===============================================================================
FEEDBACK VISUAL
===============================================================================

El módulo incluye:

- botones premium
- acciones destacadas
- feedback visual moderno
- transiciones suaves

Acción principal:

- “Guardar Cambios”

Objetivos:

- claridad visual
- experiencia profesional
- sensación SaaS premium

===============================================================================
CONTROL DE ACCESO Y SEGURIDAD
===============================================================================

El módulo implementa RBAC (Role-Based Access Control).

ADMIN:

- acceso completo
- puede editar configuraciones
- puede modificar parámetros globales
- puede gestionar operación del negocio

EMPLOYEE:

- acceso bloqueado
- sin permisos administrativos
- visualización restringida

Protección implementada:

- validación directa del role
- bloqueo de interacción
- renderizado condicional
- mensaje informativo para usuarios sin acceso

Objetivos:

- seguridad visual
- protección administrativa
- coherencia de permisos
- arquitectura preparada para backend real

===============================================================================
ESTADO ACTUAL DEL MÓDULO
===============================================================================

Actualmente el módulo:

- está implementado visualmente
- funciona correctamente en desarrollo
- utiliza datos mockeados
- todavía no posee backend conectado
- ya tiene arquitectura preparada para persistencia real

===============================================================================
MÓDULO: MI AGENDA (VISTA DE EMPLEADO)
===============================================================================

El sistema ya cuenta con un módulo visual completo para la gestión de la
agenda personal de empleados dentro del dashboard administrativo.

El objetivo de este módulo es:

- permitir que el empleado gestione sus turnos
- visualizar agenda personal
- administrar estados de reservas
- agregar observaciones operativas
- mantener privacidad de agendas
- reutilizar la infraestructura del calendario principal

La implementación sigue:

- arquitectura modular
- componentes reutilizables
- diseño SaaS premium
- separación clara de responsabilidades
- RBAC (Role-Based Access Control)

===============================================================================
ARQUITECTURA Y ESTRUCTURA
===============================================================================

Se creó una carpeta dedicada para encapsular el módulo:

src/components/dashboard/agenda/

Objetivos:

- centralizar lógica de agenda del empleado
- desacoplar funcionalidades
- mantener escalabilidad
- reutilizar componentes existentes

El módulo fue integrado en:

- Dashboard.jsx

mediante renderizado condicional utilizando:

- activeMenu === "agenda"

La implementación reutiliza:

- CalendarTable.jsx

que originalmente pertenece al panel administrativo principal.

El calendario fue adaptado para:

- mostrar únicamente información del empleado activo
- mantener privacidad
- evitar duplicación de componentes
- conservar consistencia visual

===============================================================================
COMPONENTES IMPLEMENTADOS
===============================================================================

---

## MyAgenda.jsx

Componente contenedor principal de la agenda del empleado.

Responsabilidades:

- administrar vista personal
- filtrar turnos
- manejar sesión simulada
- renderizar calendario personalizado
- controlar privacidad visual

Características:

- simulación de sesión activa
- filtrado dinámico de appointmentsData
- renderizado desacoplado
- reutilización del sistema de calendario

Actualmente utiliza:

- LOGGED_EMPLOYEE_ID = "EMP-01"

correspondiente a:

- Mateo Palacios

El componente filtra:

- únicamente los turnos asociados al empleado logueado

El resultado se envía a:

- CalendarTable.jsx

Objetivos:

- privacidad de agenda
- experiencia personalizada
- reutilización de arquitectura
- rendimiento visual

También incluye:

- badge premium indicando sesión activa
- encabezado contextual
- diseño coherente con dashboard

===============================================================================
MODIFICACIONES REALIZADAS
===============================================================================

---

## CalendarCell.jsx

El componente fue actualizado para soportar:

- interacciones operativas
- apertura de modales
- edición rápida de turnos

Cambios implementados:

- manejo de estado local:
  - isModalOpen
- apertura dinámica de AppointmentModal
- interacción clickeable sobre turnos

La tarjeta visual:

- AppointmentCard.jsx

fue encapsulada dentro de:

- contenedor interactivo
- hover moderno
- trigger de modal

Objetivos:

- mantener consistencia visual
- agregar operatividad
- evitar romper UI existente

---

## AppointmentModal.jsx

El modal fue reestructurado para soportar:

- modo visualización
- modo gestión operativa
- modo edición parcial

Ahora puede ser utilizado tanto por:

- ADMIN
- EMPLOYEE

Características implementadas:

- estado local sincronizado
- useEffect para sincronización de turno activo
- edición contextual
- controles operativos

Estados internos:

- currentStatus
- observation

Lógica implementada:

- actualización automática al abrir turno
- persistencia temporal mockeada
- separación por roles

===============================================================================
FUNCIONALIDADES OPERATIVAS
===============================================================================

El modal ahora permite:

- modificar estado del turno
- agregar observaciones
- actualizar notas operativas

Controles añadidos:

SELECT DE ESTADO

- Pending
- Confirmed
- Completed
- Cancelled

TEXTAREA DE OBSERVACIONES

- notas internas
- comentarios del corte
- aclaraciones operativas

Objetivos:

- operatividad real
- experiencia profesional
- flujo rápido para empleados

===============================================================================
ESTÁNDARES UX/UI IMPLEMENTADOS
===============================================================================

El módulo respeta completamente las reglas visuales del sistema.

Características implementadas:

- diseño minimalista
- alta legibilidad
- hover moderno
- microinteracciones suaves
- experiencia tipo SaaS premium

Interacciones visuales:

- hover:scale-[1.02]
- active:scale-95

Diseño visual:

- paleta slate
- rose-800
- rounded-2xl
- tipografía Poppins
- sombras suaves
- espaciado limpio

===============================================================================
DECISIÓN DE UX IMPORTANTE
===============================================================================

Se descartó completamente:

- vista tipo tabla tradicional

y se decidió mantener:

- visualización tipo calendario/grilla

Motivos:

- mejor comprensión espacial
- visualización natural de horarios
- experiencia moderna
- coherencia con Google Calendar y Calendly
- mejor percepción de huecos disponibles

Objetivos:

- experiencia profesional
- navegación intuitiva
- gestión visual eficiente

===============================================================================
SEGURIDAD Y CONTROL DE ROLES (RBAC)
===============================================================================

El módulo implementa:

- separación de permisos
- privacidad de agenda
- filtrado por empleado

La privacidad se garantiza mediante:

- filtrado realizado en MyAgenda.jsx
- renderizado exclusivo de turnos del empleado activo

Esto asegura que:

- otros empleados no sean visibles
- agendas ajenas permanezcan ocultas
- no existan filtraciones visuales

===============================================================================
PERMISOS DEL EMPLEADO
===============================================================================

El empleado puede:

- visualizar su agenda
- modificar estados
- agregar observaciones
- gestionar sus turnos

El empleado NO puede:

- acceder a facturación
- ver agendas ajenas
- reasignar turnos
- modificar empleados
- acceder a configuración global

Objetivos:

- seguridad operativa
- control claro de permisos
- experiencia enfocada

===============================================================================
ESTADO ACTUAL DEL MÓDULO
===============================================================================

Actualmente el módulo:

- está completamente implementado visualmente
- funciona correctamente en desarrollo
- utiliza datos mockeados
- posee sesión mockeada
- ya tiene arquitectura preparada para backend real

Estado actual:

- EMP-01 simulado
- ABM operativo funcional
- lógica visual completa

===============================================================================
BACKEND: PERSISTENCIA REAL, FLYWAY Y BASE DE DATOS (NUEVO)
===============================================================================

El backend ya no es un boceto teórico; cuenta con su arquitectura por capas completa (Controller, Service, Repository, Entity, DTO) y Spring Security configurado, exponiendo endpoints REST funcionales (como `/businesses/{id}`).

El esquema de base de datos PostgreSQL está completamente automatizado a través de scripts de migración incrementales gestionados por Flyway en la ruta `src/main/resources/db/migration/`:

- **V1__initial_tables.sql**: Creación de las tablas base:
  - `businesses` (id, name, description, email, phone, opening_time, closing_time, status, timestamps)
  - `users`
  - `services`
  - `appointments`
- **V2__add_category_to_services.sql**: Incorporación de la columna `category` en la tabla de servicios.
- **V3__add_address_to_business.sql**: Incorporación de la columna `address` en la tabla de negocios.
- **V4__add_image_to_businesses.sql**: Incorporación de la columna `image_url` para logos/banners de los negocios.
- **V5__add_branches.sql**: Introducción de la tabla `branches` (Sucursales/Locales) vinculada jerárquicamente a `businesses` por clave foránea. Se migraron las relaciones de `users`, `services` y `appointments` para apuntar a la sucursal correspondiente.
- **V6__insert_initial_data.sql**: Semilla de datos nativa (Seed) indispensable para poblar de forma automática el negocio inicial (ID 1) y su sucursal base. Respeta estrictamente las restricciones `NOT NULL` de tiempos de atención y sincroniza las secuencias nativas de PostgreSQL (`BIGSERIAL`) para evitar colisiones en futuras inserciones.

===============================================================================
ESTADO ACTUAL DE LA INTEGRACIÓN Y LOGROS OPERATIVOS
===============================================================================

1. **Sincronización de Entidades y Restricciones:** Las entidades de Spring Boot reflejan exactamente las columnas requeridas por el negocio (`opening_time`, `closing_time`, `address`, `image_url`). El ciclo de vida relacional está blindado contra inconsistencias.
2. **Desbloqueo del Flujo Frontend:** La inserción de datos de la migración V6 solucionó los errores de registros vacíos y permitió que las vistas del frontend consuman información estructural real del negocio idóneo.
3. **Multi-Tenant Garantizado:** Se mantiene el aislamiento estricto mediante la clave discriminatoria en todas las consultas operativas del sistema.

===============================================================================
MÓDULO DE AUTENTICACIÓN JWT (CONEXIÓN LOGIN - BACKEND)
===============================================================================

Se implementó la estructura inicial para conectar la pantalla de inicio de
sesión de React con el servidor de Spring Boot utilizando tokens JWT.

===============================================================================
DEPENDENCIAS INCORPORADAS
===============================================================================

Se agregaron al pom.xml las librerías oficiales para el manejo de seguridad:

- spring-boot-starter-security
- jjwt-api (versión 0.12.5)
- jjwt-impl (versión 0.12.5)
- jjwt-jackson (versión 0.12.5)

Objetivo:
- Permitir el uso de Spring Security y la generación/lectura de tokens JWT.

===============================================================================
COMPONENTES BACKEND DESARROLLADOS
===============================================================================

---

## UserRepository.java

Se agregó un nuevo método de búsqueda:

- findByEmail(String email)

Objetivo:
- Permitir que el sistema busque al usuario en la base de datos por su correo.

---

## JwtUtil.java

Clase de utilidad para el manejo de tokens.

Responsabilidades:
- generar tokens firmados con clave secreta (duración 24 horas)
- inyectar datos del usuario en el token (role, businessId, branchId)
- extraer el email y validar que el token sea auténtico

---

## AuthController.java

Controlador que expone el endpoint de autenticación.

Ruta:
- POST "/api/v1/auth/login"

Responsabilidades:
- recibir el correo y contraseña del formulario
- verificar el usuario y comparar la contraseña usando BCrypt
- responder con el token y los datos básicos del usuario si todo es correcto

---

## SecurityConfig.java

Configuración de seguridad de Spring Boot.

Responsabilidades:
- permitir las peticiones desde el puerto del frontend (CORS)
- habilitar el acceso libre temporal a las rutas de la API para desarrollo
- proveer el encriptador de contraseñas BCryptPasswordEncoder

---

## DTOs (Data Transfer Objects)

Clases tipo Record para el intercambio de información:
- LoginRequest: contiene email y password
- AuthResponse: contiene el token, datos de usuario e IDs de negocio/sucursal

===============================================================================
COMPONENTES FRONTEND DESARROLLADOS
===============================================================================

---

## AuthContext.jsx

Contexto global creado para administrar la sesión en todo el frontend.

Responsabilidades:
- guardar el usuario y el token en el localStorage de forma persistente
- ofrecer las funciones globales login() y logout()
- exponer la propiedad reactiva isAuthenticated

---

## ProtectedRoute.jsx

Componente guardián para proteger las pantallas privadas.

Responsabilidades:
- revisar si el usuario está logueado antes de dejarlo pasar
- redirigir automáticamente a "/login" si no hay un token válido

---

## Login.jsx (Modificado)

Se conectó el formulario visual con el backend.

Responsabilidades:
- capturar el email y password ingresados por el usuario
- realizar una petición fetch (POST) real hacia el servidor
- guardar los datos en el AuthContext si la respuesta es exitosa
- mostrar mensajes de error en pantalla si las credenciales fallan (401)