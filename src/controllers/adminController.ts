import { Request, Response } from 'express';
import Product from '../models/product';

class AdminController {
  // Add a product to the catalogue
  async addProduct(req: Request, res: Response) {
    try {
      const { name, description, price } = req.body;
      const product = await Product.create({ name, description, price });
      res.status(201).json(product);
    } catch (error) {
      console.log('Error adding product', error);
    //   res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Update a product in the catalogue
  async updateProduct(req: Request, res: Response) {
    try {
      const productId = req.params.productId;
      const { name, description, price } = req.body;

      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      product.name = name;
      product.description = description;
      product.price = price;
      await product.save();

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Remove a product from the catalogue
  async removeProduct(req: Request, res: Response) {
    try {
      const productId = req.params.productId;
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      await product.destroy();

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // View all products in the catalogue
  async viewAllProducts(req: Request, res: Response) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new AdminController();
