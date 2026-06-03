/**
 * Busca si hay un turno para un casillero específico del calendario.
 * Convierte la fecha del backend (ej: "2026-06-01") a un día de la semana (ej: "lunes") para comparar.
 */
export const getAppointmentForSlot = (appointments, dayKey, timeSlot) => {
  return appointments.find(apt => {
    if (!apt.date || !apt.time) return false;

    // 1. Obtener el día de la semana a partir de la fecha "YYYY-MM-DD"
    // Agregamos 'T00:00:00' para evitar problemas de desfasaje de zona horaria
    const dateObj = new Date(`${apt.date}T00:00:00`);
    
    // Lista de días ordenados igual que en tu objeto daysOfWeek (0=domingo, 1=lunes...)
    const daysMap = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
    const aptDayKey = daysMap[dateObj.getDay()];

    // 2. Normalizar las horas para que "10:00:00" coincida con "10:00"
    const aptTimeShort = apt.time.substring(0, 5); // Recorta "10:00:00" -> "10:00"

    // Comparamos el día y la hora recortada
    return aptDayKey === dayKey.toLowerCase() && aptTimeShort === timeSlot;
  });
};

/**
 * Cuenta los turnos por estado mapeando el formato de la DB (inglés/mayúsculas) al de tu UI.
 */
export const getStatusCount = (appointments, role) => {
  if (role === "admin") {
    return {
      confirmados: appointments.filter(a => a.status === "CONFIRMED").length,
      pendientes: appointments.filter(a => a.status === "PENDING").length,
      cancelados: appointments.filter(a => a.status === "CANCELLED").length,
    };
  }
  return null;
};