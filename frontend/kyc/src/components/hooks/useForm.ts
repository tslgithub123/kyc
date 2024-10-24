import { useState, useCallback } from 'react';

export function useForm(initialState: unknown) {
  const [values, setValues] = useState(initialState);

  const handleChange = useCallback((e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setValues((prevValues: any) => ({ ...prevValues, [name]: value }));
  }, []);

  const reset = useCallback(() => setValues(initialState), [initialState]);

  return { values, handleChange, reset };
}