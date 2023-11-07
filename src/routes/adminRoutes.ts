import * as express from 'express';
import AdminController from '../controllers/adminController';

const router = express.Router();

// Admin routes
router.post('/admin/products/add', AdminController.addProduct);
router.put('/admin/products/update/:productId', AdminController.updateProduct);
router.delete('/admin/products/delete/:productId', AdminController.removeProduct);
router.get('/admin/products', AdminController.viewAllProducts);

export default router;
