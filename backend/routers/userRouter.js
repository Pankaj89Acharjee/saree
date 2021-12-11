import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs'
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async(req, res) =>{
    //await User.remove({});
    const createdUser = await User.insertMany(data.users);
    res.send({ createdUser });
    console.log({ createdUser });
})
);


/*Signin Backend*/
userRouter.post('/signin', expressAsyncHandler(async(req, res) =>{
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

/*Creating API for new user register*/
/*It would be a post method as it would create data in the database*/
userRouter.post('/register', expressAsyncHandler(async(req, res) => {
    const user = new User({name: req.body.name, email: req.body.email, 
    password: bcrypt.hashSync(req.body.password, 8),
    });
    const createUser = await user.save();
    res.send({
                id: createUser._id,
                name: createUser.name,
                email: createUser.email,
                isAdmin: createUser.isAdmin,
                token: generateToken(createUser),
    });
   })
);

/*End of Creating API for new user register*/

/* Creation of API for Updating details of existing users*/

userRouter.get('/:id', isAuth, expressAsyncHandler(async(req, res) => {
    const user = await User.findOneAndUpdate(req.params.id); /****CHECK HERE */
    if(user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 'User Not Found' });
    }
})
);

/* End of Creation of Updating details of users*/


/*After updating the existing data, putting it into the database*/
userRouter.put('/profile', isAuth, expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.name;
        if(req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8); /* 8 for auto solved*/
        }
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser),


    });
    }
})
);
export default userRouter;