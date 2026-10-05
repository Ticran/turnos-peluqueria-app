// Estados de turno (mismos valores que el enum AppointmentStatus del backend)
export const STATUS = {
  PENDING: { label: "Pendiente", badge: "text-amber-700 bg-amber-50 border-amber-200", card: "bg-amber-50 text-amber-900 border-amber-200/70" },
  CONFIRMED: { label: "Confirmado", badge: "text-emerald-700 bg-emerald-50 border-emerald-200", card: "bg-emerald-50 text-emerald-900 border-emerald-200/70" },
  COMPLETED: { label: "Completado", badge: "text-blue-700 bg-blue-50 border-blue-200", card: "bg-blue-50 text-blue-900 border-blue-200/70" },
  CANCELLED: { label: "Cancelado", badge: "text-rose-700 bg-rose-50 border-rose-200", card: "bg-slate-50 text-slate-400 border-slate-200 line-through" },
  NO_SHOW: { label: "No asistió", badge: "text-slate-600 bg-slate-100 border-slate-300", card: "bg-slate-100 text-slate-500 border-slate-300" },
};

export const STATUS_OPTIONS = Object.entries(STATUS).map(([value, { label }]) => ({ value, label }));

// Teléfono en formato internacional para wa.me. Los clientes suelen escribir "0358 15 4..." o "358 4...":
// ponytail: heurística para Argentina (+54 9); para otros países el cliente tiene que poner el código
export const whatsappNumber = (phone = "") => {
  let digits = phone.replace(/\D/g, "").replace(/^0/, "");
  if (digits.startsWith("54")) return digits;
  digits = digits.replace(/^(\d{2,4})15(\d{6,8})$/, "$1$2"); // saca el "15" de los celulares viejos
  return digits.length === 10 ? `549${digits}` : digits;
};

// Link de WhatsApp con el mensaje ya escrito
export const whatsappLink = (phone, text) =>
  `https://wa.me/${whatsappNumber(phone)}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const sumPrices = (appointments) =>
  appointments.reduce((total, apt) => total + Number(apt.servicePrice || 0), 0);
