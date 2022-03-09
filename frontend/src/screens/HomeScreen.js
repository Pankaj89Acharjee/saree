import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link, useParams } from 'react-router-dom';

export default function HomeScreen() {
  const { pageNumber = 1} = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

/*Importing from store.js*/
  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const { loading: loadingSellers, error: errorSellers, users: sellers } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({ pageNumber })); /*Means return all products and donot filter any products*/
    /*Now we need to show top sellers*/
    dispatch(listTopSellers()); /*Defining it in userActions.js*/
  }, [dispatch, pageNumber]);
  return (
    <div>
      <div>
      <h3>Best Sellers</h3>
      </div>
      
        {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : ( 
        <>
          {sellers.length === 0 && <MessageBox variant="danger">No Seller Found</MessageBox>}
          <Carousel showArrows autoPlay showThumbs={false}>
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to = {`/seller/${seller._id}`}>
                  <img src = {seller.seller.logo} alt = {seller.seller.name}></img>
                  <p className='legend'>{seller.seller.name}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
           
  
      )}

      <h2 className='headerH2'>Featured Products</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox variant="danger">No Products Found</MessageBox>}

          <div className="row1 center">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
          </div>

          <div className="row1 pagination" /*For showing page numbers in the homepage*/>
                {
                    [...Array(pages).keys()].map((x) => (

    
                        <Link key={x + 1 /*For displaying page number*/} 
                        to = {`/pageNumber/${x + 1}`}>
                        {x + 1}</Link>
                    ))
                } 
                </div>
        </>
        
        
      )}
    </div>
  );
}
