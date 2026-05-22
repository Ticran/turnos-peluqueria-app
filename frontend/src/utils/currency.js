export const formatPrice = (value) => {
  if (!value) return "$0";
  return `$${value.toLocaleString("es-AR")}`;
};