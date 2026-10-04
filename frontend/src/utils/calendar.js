import { formatTime } from "./date";

const toMinutes = (time) => {
  const [h, m] = formatTime(time).split(":").map(Number);
  return h * 60 + m;
};

// Filas de la agenda: cada "step" minutos entre apertura y cierre ("09:00", "09:30", ...)
export const buildTimeRows = (openingTime = "09:00", closingTime = "20:00", step = 30) => {
  const rows = [];
  for (let m = toMinutes(openingTime); m < toMinutes(closingTime); m += step) {
    rows.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return rows;
};

// Turnos que empiezan en la celda [row, row + step) de ese día
export const getAppointmentsForSlot = (appointments, isoDate, row, step = 30) => {
  const start = toMinutes(row);
  return appointments.filter((apt) => {
    if (apt.date !== isoDate) return false;
    const minutes = toMinutes(apt.time);
    return minutes >= start && minutes < start + step;
  });
};

export const getStatusCount = (appointments = []) =>
  appointments.reduce(
    (acc, apt) => {
      const key = apt.status?.toLowerCase();
      if (key in acc) acc[key]++;
      return acc;
    },
    { pending: 0, confirmed: 0, cancelled: 0, completed: 0, no_show: 0 }
  );
