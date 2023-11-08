import { Request, Response } from 'express';
import Cart from '../models/cart';
import Product from '../models/product';

class UserController {

  // Add a product to the cart
  async addToCart(req: Request, res: Response) {
    try {
      const {productId, quantity } = req.body;
      const cartItem = await Cart.create({ productId, quantity });
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Update the quantity of a product in cart
  async updateCartItem(req: Request, res: Response) {
    try {
      const cartItemId = req.params.cartItemId;
      const { quantity } = req.body;

      const cartItem = await Cart.findOne({where: {id : cartItemId}});

      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }

      cartItem.quantity = quantity;
      await cartItem.save();

      res.status(200).json(cartItem);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Remove a product from the cart
  async removeFromCart(req: Request, res: Response) {
    try {
      const cartItemId = req.params.cartItemId;
      const cartItem = await Cart.findByPk(cartItemId);

      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }

      await cartItem.destroy();

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // View the items in cart
  async viewCart(req: Request, res: Response) {
    try {
      const cartItems = await Cart.findAll();

      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Get the total price of the products in the cart
  async getTotalPrice(req: Request, res: Response) {
    try {
      const cartItems = await Cart.findAll();

      let totalPrice = 0;
      for (const cartItem of cartItems) {
        const cartProduct = await Product.findByPk(cartItem.productId);
        totalPrice += (cartProduct?.price || 0) * cartItem.quantity;
      }

      res.status(200).json({ totalPrice });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Get the list of available products
  async getAvailableProducts(req: Request, res: Response) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new UserController();
