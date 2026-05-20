import "./ServicesSection.css";

function ServicesSection() {

  const services = [
    {
      name: "Corte",
      price: "$5000"
    },
    {
      name: "Barba",
      price: "$3000"
    },
    {
      name: "Coloración",
      price: "$12000"
    }
  ];

  return (
    <section className="services">

      <h2>Nuestros Servicios</h2>

      <div className="services-container">

        {services.map((service, index) => (
          <div className="service-card" key={index}>

            <h3>{service.name}</h3>

            <p>{service.price}</p>

            <button>Reservar</button>

          </div>
        ))}

      </div>

    </section>
  );
}

export default ServicesSection;