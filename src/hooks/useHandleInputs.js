import { useState } from 'react';

export default function useHandleInputs() {
  const [values, setValues] = useState({});
  const [isChecking, setIsChecking] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checkResponse, setCheckResponse] = useState('');

  const regex = /^[a-zA-Z0-9. ]+$/;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const inputValues = { ...values, [name]: value };
    
    let furniture = "";
    if(inputValues.height && inputValues.width && inputValues.length){
      furniture = [inputValues.height, inputValues.width, inputValues.length].join('x');
    }
    // run through each and return the first one that is !empty
    const measurement = inputValues.size || inputValues.weight || furniture;
    inputValues['measurement'] = measurement + inputValues.unit;
    setValues(inputValues);
  }
  
  const resetForm = () => {
    setValues({
      name: '',
      sku: '',
      price: '',
      type: '',
      measurement: '',
    });
  };

  const check = (inputSku) =>{
    if(inputSku) {
      setIsChecking(true);
      setCheckResponse('');
      fetch('https://scandidds.000webhostapp.com/php/check.php', {
          method: 'post',
          mode: 'cors',
          body: JSON.stringify({sku: inputSku.toUpperCase()}),
      })
      .then(response => response.json())
      .then(data => {
        for(let item of data){
          setIsChecking(false);
          setChecked(false);
          if(item==='exist'){
            setCheckResponse(`${inputSku} already exist`);
            resetForm();
          }
          else{
            setCheckResponse('');
            setChecked(true);
          }
        }
      })
      .catch(error => {
        console.log(error);
        setIsChecking(false)
      })
    }
  }

  return { regex, values, handleInputChange, check, isChecking, checkResponse, checked};
}
