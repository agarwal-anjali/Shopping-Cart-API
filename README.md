# Shopping Cart API

A simple e-commerce shopping cart application built using Node.js and SQLite.

The API has two endpoints:
- Admin Endpoint: To allow admin to add new products, update name/description/price of existing products, remove products, and view the list of products.
- User Endpoint: To allow user to view all available products, add items to a shopping cart, update quantity of existing items in shopping cart, remove items from the shopping cart, and calculate the total cost of items in the shopping cart.

## Project Structure

The project is structured as follows:

- `src`
  - `config`: Contains `database.ts` to help set up the development and test database.
  - `controllers`: Contains `adminController.ts` and `userController.ts` that has implementation for the API calls.
  - `models`: Contains `Product.ts` and `Cart.ts` that are models required to set up the database tables.
  - `routes`: Contains `adminRoutes.ts` and `userRoutes.ts` that contains the API endpoints for admin and user respectively.
  - `test`: Contains `adminRoute.test.ts` and `userRoute.test.ts` To test the basic functionality of each API endpoints for both admin and user.
  - `app.ts`: The main application class.

- `Dockerfile`: To dockerize the entire application.

## Prerequisites

Before you begin, ensure you have the following:

- Docker Application (latest version)
- Postman or any other equivalent application to test API.

## Building and Running the Application

To build the application, follow these steps:

1. Build the docker container

   ```bash
   docker build -t shopping-cart-api .

2. Run the application
   
   ```bash
   docker run -p 3000:3000 shopping-cart-api

The application will start, and you can access the API at http://localhost:3000.

## Using the API

Use the following commands to use the API

### Admin Routes
| Routes        | Description           | 
| ------------- |:-------------:|
| `GET/api/admin/products`    | View list of all products|
| `POST/api/admin/products/add`     | Post a new product |     
| `POST/api/admin/products/update/:productId`| Update details of a particular product. |    
| `DELETE/api/admin/products/delete/:productId`|Delete a particular product |

### User Routes
| Routes        | Description           | 
| ------------- |:-------------:|
| `GET/api/user/products`    | View list of all available products|
| `POST/api/user/cart/add`   | Add a product to the cart |
| `POST/api/user/cart/update/:cartItemId`    | Update the quantity of a particular product in the cart |     
| `POST/api/user/cart/delete/:cartItemId` | Delete a particular product from the cart |  
| `GET/api/user/cart/view`         | View the products added to the cart |
| `POST/api/user/cart/totalPrice`       | To view the total price of the products added to the cart |


## Running Automated Tests

1. To test Admin API

   ```bash
   docker run shopping-cart-api npm run testAdminAPI

2. To test User API
   
   ```bash
   docker run shopping-cart-api npm run testUserAPI


