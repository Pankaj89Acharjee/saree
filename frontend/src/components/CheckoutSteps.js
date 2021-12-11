
import React from 'react';

export default function CheckoutSteps(props) {
    return(
        <div className ="row checkout-steps" /*Main Container*/> 
            <div className = {props.step1 ? 'active': ' '} /*Checking*/>Sign-in</div>
            <div className = {props.step2 ? 'active': ' '} /*Checking*/>Shipping</div>
            <div className = {props.step3 ? 'active': ' '} /*Checking*/>Payment</div>
            <div className = {props.step4 ? 'active': ' '} /*Checking*/>Place Order</div>
        </div>
    )
}