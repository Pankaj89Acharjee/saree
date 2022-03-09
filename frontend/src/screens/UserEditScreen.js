import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_RESET } from "../constants/userConstants";

export default function UserEditScreen(props) {
    /*We need specific Id for editing data*/
    const userId = props.match.params.id; /*Now we need to define useEffect()*/

    const [name, setName] = useState(' ');
    const [email, setEmail] = useState(' ');
    const [isSeller, setIsSeller] = useState(false); /*By default it is false*/
    const [isAdmin, setIsAdmin] = useState(false);
    
    
    
    /*For getting users in details from redux store, i.e. from store.js*/
    const userDetails = useSelector((state) => state.userDetails);
    const {loading, error, user} = userDetails;

    /*For getting users in details from redux store, i.e. from store.js*/
    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        loading: loadingUpdate, 
        error: errorUpdate, 
        success: successUpdate} = userUpdate;

    const dispatch = useDispatch();
    useEffect(() => {  
        
        
                       
            /*Need to check user*/
        if(!user || successUpdate) { /*If not exists, bring it*/
            dispatch({ type: USER_UPDATE_RESET});
            
            dispatch(detailsUser(userId._id));
            props.history.push('/userlist');
        } else {
               /*Showing the clicked user data*/
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
            setIsSeller(user.isSeller);
        }
    }, [dispatch, props.history, successUpdate, user, userId]);
    

    const submitHandler = (e) => {
        e.preventDefault(); /*Preventing page refresh when user clicks on the edit button*/
        dispatch(updateUser({
            _id: userId, 
            name, 
            email, 
            isSeller, 
            isAdmin
            })
        );
        /* updateUser() is defined in action.js*/
    };

    


    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Editing {name}</h1>
                    
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                </div>
                {loading ? <LoadingBox></LoadingBox>
                : error ? <MessageBox variant = "danger">{error}</MessageBox>
                : 
                <>
                <div /*for name*/>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" placeholder="Name"
                    value={name} onChange={(e) => setName(e.target.value)}>

                    </input>
                </div>

                <div /*for email*/>
                    <label htmlFor="email">E-mail</label>
                    <input id="email" type="text" placeholder="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}>

                    </input>
                </div>

                <div /*Checkbox for whether seller*/>
                    <label htmlFor="isSeller">Whether Seller</label>
                    <input id="isSeller" type="checkbox" checked={isSeller}
                    onChange={(e) => setIsSeller(e.target.checked)}>

                    </input>
                </div>

                <div /*Checkbox for whether Admin*/>
                    <label htmlFor="isAdmin">Whether Admin</label>
                    <input id="isAdmin" type="checkbox" checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}>
                    
                    </input>
                </div>
                
                <div>
                    <button type="submit" className="primary">Update </button>
                </div>
                </>
                }
            </form>
           
        </div>
    )
}