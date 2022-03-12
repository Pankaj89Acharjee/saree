import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { listProductCategories } from './actions/productActions';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import PrivateRoute from './components/PrivateRoute';
import SearchBox from './components/SearchBox';
import SellerRoute from './components/SellerRoute';
import CartScreen from './screens/CartScreen';
import DashboardScreen from './screens/DashboardScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import SearchScreen from './screens/SearchScreen';
import SellerScreen from './screens/SellerScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';

function App() {
  /*Getting cart from Redux store*/
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;

  /*Getting user signin from redux store*/
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler  = () => {
    dispatch(signout());
   
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
     const {loading: loadingCategories, error: errorCategories, categories} = productCategoryList;


  useEffect(() => {
    dispatch(listProductCategories()); /*For category wise listing products*/
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
           
          <div>
            {/*
            <button className='open-sidebar' 
            type='button' onClick={() => setSidebarIsOpen(true)}>
             <i className='fa fa-bars'></i>
            </button>
            */}
            
            <Link className="brand" to="/">
            <span className='spanhead'>
               <img src="/images/headerB.jpeg"></img>
             </span>
             "Handloom Textiles Ltd             
            </Link>
          </div>

          <div /*Here direct search box wouln't work, so we need to Route and render history from the searchbox*/>
            <Route
              render={({history}) => ( 
                <SearchBox history={history}></SearchBox>
                )}>
                
            </Route>

          </div>
          <div>
            <Link to="/cart" className='menus'>
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>

            {userInfo ? (
              <div className = "dropdown">
                <Link to = "#">{userInfo.name} 
                <i className = "fa fa-caret-down" ></i>{' '}
                </Link>

                <ul className="dropdown-content">
                  <li>
                    <Link to = "/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to = "/orderhistory">Order History</Link>
                  </li>
                  <Link to = "/" onClick = {signoutHandler}>
                    Sign Out
                  </Link>
                </ul>
              </div>
              ) : (
                <Link to="/signin" className='menus'>Sign In</Link>
              )}                   

              { /*Conditional rendering for SELLER*/
                userInfo && userInfo.isSeller && (
                  <div className = "dropdown">
                    <Link to="#Seller">
                      Seller<i className="fa fa-caret-down">
                      </i>
                    </Link>
                    <ul className="dropdown-content">                      
                      <li>
                        <Link to = "/productlist/seller">Products</Link>
                      </li>

                      <li>
                        <Link to = "/orderlist/seller">Orders</Link>
                      </li>                    
                    </ul>
                  </div>
                )
              }

              {/*A conditional rendering for ADMINS*/
                userInfo && userInfo.isAdmin && (
                  <div className = "dropdown">
                    <Link to="#Admin">Admin {' '} <i className="fa fa-caret-down">
                      </i>
                    </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to = "/dashboard">Dashboard</Link>
                      </li>

                      <li>
                        <Link to = "/productlist">Products</Link>
                      </li>

                      <li>
                        <Link to = "/orderlist">Orders</Link>
                      </li>

                      <li>
                        <Link to = "/userlist">All Users</Link>
                      </li>
                    </ul>
                  </div>
                )
              }
            
          </div>
        </header>
{/*
    

        <aside className= {sidebarIsOpen ? 'open' : ''}>
                <ul className='categories'>
                  <li>
                    <strong>Categories</strong>
                    <button onClick={() => setSidebarIsOpen(false)}
                    className='close-sidebar'
                    type='button'
                    >
                      <i className='fa fa-close'></i>
                    </button>
                  </li>
                  {loadingCategories ? (
                  <LoadingBox></LoadingBox>
                  ) : errorCategories ? (
                  <MessageBox variant="danger">{errorCategories}</MessageBox>
                  ) : (
                    categories.map((c) => (
                      <li key = {c}>
                        <Link to = {`/search/category/${c}`}
                        onClick={() => setSidebarIsOpen(false)}>{c}</Link>
                      </li>
                    ))
                  )
                  }
                </ul>
        </aside>
                */}
        <main>
          <Route path="/search/name/:name?" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category/name/:name" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber" component={SearchScreen} ></Route>
          <Route path="/seller/:id?" component={SellerScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/pageNumber/:pageNumber" component={HomeScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <AdminRoute path="/productlist" component={ProductListScreen} exact></AdminRoute>
          <AdminRoute path="/productlist/pageNumber/:pageNumber" component={ProductListScreen} exact></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderListScreen} exact></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
          <AdminRoute path="/dashboard" component={DashboardScreen}></AdminRoute>
          <Route path="/product/:id/edit" component={ProductEditScreen}></Route>
          <SellerRoute path="/productlist/seller" component={ProductListScreen}></SellerRoute>
          <SellerRoute path="/orderlist/seller" component={OrderListScreen}></SellerRoute>
        </main>
        <footer className='footer'>
          
        <h4>Ⓒ All the rights reserved</h4>
        <div className='buttonIcons'>
                  <button className='btn_shadow'>
                    <i class='fab fa-facebook-f'></i>
                  </button>
                  <button className='btn_shadow'>
                    <i class='fab fa-instagram'></i>
                  </button>
                  <button className='btn_shadow'>
                    <i class='fab fa-linkedin-in'></i>
                  </button>
          </div>   
          
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
