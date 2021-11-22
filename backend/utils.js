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

        process.env.JWT_SECRET, /*2nd parameter. Never store key here.
        store it in the .env file for secure storage*/
        {
            expiresIn: '30d',
        }
    );
};