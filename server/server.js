import express,{json} from 'express';
import {config} from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js'
import clientRoutes from './routes/clientRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import './config/passport.js'
import cors from 'cors';
import vendorRoutes from './routes/vendorRoutes.js';


const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // your React frontend
  credentials: true, // allow cookies
}));
app.use(express.json());
app.use(cookieParser());
config();
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
connectDB();

app.use(passport.initialize());
app.use(passport.session());

// app.use('/api',authRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/events',eventRoutes);
app.use('/api/clients',clientRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/message',chatRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})