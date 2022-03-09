import React from 'react'
import Rating from './Rating';
import { Link } from 'react-router-dom';


export default function Product(props) {
    const { product } = props;
    return (
            <div key = {product._id} className = "card"> 
                   <Link to={`/product/${product._id}`}>
                        <img className = "medium" 
                        src = {product.image} 
                        alt = {product.name}/> 
                    </Link>
                    <div className = "card-body">
                        <Link to = {`/product/${product._id}`}>
                            <h2>{product.name}</h2>
                        </Link>
                        <Rating rating = {product.rating}
                                numReviews = {product.numReviews}>
                        </Rating>
                        <div className='row'>
                            <div className = "price">Rs.{product.price}/-</div>
                            <div>
                                <Link to = {`/seller/${product.seller._id}`}>
                                    {product.seller.seller.name
                                        /*2 times seller.
                                        One is for SELLER in productModel.js
                                        second one is SELLER in userModel.js
                                        From the userModel we get the name of the user
                                        
                                        If we donot edit the names of the users after
                                        first time seed, then it will show error that 
                                        name is undefined. So we in that case only
                                        product.seller.name will work and not two seller
                                        would. So we need to edit the name of the sellers
                                        as many as sellers in our database*/
                                    } 
                                </Link>
                            </div>
                        </div>
                            
                    </div>
                </div>
       
    );
}
