import { useCallback, useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useTimeout(callback: any, delay: number) {
  const callbackRef = useRef(callback);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeoutRef: any = useRef();
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  const set = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => callbackRef.current(), delay);
  }, [delay]);
  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);
  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);
  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);
  return { reset, clear };
}
