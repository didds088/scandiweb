import { Link } from 'react-router-dom';
import { useState} from 'react';
import useAddProducts from './hooks/useAddProducts';
import useHandleInputs from './hooks/useHandleInputs';


const AddProduct = () => {
  const [selected, setSelected] = useState('Select Type');
  const [dvdIsHidden, setDvdIsHidden] = useState(true);
  const [furnitureIsHidden, setFurnitureIsHidden] = useState(true);
  const [bookIsHidden, setBookIsHidden] = useState(true);
  const [formText, setFormText] = useState('');
  
  const { regex, values, handleInputChange, check, isChecking, checkResponse, checked} = useHandleInputs();
  const { isSaving, addProducts} = useAddProducts(); 

    // CREATE OBJECT FOR SWITCHER
    const obj = {
        selectType(){
            return <></>
        },
        dvd() {
            setBookIsHidden(true);
            setFurnitureIsHidden(true);
            setDvdIsHidden(false);
            delete values.height;
            delete values.width;
            delete values.length;
            delete values.weight;
            values["type"]="Size";
            values["unit"]="MB";
        },
        furniture() {
            setBookIsHidden(true);
            setDvdIsHidden(true);
            setFurnitureIsHidden(false);
            delete values.size;
            delete values.weight;
            values["type"]="Dimension";
            values["unit"]="";
        },
        book() {
            setFurnitureIsHidden(true);
            setDvdIsHidden(true);
            setBookIsHidden(false);
            delete values.size;
            delete values.height;
            delete values.width;
            delete values.length;
            values["type"] = "Weight";
            values["unit"]="KG";
        }
    };
    
    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        obj[selectedValue]();
        setSelected(selectedValue);
    };
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = {
            name: values.name,
            sku: values.sku,
            price: values.price,
            type: values.type,
            measurement: values.measurement
        }
        // Check if At least one property in data is empty or undefined
        const isEmpty = Object.values(data).some(value => !value || regex.test(value)===false);
        (!isEmpty) ? addProducts(data) : setFormText('Please, submit required data');
    }
  return (
    <form id="product_form" onSubmit={handleSubmit}>
    <div className='container p-3 p-md-4'>
    <div className="float-start">
    <h1 id="heading">Product Add</h1>
    </div>
    <div className='float-end'>
    <button type="submit" className="btn btn-primary me-3" disabled={isSaving}>
    {isSaving? (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> </> ) : (<></>)} 
    Save</button>
	<Link className="link btn btn-danger" to="/">Cancel</Link> 
    </div> 
    <div className='clearfix'></div>
    <hr className="border border-danger"/>
    <main className="min-vh-100 animate__animated animate__fadeIn">
    
    <div className="row gy-4">

    <div className="col-12">
    <label htmlFor="sku" className="form-label">SKU</label>
    <div className="input-group border border-1 rounded">
    <input type="text" style={{textTransform:"uppercase"}} className="form-control border border-0" id="sku" name="sku" value={values.sku || ""} onChange= {handleInputChange} onBlur={() => check(values.sku)} required/>
    {checked ? <span className="input-group-text border border-0 bg-transparent animate__animated animate__fadeInLeft animate__faster"><svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 512 512"><path fill='#388E3C' d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg></span> : <></>}  
    </div>
    {isChecking? (<div className='form-text'><span className="spinner-border spinner-border-sm text-info" role="status" aria-hidden="true"></span> Checking Availability</div> ) : (<></>)} 
    <div id="help" className="form-text text-danger"><span>{checkResponse}</span></div>
    </div>
    
    <div className="col-12">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" value={values.name || ""} onChange= {handleInputChange}  required/>
    </div>

    <div className="col-12">
    <label htmlFor="price" className="form-label">Price ($) </label>
    <input type="number" className="form-control" id="price" name="price" value={values.price || ""} onChange= {handleInputChange} required/>
    </div>

    <div className="col-12">
    <label htmlFor="productType" className="form-label">Type Switcher</label>
    <select id="productType" className="form-select" aria-label="Default select example" value={selected} onChange={handleSelectChange} required>
    <option value="selectType">Select type</option>
    <option id="DVD" value="dvd">DVD</option>
    <option id="Furniture" value="furniture">Furniture</option>
    <option id="Book" value="book">Book</option>
    </select>

    </div>

    <div className="col-12">
    <div id="dvd-grp" className={dvdIsHidden ? 'hidden' : ''}>
    <div className='animate__animated animate__fadeInLeft animate__faster'>
    <div id="sizehelp" className="form-text mb-2">Please, provide size</div>
    <label htmlFor="size" className="form-label">Size (MB) </label>
    <input type="number" step="any" className="form-control" id="size" name="size" value={values.size || ""} onChange= {handleInputChange} />
    </div>
    </div>

    <div id="furniture-grp" className={furnitureIsHidden ? 'hidden' : ''}>
    <div className='animate__animated animate__fadeInLeft animate__faster'>
    <div className="form-text mb-2">Please, provide dimensions</div>
    <div className="mb-3">
    <label htmlFor="height" className="form-label">Height (CM)</label>
    <input type="number" step="any" className="form-control" id="height" name="height" value={values.height || ""} onChange= {handleInputChange}/>
    </div>
    <div className="mb-3">
    <label htmlFor="width" className="form-label">Width (CM) </label>
    <input type="number" step="any" className="form-control" id="width" name="width" value={values.width || ""} onChange= {handleInputChange}/>
    </div>
    <div className="mb-3">
    <label htmlFor="length" className="form-label">Length (CM) </label>
    <input type="number" step="any" className="form-control" id="length" name="length" value={values.length || ""} onChange= {handleInputChange}/>
    </div>
    </div>
    </div>

    <div id="book-grp" className={bookIsHidden ? 'hidden' : ''}>
    <div className='animate__animated animate__fadeInLeft animate__faster'>
    <div className="form-text mb-2">Please, provide weight</div>
    <label htmlFor="weight" className="form-label">Weight (KG) </label>
    <input type="number" step="any" className="form-control" id="weight" name="weight" value={values.weight || ""} onChange= {handleInputChange} />
    </div>
    </div>

    </div>

    <div className="form-text mb-2 text-danger fs-5">{formText}</div>
    </div>
    
    </main>

    <div className="clearfix"></div>
    <hr className="border border-danger mt-5"/>
    <h5 className="text-center">Scandiweb Test Assignment</h5>
    </div>
    </form>
  );
};

export default AddProduct;
