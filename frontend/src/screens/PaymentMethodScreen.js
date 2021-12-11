
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentMethodScreen(props) {
    /*If the user didn't put the shipping address and went to the payment methods
    we need to redirect him to the shipping screen to put his address*/
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
        props.history.push('/shipping');
    }
    /*REACT HOOK*/
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    };
    return(
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>

            <form className="form" onSubmit = {submitHandler}>
                <div>
                    <h1>
                        Payment Methods
                    </h1>

                    <div className="form-razor">
                        <input 
                        type="radio" 
                        id="razorpay" 
                        value="Razorpay" name="paymentMethod" 
                        required checked 
                        onChange={(e) => setPaymentMethod(e.target.value)}>

                        </input>
                        <label htmlFor="razorpay">Razorpay</label>
                    </div>

                    <div className="form-paypal">
                        <input 
                        type="radio" 
                        id="paypal" 
                        value="PayPal" name="paymentMethod" 
                        required checked 
                        onChange={(e) => setPaymentMethod(e.target.value)}>

                        </input>
                        <label htmlFor="paypal">Paypal</label>
                    </div>
                </div>

                <div>
                    <button className="primary" type="submit">Proceed</button>
                </div>

                
            </form>
        </div>
    )
}