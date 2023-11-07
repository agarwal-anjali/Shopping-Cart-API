import * as express from 'express';
import UserController from '../controllers/userController';

const userRouter = express.Router();

// Add a product to the user's cart
userRouter.post('/user/cart/add', UserController.addToCart);

// Update the quantity of a product in the user's cart
userRouter.put('/user/cart/update/:cartItemId', UserController.updateCartItem);

// Remove a product from the user's cart
userRouter.delete('/user/cart/delete/:cartItemId', UserController.removeFromCart);

// View the user's cart
userRouter.get('/user/cart/view', UserController.viewCart);

// Get the total price of the user's cart
userRouter.get('/user/cart/totalPrice', UserController.getTotalPrice);

// Get the list of available products
userRouter.get('/user/products', UserController.getAvailableProducts);

export default userRouter;
