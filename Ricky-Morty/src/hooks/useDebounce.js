import { useEffect, useState } from "react";

const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout); // Cleanup on re-render
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
