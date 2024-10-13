import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export const LoginModel = mongoose.model('Login', LoginSchema)