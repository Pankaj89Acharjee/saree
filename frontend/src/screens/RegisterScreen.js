//import express from "express";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function RegisterScreen(props) {

    /*Creating REACT Hooks for email and password options*/
    const [name, setName] = useState(' ');
    const [email, setEmail] = useState(' ');
    const [password, setPassword] = useState(' ');
    const [confirmPassword, setConfirmPassword] = useState(' ');
    /*---------------------------------------------------*/

    /*-----After Entering Login and successfully login validation, signin screen*/
    const redirect = props.location.search 
    ? props.location.search.split('=')[1]  
    : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    /*-----End of After Entering Login and successfully login validation, signin screen*/

    /*React hooks for sign-in*/
    const dispatch = useDispatch();
     /*End of React hooks for sign-in*/
    const submitHandler = (e) =>{
        e.preventDefault(); /*This is used not to refresh the page when the user clicks on the sign button*/
        /*Checking if two passwords entered are same or not*/
        if(password !== confirmPassword){
            alert('The password typed you didnot matched');
        }else{
            dispatch(register(name, email, password));
        }       
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
                    <h1>Create a new account</h1>
                </div>
                
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant = "danger">{ error }</MessageBox>}

                <div> 
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter your name" required
                    onChange={e => setName(e.target.value)}>

                    </input>
                </div>

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
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder="Re-Enter your password" required
                    onChange={e => setConfirmPassword(e.target.value)}>

                    </input>
                </div>

                <div>
                    <label/>
                    <button className="primary" type="submit">Register here</button>
                </div>

                <div>
                    <label/>
                    <div>
                        Already have an account with us? <Link to = {`/signin?redirect=${redirect}`}>Sign-In</Link>
                    </div>
                </div>

            </form>
        </div>
    )
        

    
}