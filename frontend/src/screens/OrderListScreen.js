/*For viewing and editing/deleting the orders under ADMIN*/
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, listOrders } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_DELETE_RESET } from "../constants/orderConstants";

export default function OrderListScreen(props) {
    /*getting OrderList object from OrderReducer*/
    const orderList = useSelector(state => state.orderList);
    const {loading, error, orders} = orderList;


    /*getting orderDelete from redux store i.e. from store.js*/
    const orderDelete = useSelector(state => state.orderDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = orderDelete;


    const dispatch = useDispatch();
    useEffect (() => {
        if(successDelete) {
            dispatch({type: ORDER_DELETE_RESET});
        }
        
        /*As we donot want to delete any more data after the first one choiced by
        us was deleted, we have to reset it and and show the order list*/
        
        dispatch(listOrders()); /*Need to define the fx in orderActions.js in actions folder.*/
    }, [dispatch, successDelete]);

    const deleteHandler = (order) => {
        if(window.confirm('Are you sure to delete?')) {
            dispatch(deleteOrder(order._id));
        }
    };

    return (
        <div className = "container">
            <h1 /*We need to check 'loading' first*/>Orders by Customers</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {loading ? ( <LoadingBox></LoadingBox> 
             ): ( error ? <MessageBox variant = "danger">{error}</MessageBox>
             : (
                 <table className="table">
                     <thead>
                     <tr>
                        <th>ORDER ID NO</th>
                        <th>USER_NAME</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID/NOT PAID</th>
                        <th>DELIVERED/HOLDING</th>
                        <th>ACTIONS</th>
                     </tr>
                     </thead>
                     <tbody /*Now looking over orders and using map fx to convert each orderobject into JSX*/>
                         {orders.map((order) => (
                             <tr key={order._id}>
                             <td>{order._id}</td>
                             <td>{order.user.name}</td>
                             <td>{order.createdAt.substring(0, 10)}</td>
                             <td>Rs.{order.totalPrice.toFixed(2)}/-</td>
                             <td /*isPaid is conditional. If it is true (
                                 ?) then show order.paidAt for showing 
                                 only date part and not time. Substring is used to capture only 
                                 date and not the time of the payment. If this condition is
                                 false, then it will show not payment not paid 
                                 */>
                                     {order.isPaid ? order.paidAt.substring(0, 10) : 'Not Paid'}         
                            </td>
                             
                             <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'Not Delivered'}</td>
                             <td>
                                 <button type="button" className="btn btn-primary"
                                 onClick={() => {
                                     props.history.push(`/order/${order._id}`);
                                 }}>Order Details</button>

                                 <button 
                                 className="small"
                                 type = "button"
                                 onClick={() => deleteHandler(order)}>
                                     Delete
                                 </button>
                             </td>
                             
                         </tr>
                         )
                            
                         )}
                     </tbody>
                 </table>

             )
             )
            }

        </div>
    )
        
    
}