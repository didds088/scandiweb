import { useState } from 'react';

const useDeleteProducts = () =>{
    const [productKey, setProductKey] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [allChecked, setAllChecked] = useState("");

    const handleCheck = (e) => {
        if (e.target.checked) {
           setAllChecked([...allChecked, e.target.value]);
        } else {
            // IF UNCHECKED removes the value of the checkbox from the allChecked array
           setAllChecked(allChecked.filter((item) => item !== e.target.value));
        }  
    }

    const deleteProducts = (url) =>{
        setIsDeleting(true);
        !allChecked || allChecked.length === 0 ? (setIsDeleting(false)) : (
            allChecked.forEach((selected) => {
               let data= {
                   id:selected
               };
               fetch(url,{
                   method: 'post',
                   mode: "cors",
                   body: JSON.stringify(data)
               })
               .then(response => response.json())
               .then(json => {
                   for(let res of json){
                    if(res === 'deleted'){
                        // Increment productKey to trigger <Product /> re-render
                        setProductKey(productKey + 1);
                        setIsDeleting(false);
                        setAllChecked("");
                    }
                    else{
                        setIsDeleting(false);
                        setAllChecked("");
                    }
                   }
               })
               .catch(error => {
                    console.log(error);
                    setIsDeleting(false);
                    setAllChecked("");
                })
            })
        )
    }
    return {
        handleCheck,
        deleteProducts,
        isDeleting,
        productKey,
    }
}
export default useDeleteProducts