import express from 'express'
import authUser from '../middleware/authUser.js';
import { getAllOrder, getUserOrder, placeOrderCOD } from '../controllers/orderController.js';
import authSeller from '../middleware/authSeller.js';


const orderRoute = express.Router();

orderRoute.post('/cod', authUser, placeOrderCOD)
orderRoute.get('/user', authUser, getUserOrder)
orderRoute.get('/seller', authSeller, getAllOrder)

export default orderRoute;