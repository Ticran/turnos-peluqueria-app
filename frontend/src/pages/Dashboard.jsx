function Dashboard() {
  const turnos = [
    { cliente: "Juan", hora: "10:00" },
    { cliente: "María", hora: "12:00" },
    { cliente: "Lucas", hora: "15:00" },
  ];

  return (
    <div className="min-h-screen bg-zinc-100 px-6 py-12">
      
      <h1 className="mb-10 text-4xl font-bold text-zinc-900">
        Dashboard
      </h1>

      <div className="flex flex-wrap gap-6">
        {turnos.map((turno, index) => (
          <div
            key={index}
            className="w-[250px] rounded-2xl bg-white p-6 shadow-md"
          >
            <h3 className="mb-2 text-xl font-semibold text-zinc-900">
              {turno.cliente}
            </h3>

            <p className="text-zinc-600">
              Horario: <span className="font-medium text-zinc-900">{turno.hora}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;