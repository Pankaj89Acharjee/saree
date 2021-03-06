import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_DETAILS_RESET } from "../constants/userConstants";

export default function UserListScreen(props) {
    const userList = useSelector(state => state.userList); /*From store.js*/
    const {loading, users, error} = userList;

    const userDelete = useSelector(state => state.userDelete);/*From store.js*/
    const {
        loading: loadingDelete, 
        error: errorDelete, 
        success: successDelete} = userDelete;


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listUsers()); /*Need to create listusers( ) fx in userActions,js*/
        dispatch({ type: USER_DETAILS_RESET}); /*getting details of another users after editing a user details*/
    }, [dispatch, successDelete]);


/*Defining deleteHandler() fx for deleting users*/
    const deleteHandler = (user) => {
        if(window.confirm('Are you sure?')) {
            dispatch(deleteUser(user._id)); /*deleteUser() fx created here and body is 
            being written in actions folder >> userActions.js*/


        }
    }

    return(
        <div>
            <h1>List of Users</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant = "error">{errorDelete}</MessageBox>}
            {successDelete && <MessageBox variant = "success">User Deleted Successfully</MessageBox>}
            { loading ? (<LoadingBox></LoadingBox>)
            :
            error ? (<MessageBox variant = "danger">{error}</MessageBox>)
            :
            (
                <table className="table">
                    <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>WHETHER SELLER</th>
                                <th>WHETHER ADMIN</th>
                                <th>ACTIONS</th>
                            </tr>
                    </thead>
                    <tbody>
                        {
                        users.map((user) => (                 
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isSeller? 'YES': 'NO'}</td>
                                <td>{user.isAdmin? 'YES': 'NO'}</td>
                                <td>
                                    <button  type="button"
                                        className="small"
                                        onClick={() => props.history.push(`/user/${user._id}/edit`)}
                                        >Edit</button>
                                    <button 
                                        type="button"
                                        className="small"
                                        onClick={() => 
                                            deleteHandler(user)
                                        }>Delete</button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                    
                </table>
            )
            }
        </div>
    )
}