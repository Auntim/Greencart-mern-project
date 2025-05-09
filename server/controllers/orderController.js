import Order from "../models/order.js";
import Product from "../models/product.js";


// Place oder COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        if (!address || items.length === 0) {
            return res.json({ success: false, message: 'Invalid Data' })
        }
        // calculate amount using item
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0);

        // add tax charge (2%)
        amount += Math.floor(amount * 0.02);
        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: 'COD',
        });
        return res.json({ success: true, message: 'Order Placed Successfully' })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}



// get order by user Id : /api/order/user
export const getUserOrder = async () => {
    try {
        const { userId } = req.body;
        const order = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("item.product address").sort({ createdAt: -1 });
        res.json({ success: true, order })
    } catch (error) {
        res.json({ successz: false, message: error.message })
    }
}


// get all order (for seller / admin) :/api/order/seller
export const getAllOrder = async () => {
    try {

        const order = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("item.product address").sort({ createdAt: -1 });
        res.json({ success: true, order })
    } catch (error) {
        res.json({ successz: false, message: error.message })
    }
}