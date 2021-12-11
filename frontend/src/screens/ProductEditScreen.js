import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  Axios  from "../../node_modules/axios/index";
import { detailsProduct, updateProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

export default function ProductEditScreen(props) {
/*1st of all we need productId from the URL*/
const productId = props.match.params.id;
/*Defining Hooks for product fields*/
const [name, setName] = useState(' ');
const [price, setPrice] = useState(' ');
const [image, setImage] = useState(' ');
const [category, setCategory] = useState(' ');
const [countInStock, setCountInStock] = useState(' ');
const [brand, setBrand] = useState(' ');
const [description, setDescription] = useState(' ');
/*We need "productDetails()" fx from store.js and here to use its effect from the REDUCER*/
const productDetails = useSelector(state => state.productDetails);
/*Using following fx from the REDUCER for "productDetails()" >> store.js*/
const { product, loading, error } = productDetails;


/*Importing from REDUX i.e., from APP.js, after successful updation of data into the database*/
const productUpdate = useSelector(state => state.productUpdate);
const { loading: loadingUpdate, error: errorUpdate, success: successUpdated} = productUpdate;


/*Now as we need to dispatch the details product, we have to use
useEffect from the react redux*/
const dispatch = useDispatch();
useEffect(() => {
    /*After updation, user needs to be redirected to the product list*/
    if(!product || product._id !== productId || successUpdated ) /*This means that we didn't load product from the back end. It ibstructs to load product*/
                /* (product._id !== productId) >> means product exists but if the new id is not same as database product's Id.
                This is done because before that when ever we click on the create new product
                button, it automatically redirects us to the product edit screen instead of 
                product create screen.*/
    {
        dispatch({ type: PRODUCT_UPDATE_RESET});
        dispatch(detailsProduct(productId)); /*detailsProduct() fx residing in productAction.js file*/
        
    } else { /*If exists, then fill the fields accroding to the data in the backend to the UI*/
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setBrand(product.brand);
        setDescription(product.description);
    }
    
    
}, [dispatch, productId, product, successUpdated]);

/*Defining fx {submitHandler}*/
    const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
        updateProduct({  /*This is a fx, we need to implement it in Actions folder >> ProductActions.js*/
            _id: productId,
            name,
            price,
            image,
            category,
            brand,
            countInStock,
            description,
        })
    );
};

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState();
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const uploadFileHandler = async(e) => { /*sedning ajax req to backend for uploading*/
       const file = e.target.files[0]; /*[0] means upload only first selected file*/
       const bodyFormData = new FormData(); /*FormData class is req to upload files by ajax req*/
       bodyFormData.append('image', file);
       setLoadingUpload(true);
       try{
        const { data} = await Axios.post('/api/uploads', bodyFormData, {
            headers: {'Content-Type':'multipart/form-data', 
            Authorization: `Bearer ${userInfo.token}`},
         });
         setImage(data);
         setLoadingUpload(false);
       } catch (error) {
           setErrorUpload(error.message);
           setLoadingUpload(false);
       }
    }

    return (
        <div>
            <form className = "form" onSubmit = {submitHandler}>
                <div>
                    <h1>PRODUCT EDIT SECTION</h1>
                </div>
                { successUpdated && props.history.push('/productlist')}
                {loadingUpdate && <LoadingBox></LoadingBox>}
                 {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}

                {loading ? <LoadingBox></LoadingBox> 
                : error ? <MessageBox variant = "danger">{error}</MessageBox>
                : 
                <>
                <div /*Editing for name field*/>
                    <label htmlFor="name">Name</label>
                    <input id="name" 
                    type = "text" 
                    placeholder = "Enter product name" 
                    value = {name} 
                    onChange = {(e) => setName(e.target.value)}>
                    </input>
                </div>

                <div /*Editing for name price*/>
                    <label htmlFor="price">Price</label>
                    <input id="price" 
                    type = "price" 
                    placeholder = "Enter price" 
                    value = {price} 
                    onChange = {(e) => setPrice(e.target.value)}>
                    </input>
                </div>

                <div /*Editing for Image*/>
                    <label htmlFor="image">Name</label>
                    <input id="image" 
                    type = "text" 
                    placeholder = "New Image" 
                    value = {image} 
                    onChange = {(e) => setImage(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="imageFile">Image File</label>
                    <input type="file" id="imageFile" label="Choose Image"
                    onChange={uploadFileHandler}></input>
                    {loadingUpload && <LoadingBox></LoadingBox>}
                    {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                </div>

                <div /*Editing for category field*/>
                    <label htmlFor="category">Category</label>
                    <input id="category" 
                    type = "text" 
                    placeholder = "Enter product category" 
                    value = {category} 
                    onChange = {(e) => setCategory(e.target.value)}>
                    </input>
                </div>

                <div /*Editing for brand field*/>
                    <label htmlFor="brand">Brand</label>
                    <input id="brand" 
                    type = "text" 
                    placeholder = "Enter product brand" 
                    value = {brand} 
                    onChange = {(e) => setBrand(e.target.value)}>
                    </input>
                </div>

                <div /*Editing for countInStock field*/>
                    <label htmlFor="countInStock">No of stocks</label>
                    <input id="countInStock" 
                    type = "text" 
                    placeholder = "Enter product stock number" 
                    value = {countInStock} 
                    onChange = {(e) => setCountInStock(e.target.value)}>
                    </input>
                </div>

                <div /*Editing for description field*/>
                    <label htmlFor="description">Name</label>
                    <textarea id="description" 
                    type = "text" 
                    rows = "3"
                    placeholder = "Enter product description" 
                    value = {description} 
                    onChange = {(e) => setDescription(e.target.value)}>
                    </textarea>
                </div>

                <div>
                    <label/>
                    <button className="primary" type = "submit">Update Details</button>
                </div>

                </>
                }

            </form>
        </div>
    )
}