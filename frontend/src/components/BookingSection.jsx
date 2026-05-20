import { useState } from "react";
import "./BookingSection.css";
import "./Selected.css";

function BookingSection() {

  const horarios = [
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00"
  ];

  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");

  return (
    <section className="booking">

      <h2>Reservá tu turno</h2>

      <div className="booking-container">

        {horarios.map((hora, index) => (

          <button
            key={index}

            className={
              horarioSeleccionado === hora
                ? "time-button selected"
                : "time-button"
            }

            onClick={() => setHorarioSeleccionado(hora)}
          >
            {hora}

          </button>

        ))}

      </div>

      {horarioSeleccionado && (
        <p className="selected-text">
          Turno seleccionado: {horarioSeleccionado}
        </p>
      )}

    </section>
  );
}

export default BookingSection;