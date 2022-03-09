import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs'
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAdmin, isAuth } from '../utils.js';

const userRouter = express.Router();

/*API for returning TOP SELLERS to the frondend. API-> /api/users/top-sellers*/
userRouter.get('/top-sellers', expressAsyncHandler(async(req, res) => {
    const topSellers = await User.find({ isSeller: true}).sort({ 'seller.rating': -1}).limit(3);
    /*1st we need Seller, then we need to sort them in the Descending order, -1 means that decrease 
    by 1 from the higest value to the lowest. -1 shows the highest rating
    and if there are 100s of Sellers in the Database, it only chooses the
    top most 3 sellers with highest rating*/
    res.send(topSellers);
})
);

userRouter.get('/seed', expressAsyncHandler(async(req, res) =>{
   // await User.remove({});
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
                isSeller: user.isSeller,
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
                isSeller: user.isSeller,
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
        user.email = req.body.email || user.email;
        if(user.isSeller){
            user.seller.name = req.body.sellerName || user.seller.name;
            user.seller.logo = req.body.sellerLogo || user.seller.logo;
            user.seller.description = req.body.sellerDescription || user.seller.description;
        }

    if(req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8); /* 8 for auto solved*/
        }
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(updatedUser),


    });
    }
})
);


/*API for listing users in the database*/

userRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const users = await User.find({}); /*Means list all the users*/
    if(users) {
        res.send(users);
    } else {
        res.status(404).send({message: 'User Not Found'});
    }
   
})
);

/*API for deleting USERS from the database as ADMIN*/
userRouter.delete('/:id', isAuth, expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        if(user.email === 'abc@xyz.com') {
            res.status(404).send({message: 'Cannot delete Admin user'});
            return; /*It is used not to run next lines if it is admin user*/
        }
        const deleteUser = await user.remove();
        res.send({message:'User deleted successfully', user: deleteUser});
    } else {
        res.status(404).send({message:'User not found'});
    }
})
);

/*API for updating user*/
userRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin || user.isAdmin);
        user.isSeller = Boolean(req.body.isSeller || user.isSeller);

        const updatedUser = await user.save();
        res.send({ message: 'User Updated', user: updatedUser});
    } else {
        res.status(404).send({ message: 'User not found'});
    }
})
);

export default userRouter;