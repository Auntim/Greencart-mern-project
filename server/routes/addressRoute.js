import express from 'express';
import authUser from '../middleware/authUser.js';
import { addAddress, getAddress } from '../controllers/addressContoller.js';

const addressRouter = express.Router();

addressRouter.post('/add', authUser, addAddress);
addressRouter.post('/get', authUser, getAddress);

export default addressRouter;