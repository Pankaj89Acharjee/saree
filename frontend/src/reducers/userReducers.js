import { USER_DETAILS_FAIL, 
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, 
    USER_REGISTER_FAIL, USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS, USER_SIGIN_FAIL, 
    USER_SIGIN_REQUEST, USER_SIGIN_SIGNOUT, 
    USER_SIGIN_SUCCESS, 
    USER_UPDATE_PROFILE_FAIL, 
    USER_UPDATE_PROFILE_REQUEST, 
    USER_UPDATE_PROFILE_RESET, 
    USER_UPDATE_PROFILE_SUCCESS} from "../constants/userConstants";

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

