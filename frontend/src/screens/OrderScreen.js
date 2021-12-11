
import  Axios  from "axios";
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from "../constants/orderConstants";


export default function OrderScreen(props) { 
    const orderId = props.match.params.id; /*MAtching orderId and storing in orderId const*/
    /*Getting status of PAYPAL SDK by REACT hooks*/
    const [sdkReady, setSdkReady] = useState(false);
    /*Getting OrderPay from REDUX*/
    const orderPay = useSelector(state => state.orderPay);
    const {
        loading: loadingPay, 
        error: errorPay, 
        success: successPay} = orderPay;


    /*Getting OrderDeliver from REDUX, ie., from store.js*/
    const orderDeliver = useSelector(state => state.orderDeliver);
    const {
        loading: loadingDeliver, 
        error: errorDeliver, 
        success: successDeliver} = orderDeliver;
    
    
    /* Now fetching orderDetails from REDUX store*/
    const orderDetails = useSelector(state => state.orderDetails);
    /*orderDetails contains order loading and error from REDUX store*/
    const {order,loading, error} = orderDetails; 


    /*Importing userInfo from redux*/
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;


    const dispatch = useDispatch();
    /*Using const orderId = props.match.params.id;*/
    useEffect(() => {
       const addPayPalScript = async () => {
           /*It's backend request to get the client ID*/
           const { data } = await Axios.get('/api/config/paypal');
           const script = document.createElement('script');
           script.type="text/javascript";
           script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
           script.async=true;
           script.onload = () => {
               setSdkReady(true);
           };
           document.body.appendChild(script); 
       };
       if(!order || successPay || successDeliver || (order && order._id !== orderId))  /*If Order Id is not loaded, 
       then load it, OR if successPay is true then refresh the page OR 
       order_id and OrderId does not match means, if the ID is not matched 
       with the URL id and customer order Id, then refresh the page and 
       to generate a new order id*/
       {
        dispatch({type: ORDER_PAY_RESET});
        dispatch({type:ORDER_DELIVER_RESET}); /*After updating delivery, we need to show the updated orders again*/
        dispatch(detailsOrder(orderId)); /*OrderId comes from URL, so we need to define and import it*/
       } else {
           if(!order.isPaid) {
               if(!window.paypal) {
                   addPayPalScript(); /*If paypal window is not loaded, it loads it*/
               } else {
                   setSdkReady(true);
               }
           }
       }
       
    }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);

/*---Defining SuccessPaymentHandler----*/
const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult)) /*paymentResult is the result in the paypal*/

}

/*For DeliverHandler fx*/
const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
}

    

    var date = useState(currentDateTime => Date());
    
    return loading? (
    <LoadingBox></LoadingBox>
    ) : error? (
    <MessageBox variant = "danger">{error}</MessageBox>
    ) : (
        <div>
           <h1>Order No: {order._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body" /*For Shipping Address*/>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> 
                                    {order.shippingAddress.fullName} <br />
                                    <strong>Address:</strong>
                                    {order.shippingAddress.address}, 
                                    {order.shippingAddress.city},
                                    {order.shippingAddress.postalCode},
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered 
                                ? ( <MessageBox variant="success">Delivered at {order.deliveredAt}
                                </MessageBox> 
                                 ) : (
                                <MessageBox variant="danger">Not Delivered</MessageBox>
                                )}
                            </div>
                        </li>
                        
                        <li>
                            <div className="card card-body" /*For payment*/>
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> 
                                    {order.paymentMethod}            
                                </p>
                                
                                {order.isPaid 
                                ? ( <MessageBox variant="success">Paid at {order.paidAt}
                                </MessageBox> 
                                 ) : (
                                <MessageBox variant="danger">Not Paid</MessageBox>
                                )}
                            </div>
                        </li>

                        <li>
                            <div className="card card-body" /*For payment*/>
                                <h2>Ordered Items</h2>
                                <ul>
                                    { order.orderItems.map((item) => (
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
                                    <div>Rs. {order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>

                            <li>
                                
                                <div className="row">
                                    <div>Shipping Cost </div>
                                    <div>Rs. {order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>

                            <li>
                                <div className="row">
                                    <div>Tax </div>
                                    <div>Rs. {order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>

                            <li>
                                <div className="row">
                                    <div><strong>Total Amount</strong></div>
                                    <div><strong>Rs. {order.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            {
                                !order.isPaid && (
                                    <li>
                                        {!sdkReady ? (<LoadingBox></LoadingBox>
                                        ) : (
                                            <>
                                            {
                                                errorPay && <MessageBox variant="danger">{errorPay}</MessageBox>
                                            }

                                            {
                                                loadingPay && <LoadingBox></LoadingBox>
                                            }
                                           <PayPalButton 
                                             amount={order.totalPrice}
                                             onSuccess={successPaymentHandler}>
                                            </PayPalButton>
                                            </>
                                        )}
                                    </li>
                                )
                            }
                            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <li>
                                    {loadingDeliver && <LoadingBox></LoadingBox>}
                                    {errorDeliver && <MessageBox variant="damger">{errorDeliver}</MessageBox>}
                                    <button type="button" 
                                    className="primary block"
                                    onClick={deliverHandler} >Deliver Order</button>
                                </li>
                            )}
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