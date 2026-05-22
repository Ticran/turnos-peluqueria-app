export const getAppointmentForSlot = (appointments, day, time) => {
  return appointments.find(apt => apt.day === day && apt.time === time);
};

export const getStatusCount = (appointments, role) => {
  if (role === "admin") {
    return {
      confirmados: appointments.filter(a => a.status === "Confirmado").length,
      pendientes: appointments.filter(a => a.status === "Pendiente").length,
      cancelados: appointments.filter(a => a.status === "Cancelado").length,
    };
  }
  return null;
};