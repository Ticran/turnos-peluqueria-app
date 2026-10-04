import { useMemo } from "react";
import useApi from "./useApi";

// Turnos del negocio entre dos fechas ("YYYY-MM-DD"). El backend filtra solo los propios si es EMPLOYEE
export default function useAppointments(businessId, from, to) {
  const { data, loading, error, reload } = useApi(
    businessId && from && to ? `/api/appointments/business/${businessId}?from=${from}&to=${to}` : null
  );

  // "10:00:00" -> "10:00" para comparar fácil con las filas de la agenda
  const appointments = useMemo(() => (data ?? []).map((apt) => ({ ...apt, time: apt.time.slice(0, 5) })), [data]);

  return { appointments, loading, error, reload };
}
