import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import { detailsUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import Rating from "../components/Rating";

export default function SellerScreen(props) {
    const params = useParams();
    const {id: sellerId} = params;
    
    //const sellerId = props.match.params.id;

    /*getting userDetails from the redux*/
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

     /*getting productList from the redux*/
    const productList = useSelector((state) => state.productList);
    const { loading: loadingProducts, error: errorProducts, products } = productList;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsUser(sellerId));
        dispatch(listProducts({seller : sellerId}));
    }, [dispatch, sellerId]);
    return (
        <div className="row top">
            <div className="col-1">
                {loading ? <LoadingBox></LoadingBox>
                : error ? <MessageBox variant = "danger">{error}</MessageBox>
                : 
                (
                    <ul className="card card-body">
                        <li className="row start" /*for Logo*/>
                            <div className="p-1">
                                <img className="small" 
                                src = {user.seller.logo} 
                                alt={user.seller.name}></img>                    
                            </div>

                            <div className="p-1">
                                <h1>
                                    {user.seller.name}
                                </h1>
                            </div>
                        </li>

                        <li /*Rating*/>
                            <Rating rating = {user.seller.rating} 
                            numReviews = {user.seller.numReviews}></Rating>
                        </li>

                        <li /*for emailing to seller*/>
                            <a href = {`mailto:${user.email}`}>Contact Seller</a>
                        </li>

                        <li /*Description of the Seller*/>
                            {user.seller.description}
                        </li>
                    </ul>
                )}
            </div>

            <div className="col-3">
            {loadingProducts ? <LoadingBox></LoadingBox>
                : errorProducts ? <MessageBox variant = "danger">{errorProducts}</MessageBox>
                : 
                (
                    <>
                         {products.length === 0 && <MessageBox variant="danger">No Products Found</MessageBox>} 
                         <div className="row center">
                             {products.map((product) => ( /*Showing products according to the product.id*/
                                 <Product key={product._id} product={product}></Product>
                             ))}

                         </div>
                    </>
                   
                )}
            </div>

        </div>
    )
}