import useFetchProducts from "../hooks/useFetchProducts";
import Loader from "./Loader";

const Product = (props) =>{
  const {products} = useFetchProducts('https://scandidds.000webhostapp.com/php/loadproducts.php');
    return(
       <>
       {(products &&
        products.map((item) => {
          return (
            <section className="col-6 col-md-4 animate__animated animate__fadeIn" key={item.id}>
            <div className="tab">
            <div className="title">
            <input className="form-check-input delete-checkbox" type="checkbox" name="option1" value={item.id} onChange = {props.oncheck}/>
            </div>
            <div className="product-items">
            <p id={item.id}>{item.sku}</p>
            <p>{item.name}</p>
            <p className="text-primary fw-bold">{Number(item.price).toFixed(2)}<span> $</span></p>
            <p>{item.type}: <span>{item.measurement}</span></p>
            </div>
            </div>
            </section>
          )
        })) || <Loader /> }  
        </>
    )
}
export default Product