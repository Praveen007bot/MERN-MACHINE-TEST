import express from 'express'
import { Login, register } from '../controllers/LoginController.js';

const route = express.Router();

route.post('/login',Login)
route.post('/register', register)

export default route