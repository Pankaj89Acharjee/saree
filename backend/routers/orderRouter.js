import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAdmin, isAuth } from '../utils.js';

const orderRouter = express.Router();

/*Creating Order History for the Admins. We need to fetch the data from the 
database*/
orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const orders = await Order.find({}).populate('user', 'name'); /*Find all orders as this is ADMIN*/ 
    /*POPULATE fx is used to find the field namely user from the database and from that select only the usernames 
    of those who have ordered and out only their names9*/
    res.send(orders);
})
);

/*Creating API For Order History for Users. Actual API /api/orders/mine ==> Here
we only workfor /mine, because the predecessor part is mentioned
at the server.js*/
orderRouter.get(
    '/mine',
    isAuth, 
    expressAsyncHandler(async(req, res) => {
        const orders = await Order.find({ user: req.user._id });
        res.send(orders);
    })
);

orderRouter.post(
    '/', 
    isAuth,
    expressAsyncHandler(async(req, res) => {
    if(req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Cart is Empty! Error form the client side'});
    } else {
        const order =  new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            /*Defining Middleware for users who created this order*/
            /*Go Utils.js*/
            user: req.user._id,
        });
        /*We need to create order in database*/
        const createdOrder = await order.save();
        res.status(201).send({message: 'New Order Created', order: createdOrder});
        /*Now we need to create a route in server.js*/
    };
}));

/*API for Retrieving data from the Backend database for showing ordered data to the user*/
orderRouter.get('/:id', isAuth, expressAsyncHandler(async(req, res) => {
    /*isAuth is used to show the order details of the only authenticated users and not the others.*/
    const order = await Order.findById(req.params.id);
    if(order) {
        res.send(order);
    } else {
        res.status(404).send({message: 'Order Not found'});
    }
})
); /*Now go to fronend/screens and create orderdetrailes screen and use this API*/


/*Getting payment information API from the server after payment*/
orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = { 
            id: req.body.id, 
            status: req.body.status, 
            update_time: req.body.update_time, 
            email_address: req.body.email_address, 
        };
        /*Saving it in the Data Base*/
        const updatedOrder = await order.save();
        res.send({ message: 'Order Paid', order: updatedOrder});
    } else {
        res.status(404).send({ message: 'Oder not found '});
    }
})
);


/*For deleting a order under ADMIN section*/
orderRouter.delete('/:id', isAdmin, isAuth, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(order) {
        const deleteOrder = await order.remove();
        res.send({ message: 'Order deleted successfully', order: deleteOrder});
    } else {
        res.status(404).send({ message: 'Order not found'});
    }
})
);

/*Creating route for Delivery Order, if a order is showing not delivered*/

orderRouter.put('/:id/deliver', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      
        /*Saving it in the Data Base*/
        const updatedOrder = await order.save();
        res.send({ message: 'Order Delivered', order: updatedOrder});
    } else {
        res.status(404).send({ message: 'Oder not found '});
    }
})
);
export default orderRouter;