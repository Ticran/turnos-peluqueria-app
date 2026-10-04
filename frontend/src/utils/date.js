// Fechas en hora local como "YYYY-MM-DD" (toISOString usa UTC y en Argentina corre el día después de las 21 hs)
export const toISODate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const parseISODate = (iso) => new Date(`${iso}T00:00:00`);

export const addDays = (date, days) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
};

// Lunes de la semana de "date"
export const startOfWeek = (date) => {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return addDays(d, -((d.getDay() + 6) % 7));
};

export const todayISO = () => toISODate(new Date());

// "10:00:00" -> "10:00"
export const formatTime = (time) => (time ? String(time).slice(0, 5) : "--:--");

// Próximos N días para el selector de reservas: { id: "2026-10-05", isoWeekday: 1, weekday: "lun", day: "5", month: "oct" }
export const nextDays = (count) =>
  Array.from({ length: count }, (_, i) => {
    const date = addDays(new Date(), i);
    return {
      id: toISODate(date),
      isoWeekday: date.getDay() || 7, // 1 = lunes ... 7 = domingo (como en el backend)
      weekday: date.toLocaleDateString("es-AR", { weekday: "short" }).replace(".", ""),
      day: String(date.getDate()),
      month: date.toLocaleDateString("es-AR", { month: "short" }).replace(".", ""),
    };
  });

// "lunes 5 de octubre"
export const formatLongDate = (iso) =>
  parseISODate(iso).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" });

export const formatBookingDate = (dateString, timeSlot) => {
  if (!dateString || !timeSlot) return "—";
  return `${formatLongDate(dateString)}, ${formatTime(timeSlot)} hs`;
};
