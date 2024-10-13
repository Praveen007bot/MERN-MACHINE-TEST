import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectDB from './src/db/db.js';
import LoginRoute from './src/routes/LoginRoutes.js'
import EmployeeRoute from './src/routes/EmployeeRoutes.js'
 
dotenv.config()

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, 
}

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());



app.use('/api/v1/admin', LoginRoute)
app.use('/api/v1/employee', EmployeeRoute)


app.listen(PORT, ()=>{
    connectDB()
    console.log(`server running at ${PORT}`);
    
})
