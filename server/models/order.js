import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: "user" },
    items: [{
        product: { type: String, required: true, ref: "product" },
        quantity: { type: Number, required: true },
    }],
    amount: { type: Number, required: true },
    address: { type: String, require: true, ref: 'address' },
    status: { type: String, default: 'Order Placed' },
    paymentType: { type: String, require: true },
    isPaid: { type: Boolean, require: true, default: false },
}, { timestamps: true })

const Order = mongoose.models.order || mongoose.model("order", orderSchema);
export default Order;