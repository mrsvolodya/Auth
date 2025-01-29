import { useEffect, useState } from "react";

export function usePageError(initialError: string) {
  const [error, setError] = useState(initialError);
  useEffect(() => {
    if (!error) return;

    const timerId = setTimeout(() => setError(""), 3000);
    return () => clearTimeout(timerId);
  }, [error]);
  return [error, setError] as const;
}
