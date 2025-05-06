import express from 'express';
import { upload } from '../config/multer.js';
import authSeller from '../middleware/authSeller.js';
import { addProduct, changeStock, getProductById, productList } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post(('/add', upload.array[images]), authSeller, addProduct);
productRouter.get('/list', productList);
productRouter.get('/id', getProductById);
productRouter.get('/stock', authSeller, changeStock);

export default productRouter;