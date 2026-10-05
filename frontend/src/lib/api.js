const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

/**
 * fetch con JSON, token JWT y errores legibles.
 * Lanza Error con el "message" que devuelve el backend (ej: "Ese horario ya está ocupado").
 */
export async function api(path, { method = "GET", body } = {}) {
  const token = localStorage.getItem("lumen_token");
  // FormData (archivos) se manda tal cual: el navegador arma el Content-Type multipart
  const isForm = body instanceof FormData;

  const res = await fetch(API_URL + path, {
    method,
    headers: {
      ...(body !== undefined && !isForm && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body === undefined || isForm ? body : JSON.stringify(body),
  });

  // Sesión vencida: limpiamos y mandamos al login (salvo en el propio login)
  if (res.status === 401 && token && !path.startsWith("/api/v1/auth")) {
    localStorage.removeItem("lumen_token");
    localStorage.removeItem("lumen_user");
    window.location.href = "/login";
  }

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    throw new Error(data?.message ?? `Error ${res.status} al conectar con el servidor`);
  }
  return data;
}

// Sube una imagen (campo "file") y devuelve la respuesta del backend
export function uploadImage(path, file) {
  const form = new FormData();
  form.append("file", file);
  return api(path, { method: "POST", body: form });
}
