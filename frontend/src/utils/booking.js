export const getStepTitle = (step) => {
  switch (step) {
    case 1:
      return "1. Selecciona un Servicio";
    case 2:
      return "2. Elige tu Profesional";
    case 3:
      return "3. Configura tu Horario";
    default:
      return "";
  }
};