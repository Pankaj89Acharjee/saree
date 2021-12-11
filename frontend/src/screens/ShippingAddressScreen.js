import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin; /*For  "if(!userInfo){" portion*/
    const cart = useSelector(state => state.cart);/*Getting state/status of cart from the redux*/
    const {shippingAddress} = cart;
    /*If the user is not logged in, then the page will redirect him to the sign-in page*/
    if(!userInfo){
        props.history.push('/signin');
    }
                                /*useState is filled with the
                                status of the state 
                                in the REDUX, because to 
                                hold the data in the 
                                input boxes, entered by the user
                                for auto fillup the fields*/
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}),
        );
        props.history.push('/payment');
    };
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h2>Shipping Address</h2>
                </div>

                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" 
                    id="fullName" 
                    placeholder="Enter your full name" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    required>

                    </input>
                </div>

                <div>
                    <label htmlFor="address">Address </label>
                    <input type="text" 
                    id="address" 
                    placeholder="Enter your full address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    required>

                    </input>
                </div>

                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" 
                    id="city" 
                    placeholder="Enter your city" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    required>

                    </input>
                </div>

                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" 
                    id="postalCode" 
                    placeholder="Enter your full name" 
                    value={postalCode} 
                    onChange={(e) => setPostalCode(e.target.value)} 
                    required>

                    </input>
                </div>

                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" 
                    id="country" 
                    placeholder="Your address" 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)} 
                    required>

                    </input>
                </div>

                <div>
                    <label/>
                    <button className="primary" type="submit">Continue</button>
                </div>
                
        </form>
                
        </div>
        
    )
}