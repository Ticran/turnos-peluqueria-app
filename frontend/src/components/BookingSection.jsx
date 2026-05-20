import { useState } from "react";

function BookingSection() {
  const horarios = ["10:00", "11:00", "12:00", "14:00", "15:00"];

  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");

  return (
    <section className="px-6 py-20 text-center">
      
      <h2 className="mb-12 text-4xl font-bold text-zinc-900">
        Reservá tu turno
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {horarios.map((hora, index) => {
          const isSelected = horarioSeleccionado === hora;

          return (
            <button
              key={index}
              onClick={() => setHorarioSeleccionado(hora)}
              className={`rounded-2xl px-8 py-4 font-medium text-white transition duration-200 ${
                isSelected
                  ? "bg-green-500 scale-105"
                  : "bg-zinc-900 hover:scale-105 hover:bg-zinc-700"
              }`}
            >
              {hora}
            </button>
          );
        })}
      </div>

      {horarioSeleccionado && (
        <p className="mt-8 text-xl font-bold text-zinc-900">
          Turno seleccionado:{" "}
          <span className="text-green-600">
            {horarioSeleccionado}
          </span>
        </p>
      )}
    </section>
  );
}

export default BookingSection;