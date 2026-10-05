import React, { useState } from "react";
import { X } from "lucide-react";
import useApi from "@/hooks/useApi";
import { api } from "@/lib/api";
import { formatTime } from "@/utils/date";
import { FormError } from "@/components/ui/Field";

const DAYS = [[1, "Lunes"], [2, "Martes"], [3, "Miércoles"], [4, "Jueves"], [5, "Viernes"], [6, "Sábado"], [7, "Domingo"]];

// Horario semanal de un profesional. Sin franjas = atiende todo el horario del local
export default function WeeklyScheduleEditor({ business, employeeId }) {
  const path = `/api/schedules/business/${business.id}/employee/${employeeId}`;
  const { data, loading, error, reload } = useApi(path);
  const [draft, setDraft] = useState(null); // null = sin cambios sin guardar
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [saveError, setSaveError] = useState(null);

  const ranges = draft ?? (data ?? []).map((r) => ({ day: r.dayOfWeek, start: formatTime(r.startTime), end: formatTime(r.endTime) }));
  const open = formatTime(business.openingTime);
  const close = formatTime(business.closingTime);

  const update = (next) => {
    setDraft(next);
    setMessage(null);
  };
  const addRange = (day) => {
    const sameDay = ranges.filter((r) => r.day === day);
    update([...ranges, sameDay.length ? { day, start: sameDay.at(-1).end, end: close } : { day, start: open, end: close }]);
  };

  const save = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      await api(path, {
        method: "PUT",
        body: ranges.map((r) => ({ dayOfWeek: r.day, startTime: r.start, endTime: r.end })),
      });
      setDraft(null);
      reload();
      setMessage("Horario guardado.");
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading && !data) return <p className="text-sm text-slate-400 animate-pulse">Cargando horario...</p>;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div>
        <h2 className="font-medium text-slate-900">Horario semanal</h2>
        <p className="text-xs text-slate-500 mt-1">
          {ranges.length === 0
            ? `Sin horario propio: se toma el horario del local (${open} a ${close}) todos los días que abre.`
            : "Solo se ofrecen turnos dentro de estas franjas. Los días sin franjas no atiende."}
        </p>
      </div>

      <ul className="divide-y divide-slate-100">
        {DAYS.map(([day, label]) => {
          const closed = business.closedWeekdays?.includes(day);
          const dayRanges = ranges.map((r, i) => ({ ...r, i })).filter((r) => r.day === day);
          return (
            <li key={day} className="py-3 flex flex-wrap items-center gap-3">
              <span className="w-24 text-sm font-medium text-slate-700">{label}</span>
              {closed ? (
                <span className="text-xs text-slate-400">Local cerrado</span>
              ) : (
                <>
                  {dayRanges.map((r) => (
                    <span key={r.i} className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
                      <input type="time" aria-label={`${label} desde`} value={r.start} className="bg-transparent text-sm outline-none"
                        onChange={(e) => update(ranges.map((x, j) => (j === r.i ? { ...x, start: e.target.value } : x)))} />
                      <span className="text-slate-400">–</span>
                      <input type="time" aria-label={`${label} hasta`} value={r.end} className="bg-transparent text-sm outline-none"
                        onChange={(e) => update(ranges.map((x, j) => (j === r.i ? { ...x, end: e.target.value } : x)))} />
                      <button type="button" aria-label="Quitar franja" onClick={() => update(ranges.filter((_, j) => j !== r.i))}
                        className="text-slate-400 hover:text-rose-700 ml-1">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  <button type="button" onClick={() => addRange(day)} className="text-xs font-medium text-[#800020] hover:underline">
                    + Franja
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>

      <FormError>{saveError || error}</FormError>
      {message && <p className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-lg p-3" role="status">{message}</p>}

      <div className="flex flex-wrap justify-end gap-3">
        {ranges.length > 0 && (
          <button type="button" onClick={() => update([])} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-800">
            Usar horario del local
          </button>
        )}
        <button type="button" disabled={saving || draft === null} onClick={save}
          className="px-5 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800 disabled:opacity-40">
          {saving ? "Guardando..." : "Guardar horario"}
        </button>
      </div>
    </div>
  );
}
