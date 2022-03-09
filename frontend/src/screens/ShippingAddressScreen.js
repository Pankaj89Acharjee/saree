import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin; /*For  "if(!userInfo){" portion*/

    const [selected, setSelected] = useState(); /*Hook For dropdown*/

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
             
            dispatch(saveShippingAddress({
                fullName, 
                address, 
                city, 
                postalCode, 
                country,
            }),
            );
            props.history.push('/payment');
        };
    
    const changeSelectOptionHandler = (e) => {
         e.preventDefault();
         setSelected(e.target.value);
    };


    const countryOrigin = [
         
         {
            id: 1,
            country: 'India',
            address: 'Kolkata',
         },   
        
        
         {
            id: 2,
            country: 'South Africa',
         },

         {
            id: 3,
            country: 'Australia',
         },

         {
            id: 4,
            country: 'United States',
         },

         {
            id: 5,
            country: 'Russia',
         },

         {
            id: 6,
            country: 'England',
         },
         
         {
            id: 7,
            country: 'United Kingdom',
         },
         
         
     ]
    
     const districtOrigin = [
         
        {
           id: 1,
           address: 'Kolkata',
        },   
       
       
        {
           id: 2,
           address: 'South Dinajpur',
        },

        {
           id: 3,
           address: 'North Dinajpur',
        },

        {
           id: 4,
           address: 'South 24 Parganas',
        },

        {
           id: 5,
           address: 'North 24 Parganas',
        },

        {
           id: 6,
           address: 'Howrah',
        },
        
        {
           id: 7,
           address: 'Darjeeling',
        },

        {
            id: 8,
            address: 'Coochbihar',
         },

         {
            id: 9,
            address: 'Alipurduar',
         },

         {
            id: 10,
            address: 'Jalpaiguri',
         },

         {
            id: 11,
            address: 'Malda',
         },

         {
            id: 12,
            address: 'Murshidabad',
         },

         {
            id: 13,
            address: 'Birbhum',
         },

         {
            id: 14,
            address: 'Burdwan East',
         },

         {
            id: 15,
            address: 'Burdwan West',
         },

         {
            id: 16,
            address: 'Medinipore',
         },                
    ]
    
    const maldacityOrigin = [
         
      {
         id: 1,
         city: 'English Bazaar',
      },   

      {
         id: 2,
         city: '420More',
      },  
   ]

   const ddinajpurcityOrigin = [
      {
         id: 1,
         city: "Balurghat",
      },

      {
         id: 1,
         city: "Gangarampur",
      }
   ]

   const udinajpurcityOrigin = [
      {
         id: 1,
         city: "Kaliyaganj",
      },

      {
         id: 1,
         city: "Raiganj",
      }
   ]
            
   let type = null; /* Type variable stores different arrays for different drop downs*/
   let options = null; /*Set of options that a user will see*/

   if (selected === "Malda") {
      type = maldacityOrigin;
   } else if (selected === "South Dinajpur") {
      type = ddinajpurcityOrigin;
   } else if (selected === "North Dinajpur") {
      type = udinajpurcityOrigin;
   }
   if (type) {
      options = type.map((c, index) => <option key={index} value={c.city}>{c.city}</option>)
   }
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
                    <label htmlFor="country">Choose Your Country</label>
                   {/*

                   <input type="text" 
                    id="country" 
                    placeholder="Your address" 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)} 
                    required>

                    </input>
                     */ }

                     {/*Trying for drop-down*/}

                     <select id="country" onChange= {(e) => setCountry(e.target.value)} required>
                        <option>Select...</option>
                        {
                            countryOrigin.map((data, index) => {
                                return <option key = {index} value={data.country}>
                                       {data.country}</option>
                            })
                        }                      
                     </select>
                </div>
                <div>
                    <label htmlFor="address">District </label>
                    {/*<input type="text" 
                    id="address" 
                    placeholder="Enter your full address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    required>

                    </input>
                    */}
                    <select id="address"  onChange= {((e) => setAddress(e.target.value), changeSelectOptionHandler)} required>
                        <option>Select...</option>
                        {
                            districtOrigin.map((data, index) => {
                                return <option key = {index} value={data.address}>
                                       {data.address}</option>
                            })
                        }                      
                    </select>

                </div>

                <div>
                   
                      
                   
                    <label htmlFor="city">City</label>
                    {
                     <select>
                        <option>Select...</option>

                           {options}
                     </select>
                    /*
                    <input type="text" 
                    id="city" 
                    placeholder="Enter your city" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    required>
                    </input>
                    */ }
                    
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
                    <label/>
                    <button className="primary" type="submit">Continue</button>
                </div>
                
        </form>
                
        </div>
 
    )
};
