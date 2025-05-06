import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/product.js';
import e from 'express';

// add product : /api/product/add
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData);
        const images = req.files;
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {
                    resource_type: 'image',
                });
                return result.secure_url;
            })
        )

        await Product.create({
            ...productData,
            images: imagesUrl,
        })

        return res.json({
            success: true,
            message: "Product added successfully",
        })

    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message,
        })
    }
}


// get products : /api/product/list
export const productList = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({
            success: true,
            products: products,
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message,
        })
    }
}

// get product by id : /api/product/id
export const getProductById = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findById(id);
        res.json({
            success: true,
            product: product,
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message,
        })
    }
}

// change product stock : /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        await Product.findById(id, { inStock: inStock });
        res.json({
            success: true,
            message: "Stock updated successfully",
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message,
        })
    }
}