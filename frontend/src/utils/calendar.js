/**
 * Comparador ultra-robusto para emparejar los turnos de la DB con la grilla del Dashboard.
 * Soporta cualquier formato de día (fecha completa, nombre en español/inglés, abreviaturas)
 * y cualquier formato de hora (24hs, 12hs AM/PM, con o sin segundos).
 */
export const getAppointmentForSlot = (appointments, dayKey, timeSlot) => {
  if (!appointments || !Array.isArray(appointments)) return null;

  // 1. Normalizador de Horas a formato estándar de 24hs "HH:mm" 
  // (ej: convierte "16:00:00", "4:00 PM" o "16:00" -> todo a "16:00")
  const normalizeTime = (tStr) => {
    if (!tStr) return "";
    let str = tStr.toString().trim().toLowerCase();
    
    const isPm = str.includes("pm");
    const isAm = str.includes("am");
    
    let clean = str.replace(/am|pm/g, "").trim();
    const parts = clean.split(":");
    if (parts.length < 2) return "";
    
    let hours = parseInt(parts[0], 10);
    let minutes = parseInt(parts[1], 10);
    
    if (isPm && hours < 12) hours += 12;
    if (isAm && hours === 12) hours = 0;
    
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  const gridTime = normalizeTime(timeSlot);

  // Buscamos el turno que coincida en hora y fecha/día
  const foundAppointment = appointments.find(apt => {
    if (!apt.date || !apt.time) return false;

    // Normalizamos la hora del turno que vino de la DB
    const aptTime = normalizeTime(apt.time);
    if (aptTime !== gridTime) return false;

    // Normalizamos las llaves de los días
    const cleanDayKey = dayKey.toString().trim().toLowerCase();
    const cleanAptDate = apt.date.toString().trim();

    // CASO A: Coincidencia directa por fecha exacta (ej: "2026-06-01" === "2026-06-01")
    if (cleanAptDate === cleanDayKey) return true;

    // CASO B: Coincidencia por nombre o abreviación del día (lunes, monday, lun, etc.)
    const dateObj = new Date(`${cleanAptDate}T00:00:00`);
    if (isNaN(dateObj.getTime())) return false;
    const dayIndex = dateObj.getDay(); // 0 = Domingo, 1 = Lunes, etc.

    const spanishDays = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
    const spanishShort = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
    const englishDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const englishShort = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

    if (
      cleanDayKey === spanishDays[dayIndex] ||
      cleanDayKey === spanishShort[dayIndex] ||
      cleanDayKey === englishDays[dayIndex] ||
      cleanDayKey === englishShort[dayIndex]
    ) {
      return true;
    }

    // CASO C: Contención parcial por si viene formateado con texto extra
    if (cleanDayKey.includes(cleanAptDate) || cleanAptDate.includes(cleanDayKey)) return true;

    return false;
  });

  // =========================================================================
  // 🔍 ESPÍA DE TELEMETRÍA (Descomentá la línea de abajo si querés auditar por consola)
  // console.log(`[Grilla] Día: "${dayKey}" | Hora: "${timeSlot}" (${gridTime}) -> ¿Turno?:`, foundAppointment ? "SÍ ✅" : "NO ❌");
  // =========================================================================

  return foundAppointment || null;
};

/**
 * Cuenta los turnos por estado mapeando el formato de la DB.
 */
export const getStatusCount = (appointments) => {
  if (!appointments || !Array.isArray(appointments)) {
    return { pending: 0, confirmed: 0, cancelled: 0 };
  }
  
  return appointments.reduce((acc, apt) => {
    const status = apt.status ? apt.status.toLowerCase() : '';
    if (status === 'pending') acc.pending++;
    else if (status === 'confirmed') acc.confirmed++;
    else if (status === 'cancelled') acc.cancelled++;
    return acc;
  }, { pending: 0, confirmed: 0, cancelled: 0 });
};

export const countAppointmentsByStatus = getStatusCount;