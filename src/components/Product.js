import useFetchProducts from "../hooks/useFetchProducts";
import SkeletonCard from "./SkeletonCards";

const Product = (props) =>{
  const {products} = useFetchProducts('https://scandidds.000webhostapp.com/php/loadproducts.php');
    return(
       <>
       {(products &&
        products.map((item) => {
          const {id, sku, name, price, type, measurement} = item;
          return (
            <section className="col-6 col-md-4 animate__animated animate__fadeIn" key={id}>
            <div className="tab">
            <div className="title">
            <input className="form-check-input delete-checkbox" type="checkbox" name="option1" value={id} onChange = {props.oncheck}/>
            </div>
            <div className="product-items">
            <p id={id}>{sku}</p>
            <p>{name}</p>
            <p className="text-primary fw-bold"><span>$</span>{Number(price).toFixed(2)}</p>
            <p>{type}: <span>{measurement}</span></p>
            </div>
            </div>
            </section>
          )
        })) || <SkeletonCard /> }

        </>
    )
}
export default Product