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

- `Dockerfile` and `docker-compose.yml`: To dockerize the entire application.

## Prerequisites

Before you begin, ensure you have the following:

- Docker Application (latest version)
- Postman or any other equivalent application to test API.

## Building and Running the Application

To build the application, follow these steps:

1. Download the zip file and extract all the files.

2. Open Docker Application.

3. Then, on CommandPrompt/Terminal, `cd` to the root directory of the code `Shopping-Cart-API-main` and run the following commands:
- To just build the docker image

   ```bash
   docker-compose build

- To run the application
   
   ```bash
   docker-compose up

The application will start, and you can access the API at http://localhost:3000.

## Using the API

Use the following commands to use the API

### Admin Routes
| Routes        | Body (JSON) | Description           | 
| ------------- |:-------------:|:-------------:|
| `GET/api/admin/products`    | N.A. | View list of all products|
| `POST/api/admin/products/add`     | { "name": "Product Name", "description": "Product Description", "price": Product Price } | Post a new product |     
| `POST/api/admin/products/update/:productId`| { "name": "Product Name", "description": "Product Description", "price": Product Price } |Update details of a particular product. |    
| `DELETE/api/admin/products/delete/:productId`| N.A. | Delete a particular product |

### User Routes
| Routes        | Body (JSON) | Description           | 
| ------------- |:-------------:|:-------------:|
| `GET/api/user/products`    | N.A. | View list of all available products|
| `POST/api/user/cart/add`   | { "productId": Product Id, "quantity": Product Quantity } | Add a product to the cart |
| `POST/api/user/cart/update/:cartItemId`    | { "quantity": Updated Quantity }| Update the quantity of a particular product in the cart |     
| `POST/api/user/cart/delete/:cartItemId` | N.A. | Delete a particular product from the cart |  
| `GET/api/user/cart/view`         | N.A. | View the products added to the cart |
| `POST/api/user/cart/totalPrice`       | N.A. | To view the total price of the products added to the cart |


## Running Automated Tests

1. To test Admin API

   ```bash
   docker-compose run -e NODE_ENV=test web-app npm run testAdminAPI

2. To test User API
   
   ```bash
   docker-compose run -e NODE_ENV=test web-app npm run testUserAPI
