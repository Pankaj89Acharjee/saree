import Axios from 'axios';
import {
  PRODUCT_CATEGORY_LIST_FAIL,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants';

export const listProducts = ({
  pageNumber = '',
  seller = '', 
  name='', 
  category= '', 
  min = 0, 
  max = 0, 
  rating = 0, 
  order = '', } /*Default value is 0*/) => async (dispatch) => {
    dispatch({type: PRODUCT_LIST_REQUEST,});
  try {
    const { data } = await Axios.get(
      `/api/products?pageNumber=${pageNumber}&seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/* fx defining here which is written in ProductListScreen names as
createProduct fx*/
export const createProduct = () => async(dispatch, getState) => {
  dispatch({type: PRODUCT_CREATE_REQUEST});
  /*We need token for login, so userInfo is imported here and only
  admins can create products, that's why checking user is compulsory*/
  const {userSignin:{userInfo}} = getState();
  try {
    /*AJAX request*/
    const { data } = await Axios.post('/api/products', {}, {
      headers: { Authorization: `Bearer ${userInfo.token}`},
      }
    );
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.product});
    /* Here in the above, payload: data.product --> data.product is
    the parameter used in the productRouter in the BACKEND => res.send({message: 'Product Created', product: createdProduct });
    => in the last parameter createdProduct to the FRONTEND. 
    Means createdProduct = data.product*/
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
    dispatch({type: PRODUCT_CREATE_FAIL, payload:message});
  }
  
};


/*For updating product, and fx defined in ProductEditScreen.js*/
export const updateProduct = (product) => async(dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product});
  /*GEtting token for userInfo for userSignIn*/
  const {userSignin:{userInfo}} = getState();
  try{
    /*AJAX*/
    const { data } = await Axios.put(`/api/products/${product._id}`, product, 
    {headers: {Authorization: `Bearer ${userInfo.token}`}}
    )
    dispatch({type: PRODUCT_UPDATE_SUCCESS, payload: data});
  }
   catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
    dispatch({type: PRODUCT_UPDATE_FAIL, error:message});
  }

  
};

/*Fx for deleting products from the fx deleteProduct in the ProductListScreen*/
export const deleteProduct = (productId) => async(dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId});
  /*We need token for authenticated request in the userSignin*/
  const {userSignin: {userInfo}} = getState();
  try{
    const { data } =  Axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}`}
    })
    dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data});
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
    dispatch({type: PRODUCT_DELETE_FAIL, payload: message});
  }
};

/*Defining listProductCategory from the APP.JS for category wise listing of products*/
export const listProductCategories = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/products/categories`);
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

/*For rating and comment by the user and defining the function in the
submitHandler () fx of PreoductScreen.js*/
export const createReview = (productId, review) => async(dispatch, getState) => {
  dispatch({type: PRODUCT_REVIEW_REQUEST});
  /*We need token for login, so userInfo is imported here and only
  admins can create products, that's why checking user is compulsory*/
  const {userSignin:{userInfo}} = getState();
  try {
    /*AJAX request*/
    const { data } = await Axios.post(`/api/products/${productId}/reviews`, review, {
      headers: { Authorization: `Bearer ${userInfo.token}`},
      }
    );
    dispatch({ type: PRODUCT_REVIEW_SUCCESS, payload: data.review});
    /* Here in the above, payload: data.product --> data.product is
    the parameter used in the productRouter in the BACKEND => res.send({message: 'Product Created', product: createdProduct });
    => in the last parameter createdProduct to the FRONTEND. 
    Means createdProduct = data.product*/
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
    dispatch({type: PRODUCT_REVIEW_FAIL, payload:message});
  }
  
};