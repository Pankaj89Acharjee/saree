import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import path from 'path';




dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/saree', 
  );
 
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter); 
/*API FOR PAYPAL*/
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb'); /*Now building paypal button in the Orderscreen*/
});



/*For displaying the newly added image and map that image to show in the UI*/
const __dirname = path.resolve(); /*path is a class and needs to be imported*/
app.use('/frontend/images', express.static(path.join(__dirname, '/frontend/images')));
/*In the above, joining the new file and pointing it to the new location*/

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);


app.use((err, req, res, next) => {
  res.status(500).send({message: err.message});
});

const port = process.env.PORT || 5001;







app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

