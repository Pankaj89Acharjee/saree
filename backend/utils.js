/*This is for the utility file for generating token from JSON WEB TOKEN*/

import jwt from "jsonwebtoken";

import mg from 'mailgun-js';

export const generateToken = (user) => {
    return jwt.sign( /*sign fx has 3 parameters*/
        {
            _id: user._id,
            name: user.name,        /*1st parameter*/
            email: user.email,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
            
        },

        process.env.JWT_SECRET || 'somethingsecret', /*2nd parameter. Never store key here.
        store it in the .env file for secure storage. For business purpose
        we always need to store it in the .env file and for practice we
        need to show the secret key as if it is unknown the file might not
        get executed*/
        {
            expiresIn: '30d',
        }
    );
};

/*Authenticating user who created a new order*/
/*This is a middleware*/
export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(authorization) {
        const token = authorization.slice(7, authorization.length);
        /*Authorization format --> Bearer <token value> */
        /*It only ready token value and 7 meaning leaving 7 charecters blank for BEARER (here for us is the client*/
        jwt.verify( /*For decripting the token*/
            token, process.env.JWT_SECRET || 'somethingsecret', (err, decode) => {
            if(err) {
                res.status(401).send({message: 'Invalid Token'});
            } else {
                req.user = decode; /*Decoding token*/
                next(); /*Routes to isAuth in orderModel.js*/
            }
        }
     );
    } else { 

        res.send(401).send({message: 'NO Token'});
    }
};

/*This is a middleware for Admin login check*/
export const isAdmin = (req, res, next) => { /*isAdmin created as a new fx*/
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ message: 'Saree Says: Invalid Admin request/Token. Pls check token and try again'});
    }
};

export const isSeller = (req, res, next) => { /*isAdmin created as a new fx*/
    if(req.user && req.user.isSeller) {
        next();
    } else {
        res.status(401).send({ message: 'Saree Says: Invalid Seller request/Token'});
    }
};

export const isSellerOrAdmin = (req, res, next) => { /*isAdmin created as a new fx*/
    if(req.user && (req.user.isSeller || req.user.isAdmin)) {
        next();
    } else {
        res.status(401).send({ message: 'Saree Says: Invalid Seller Or Admin request/Token'});
    }
};

export const mailgun = () => mg ({
    apiKey: process.env.MAILGUN_API_KEY || '526282d1d97d948197585a49ad9ad9eb-76f111c4-d9b125f3',
    domain: process.env.MAILGUN_DOMAIN || 'sandboxed535126861f422a8743e710d6820edd.mailgun.org',
})

/*Defining fx in the orderRouter for sending HTML content to the buyer after buying an item*/
export const payOrderEmailTemplate = (order) => {
    return `<h1>Thanks for your purchase with us </h1>
    <p>
        Hi! ${order.user.name}, </p>
    <p>
        We have finished processing your order.
    </p>
    <h2> [Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})
    </h2>
    
    <table>
        <thead>
            <tr>
                <td><strong>Product</strong></td>
                <td><strong>Quantity</strong></td>
                <td><strong align="right">Price</strong></td>
            </tr>
        </thead>

        <tbody>
            ${order.orderItems.map((item) => `
                <tr>
                    <td>${item.name}</td>
                    <td align = "center">${item.qty}</td>
                    <td align = "right">Rs.${item.price.toFixed(2)}</td>
                </tr>
            `).join('\n')}
        </tbody>

        <tfoot>
            <tr>
                <td colspan="2>Items Price:</td>
                <td align="right">Rs.${order.itemsPrice.toFixed(2)}</td>
            </tr>

            <tr>
                <td colspan="2>Tax Price:</td>
                <td align="right">Rs.${order.taxPrice.toFixed(2)}</td>
            </tr>

            <tr>
                <td colspan="2>Shipping Price:</td>
                <td align="right">Rs.${order.shippingPrice.toFixed(2)}</td>
            </tr>

            <tr>
                <td colspan="2>Total Price:</td>
                <td align="right"><strong>Rs.${order.totalPrice.toFixed(2)}</strong></td>
            </tr>

            <tr>
                <td colspan="2>Payment Method Used</td>
                <td align="right"><strong>Rs.${order.paymentMethod}</strong></td>
            </tr>            
        </tfoot>

    </table>
    
    <h2>Shipping Address</h2>
    <p>
        ${order.shippingAddress.fullName}, <br>
        ${order.shippingAddress.address}, <br>
        ${order.shippingAddress.city}, <br>
        ${order.shippingAddress.country}, <br>
        ${order.shippingAddress.postalCode}, <br>

    </p>`;
};