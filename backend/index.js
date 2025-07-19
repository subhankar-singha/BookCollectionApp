import express from 'express';
import connectDB from './config.js';
import dotenv from 'dotenv';
import route from './routes.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(route);

app.listen(3000,()=>{
    console.log("Server is running on port 3000");  
})