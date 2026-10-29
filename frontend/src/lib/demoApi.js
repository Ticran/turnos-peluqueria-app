// Modo demo (VITE_DEMO=true): imita el backend dentro del navegador para mostrar la app sin servidor.
// Los datos viven en localStorage de cada dispositivo: lo que hace un visitante no lo ve otro.
// ponytail: reglas simplificadas del backend real (sin límites anti-spam ni emails); no usar como backend
import { addDays, toISODate } from "@/utils/date";

const KEY = "turnos_demo_db_v2"; // cambiarla cuando cambian los datos de ejemplo, así se vuelven a cargar
const SLOT = 30;
export const DEMO_PASSWORD = "demo1234";
export const DEMO_USERS = [
  { email: "admin@demo.com", label: "Administrador del local" },
  { email: "lucia@demo.com", label: "Profesional" },
];
// En la demo publicada no existe la cuenta de dueño de la plataforma (SUPER_ADMIN): nadie puede entrar a /plataforma

// ---------- datos de ejemplo ----------
// Fotos de Unsplash (uso libre); se cargan de internet. El logo es un SVG propio
const photo = (id, w, h) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=75`;
const avatar = (id) => photo(id, 400, 400);
const LOGO = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="44" fill="#1f3b4d"/>
  <circle cx="100" cy="100" r="62" fill="none" stroke="#f1e6d6" stroke-width="3"/>
  <text x="100" y="118" text-anchor="middle" font-family="Georgia,serif" font-size="58" font-style="italic" fill="#f1e6d6">EA</text>
</svg>`);

function seed() {
  const today = new Date();
  const day = (n) => toISODate(addDays(today, n));
  const appts = [
    [0, "10:00", "Ana López", 1, 2, "CONFIRMED"],
    [0, "16:30", "Carlos Díaz", 2, 3, "PENDING"],
    [1, "09:30", "Sofía Martínez", 1, 1, "PENDING"],
    [1, "11:00", "Pedro Ruiz", 2, 2, "CONFIRMED"],
    [2, "15:00", "Laura Gómez", 1, 3, "CONFIRMED"],
    [3, "10:30", "Diego Herrera", 2, 1, "PENDING"],
    [-1, "12:00", "Valentina Paz", 1, 2, "COMPLETED"],
  ];
  return {
    seq: 100,
    businesses: [{
      id: 1, name: "Estudio Alma", slug: "demo", description: "Reservá tu turno online en segundos. Esto es una demo: probá todo sin miedo.",
      email: "contacto@demo.com", phone: "3584000000", address: "Av. Siempre Viva 742",
      imageUrl: photo("1761971975724-31001b4de0bf", 1600, 900), logoUrl: LOGO,
      openingTime: "09:00", closingTime: "19:00", closedWeekdays: [7], status: "ACTIVE",
      branches: [{ id: 1, name: "Sucursal Centro", address: "Av. Siempre Viva 742", phone: "3584000000", businessId: 1 }],
    }],
    users: [
      { id: 1, name: "Carolina Ríos", email: "admin@demo.com", role: "ADMIN", specialty: "Dirección", businessId: 1, branchId: 1, photoUrl: avatar("1573497019236-17f8177b81e8"), active: true },
      { id: 2, name: "Lucía Fernández", email: "lucia@demo.com", role: "EMPLOYEE", specialty: "Atención general", businessId: 1, branchId: 1, photoUrl: avatar("1701096374092-bb70915fdc5c"), active: true },
      { id: 3, name: "Martín Gómez", email: "martin@demo.com", role: "EMPLOYEE", specialty: "Especialista", businessId: 1, branchId: 1, photoUrl: avatar("1500648767791-00dcc994a43e"), active: true },
    ],
    services: [
      { id: 1, name: "Consulta inicial", description: "Primera visita y evaluación.", category: "Consultas", price: 15000, durationInMinutes: 30, active: true, businessId: 1, branchId: 1 },
      { id: 2, name: "Sesión completa", description: "Atención completa de una hora.", category: "Sesiones", price: 25000, durationInMinutes: 60, active: true, businessId: 1, branchId: 1 },
      { id: 3, name: "Control", description: "Seguimiento rápido.", category: "Consultas", price: 10000, durationInMinutes: 30, active: true, businessId: 1, branchId: 1 },
    ],
    appointments: appts.map(([d, time, clientName, employeeId, serviceId, status], i) => ({
      id: i + 1, businessId: 1, branchId: 1, date: day(d), time, clientName, clientPhone: "35840000" + String(10 + i),
      clientEmail: null, employeeId, serviceId, status, observations: null, cancelToken: `demo-${i + 1}`,
    })),
    schedules: [], // { businessId, userId, dayOfWeek, startTime, endTime }
    blocks: [],    // { id, businessId, employeeId, startAt, endAt, reason }
  };
}

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? seed();
  } catch {
    return seed();
  }
};
const save = (db) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(db));
  } catch {
    throw new Error("No hay más espacio en este navegador para la demo. Tocá \"Reiniciar demo\".");
  }
};
export const resetDemo = () => localStorage.removeItem(KEY);

// ---------- utilidades ----------
const fail = (message) => { throw new Error(message); };
const toMin = (t) => { const [h, m] = t.slice(0, 5).split(":").map(Number); return h * 60 + m; };
const toTime = (m) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
const isoDow = (iso) => { const d = new Date(`${iso}T12:00:00`).getDay(); return d === 0 ? 7 : d; };
const nowMin = () => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); };
const todayIso = () => toISODate(new Date());
const nextId = (db) => ++db.seq;

// Token con forma de JWT (el frontend solo lee "exp"); no tiene firma real
const fakeToken = (user) => {
  const b64 = (o) => btoa(JSON.stringify(o)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return `${b64({ alg: "none" })}.${b64({ userId: user.id, exp: Math.floor(Date.now() / 1000) + 86400 })}.demo`;
};
const currentUser = (db) => {
  try {
    const u = JSON.parse(localStorage.getItem("lumen_user"));
    return db.users.find((x) => x.id === u?.id && x.active) ?? null;
  } catch {
    return null;
  }
};

const userDto = (u, withEmail = true) => ({
  id: u.id, name: u.name, email: withEmail ? u.email : null, specialty: u.specialty, role: u.role,
  businessId: u.businessId, branchId: u.branchId, photoUrl: u.photoUrl,
});

function apptDto(db, a, isPublic) {
  const emp = db.users.find((u) => u.id === a.employeeId);
  const svc = db.services.find((s) => s.id === a.serviceId);
  const biz = db.businesses.find((b) => b.id === a.businessId);
  const branch = biz.branches.find((br) => br.id === a.branchId);
  return {
    ...a, observations: isPublic ? null : a.observations, cancelToken: isPublic ? a.cancelToken : undefined,
    employeeName: emp?.name, serviceName: svc?.name, servicePrice: svc?.price, serviceDuration: svc?.durationInMinutes,
    businessName: biz.name, businessSlug: biz.slug, businessPhone: branch?.phone ?? biz.phone, address: branch?.address ?? biz.address,
  };
}

// Franjas en que atiende el profesional ese día (horario propio o el del local), recortadas al local
function workRanges(db, biz, employeeId, date) {
  if (biz.closedWeekdays.includes(isoDow(date))) return [];
  const own = db.schedules.filter((s) => s.businessId === biz.id && s.userId === employeeId);
  const ranges = own.length === 0
    ? [[toMin(biz.openingTime), toMin(biz.closingTime)]]
    : own.filter((s) => s.dayOfWeek === isoDow(date)).map((s) => [toMin(s.startTime), toMin(s.endTime)]);
  return ranges.map(([s, e]) => [Math.max(s, toMin(biz.openingTime)), Math.min(e, toMin(biz.closingTime))]).filter(([s, e]) => s < e);
}

function busy(db, bizId, employeeId, date, ignoreId) {
  const list = db.appointments
    .filter((a) => a.businessId === bizId && a.employeeId === employeeId && a.date === date && a.status !== "CANCELLED" && a.id !== ignoreId)
    .map((a) => { const s = toMin(a.time); return [s, s + db.services.find((x) => x.id === a.serviceId).durationInMinutes]; });
  for (const b of db.blocks.filter((x) => x.businessId === bizId && (x.employeeId == null || x.employeeId === employeeId))) {
    const dayStart = `${date}T00:00`, dayEnd = `${date}T23:59`;
    if (b.startAt.slice(0, 16) <= dayEnd && b.endAt.slice(0, 16) > dayStart) {
      list.push([b.startAt.slice(0, 10) < date ? 0 : toMin(b.startAt.slice(11, 16)), b.endAt.slice(0, 10) > date ? 24 * 60 : toMin(b.endAt.slice(11, 16))]);
    }
  }
  return list;
}
const overlaps = (list, s, e) => list.some(([bs, be]) => s < be && e > bs);

function freeSlots(db, biz, employeeId, service, date) {
  if (date < todayIso()) return [];
  const taken = busy(db, biz.id, employeeId, date);
  const out = [];
  for (const [open, close] of workRanges(db, biz, employeeId, date)) {
    for (let m = open; m + service.durationInMinutes <= close; m += SLOT) {
      if (date === todayIso() && m < nowMin()) continue;
      if (!overlaps(taken, m, m + service.durationInMinutes)) out.push(toTime(m));
    }
  }
  return out;
}

// ---------- rutas ----------
const routes = [];
const route = (method, pattern, handler) =>
  routes.push({ method, regex: new RegExp(`^${pattern.replace(/:(\w+)/g, "(?<$1>[^/]+)")}$`), handler });

route("POST", "/api/v1/auth/login", (db, { body }) => {
  // SUPER_ADMIN nunca entra en la demo (por si quedó guardado en un navegador con datos viejos)
  const user = db.users.find((u) => u.email === body.email?.trim().toLowerCase() && u.active && u.role !== "SUPER_ADMIN");
  if (!user || body.password !== DEMO_PASSWORD) fail("Credenciales inválidas");
  return { token: fakeToken(user), userId: user.id, name: user.name, email: user.email, role: user.role,
    businessId: user.businessId, branchId: user.branchId, photoUrl: user.photoUrl };
});

// Público
route("GET", "/api/public/businesses", (db) => db.businesses.filter((b) => b.status === "ACTIVE"));
route("GET", "/api/public/businesses/:slug", (db, { p }) =>
  db.businesses.find((b) => b.slug === p.slug && b.status === "ACTIVE") ?? fail("No encontramos ese local."));
route("GET", "/api/services/business/:bid", (db, { p }) => db.services.filter((s) => s.businessId === +p.bid && s.active));
route("GET", "/api/services/business/:bid/branch/:brid", (db, { p }) =>
  db.services.filter((s) => s.businessId === +p.bid && s.active && (s.branchId == null || s.branchId === +p.brid)));
route("GET", "/api/users/business/:bid/branch/:brid", (db, { p }) =>
  db.users.filter((u) => u.businessId === +p.bid && u.active && u.role === "EMPLOYEE" && (u.branchId == null || u.branchId === +p.brid))
    .map((u) => userDto(u, false)));
route("GET", "/api/appointments/availability", (db, { q }) => {
  const biz = db.businesses.find((b) => b.id === +q.businessId) ?? fail("Negocio no encontrado");
  const svc = db.services.find((s) => s.id === +q.serviceId) ?? fail("Servicio no encontrado");
  return freeSlots(db, biz, +q.employeeId, svc, q.date);
});
route("POST", "/api/appointments", (db, { body, user }) => {
  const b = body;
  if (!b.businessId || !b.branchId || !b.employeeId || !b.serviceId || !b.date || !b.time || !b.clientName?.trim() || !b.clientPhone?.trim()) {
    fail("Faltan datos: sucursal, profesional, servicio, fecha, hora, nombre y teléfono son obligatorios.");
  }
  if ((b.clientPhone.match(/\d/g) ?? []).length < 6) fail("Ingresá un teléfono válido (solo números, entre 6 y 15 dígitos).");
  const biz = db.businesses.find((x) => x.id === b.businessId) ?? fail("Negocio no encontrado");
  const svc = db.services.find((s) => s.id === b.serviceId) ?? fail("Servicio no encontrado");
  const time = b.time.slice(0, 5);
  const start = toMin(time);
  if (b.date < todayIso() || (b.date === todayIso() && start < nowMin())) fail("No se puede reservar un turno en el pasado.");
  if (!workRanges(db, biz, b.employeeId, b.date).some(([s, e]) => start >= s && start + svc.durationInMinutes <= e)) {
    fail("El profesional no atiende en ese horario.");
  }
  if (overlaps(busy(db, biz.id, b.employeeId, b.date), start, start + svc.durationInMinutes)) fail("Ese horario ya no está disponible.");
  const byStaff = user?.businessId === biz.id;
  const appt = { id: nextId(db), businessId: biz.id, branchId: b.branchId, date: b.date, time, clientName: b.clientName.trim(),
    clientPhone: b.clientPhone.trim(), clientEmail: b.clientEmail?.trim() || null, employeeId: b.employeeId, serviceId: b.serviceId,
    status: byStaff ? "CONFIRMED" : "PENDING", observations: b.observations ?? null, cancelToken: crypto.randomUUID() };
  db.appointments.push(appt);
  return apptDto(db, appt, true);
});
route("GET", "/api/appointments/public/:token", (db, { p }) =>
  apptDto(db, db.appointments.find((a) => a.cancelToken === p.token) ?? fail("Turno no encontrado"), true));
route("POST", "/api/appointments/public/:token/cancel", (db, { p }) => {
  const a = db.appointments.find((x) => x.cancelToken === p.token) ?? fail("Turno no encontrado");
  if (a.status !== "PENDING" && a.status !== "CONFIRMED") fail("Este turno ya no se puede cancelar.");
  a.status = "CANCELLED";
  return apptDto(db, a, true);
});

// Panel del local (requiere sesión)
const staff = (user, bid) => (user && user.businessId === +bid ? user : fail("No tenés acceso a este negocio"));
const admin = (user, bid) => (staff(user, bid).role === "ADMIN" ? user : fail("Solo el administrador puede hacer esto."));
const bizOf = (db, id) => db.businesses.find((b) => b.id === +id) ?? fail("El local no existe.");

route("GET", "/api/appointments/business/:bid", (db, { p, q, user }) => {
  staff(user, p.bid);
  const onlyMine = user.role !== "ADMIN" ? user.id : q.employeeId ? +q.employeeId : null;
  return db.appointments
    .filter((a) => a.businessId === +p.bid && a.date >= q.from && a.date <= q.to && (!onlyMine || a.employeeId === onlyMine))
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .map((a) => apptDto(db, a, false));
});
route("PATCH", "/api/appointments/:id/business/:bid", (db, { p, body, user }) => {
  staff(user, p.bid);
  const a = db.appointments.find((x) => x.id === +p.id && x.businessId === +p.bid) ?? fail("Turno no encontrado");
  if (user.role !== "ADMIN" && a.employeeId !== user.id) fail("Solo podés modificar tus propios turnos.");
  if (a.status === "CANCELLED" && body.status && body.status !== "CANCELLED") {
    const s = toMin(a.time);
    const dur = db.services.find((x) => x.id === a.serviceId).durationInMinutes;
    if (overlaps(busy(db, a.businessId, a.employeeId, a.date, a.id), s, s + dur)) fail("No se puede reactivar: el horario ya fue ocupado por otro turno.");
  }
  if (body.status) a.status = body.status;
  if (body.observations != null) a.observations = body.observations;
  return apptDto(db, a, false);
});

route("GET", "/api/admin/businesses/:id", (db, { p, user }) => (staff(user, p.id), bizOf(db, p.id)));
route("PUT", "/api/admin/businesses/:id", (db, { p, body, user }) => {
  admin(user, p.id);
  const b = bizOf(db, p.id);
  if (!body.name?.trim() || !body.email?.trim()) fail("Nombre y email del local son obligatorios.");
  if (toMin(body.openingTime) >= toMin(body.closingTime)) fail("El horario de apertura debe ser anterior al de cierre.");
  if (body.slug !== b.slug && db.businesses.some((x) => x.slug === body.slug)) fail("Esa dirección web ya la usa otro local.");
  Object.assign(b, { name: body.name.trim(), slug: body.slug, description: body.description, email: body.email.trim(), phone: body.phone,
    address: body.address, openingTime: body.openingTime, closingTime: body.closingTime, closedWeekdays: body.closedWeekdays ?? [] });
  return b;
});
route("POST", "/api/admin/businesses/:id/branches", (db, { p, body, user }) => {
  admin(user, p.id);
  if (!body.name?.trim()) fail("El nombre de la sucursal es obligatorio.");
  const br = { id: nextId(db), name: body.name.trim(), address: body.address, phone: body.phone, businessId: +p.id };
  bizOf(db, p.id).branches.push(br);
  return br;
});
route("PUT", "/api/admin/businesses/:id/branches/:brid", (db, { p, body, user }) => {
  admin(user, p.id);
  const br = bizOf(db, p.id).branches.find((x) => x.id === +p.brid) ?? fail("Sucursal no encontrada");
  return Object.assign(br, { name: body.name.trim(), address: body.address, phone: body.phone });
});
route("POST", "/api/admin/businesses/:id/upload-image", (db, { p, user, image }) => (admin(user, p.id), Object.assign(bizOf(db, p.id), { imageUrl: image })));
route("POST", "/api/admin/businesses/:id/upload-logo", (db, { p, user, image }) => (admin(user, p.id), Object.assign(bizOf(db, p.id), { logoUrl: image })));

// Servicios
route("POST", "/api/services", (db, { body, user }) => {
  admin(user, user?.businessId);
  if (!body.name?.trim()) fail("El nombre del servicio es obligatorio.");
  const s = { id: nextId(db), name: body.name.trim(), description: body.description, category: body.category, price: Number(body.price) || 0,
    durationInMinutes: Number(body.durationInMinutes) || SLOT, active: true, businessId: user.businessId, branchId: body.branchId ? +body.branchId : null };
  db.services.push(s);
  return s;
});
route("PUT", "/api/services/:id/business/:bid", (db, { p, body, user }) => {
  admin(user, p.bid);
  const s = db.services.find((x) => x.id === +p.id && x.businessId === +p.bid) ?? fail("Servicio no encontrado");
  return Object.assign(s, { name: body.name.trim(), description: body.description, category: body.category, price: Number(body.price) || 0,
    durationInMinutes: Number(body.durationInMinutes) || SLOT, branchId: body.branchId ? +body.branchId : null });
});
route("DELETE", "/api/services/:id/business/:bid", (db, { p, user }) => {
  admin(user, p.bid);
  (db.services.find((x) => x.id === +p.id && x.businessId === +p.bid) ?? fail("Servicio no encontrado")).active = false;
  return null;
});

// Equipo
route("GET", "/api/users/business/:bid", (db, { p, user }) => (admin(user, p.bid),
  db.users.filter((u) => u.businessId === +p.bid && u.active).sort((a, b) => a.name.localeCompare(b.name)).map((u) => userDto(u))));
route("POST", "/api/users", (db, { body, user }) => {
  admin(user, user?.businessId);
  const email = body.email?.trim().toLowerCase();
  if (!body.name?.trim()) fail("El nombre es obligatorio.");
  if (!email) fail("El email es obligatorio.");
  if (db.users.some((u) => u.email === email)) fail("Ya existe un usuario con ese email.");
  const u = { id: nextId(db), name: body.name.trim(), email, role: body.role === "ADMIN" ? "ADMIN" : "EMPLOYEE", specialty: body.specialty,
    businessId: user.businessId, branchId: body.branchId ? +body.branchId : 1, photoUrl: null, active: true };
  db.users.push(u);
  return userDto(u);
});
route("PUT", "/api/users/:id/business/:bid", (db, { p, body, user }) => {
  admin(user, p.bid);
  const u = db.users.find((x) => x.id === +p.id && x.businessId === +p.bid) ?? fail("Usuario no encontrado en este negocio");
  Object.assign(u, { name: body.name.trim(), email: body.email.trim().toLowerCase(), specialty: body.specialty,
    role: body.role === "ADMIN" ? "ADMIN" : "EMPLOYEE", branchId: body.branchId ? +body.branchId : u.branchId });
  return userDto(u);
});
route("DELETE", "/api/users/:id/business/:bid", (db, { p, user }) => {
  admin(user, p.bid);
  if (user.id === +p.id) fail("No podés darte de baja a vos mismo.");
  (db.users.find((x) => x.id === +p.id && x.businessId === +p.bid) ?? fail("Usuario no encontrado")).active = false;
  return null;
});
route("POST", "/api/users/:id/business/:bid/photo", (db, { p, user, image }) => {
  staff(user, p.bid);
  if (user.role !== "ADMIN" && user.id !== +p.id) fail("Solo podés cambiar tu propia foto.");
  const u = db.users.find((x) => x.id === +p.id && x.businessId === +p.bid) ?? fail("Usuario no encontrado");
  u.photoUrl = image;
  return userDto(u);
});

// Horarios y bloqueos
const selfOrAdmin = (user, bid, eid) => {
  staff(user, bid);
  if (user.role !== "ADMIN" && user.id !== +eid) fail("Solo podés gestionar tu propia disponibilidad.");
};
route("GET", "/api/schedules/business/:bid/employee/:eid", (db, { p, user }) => {
  selfOrAdmin(user, p.bid, p.eid);
  return db.schedules.filter((s) => s.businessId === +p.bid && s.userId === +p.eid)
    .sort((a, b) => a.dayOfWeek - b.dayOfWeek || a.startTime.localeCompare(b.startTime));
});
route("PUT", "/api/schedules/business/:bid/employee/:eid", (db, { p, body, user }) => {
  selfOrAdmin(user, p.bid, p.eid);
  if (body.some((r) => toMin(r.startTime) >= toMin(r.endTime))) fail("Cada franja necesita una hora de inicio anterior a la de fin.");
  db.schedules = db.schedules.filter((s) => !(s.businessId === +p.bid && s.userId === +p.eid))
    .concat(body.map((r) => ({ businessId: +p.bid, userId: +p.eid, dayOfWeek: r.dayOfWeek, startTime: r.startTime, endTime: r.endTime })));
  return body;
});
route("GET", "/api/schedules/business/:bid/blocks", (db, { p, q, user }) => {
  if (q.employeeId) selfOrAdmin(user, p.bid, q.employeeId); else staff(user, p.bid);
  const now = new Date().toISOString().slice(0, 16);
  return db.blocks.filter((b) => b.businessId === +p.bid && b.endAt > now
    && (q.employeeId ? b.employeeId == null || b.employeeId === +q.employeeId : b.employeeId == null))
    .sort((a, b) => a.startAt.localeCompare(b.startAt));
});
route("POST", "/api/schedules/business/:bid/blocks", (db, { p, body, user }) => {
  if (body.employeeId == null) admin(user, p.bid); else selfOrAdmin(user, p.bid, body.employeeId);
  if (!body.startAt || !body.endAt || body.startAt >= body.endAt) fail("El inicio del bloqueo debe ser anterior al fin.");
  const b = { id: nextId(db), businessId: +p.bid, employeeId: body.employeeId ?? null, startAt: body.startAt, endAt: body.endAt, reason: body.reason };
  db.blocks.push(b);
  return b;
});
route("DELETE", "/api/schedules/business/:bid/blocks/:id", (db, { p, user }) => {
  staff(user, p.bid);
  const b = db.blocks.find((x) => x.id === +p.id && x.businessId === +p.bid) ?? fail("Bloqueo no encontrado");
  if (user.role !== "ADMIN" && b.employeeId !== user.id) fail("Solo podés borrar tus propios bloqueos.");
  db.blocks = db.blocks.filter((x) => x !== b);
  return null;
});

// Plataforma (SUPER_ADMIN)
const owner = (user) => (user?.role === "SUPER_ADMIN" ? user : fail("Solo el dueño de la plataforma puede hacer esto."));
route("GET", "/api/admin/businesses", (db, { user }) => (owner(user), db.businesses));
route("PATCH", "/api/admin/businesses/:id/status", (db, { p, body, user }) => (owner(user), Object.assign(bizOf(db, p.id), { status: body.status })));
route("POST", "/api/admin/businesses", (db, { body, user }) => {
  owner(user);
  const { business, branchName, adminName, adminEmail } = body;
  if (!business?.name?.trim() || !business?.email?.trim()) fail("Nombre y email del local son obligatorios.");
  const email = adminEmail?.trim().toLowerCase();
  if (!email || db.users.some((u) => u.email === email)) fail("Ya existe un usuario con ese email.");
  let slug = business.name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "local";
  for (let i = 2, base = slug; db.businesses.some((b) => b.slug === slug); i++) slug = `${base}-${i}`;
  const id = nextId(db);
  const branch = { id: nextId(db), name: branchName?.trim() || "Sucursal Central", address: business.address, phone: business.phone, businessId: id };
  const biz = { id, name: business.name.trim(), slug, description: "", email: business.email.trim(), phone: business.phone, address: business.address,
    imageUrl: null, logoUrl: null, openingTime: "09:00", closingTime: "20:00", closedWeekdays: [], status: "ACTIVE", branches: [branch] };
  db.businesses.push(biz);
  db.users.push({ id: nextId(db), name: adminName?.trim() || "Administrador", email, role: "ADMIN", specialty: null, businessId: id,
    branchId: branch.id, photoUrl: null, active: true });
  return biz;
});

// Imagen elegida -> data URL achicada (para que entre en localStorage)
async function toDataUrl(file) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file?.type)) fail("Formato no permitido. Subí una imagen JPG, PNG o WEBP.");
  const img = await createImageBitmap(file);
  const scale = Math.min(1, 800 / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.8);
}

// Mismo contrato que api(): devuelve el JSON o lanza Error con el mensaje
export async function demoApi(path, { method = "GET", body } = {}) {
  await new Promise((r) => setTimeout(r, 250)); // simula la red para que se vean los estados de carga
  const [pathname, search = ""] = path.split("?");
  const q = Object.fromEntries(new URLSearchParams(search));
  for (const r of routes) {
    const m = r.method === method && pathname.match(r.regex);
    if (!m) continue;
    const db = load();
    const image = body instanceof FormData ? await toDataUrl(body.get("file")) : undefined;
    // La base se lee de cero en cada pedido: si la ruta falla a mitad de camino, no se guarda nada
    const result = r.handler(db, { p: m.groups ?? {}, q, body: image ? undefined : body, user: currentUser(db), image });
    save(db);
    return result == null ? null : JSON.parse(JSON.stringify(result));
  }
  throw new Error(`La demo no implementa ${method} ${pathname}`);
}
