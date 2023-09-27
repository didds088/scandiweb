// useHandleInputChange.js
import { useState } from 'react';

function useInputChange() {
  const [values, setValues] = useState({});

  function handleInputChange(e) {
    const { name, value } = e.target;
    const inputValues = { ...values, [name]: value };

    const measurement = inputValues.size || inputValues.weight || [inputValues.height, inputValues.width, inputValues.length].join('x');
    inputValues['measurement'] = measurement + inputValues.unit;
    
    setValues(inputValues);
  }

  return { values, handleInputChange };
}

export default useInputChange;
