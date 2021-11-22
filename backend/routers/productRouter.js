import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import data from '../data.js';

const productRouter = express.Router();

/*1st time loading data from the Database to the Browser Frontend*/
productRouter.get('/', expressAsyncHandler(async(req, res) =>{
    const products = await Product.find({}); /*find({}) is for showing all the data*/
    res.send(products);
})
);

/*Backend Data Fetching after it is inserted using the http://localhost:5000/api/products/seed address*/
productRouter.get('/seed', expressAsyncHandler(async(req, res) =>{
    //await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
    console.log(createdProducts);
})
);
/*To fetch data according to ID created in MongoDB and show in FRONTEND*/
productRouter.get('/:id', expressAsyncHandler(async(req, res) =>{
    const product = await Product.findById(req.params.id);
    if(product) {
        res.send(product);
    }
    else{
        res.status(404).send({message: 'Product Not Found'});
    }
})
);
export default productRouter;