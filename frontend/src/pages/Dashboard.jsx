import "./Dashboard.css";

function Dashboard() {

  const turnos = [
    {
      cliente: "Juan",
      hora: "10:00"
    },
    {
      cliente: "María",
      hora: "12:00"
    },
    {
      cliente: "Lucas",
      hora: "15:00"
    }
  ];

  return (

    <div className="dashboard">

      <h1>Dashboard</h1>

      <div className="turnos-container">

        {turnos.map((turno, index) => (

          <div className="turno-card" key={index}>

            <h3>{turno.cliente}</h3>

            <p>Horario: {turno.hora}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Dashboard;