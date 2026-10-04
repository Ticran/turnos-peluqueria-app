// Panel de inicio según el rol
export const homeFor = (role) => (role === "SUPER_ADMIN" ? "/plataforma" : "/dashboard");
