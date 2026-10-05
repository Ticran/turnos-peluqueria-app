export const formatPrice = (value) => `$${Number(value || 0).toLocaleString("es-AR")}`;
