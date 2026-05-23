export default function AppointmentToolbar({ searchTerm, setSearchTerm, onNewAppointment }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      {/* ... resto del código igual ... */}
      
      <button 
        onClick={onNewAppointment} // <-- AGREGAR EL CLICK
        className="whitespace-nowrap bg-[#800020] hover:bg-[#5e0017] text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2"
      >
        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Nuevo Turno
      </button>
    </div>
  );
}