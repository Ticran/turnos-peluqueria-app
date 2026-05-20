import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="sticky top-0 flex items-center justify-between border-b border-zinc-200 bg-white px-8 py-4 shadow-sm">

      {/* LOGO */}
      <h1 className="cursor-pointer text-2xl font-bold tracking-wide text-zinc-900">
        TurnosApp
      </h1>

      {/* LINKS */}
      <div className="flex flex-1 justify-center items-center gap-10">
        <Link to="/" className="text-zinc-700 no-underline hover:text-black">
          Inicio
        </Link>

        <Link to="/servicios" className="text-zinc-700 no-underline hover:text-black">
          Servicios
        </Link>

        <Link to="/reservar" className="text-zinc-700 no-underline hover:text-black">
          Reservar
        </Link>
      </div>

      {/* BOTONES */}
      <div className="flex gap-4">
        <Link to="/login">
          <button className="rounded-xl bg-zinc-900 px-5 py-3 font-semibold text-white transition duration-200 hover:scale-105 hover:bg-zinc-700">
            Login
          </button>
        </Link>

        <Link to="/dashboard">
          <button className="rounded-xl bg-zinc-900 px-5 py-3 font-semibold text-white transition duration-200 hover:scale-105 hover:bg-zinc-700">
            Dashboard
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;