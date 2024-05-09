import jwt from 'jsonwebtoken';
import { errorHndler } from './error.js';


export const verifyToken = (req ,res, next) =>{
    const token = req.cookies.access_token;
    console.log(token);
    if(!token) return next(errorHndler(401, "unknown"));

    jwt.verify(token ,'dsfjkfsfffjkeif1s15' ,(err,user)=>{
        if(err) return next(errorHndler(403,'forbidden'));

        req.user = user;
        next();
    });
};