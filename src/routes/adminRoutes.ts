import * as express from 'express';
import AdminController from '../controllers/adminController';

const router = express.Router();

// Add a product
router.post('/admin/products/add', AdminController.addProduct);

// Update an existing product
router.put('/admin/products/update/:productId', AdminController.updateProduct);

// Delete a product
router.delete('/admin/products/delete/:productId', AdminController.removeProduct);

// View all product
router.get('/admin/products', AdminController.viewAllProducts);

export default router;
