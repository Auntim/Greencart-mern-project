import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({ success: false, message: "Unauthorized" });
    }
    try {
        const tokendecoded = jwt.verify(token, process.env.JWT_SECRET);
        if (tokendecoded.id) {
            req.userId = tokendecoded.id;
        }
        else {
            return res.json({ success: false, message: "Unauthorized" });
        }
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


export default authUser;