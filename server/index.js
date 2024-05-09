
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import path from 'path';
const PORT = 3003 || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/user' ,userRouter );
app.use('/api/auth' ,authRouter );
app.use('/api/listing' , listingRouter)

const __dirname = path.resolve();

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  })  

app.use((err, req, res ,next)=>{
    const statusCode = err.statusCode || 500;
    const message =err.message || 'internal server error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});
mongoose.connect("mongodb://admin:admin@127.0.0.1:27017/todo?authSource=admin")
    .then(() => {
        console.log('MongoDB Connected successfully');
        app.listen(PORT, '0.0.0.0',() => {
            console.log(`app listen to port :${PORT}`)
        });
    })
    .catch((err) => console.error(err));
