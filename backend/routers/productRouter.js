import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import data from '../data.js';
import { isAuth, isAdmin, isSellerOrAdmin} from '../utils.js';

const productRouter = express.Router();

/*1st time loading data from the Database to the Browser Frontend*/
productRouter.get('/', expressAsyncHandler(async(req, res) =>{

    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;


    /*Filter for product name search box*/
    const name = req.query.name || '';

    /*Filter for product category*/
    const category = req.query.category || '';

    /*For searching and sorting products and usage of variable "order"*/
    const order = req.query.order || '';

    /*Min and Max for price searching*/
    const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;

    /*setting the Ratings*/
    const rating = req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating) : 0;


    /*Filtering products only for SELLERS*/
    const seller = req.query.seller || ''; /*Make empty, if doesnot exists*/
    const sellerFilter = seller ? {seller} : {}; /*Creating Filter for SELLER*/
    const nameFilter = name ? {name: {$regex: name, $options: 'i'} } : {}; /*We need regular expression for name filter.
    As because we don't have an exact check, we just check if any keyword is matched
    and then return the list of that products according to that keyword*/

    const categoryFilter = category ? {category} : {};

    const priceFilter = min && max ? {price: {$gte: min, $lte: max} } : {};

    const ratingFilter = rating ? {rating: {$gte: rating} } : {};

    const sortOrder = order === 'lowest' ? { price: 1} 
        : 
        order === 'highest' ? {price: -1} 
        : 
        order === 'toprated' ? {rating: -1} 
        : 
        {_id: -1};
      /* 1 means make ascending wise search, -1 is descending wise search*/

    const count = await Product.count({ /*Returns the exact matches in the page no*/
        ...sellerFilter, 
        ...nameFilter, 
        ...categoryFilter, 
        ...priceFilter,
        ...ratingFilter,  });


    const products = await Product.find({
        ...sellerFilter, 
        ...nameFilter, 
        ...categoryFilter, 
        ...priceFilter,
        ...ratingFilter,  }).populate( /*Populate used to show names from the User Collection*/
        
        'seller', 
        'seller.name seller.logo')
        .sort(sortOrder)
        .skip(pageSize * (page -1))
        .limit(pageSize); /*find({}) is for showing all the data*/
        
    res.send({products, page, pages: Math.ceil(count / pageSize)});
})
);

/*Backend Data Fetching after it is inserted using the http://localhost:5001/api/products/seed address*/
productRouter.get('/seed', expressAsyncHandler(async(req, res) =>{
    //await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
    console.log(createdProducts);
})
);
/*To fetch data according to ID created in MongoDB and show in FRONTEND*/
productRouter.get('/:id', expressAsyncHandler(async(req, res) =>{
    const product = await Product.findById(req.params.id).populate(
        'seller',
        'seller.name seller.logo seller.ratings seller.numReviews'
    );
    if(product) {
        res.send(product);
    }
    else{
        res.status(404).send({message: 'Product Not Found'});
    }
})
);

/*Creating API for inserting new products in the backend. 
That's why it is a post request. '/' this means /api/products */
productRouter.post(
    '/', 
    isAuth, 
    isSellerOrAdmin, 
    expressAsyncHandler(async(req, res) => {
    const product = new Product({
        name: 'Sample product' + Date.now(),
        seller: req.user._id,
        image: '/images',
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
    /*The above line sends data to the frontend*/})
);

/*API for updating product edit details into the database*/
productRouter.put('/:id', isAuth, isSellerOrAdmin, expressAsyncHandler(async(req, res) => {
    /*We need to get ID of the product*/
    const productId = req.params.id;
    /*Now getting product from the database*/
    const product = await Product.findById(productId); /*Here Product is class*/
    if (product) { /*Here product is object*/
      /* if "product" exists, then fill the data of the datbase from the frontend*/
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
productRouter.delete('/:id', expressAsyncHandler(async(req, res) => {
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


/*API for category wise listing products and fx defined in the APP.JS*/
productRouter.get('/categories', expressAsyncHandler(async(req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
})
);


/*API for REVIEWS AND COMMENTS. As there is an AJAX request in the 
productActions.js file, we need to mention that API*/
productRouter.post('/:id/reviews', isAuth, expressAsyncHandler(async(req, res) => {
    /*I have made a new schema at the models in the mongoose to 
    store the reviewed users data in the database*/

    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        if(product.reviews.find(x => x.name === req.user.name)) {
            return res.status(404).send({ message: 'You have already submitted a review'});
        }
        const review = {
            name: req.user.name, 
            rating: Number(req.body.rating), 
            comment: req.body.comment};
    
    product.reviews.push(review);/*Updating the review*/
    product.numReviews = product.reviews.length; /*Updatting number of reviews*/
    product.rating = product.reviews.reduce((a, c) => 
        (c.rating + a, 0) / product.reviews.length);

        /*Reduce() used to show avegrage rating of all the users.
        reduce() fx accepts 2 parameters, one is a=accumulator and
        c=current item. Current rating + accumulator is done to
        get total ratings and divided by "product.reviews.length" to
        find the average value of the rating. Accumulator's value is 0 by
        defualt.*/
    
    const updatedProduct = await product.save();
    res.status(201).send ({
        message: 'Review Created Successfully',
        review: updatedProduct.reviews [updatedProduct.reviews.length - 1],
        });
    } else {
        res.status(404).send({ message: 'Cannot make review'});

    }
}
));


export default productRouter;