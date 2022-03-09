import bcrypt from 'bcryptjs';

const data = {

  users: [
    {
      name: 'Pankaj',
      email: 'abc@xyz.com',
      password: bcrypt.hashSync('1234', 8), /*New format for bcrypt*/
      isAdmin: true,

      /*For Bug fixing */
      isSeller: true,
      seller: {
        name: 'Puma',
        logo: '/images/home1.jpg',
        description: 'best seller',
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: 'PinkuTitu',
      email: 'pqrs@styu.com',
      password: bcrypt.hashSync('1234', 8), /* PREVIOUS ONE is -> *await bcrypt.hash('1234', 8),*/
      isAdmin: false,
    },

    {
      name: 'Pankaj Acharjee',
      email: 'pankaj2007acharjee@gmail.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    }

  ],

  products: [
    {
      
      name: 'Nike Slim Shirt',
      category: 'Shirts',
      image: '/images/tshirt.jpg',
      price: 120,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'very high quality product',
    },
    {
 
      name: 'Adidas Fit Shirt',
      category: 'Shirts',
      image: '/images/tshirt2.jpg',
      price: 100,
      countInStock: 20,
      brand: 'Adidas',
      rating: 4.0,
      numReviews: 10,
      description: 'high quality product',
    },
   
 
  
  
  ],
};
export default data;
