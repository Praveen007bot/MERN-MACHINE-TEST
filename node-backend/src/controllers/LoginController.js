import { LoginModel } from "../models/Login.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const user = await LoginModel.findOne({ username });
    if (user) {
      return res
        .status(402)
        .json({ message: "Username already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await LoginModel.create({
      username,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ message: "Account created sucessfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const User = await LoginModel.findOne({ username });
    if (!User) {
      return res
        .status(401)
        .json({ message: "User not found", success: false });
    }
    
    const isCorrectPassword = await bcrypt.compare(password, User.password);
    if (!isCorrectPassword) {
      return res
        .status(402)
        .json({ message: "Invalid Password", success: false });
    }

    const tokenData = {
      userName: User.username,
    };
    const token = await jwt.sign(tokenData, "PRAVEEN", { expiresIn: "1d" });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        samesite: "strict",
      })
      .json({
        message: "Login sucessfully",
        username: User.username,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
