// add address : /api/address/add

import Address from "../models/address.js";

export const addAddress = async (req, res) => {
    try {
        const { userId, address } = req.body;
        await Address.create({ ...address, userId: userId });
        res.json({
            success: true,
            message: "Address added successfully",
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message,
        })
    }
}


// get address : /api/address/get
export const getAddress = async (req, res) => {
    try {
        const { userId } = req.body;
        const address = await Address.find({ userId });
        res.json({
            success: true,
            address: address,
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message,
        })
    }
}