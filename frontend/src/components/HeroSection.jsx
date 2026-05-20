function HeroSection() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      
      <h1 className="mb-4 max-w-3xl text-4xl font-bold text-zinc-900 md:text-6xl">
        Reservá tu turno fácilmente
      </h1>

      <p className="mb-8 text-lg text-zinc-600 md:text-xl">
        Elegí horario, servicio y peluquero online.
      </p>

      <button className="rounded-2xl bg-black px-8 py-4 text-base font-bold text-white transition duration-200 hover:scale-105 hover:bg-zinc-800">
        Reservar ahora
      </button>

    </section>
  );
}

export default HeroSection;