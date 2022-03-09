import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

  const cart = useSelector(state => state.cart); /*Cart Need to import from redux*/
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () =>{
    props.history.push('/signin?redirect=shipping'); /**********RECHECK HERE FOR Checkout module */
  };
 
  return (
    
    <div className = "row top">
        <div className = "col-2">
          <h1>Shopping Cart</h1>
          { cartItems.length === 0 ? 
          <MessageBox>
              Your Cart is empty <br/>
              <Link to = "/">Go to Shopping Section</Link>
          </MessageBox> 
          :
          (
            <ul>
              { cartItems.map((item) => (
                <li key = {item.product}>
                  <div className = "row" /*For 5 coloums*/> 
                    <div /*1st Col for image*/> 
                      <img src = {item.image} alt = {item.name} className = "small">                      
                      </img>
                    </div>

                    <div className = "min-30" /*2nd Col for Product Name*/>
                      <Link to = {`/product/${item.product}`}>{item.name}</Link>
                    </div>

                    <div /*3rd Col for number of items to buy*/>
                     
                      <select value = {item.qty} 
                      onChange = {e => dispatch(addToCart(item.product, Number(e.target.value))
                      )                           /*addToCart handler uses two parameters*/
                      }>
                      
                      {[...Array(item.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}items
                                  </option>
                                )
                              )}

                      </select>
                    </div>

                    <div /*4th Col showing price per unit*/>
                        <h4> Rs. {item.price} Per Unit </h4>
                    </div>

                    <div /*5th Col for delete button. item.product means productId*/>
                      <button className = "button" type = "button" onClick={() => removeFromCartHandler(item.product)}>Delete Items</button>                    
                    </div>
                  </div>

                </li>
              )
              )}
            </ul>
          )}
      </div>   

                                  
      <div className = "col-1">
        <div className = "card card-body">
             <ul>
               <li>
                 <h2>Sub-Total ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
                 : 
                 Rs {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} </h2>
               </li>
                                
               <li>
                 <button type="button" className = "primary block" onClick = {checkOutHandler} disabled = {cartItems.length === 0}>Checkout</button>
               </li>
             </ul>                     
        </div>
      </div>

  </div>                   
    



  );
}
