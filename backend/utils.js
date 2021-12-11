/*This is for the utility file for generating token from JSON WEB TOKEN*/

import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign( /*sign fx has 3 parameters*/
        {
            _id: user._id,
            name: user.name,        /*1st parameter*/
            email: user.email,
            isAdmin: user.isAdmin,
            
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
                res.send(401).send({message: 'Invalid Token'});
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
        res.status(401).send({ message: 'Saree Says: Invalid Admin request/Token'});
    }
}