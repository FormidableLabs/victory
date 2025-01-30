import { useEffect, useState } from "react";

export const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error saving to localStorage", error);
      }
    }
  }, [storedValue, key]);

  return [storedValue, setStoredValue];
};
