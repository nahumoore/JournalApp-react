import { useState } from "react";

export const useForm = (inicialState = {}) => {
  const [values, setValues] = useState(inicialState);

  const reset = (newFormState = inicialState) => {
      setValues(newFormState)
  }
  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  return [values, handleInputChange, reset];
};