import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, deleteProduct, listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from "../constants/productConstants";

export default function ProductListScreen(props) {
    const productList = useSelector((state) => state.productList); /*Importing from rext Redux*/
    /*We also created productList() object in the HomeScreen.js*/
    /*Using it*/
    const { loading, error, products} = productList;



    /*Importing productCreate from Store.js and thus importing reducers*/
    const productCreate = useSelector(state => state.productCreate);
    const { loading: loadingCreate, 
        error: errorCreate, 
        success: successCreate, 
        product: createdProduct} = productCreate;

    
        /*Importing from store.js for deletion*/
    const productDelete = useSelector(state => state.productDelete); 
    const { loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete;



    const dispatch = useDispatch();
    useEffect(() => {
       if(successCreate) {
           dispatch({type: PRODUCT_CREATE_RESET}); /*Because a blank page needs 
           to be shown after successful creation of product*/
           props.history.push(`/product/${createdProduct._id}/edit`);
       }
       if(successDelete) {
           dispatch({ type: PRODUCT_DELETE_RESET});
       }
        dispatch(listProducts()); /*Imported from Actions/productActions*/
    }, [ createdProduct, dispatch, props.history, successCreate, successDelete]);
 


    
    
    const deleteHandler = (product) => {
        if(window.confirm('Are you sure to delete the product?')) {
            dispatch(deleteProduct(product._id)); /*deleteProduct is a fx and need to be implemented in the productAction.js*/
        }
    };

    const createHandler = () => {
        
            dispatch(createProduct()); /*Thi is a new action, it is to be 
        implemented in the actions folder named as createProduct()*/  
    };

    return (
        <div>
            <div>
            <h1> Product List</h1>
            <button type="button" className="primary" onClick={createHandler}>
                Create New Product
            </button>
            </div>
            {loadingDelete && <LoadingBox></LoadingBox> }
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

            {loadingCreate && <LoadingBox></LoadingBox> }
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
            {
                loading ? (<LoadingBox></LoadingBox>)
                : error ? (<MessageBox variant = "danger">{error}</MessageBox>
                ) : (
                    
               
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (

                       
                            <tr key = {product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <button 
                                    type="button"
                                    className = "small"
                                    onClick = {() =>
                                    props.history.push(`/product/${product._id}/edit`)}>
                                        EDIT
                                    </button>
                                
                                    <button 
                                    type="button"
                                    className = "small"
                                    onClick = {() => deleteHandler(product)}
                                    >
                                        DELETE
                                    </button>

                                </td>
                            </tr>
                        )
                        )
                        }
                    </tbody>
                </table>
             )}
        </div>
    );
}