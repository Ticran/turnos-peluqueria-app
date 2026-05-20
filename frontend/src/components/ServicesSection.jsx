function ServicesSection() {
  const services = [
    {
      name: "Corte",
      price: "$5000",
    },
    {
      name: "Barba",
      price: "$3000",
    },
    {
      name: "Coloración",
      price: "$12000",
    },
  ];

  return (
    <section className="px-6 py-20 text-center">
      
      <h2 className="mb-12 text-4xl font-bold text-zinc-900">
        Nuestros Servicios
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        
        {services.map((service, index) => (
          <div
            key={index}
            className="w-[250px] rounded-2xl bg-white p-8 shadow-md transition duration-200 hover:-translate-y-2"
          >
            <h3 className="mb-4 text-xl font-semibold text-zinc-900">
              {service.name}
            </h3>

            <p className="mb-6 text-zinc-500">{service.price}</p>

            <button className="rounded-xl bg-black px-5 py-2 text-white transition hover:bg-zinc-800">
              Reservar
            </button>
          </div>
        ))}

      </div>
    </section>
  );
}

export default ServicesSection;