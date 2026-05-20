function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
      
      <form className="flex w-[350px] flex-col gap-4 rounded-2xl bg-white p-8 shadow-lg">
        
        <h1 className="mb-2 text-center text-2xl font-bold text-zinc-900">
          Iniciar sesión
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="rounded-xl border border-zinc-300 p-4 text-base outline-none focus:border-zinc-900"
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="rounded-xl border border-zinc-300 p-4 text-base outline-none focus:border-zinc-900"
        />

        <button
          type="submit"
          className="rounded-xl bg-black p-4 text-base font-semibold text-white transition hover:bg-zinc-800"
        >
          Ingresar
        </button>

      </form>

    </div>
  );
}

export default Login;