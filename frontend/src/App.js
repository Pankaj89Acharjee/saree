import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
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
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';

function App() {
  /*Getting cart from Redux store*/
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  /*Getting user signin from redux store*/
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler  = () => {
    dispatch(signout());
   
  };


  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
             Handloom Saree
            </Link>
          </div>
          <div>
            <Link to="/cart">
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
                <Link to="/signin">Sign In</Link>
              )}

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
        <main>
          
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <AdminRoute path="/productlist" component={ProductListScreen}></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderListScreen}></AdminRoute>
          <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
