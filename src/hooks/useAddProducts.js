// useHandleSubmit.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAddProducts = () => {
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  // const [checkResponse2, setCheckResponse2] = useState('');
  

  // const submitProducts = (data) =>{
  //   setIsSaving(true);
  //   let sku = data.sku.toUpperCase();
  //   fetch('https://scandidds.000webhostapp.com/php/check.php', {
  //       method: 'post',
  //       mode: 'cors',
  //       body: JSON.stringify({sku: sku}),
  //   })
  //   .then(response => response.json())
  //   .then(dbJson => {
  //     for(let check of dbJson) {
  //       if(check !== 'exist'){
  //         addProducts(data)
  //       }
  //       else{
  //         setCheckResponse2(`${sku} already exist`);
  //         setIsSaving(false);
  //       }
  //     }
  //   })
  // }

  const addProducts = (data) => {
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

  return {
    isSaving, 
    addProducts,
  };
}

export default useAddProducts;
