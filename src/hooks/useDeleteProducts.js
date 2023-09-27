import { useState } from 'react';

const useDeleteProducts = () =>{
    const [productKey, setProductKey] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [allChecked, setAllChecked] = useState("");

    const handleChange = (e) => {
        if (e.target.checked) {
           setAllChecked([...allChecked, e.target.value]);
        } else {
           setAllChecked(allChecked.filter((item) => item !== e.target.value));
        }  
    }

    const deleteProducts = () =>{
        setIsDeleting(true);
        !allChecked? (setIsDeleting(false)) :(
            allChecked.forEach((selected) => {
               let data= {
                   type: "individual",
                   id:selected
               };
               fetch('https://forex.fastpropfunding.com/php/index.php',{
                   method: 'post',
                   mode: "cors",
                   body: JSON.stringify(data)
               })
               .then(response => response.json())
               .then(json => {
                   for(let n of json){
                   // Increment productKey to trigger <Product /> re-render
                   console.log(n)
                   setProductKey(productKey + 1);
                   setIsDeleting(false);
                   setAllChecked("");
                   }
               })
            })
        )
    }
    return {
        handleChange,
        deleteProducts,
        isDeleting,
        productKey,
    }
}
export default useDeleteProducts