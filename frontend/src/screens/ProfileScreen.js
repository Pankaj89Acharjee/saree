import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen(props) {
    
    /*For Updating the fields*/
    const [name, setName] = useState(' ');
    const [email, setEmail] = useState(' ');
    const [password, setPassword] = useState(' ');
    const [confirmPassword, setConfirmPassword] = useState(' ');

    /*Hooks For Entering Seller data*/
    const [sellerName, setSellerName] = useState(' ');
    const [sellerLogo, setSellerLogo] = useState(' ');
    const [sellerDescription, setSellerDescription] = useState(' ');




     
    /*Getting 'signin' details from Redux store for passing parameter to the detailsUser() fx
    for getting details of the user*/
    const userSignin = useSelector((state) => state.userSignin);
    /*From userSigin, we get userInfo*/
    const {userInfo} = userSignin;
   

    /*Getting userDetails from redux store i.e., defined in App.js and 
    in App.js it redirects to Reducers*/
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    /*Getting data from fx in userUpdateProfile() in App.js and the
    fx is mined in the redux store i.e., in Reducers. We need to
    define that fx consisting in the reducer and below is its definition*/
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    /*From redux, lets get the following*/
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile;
    





    /*Importing dispatch from React Redux*/
    const dispatch = useDispatch();

    /*Getting user information from the redux*/
    useEffect(() => {
        if(!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET});
             /*useEffect contains two parameters, first is the function that
        runs and the second one is the dependency list in [].*/

            dispatch(detailsUser(userInfo._id)); /*detailsUser is an action in userAction file*/
        } else {
            /*Filling name and email from the backend*/
            setName(user.name);
            setEmail(user.email);
            if(user.seller) {
                setSellerName(user.seller.name);
                setSellerLogo(user.seller.logo);
                setSellerDescription(user.seller.description);
            }
        }
    }, [dispatch, userInfo._id, user]);


    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword)
        {
            alert('Password didnot match');
        } else {
            dispatch(updateUserProfile({ /*A new action created and define it in userActions file
                as well as create a constant in the constants folder*/
                /*The below data is passed to the database*/
                userId: user._id, 
                name, 
                email, 
                password,
                sellerName,
                sellerLogo,
                sellerDescription,


            
            })
         );
        }
    };

    return(
        <div>
            <form className="form" onSubmit = {submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                { loading ? (<LoadingBox></LoadingBox>
                ) : error ? (<MessageBox variant = "danger">{error}</MessageBox>
                ) : (

         
                <>

                { loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && (<MessageBox variant = "danger">{errorUpdate}</MessageBox>
                )}
                {successUpdate && <MessageBox variant = "success">Data Updated Successfully</MessageBox>}
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id = "name"
                               type = "text"
                               placeholder = "Enter your name"
                               value={name}
                               onChange = {(e) => setName(e.target.value)}>
                        </input>
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input id = "email"
                               type = "email"
                               placeholder = "Enter your e-mail"
                               value={email}
                               onChange = {(e) => setEmail(e.target.value)}>
                        </input>
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input id = "password"
                               type = "password"
                               placeholder = "Enter your password"
                               onChange = {(e) => setPassword(e.target.value)}>
                        </input>    
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input id = "confirmPassword"
                               type = "password"
                               placeholder = "Re-enter your password"
                               onChange = {(e) => setConfirmPassword(e.target.value)}>
                               
                        </input>
                    </div>   

                    {
                        /*For Seller DATA input*/
                        user.isSeller && (
                            <>
                            <h2>Seller Details</h2>
                            <div>
                                <label htmlFor='sellerName'>Seller Name</label>
                                <input id = "sellerName" type="text" placeholder='Enter Seller Name' 
                                value={sellerName} onChange={(e) => setSellerName(e.target.value)}>
                                </input>                          
                            </div>

                            <div>
                                <label htmlFor='sellerLogo'>Seller Logo</label>
                                <input id = "sellerLogo" type="text" placeholder='Put Seller Logo' 
                                value={sellerLogo} onChange={(e) => setSellerLogo(e.target.value)}>
                                </input>                          
                            </div>


                            <div>
                                <label htmlFor='sellerDescription'>Seller Description</label>
                                <input id = "sellerDescription" type="text" placeholder='Enter Seller Description' 
                                value={sellerDescription} onChange={(e) => setSellerDescription(e.target.value)}>
                                </input>                          
                            </div>
                            </>
                        )
                    }         

                    <div>
                        <label/>
                        <button className="primary" type="submit">Update</button>
                        
                    </div>
                </>
                ) 
            }

            </form>
        </div>
    );
}