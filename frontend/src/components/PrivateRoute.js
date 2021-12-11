/*This file required because when ever we made a changes to the user details who are authenticated users
they are only allowed to see the profile page and not the one who 
are not the registered users. So, we need to exclude that types of users from
viewing this page., and that's why this is Private Router*/

import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

export default function PrivateRoute({ component: Component, ...rest}) {
    const userSignin = useSelector(state => state.userSignin); /*Importing from React-redux*/
    const { userInfo } = userSignin;
    return (
        <div>
            <Route {...rest} render={(props) => userInfo ? (
                <Component {...props}></Component> /*This component is defined in App.js*/
            ) : (
                <Redirect to = "/signin"/>
            )
            }>

            </Route>
        </div> 
    );
}