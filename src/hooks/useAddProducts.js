// useHandleSubmit.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAddProducts = () => {
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const addProducts = (data,e) => {
    e.preventDefault();
    setIsSaving(true);

    fetch('https://scandidds.000webhostapp.com/php/addproducts.php', {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then(() => {
        setIsSaving(false);
        navigate('/');
    })
     .catch((error) => console.log(error));
  }

  return { isSaving, addProducts };
}

export default useAddProducts;
