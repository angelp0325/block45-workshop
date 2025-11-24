import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../models/userModel.js";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await findUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(email, hashedPassword, role);

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({
      message: `Welcome ${user.role === "admin" ? "Admin" : "Customer"}`,
      role: user.role,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
