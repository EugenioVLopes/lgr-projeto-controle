import { useEffect, useState } from "react";

export function useValorComDebounce<T>(valor: T, atraso = 300): T {
  const [debounced, setDebounced] = useState(valor);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(valor), atraso);
    return () => clearTimeout(t);
  }, [valor, atraso]);
  return debounced;
}
