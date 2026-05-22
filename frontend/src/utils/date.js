export const formatBookingDate = (dateString, timeSlot) => {
  if (!dateString || !timeSlot) return "—";
  const parts = dateString.split("-");
  const day = parts[2];
  return `${day} de Mayo, ${timeSlot} hs`;
};