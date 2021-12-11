
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function PlaceOrderScreen(props) { 
    /*Import cart from REDUX STORE*/
    const cart = useSelector((state) => state.cart);
    /*Checking whether user had selected the payment method or not*/
    if(!cart.paymentMethod) {
        props.history.push('/payment');
    };

    /*Importing from orderCreate REDUX*/
    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order} = orderCreate;


    const toPrice = (num) => Number(num.toFixed(2)); /* e.g., it takes 5.123 => converts to string "5.123" => and then to the number of two decimal places */
    /*For Cart items and Price*/
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0))
    /*Shipping Price*/
    cart.shippingPrice = cart.itemsPrice > 300 ? toPrice(0) : toPrice(40);
    /*For Tax Price*/
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    /*Total amount calculation*/
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        /*here we need order-items and not cart-items because we need the items what our customers have choiced*/
        dispatch(createOrder({...cart, orderItems: cart.cartItems}));
        /*Here in the above statement we used all objects of 'cart' objects and replaced card items with order items*/
    };

    


    


    /*Using the variables loading, success, error and order*/
    useEffect(() => {
        if(success) {
            props.history.push(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }
    }, [dispatch, order, props.history, success]);





    

    var date = useState(currentDateTime => Date());
    
    return(
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body" /*For Shipping Address*/>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> 
                                    {cart.shippingAddress.fullName} <br />
                                    <strong>Address:</strong>
                                    {cart.shippingAddress.address}, 
                                    {cart.shippingAddress.city},
                                    {cart.shippingAddress.postalCode},
                                    {cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        
                        <li>
                            <div className="card card-body" /*For payment*/>
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> 
                                    {cart.paymentMethod} 
                                    
                                </p>
                            </div>
                        </li>

                        <li>
                            <div className="card card-body" /*For payment*/>
                                <h2>Ordered Items</h2>
                                <ul>
                                    { cart.cartItems.map((item) => (
                                    <li key = {item.product}>
                                    <div className = "row" /*For fetching product details*/> 
                                    <div /*!st Col for image*/> 
                                        <img src = {item.image} 
                                        alt = {item.name} 
                                        className = "small">                      
                                        </img>
                                    </div>

                                    <div className = "min-30" /*2nd Col for Product Name*/>
                                         <Link to = {`/product/${item.product}`}>
                                             {item.name}</Link>
                                    </div>

                                    

                                    <div /*4th Col showing price per unit*/>
                                        {item.qty}  Pieces x {item.price} Rs/Unit =  Rs. {item.qty * item.price}
                                    </div>

                        
                                    </div>

                                    </li>
                                    )
                                    )}
                                </ul>
                                
                            </div>
                        </li>
                    </ul>
                </div>

                <div className = "col-1">
                    <div className = "card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>

                            <li>
                                <div className="row">
                                    <div>Total Price of items</div>
                                    <div>Rs. {cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>

                            <li>
                                
                                <div className="row">
                                    <div>Shipping Cost </div>
                                    <div>Rs. {cart.shippingPrice.toFixed(2)}</div>
                                </div>
                                <p>(Free shipping above order Rs 300)</p>
                            </li>

                            <li>
                                <div className="row">
                                    <div>Tax </div>
                                    <div>Rs. {cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>

                            <li>
                                <div className="row">
                                    <div><strong>Total Amount</strong></div>
                                    <div><strong>Rs. {cart.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type="button" onClick = {placeOrderHandler}
                                className = "primary block"
                                disabled = {cart.cartItems.length === 0} >Place order
                                
                                </button>
                            </li>
                            {
                                loading && <LoadingBox></LoadingBox>
                            }
                            {
                                error && <MessageBox variant="danger">{error};</MessageBox>
                            }
                            <li>
                                <p>Date of Order: {date} </p>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}