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
            address: 'Jalpaiguri',
         },

         {
            id: 10,
            address: 'Malda',
         },  
         
         {
            id: 11,
            address: 'United Kingdom',
         }, 
   
         {
            id: 12,
            address: 'England',
         }, 
   
         {
            id: 13,
            address: 'Russia',
         }, 
   
         {
            id: 14,
            address: 'United States',
         }, 
   
         {
            id: 15,
            address: 'Australia',
         }, 
   
         {
            id: 16,
            address: 'South Africa',
         }, 
    ]
    


    
    const maldacityOrigin = [
         
      {
         id: 1,
         city: 'English Bazaar',
      },   

      {
         id: 2,
         city: 'Malda Town',
      },  

      {
         id: 3,
         city: 'Gazole',
      }, 
      {
         id: 2,
         city: 'Adina',
      }, 
   ]

   const ddinajpurcityOrigin = [
      {
         id: 1,
         city: "Balurghat",
      },

      {
         id: 2,
         city: "Gangarampur",
      },

      {
         id: 3,
         city: "Buniadpur",
      },

      {
         id: 4,
         city: "Kushmundi",
      },

      {
         id: 5,
         city: "Hili",
      }
   ]

   const udinajpurcityOrigin = [
      {
         id: 1,
         city: "Kaliyaganj",
      },

      {
         id: 2,
         city: "Raiganj",
      },

      {
         id: 3,
         city: "Islampur",
      },

      {
         id: 4,
         city: "Dalkhola",
      },

      {
         id: 5,
         city: "Panjipara",
      },

      {
         id: 6,
         city: "Itahar",
      },
   ]

   const kolkataOrigin = [
      {
         id: 1,
         city: "Baligunge",
      },

      {
         id: 2,
         city: "Baruipur",
      },

      {
         id: 3,
         city: "Jadavpur",
      },

      {
         id: 4,
         city: "New Alipore",
      },

      {
         id: 5,
         city: "Bou Bazar",
      },

      {
         id: 6,
         city: "Esplanade",
      },
   ]
   
   const darjeelingOrigin = [
      {
         id: 1,
         city: "Darjeeling",
      },

      {
         id: 2,
         city: "Kurseong",
      },

      {
         id: 3,
         city: "Mirik",
      },

      {
         id: 4,
         city: "Siliguri",
      },

      {
         id: 5,
         city: "Bagdogra",
      },

      {
         id: 6,
         city: "Matigara",
      },
   ]

   const howrahOrigin = [
      {
         id: 1,
         city: "Howrah",
      },     
   ]

   const jalpaiguriOrigin = [
      {
         id: 1,
         city: "Jalpaiguri",
      }, 
      
      {
         id: 2,
         city: "Malbazar",
      }, 
   ]

   const coochbiharOrigin = [
      {
         id: 1,
         city: "Coochbihar",
      }, 
      
      {
         id: 2,
         city: "Dinhata",
      }, 
   ]

   const s24Origin = [
      {
         id: 1,
         city: "Baruipur(M)",
      }, 
      
      {
         id: 2,
         city: "Garia",
      }, 
   ]

   const n24Origin = [
      {
         id: 1,
         city: "Barrackpore",
      }, 
      
      {
         id: 2,
         city: "Naihati",
      }, 
   ]

   const russiaOrigin = [
      {
         id: 1,
         city: "Moscow",
      },             
   ]

   const usaOrigin = [
      {
         id: 1,
         city: "WashingtonDC",
      },             
   ]

   const ukOrigin = [
      {
         id: 1,
         city: "London",
      },             
   ]

   const australiaOrigin = [
      {
         id: 1,
         city: "Canberra",
      },             
   ]


   const safricaOrigin = [
      {
         id: 1,
         city: "Pretoria",
      },             
   ]

   const englandOrigin = [
      {
         id: 1,
         city: "London",
      },             
   ]



   let type = null; /* Type variable stores different arrays for different drop downs*/
   let options = null; /*Set of options that a user will see*/

   if (selected === "Malda") {
      type = maldacityOrigin;
   } else if (selected === "South Dinajpur") {
      type = ddinajpurcityOrigin;
   } else if (selected === "North Dinajpur") {
      type = udinajpurcityOrigin;
   } else if (selected === "Kolkata") {
      type = kolkataOrigin;
   } else if (selected === "Darjeeling") {
      type = darjeelingOrigin;
   } else if (selected === "Howrah") {
      type = howrahOrigin;
   } else if (selected === "Jalpaiguri") {
      type = jalpaiguriOrigin;
   } else if (selected === "Coochbihar") {
      type = coochbiharOrigin;
   } else if (selected === "South 24 Parganas") {
      type = s24Origin;
   } else if (selected === "North 24 Parganas") {
      type = n24Origin;
   } else if (selected === "South Africa") {
      type = safricaOrigin;
   }  else if (selected === "Australia") {
      type = australiaOrigin;
   }  else if (selected === "United States") {
      type = usaOrigin;
   }  else if (selected === "United Kingdom") {
      type = ukOrigin;
   }  else if (selected === "Russia") {
      type = russiaOrigin;
   }  else if (selected === "England") {
      type = englandOrigin;
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
                    <select id="address" onClick={changeSelectOptionHandler} onChange={((e) => setAddress(e.target.value))} required>
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
                     <select id="city" onChange={(e) => setCity(e.target.value)} required>
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
                    placeholder="Pin Number" 
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
