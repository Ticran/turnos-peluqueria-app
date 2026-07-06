export const initialSettings = {
  businessName: "Lumen Studio",
  description: "Barbería de autor y cuidado masculino.",
  email: "contacto@lumenstudio.com",
  phone: "+54 9 358 0000000",
  openingTime: "09:00",
  closingTime: "20:00",
  currency: "ARS",
  timeZone: "GMT-3",
  isActive: true,
  // Listado de sucursales integradas en la configuración general del Tenant
  branches: [
    { id: 1, name: "Sede Central Centro", address: "Alvear 450", phone: "+54 9 358 4111111" },
    { id: 2, name: "Sucursal Barrio Norte", address: "Fotheringham 1200", phone: "+54 9 358 4222222" }
  ]
};