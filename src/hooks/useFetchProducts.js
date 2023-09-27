import { useEffect, useState } from "react";

const useFetchProducts = (url) =>{
    const [products,setProducts] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          setLoading(false);
        })
        .catch(error => console.log(error))
    }, [url]);
  return{
    products,
    loading
  }
}
export default useFetchProducts