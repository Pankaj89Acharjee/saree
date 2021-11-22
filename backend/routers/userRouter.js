import express from 'express';
import expressAsyncHandler from 'express-async-handler';
//import bcrypt from 'bcryptjs'
import data from '../data.js';
import User from '../models/userModel.js';

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async(req, res) =>{
    //await User.remove({});
    const createdUser = await User.insertMany(data.users);
    res.send({ createdUser });
    console.log({ createdUser });
})
);


/*Signin Backend*/
userRouter.post('/sigin', expressAsyncHandler(async(req, res) =>{
    const user = await User.findOne({ email: req.body.email });
      if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){ /*If password matches*/
            res.send({
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user), /*Unique token for authentication*/
            });
            return;           
        }
    }
    res.status(401).send({message: 'Invalid email or password'});
}) 
); 


export default userRouter;