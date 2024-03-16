import { useEffect, useRef } from "react";

// Referência sobre o hook customizado:
// Dan Abramov blog: https://overreacted.io/making-setinterval-declarative-with-react-hooks/

export default function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>(callback);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
