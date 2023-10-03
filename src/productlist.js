import {Link} from "react-router-dom";
import Product from './components/Product';
import useDeleteProducts from "./hooks/useDeleteProducts";


function ProductList() {
  const {handleCheck, deleteProducts, isDeleting, productKey} = useDeleteProducts();
 
  return (
    <div className='container pt-3 pt-md-4'>
    <div className="float-start">
    <h1 id="heading">Product List</h1>
    </div>
    <div className='float-end'>
    <Link className="link btn btn-secondary me-3" to="/add-product">ADD</Link>
    <button type="button" id='delete-product-btn' className="btn btn-danger" disabled={isDeleting} onClick={() => deleteProducts('https://scandidds.000webhostapp.com/php/deleteproducts.php')}>
    {isDeleting? (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> </> ) : (<></>)} 
    MASS DELETE
    </button>
    </div> 
    <div className='clearfix'></div>
    <hr className="border border-danger"/>

    <main className="min-vh-100">
    <div className="row g-2 g-md-3">
    <Product key={productKey} oncheck={handleCheck} />
    </div>
    </main>

    <div className="clearfix"></div>
    <hr className="border border-danger mt-5"/>
    <h5 className="text-center">Scandiweb Test Assignment</h5>
	  </div>
  );
}

export default ProductList;
