import {USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_RESET, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, 
    USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, 
    USER_LIST_FAIL, 
    USER_LIST_REQUEST, 
    USER_LIST_SUCCESS, 
    USER_REGISTER_FAIL, USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS, USER_SIGIN_FAIL, 
    USER_SIGIN_REQUEST, USER_SIGIN_SIGNOUT, 
    USER_SIGIN_SUCCESS, 
    USER_UPDATE_FAIL, 
    USER_UPDATE_PROFILE_FAIL, 
    USER_UPDATE_PROFILE_REQUEST, 
    USER_UPDATE_PROFILE_RESET, 
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_RESET,
    USER_UPDATE_SUCCESS,
    USER_TOPSELLER_LIST_REQUEST,
    USER_TOPSELLER_LIST_SUCCESS,
    USER_TOPSELLER_LIST_FAIL,
    USER_ADDRESS_MAP_CONFIRM} from "../constants/userConstants";

export const userSigninReducer = ( state = {}, action) => {
    switch (action.type) {
        case USER_SIGIN_REQUEST:
            return { loading: true };
        case USER_SIGIN_SUCCESS:            /*Payload = data*/
            return { loading: false, userInfo: action.payload}; /*payload value comes from data in the userAction.js page in the 
            "dispatch({ type: USER_SIGIN_SUCCESS, payload: data });"" section*/
        case USER_SIGIN_FAIL:
            return { loading: false, error: action.payload}; /*payload value comes from data in the userAction.js page in the 
            "dispatch({ type: USER_SIGIN_SUCCESS, payload: data });"" section*/
        case USER_SIGIN_SIGNOUT:
            return {};
        default:
            return state;
    }
}



export const userRegisterReducer = ( state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:            /*Payload = data*/
            return { loading: false, userInfo: action.payload}; /*payload value comes from data in the userAction.js page in the 
            "dispatch({ type: USER_SIGIN_SUCCESS, payload: data });"" section*/
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload}; /*payload value comes from data in the userAction.js page in the 
            "dispatch({ type: USER_SIGIN_SUCCESS, payload: data });"" section*/
        
        default:
            return state;
    }
}

/*For fetching data to show data to update user details*/

export const userDetailsReducer = (state = {loading: true}, action) => {
    /*loading is true bcz we call loading details at the very beginning of the loading of the page*/
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {loading: true};
        case USER_DETAILS_SUCCESS:
            return {loading: false, user: action.payload};
        case USER_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        case USER_DETAILS_RESET:
            return { loading: true};
        default:
            return state;
    }
}

/*For saving and updating details of a user*/
export const userUpdateProfileReducer = (state = {loading: true}, action) => {
    /*loading is true bcz we call loading details at the very beginning of the loading of the page*/
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {loading: true};
        case USER_UPDATE_PROFILE_SUCCESS:
            return {loading: false, success: true};
        case USER_UPDATE_PROFILE_FAIL:
            return {loading: false, error: action.payload};
        case USER_UPDATE_PROFILE_RESET:
            return {};
        default:
            return state;
    }
}

/*For users list in the backend */
export const userListReducer = (state = {loading: true}, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return {loading: true};
        case USER_LIST_SUCCESS:
            return {loading: false, users: action.payload};
        case USER_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

/*For deleting users list in the backend */
export const userDeleteReducer = (state = { }, action) => { /*By default we dont need to load data of the users to be deleted*/
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return {loading: true};
        case USER_DELETE_SUCCESS:
            return {loading: false, success: true};
        case USER_DELETE_FAIL:
            return {loading: false, error: action.payload};
        case USER_DELETE_RESET:
            return { };
        default:
            return state;
    }
}

/*For saving and updating details of a user*/
export const userUpdateReducer = (state = {loading: true}, action) => {
    /*loading is true bcz we call loading details at the very beginning of the loading of the page*/
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return {loading: true};
        case USER_UPDATE_SUCCESS:
            return {loading: false, success: true};
        case USER_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        case USER_UPDATE_RESET:
            return {};
        default:
            return state;
    }
}


/*For users list in the backend */
export const userTopSellerListReducer = (state = {loading: true}, action) => {
    switch (action.type) {
        case USER_TOPSELLER_LIST_REQUEST:
            return {loading: true};
        case USER_TOPSELLER_LIST_SUCCESS:
            return {loading: false, users: action.payload};
        case USER_TOPSELLER_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

