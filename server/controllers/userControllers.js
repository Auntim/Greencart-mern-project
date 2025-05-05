import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";



//register user : /api/user/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Please fill all the fields" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "3d",
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
            maxAge: 3 * 24 * 60 * 60 * 1000, //expiration time: 3 days
        })

        res.json({
            success: true,
            user: { email: user.email, name: user.name },
        });

    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}


//login user : /api/user/login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: "Email and Password are required" })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid email or password" })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "3d",
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
            maxAge: 3 * 24 * 60 * 60 * 1000, //expiration time: 3 days
        })
        return res.json({
            success: true,
            user: { email: user.email, name: user.name },
        });


    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });

    }
}


//check Auth :  /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        const { userId } = req;
        const user = await User.findById(userId).select("-password")
        return res.json({ success: true, user })
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message })
    }
}

//logout user : /api/user/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: "Logout successful" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
