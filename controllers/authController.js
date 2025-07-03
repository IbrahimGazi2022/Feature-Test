import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
    try {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/;
        
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
            });
        }
        
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        
        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
