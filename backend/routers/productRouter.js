import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import data from '../data.js';
import { isAuth, isAdmin} from '../utils.js';

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

/*Creating API for inserting products in the backend. 
That's why it is a post request. '/' this means /api/products */
productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const product = new Product({
        name: 'Sample product' + Date.now(),
        image: '/images/avatar.png',
        price: 0,
        category: 'sample category',
        brand: 'sample brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample description',
    });
    const createdProduct = await product.save();
    res.send({message: 'Product Created', product: createdProduct });
    /*The above line sends data to the frontend*/
})
);

/*API for updating product edit details into the database*/
productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    /*We need to get ID of the product*/
    const productId = req.params.id;
    /*Now getting product from the database*/
    const product = await Product.findById(productId); /*Here Product is class*/
    if (product) { /*Here product is object*/
      /* if "products" exists, then fill the data of the datbase from the frontend*/
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({message:'Product Updated', product: updatedProduct});
    } 
    else {
        res.status(404).send({ message: 'Product Not found'});
    }
})
);

/*API for deleting products in the backend*/
productRouter.delete('/:id', isAdmin, isAuth, expressAsyncHandler(async(req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product) { /*If product exists*/
        const deleteProduct = await product.remove();
        res.send({ message: 'The product has been deleted', product: deleteProduct });
    } else {
        res.status(404).send({message: 'Product Not found'});
    }
})
);

export default productRouter;