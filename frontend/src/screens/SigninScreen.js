//import express from "express";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SigninScreen(props) {

    /*Creating REACT Hooks for email and password options*/
    const [email, setEmail] = useState(' ');
    const [password, setPassword] = useState(' ');
    /*---------------------------------------------------*/

    /*-----After Entering Login and successfully login validation, signin screen*/
    const redirect = props.location.search 
    ? props.location.search.split('=')[1] 
    : '/';

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    /*-----End of After Entering Login and successfully login validation, signin screen*/

    /*React hooks for sign-in*/
    const dispatch = useDispatch();
     /*End of React hooks for sign-in*/
    const submitHandler = (e) =>{
        e.preventDefault(); /*This is used not to refresh the page when the user clicks on the sign button*/
        dispatch(signin(email, password));
    };

    useEffect(() => { /*useEffect has two parameters*/
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return(
        <div>
            <form className = "form" onSubmit = {submitHandler}>
                <div>
                    <h1>Sign in</h1>
                </div>
                
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant = "danger">{ error }</MessageBox>}
                <div>
                    <label htmlFor="email">E-mail Address</label>
                    <input type="email" id="email" placeholder="Enter your e-mail Id" required
                    onChange={e => setEmail(e.target.value)}>

                    </input>
                </div>

                <div>
                    <label htmlFor="password">Enter Password</label>
                    <input type="password" id="password" placeholder="Enter your password" required
                    onChange={e => setPassword(e.target.value)}>

                    </input>
                </div>

                <div>
                    <label/>
                    <button className="primary" type="submit">Sign-in</button>
                    
                </div>

                <div>
                    <label/>
                    <div>
                        Are you a new customer? <Link to = {`/register?redirect=${redirect}`}>Create your account</Link>
                    </div>
                </div>

            </form>
        </div>
    )
        

    
}