import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';



export default function OrderHistoryScreen(props) {
    /*Getting error, loading and orders from REDUX store i.e., from orderMineListReducer in orderReduer*/
    const orderMineList = useSelector(state => state.orderMineList);
    const { loading, error, orders} = orderMineList;
   
    const dispatch = useDispatch();

    useEffect(() => {
        if(!orders) {

    
        /*Calling fx listOrderMine from Actions ==>> orderActions*/
        dispatch(listOrderMine());
    }}, [orders, dispatch]);
    /*orderMineList is in store.js*/
    return (
        <div className = "container">
            <h1 /*We need to check 'loading' first*/>Order History</h1>
            {loading ? ( <LoadingBox></LoadingBox> 
             ): ( error ? <MessageBox variant = "danger">{error}</MessageBox>
             : (
                 <table className="table">
                     <thead>
                     <tr>
                        <th>ORDER ID NO</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID/NOT PAID</th>
                        <th>DELIVERED/HOLDING</th>
                        <th>ACTIONS</th>
                     </tr>
                     </thead>
                     <tbody /*Now looking over orders and using map fx to convert each orderobject into JSX*/>
                         {orders.map((orders) => (
                             <tr key={orders._id}>
                             <td>{orders._id}</td>
                             <td>{orders.createdAt.substring(0, 10)}</td>
                             <td>Rs.{orders.totalPrice.toFixed(2)}/-</td>
                             <td /*isPaid is conditional. If it is true (
                                 ?) then show order.paidAt for showing 
                                 only date part and not time. Substring is used to capture only 
                                 date and not the time of the payment. If this condition is
                                 false, then it will show not payment not paid 
                                 */>
                                     {orders.isPaid ? orders.paidAt.substring(0, 10) : 'Not Paid'}         
                            </td>
                             
                             <td>{orders.isDelivered ? orders.deliveredAt.substring(0, 10) : 'Not Delivered'}</td>
                             <td>
                                 <button type="button" className="btn btn-primary"
                                 onClick={() => {
                                     props.history.push(`/order/${orders._id}`);
                                 }}>Order Details</button>
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