import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createProduct, deleteProduct, listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from "../constants/productConstants";

export default function ProductListScreen(props) {

    const { pageNumber = 1} = useParams();
    /*For specifying for SELLER*/
    const sellerMode = props.match.path.indexOf('/seller') >=0; 
    const productList = useSelector((state) => state.productList); /*Importing from rext Redux*/
    /*We also created productList() object in the HomeScreen.js*/
    /*Using it*/
    const { loading, error, products, page, pages} = productList;



    /*Importing productCreate from Store.js and thus importing reducers*/
    const productCreate = useSelector(state => state.productCreate);
    const { loading: loadingCreate, 
        error: errorCreate, 
        success: successCreate, 
        product: createdProduct} = productCreate;

    
        /*Importing from store.js for deletion*/
    const productDelete = useSelector(state => state.productDelete); 
    const { loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete;

    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;


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
        dispatch(listProducts({seller: sellerMode ? userInfo._id : '', pageNumber /*If SellerMode is true, then show filtered products of that seller*/
        })
        ); /*Imported from Actions/productActions*/
    }, [ createdProduct, 
        dispatch, 
        props.history, 
        successCreate, 
        successDelete, 
        sellerMode, 
        userInfo._id,
        pageNumber
        ]);
 


    
    
    const deleteHandler = (product) => {
        if(window.confirm('Are you sure to delete the product?')) {
            dispatch(deleteProduct(product._id)); /*deleteProduct is a fx and need to be implemented in the productAction.js*/
        }
    };

    const createHandler = () => {
        
            dispatch(createProduct()); /*This is a new action, it is to be 
        implemented in the actions folder named as createProduct()*/  
    };

    return (
        <div>
            <div>
            <h1> List of All products</h1>
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
                    
               <>
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

                <div className="row1 center pagination" /*For showing page numbers in the below*/>
                {
                    [...Array(pages).keys()].map((x) => (

    
                        <Link key={x + 1 /*For showing page number*/} 
                        to = {`/productlist/pageNumber/${x + 1}`}>
                        P{x + 1}</Link>
                    ))
                } 
                </div>
                </>
             )}
        </div>
    );
}