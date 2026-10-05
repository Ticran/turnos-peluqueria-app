import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";

/**
 * GET a la API con estado de carga. path = null no pide nada (ej: falta elegir algo).
 * Si el path cambia antes de que llegue la respuesta anterior, esa respuesta se descarta.
 */
export default function useApi(path) {
  const [version, setVersion] = useState(0);
  const [state, setState] = useState({ key: null, data: null, error: null });
  const key = path ? `${path}#${version}` : null;

  useEffect(() => {
    if (!path) return;
    let cancelled = false;
    const requestKey = `${path}#${version}`;
    api(path)
      .then((data) => !cancelled && setState({ key: requestKey, data, error: null }))
      .catch((err) => !cancelled && setState((prev) => ({ key: requestKey, data: prev.data, error: err.message })));
    return () => {
      cancelled = true;
    };
  }, [path, version]);

  const reload = useCallback(() => setVersion((v) => v + 1), []);

  return {
    data: path ? state.data : null,
    loading: key !== null && state.key !== key,
    error: path ? state.error : null,
    reload,
  };
}
