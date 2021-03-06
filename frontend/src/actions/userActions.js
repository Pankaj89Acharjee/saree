import  Axios  from "axios";
import { USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, 
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, 
    USER_LIST_FAIL, 
    USER_LIST_REQUEST, 
    USER_LIST_SUCCESS, 
    USER_REGISTER_FAIL, USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS, USER_SIGIN_FAIL, 
    USER_SIGIN_REQUEST, USER_SIGIN_SIGNOUT, 
    USER_SIGIN_SUCCESS, 
    USER_TOPSELLER_LIST_FAIL, 
    USER_TOPSELLER_LIST_REQUEST, 
    USER_TOPSELLER_LIST_SUCCESS, 
    USER_UPDATE_FAIL, 
    USER_UPDATE_PROFILE_FAIL, 
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_SUCCESS} from "../constants/userConstants"


export const signin = (email, password) => async(dispatch) => {
    dispatch ({ type: USER_SIGIN_REQUEST, payload: { email, password}});
    try {
        /*AJAX  post request for signin*/
        const { data } = await Axios.post('/api/users/signin', { email, password });
        dispatch({ type: USER_SIGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_SIGIN_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,

        });
    }    
};

export const signout = () => (dispatch) =>{
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({type: USER_SIGIN_SIGNOUT});
};


/*New User Registration*/
export const register = (name, email, password) => async(dispatch) => {
    dispatch ({ type: USER_REGISTER_REQUEST, payload: { name, email, password}});
    try {
        /*AJAX  post request for signin*/
        const { data } = await Axios.post('/api/users/register', { name, email, password });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        /*The below code is to update redux that a new user has registered*/
        dispatch({ type: USER_SIGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,

        });
    }    
};


/*For Fetching user details information*/
export const detailsUser = (userId) => async (dispatch, getState) => {
    /*Now declare constants in the userConstants*/
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId});
    /*Get a token by getState method. The {userSignin and {userInfo} values
are used here to get data and these constants are brought from 
ProfileScreen =>useSelector method}*/
    const { userSignin: {userInfo}} = getState();
    try{
        /*AJAX Request*/
        const { data } = await Axios.get(`/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo?.token}`},
        });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data});
    
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({ type: USER_DETAILS_FAIL, payload:message});
    }
};


/*From the ProfileScreen.js file, defining fx updateUserProfile()*/
export const updateUserProfile = (user) =>async(dispatch, getState) => {
    /*Connecting constants*/
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user});
    /*Get a token by getState method. The {userSignin and {userInfo} values
    are used here to get data and these constants are brought from 
    ProfileScreen =>useSelector method}*/
    const { userSignin: {userInfo}} = getState();
    try{
    /*AJAX Request. As it is sending data to backend, PUT method is used*/
    /* /api/users/profile` ====> profile comes from App.js> Route*/
    const { data } = await Axios.put(`/api/users/profile`, user,  {
        headers: { Authorization: `Bearer ${userInfo.token}`},
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data});
    dispatch({ type: USER_SIGIN_SUCCESS, payload: data});
    localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload:message});
    }
};

/*Defining fx in the UserListScreen namely "listUsers()"*/
export const listUsers = () => async(dispatch, getState) => {
    dispatch({ type: USER_LIST_REQUEST});
    try{
        const {userSignin: {userInfo}} = getState();
        const { data} = await Axios.get('/api/users', {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: USER_LIST_SUCCESS, payload: data});
    } catch (error){
        const message = 
        error.message && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({type: USER_LIST_FAIL, payload:message});
    }
}

/*Defining deleteUser() fx in the UserList Screen.js for deleting users*/
export const deleteUser = (userId) => async (dispatch, getState) => {
    dispatch({type: USER_DELETE_REQUEST, payload: userId});
    const { userSignin:{userInfo}} = getState();
    try{
        const { data } = await Axios.delete(`/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: USER_DELETE_SUCCESS, payload: data});
    } catch (error) {
        const message = 
        error.message && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({type: USER_DELETE_FAIL, payload:message}); 
    }
}


/*For updaing user data*/
export const updateUser = (user) =>async(dispatch, getState) => {
    /*Connecting constants*/
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user});
    /*Get a token by getState method. The {userSignin and {userInfo} values
    are used here to get data and these constants are brought from 
    ProfileScreen =>useSelector method}*/
    const { userSignin: {userInfo}} = getState();
    try{
    /*AJAX Request. As it is sending data to backend, PUT method is used*/
    /* /api/users/profile` ====> profile comes from App.js> Route*/
    const { data } = await Axios.put(`/api/users/${user._id}`, user,  {
        headers: { Authorization: `Bearer ${userInfo.token}`},
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data});
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({ type: USER_UPDATE_FAIL, payload:message});
    }
};

/*Defining fx in the Homecreen namely "listTopSellers()"*/
export const listTopSellers = () => async(dispatch) => {
    dispatch({ type: USER_TOPSELLER_LIST_REQUEST});
    try{
        
        const { data} = await Axios.get('/api/users/top-sellers');
        dispatch({type: USER_TOPSELLER_LIST_SUCCESS, payload: data});
    } catch (error){
        const message = 
        error.message && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({type: USER_TOPSELLER_LIST_FAIL, payload:message});
    }
}