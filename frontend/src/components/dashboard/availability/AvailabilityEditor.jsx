import React from "react";
import WeeklyScheduleEditor from "./WeeklyScheduleEditor";
import BlocksEditor from "./BlocksEditor";

// Disponibilidad completa de un profesional: horario semanal + bloqueos (vacaciones, descansos)
export default function AvailabilityEditor({ business, employee }) {
  return (
    <div className="space-y-6">
      <WeeklyScheduleEditor business={business} employeeId={employee.id} />
      <BlocksEditor
        business={business}
        employeeId={employee.id}
        title="Días y horas no disponibles"
        description="Vacaciones, trámites o descansos. En esos horarios no se ofrecen turnos."
      />
    </div>
  );
}
